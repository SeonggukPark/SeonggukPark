param(
    [string]$WorkspaceRoot = (Split-Path -Parent $PSScriptRoot),
    [string]$ImportDate = "2026-07-23",
    [switch]$Force
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
Add-Type -AssemblyName System.IO.Compression.FileSystem

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$outputRoot = Join-Path $WorkspaceRoot "src/content/notes/imported"
$reportPath = Join-Path $WorkspaceRoot "migration/notion/import-report.md"
$manifestPath = Join-Path $WorkspaceRoot "migration/notion/import-manifest.json"
$tempRoot = Join-Path ([IO.Path]::GetTempPath()) ("codex-notion-import-" + [guid]::NewGuid().ToString("N"))

function Get-Sha256Hex([string]$Value) {
    $sha = [Security.Cryptography.SHA256]::Create()
    try {
        $bytes = [Text.Encoding]::UTF8.GetBytes($Value)
        return ([BitConverter]::ToString($sha.ComputeHash($bytes))).Replace("-", "").ToLowerInvariant()
    }
    finally {
        $sha.Dispose()
    }
}

function ConvertTo-YamlSingleQuoted([string]$Value) {
    return "'" + $Value.Replace("'", "''") + "'"
}

function Get-CleanSourcePath([string]$Path) {
    $clean = $Path.Replace("\", "/")
    $clean = [regex]::Replace($clean, "\s+[0-9a-f]{32}(?=\.md$)", "", "IgnoreCase")
    return $clean
}

function Get-TitleAndBody([string]$Text, [string]$FallbackTitle) {
    $normalized = $Text.Replace("`r`n", "`n").Replace("`r", "`n").Trim([char]0xFEFF)
    $lines = @($normalized -split "`n")
    $title = $null
    $titleIndex = -1

    for ($i = 0; $i -lt [Math]::Min($lines.Count, 40); $i++) {
        if ($lines[$i] -match "^#\s+(.+?)\s*$") {
            $title = $Matches[1].Trim()
            $titleIndex = $i
            break
        }
    }

    if ([string]::IsNullOrWhiteSpace($title)) {
        $title = $FallbackTitle
    }

    if ($titleIndex -ge 0) {
        $bodyLines = New-Object System.Collections.Generic.List[string]
        for ($i = 0; $i -lt $lines.Count; $i++) {
            if ($i -ne $titleIndex) {
                $bodyLines.Add($lines[$i])
            }
        }
        $body = $bodyLines -join "`n"
    }
    else {
        $body = $normalized
    }

    return [pscustomobject]@{ Title = $title; Body = $body }
}

function Remove-NotionArtifacts([string]$Body) {
    $clean = $Body

    # Assets remain in the original ZIP. Avoid broken links and copyrighted screenshots.
    $clean = [regex]::Replace(
        $clean,
        "(?im)^.*!\[[^\r\n]*\]\([^\r\n]*\.(png|jpe?g|gif|webp|svg)\)[ \t]*$",
        ""
    )
    $clean = [regex]::Replace($clean, "(?i)!\[[^\r\n]*?\]\([^\r\n]*?\.(png|jpe?g|gif|webp|svg)\)", "")

    # Keep labels for local Notion links, while preserving normal web links.
    $clean = [regex]::Replace(
        $clean,
        "(?i)\[(.*?)\]\([^\r\n]*?\.(md|csv|pdf|pptx|hwp|png|jpe?g)(#[^\r\n)]*)?\)",
        '$1'
    )

    # Remove copy/paste labels inserted into some Notion code blocks.
    $clean = [regex]::Replace($clean, "(?m)^(cpp|코드 복사)\s*$", "")

    # Redact concrete contact details if one slipped into a study note.
    $clean = [regex]::Replace($clean, "(?i)\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", "[비공개 이메일 제거]")
    $clean = [regex]::Replace($clean, "(?<!\d)01[016789][-. ]?\d{3,4}[-. ]?\d{4}(?!\d)", "[비공개 연락처 제거]")

    $clean = [regex]::Replace($clean, "(?m)[ \t]+$", "")
    $clean = [regex]::Replace($clean, "(`n){4,}", "`n`n`n")
    return $clean.Trim()
}

function Get-StudyCategory([string]$Path) {
    if ($Path -match "모던 리눅스") { return "Linux" }
    if ($Path -match "C\+\+") { return "C++" }
    if ($Path -match "Git\s*&\s*GitHub") { return "Git" }
    if ($Path -match "Android|Kotlin|코틀린") { return "Android & Kotlin" }
    if ($Path -match "소프트웨어공학|시스템분석설계") { return "Software Engineering" }
    if ($Path -match "도커|쿠버네티스|Docker|Kubernetes") { return "Containers" }
    return "Study Archive"
}

function Get-AlgorithmTags([string]$Title, [string]$Body) {
    $sample = $Title + "`n" + $Body.Substring(0, [Math]::Min($Body.Length, 2500))
    $tags = New-Object System.Collections.Generic.List[string]
    $tags.Add("Algorithm")
    $tags.Add("C++")

    if ($sample -match "Trie|트라이|단어검색") { $tags.Add("Trie") }
    if ($sample -match "Segment\s*Tree|세그먼트\s*트리") { $tags.Add("Segment Tree") }
    if ($sample -match "다익스트라|Dijkstra|최단거리|Floyd|플로이드") { $tags.Add("Graph") }
    if ($sample -match "Union.?Find|Disjoint\s*Set") { $tags.Add("Union-Find") }
    if ($sample -match "BFS|DFS|너비 우선|깊이 우선") { $tags.Add("Graph Search") }
    if ($Title -match "\(L\d+\)|시뮬레이션|격자|미로|숲|게임") { $tags.Add("Simulation") }

    return @($tags | Select-Object -Unique)
}

function Write-ImportedNote(
    [string]$Kind,
    [string]$SourceArchive,
    [string]$SourcePath,
    [string]$Title,
    [string]$Body,
    [string[]]$Tags
) {
    $source = $SourceArchive + " > " + (Get-CleanSourcePath $SourcePath)
    $hash = (Get-Sha256Hex ($Kind + "|" + $SourcePath)).Substring(0, 10)
    $fileName = $Kind + "-" + $hash + ".md"
    $directory = Join-Path $outputRoot $Kind
    $outputPath = Join-Path $directory $fileName

    $tagYaml = ($Tags | ForEach-Object { ConvertTo-YamlSingleQuoted $_ }) -join ", "
    $description = if ($Kind -eq "studies") {
        "Notion에서 가져온 " + $Tags[1] + " 학습 기록입니다. 공개 전 직접 실습과 출처 검증이 필요합니다."
    }
    else {
        "Notion에서 가져온 알고리즘 풀이 기록입니다. 공개 전 코드 재검증과 문제 링크 정리가 필요합니다."
    }

    $frontmatter = @(
        "---"
        "title: " + (ConvertTo-YamlSingleQuoted $Title)
        "description: " + (ConvertTo-YamlSingleQuoted $description)
        "publishedAt: $ImportDate"
        "tags: [$tagYaml]"
        "draft: true"
        "source: " + (ConvertTo-YamlSingleQuoted $source)
        "importedAt: $ImportDate"
        "---"
        ""
        "> Notion에서 자동 변환한 비공개 초안입니다. 공개하기 전에 사실, 코드, 출처와 문장 표현을 다시 확인해야 합니다."
        ""
    ) -join "`n"

    [IO.File]::WriteAllText($outputPath, $frontmatter + $Body + "`n", $utf8NoBom)

    return [pscustomobject]@{
        kind = $Kind
        title = $Title
        source = $source
        output = $outputPath.Substring($WorkspaceRoot.Length + 1).Replace("\", "/")
        tags = $Tags
        characters = $Body.Length
    }
}

function Import-Archive([string]$ArchiveName, [string]$Kind) {
    $outerPath = Join-Path $WorkspaceRoot $ArchiveName
    if (-not (Test-Path -LiteralPath $outerPath)) {
        throw "Archive not found: $outerPath"
    }

    $nestedPath = Join-Path $tempRoot ($Kind + ".zip")
    $outer = [IO.Compression.ZipFile]::OpenRead($outerPath)
    try {
        $nestedEntry = $outer.Entries | Where-Object { $_.FullName.EndsWith(".zip", [StringComparison]::OrdinalIgnoreCase) } | Select-Object -First 1
        if ($null -eq $nestedEntry) {
            throw "Nested Notion ZIP not found in $ArchiveName"
        }
        $input = $nestedEntry.Open()
        $output = [IO.File]::Create($nestedPath)
        try { $input.CopyTo($output) }
        finally { $output.Dispose(); $input.Dispose() }
    }
    finally {
        $outer.Dispose()
    }

    $seenHashes = @{}
    $results = New-Object System.Collections.Generic.List[object]
    $skipped = [ordered]@{ excluded = 0; empty = 0; duplicate = 0; index = 0 }
    $inner = [IO.Compression.ZipFile]::OpenRead($nestedPath)

    try {
        $entries = @($inner.Entries | Where-Object { $_.FullName.EndsWith(".md", [StringComparison]::OrdinalIgnoreCase) } | Sort-Object FullName)
        foreach ($entry in $entries) {
            $path = $entry.FullName

            if ($Kind -eq "studies" -and $path -match "스터디 스케줄표|OPIc|취업") {
                $skipped.excluded++
                continue
            }

            $reader = New-Object IO.StreamReader($entry.Open(), [Text.Encoding]::UTF8, $true)
            try { $original = $reader.ReadToEnd() }
            finally { $reader.Dispose() }

            if ($Kind -eq "algorithms") {
                $contentHash = Get-Sha256Hex ($original.Replace("`r`n", "`n"))
                if ($seenHashes.ContainsKey($contentHash)) {
                    $skipped.duplicate++
                    continue
                }
                $seenHashes[$contentHash] = $true
            }

            $fallback = [IO.Path]::GetFileNameWithoutExtension((Get-CleanSourcePath $path))
            $parsed = Get-TitleAndBody $original $fallback

            if ($parsed.Title -in @("Algorithm", "스터디 플래너", "📆스터디 스케줄표")) {
                $skipped.index++
                continue
            }

            $body = Remove-NotionArtifacts $parsed.Body
            $plainLength = ([regex]::Replace($body, "[`#*_>|\-]", "")).Trim().Length
            if ($plainLength -lt 120) {
                $skipped.empty++
                continue
            }

            if ($Kind -eq "studies") {
                $category = Get-StudyCategory $path
                $tags = @("Notion Import", $category)
            }
            else {
                $tags = Get-AlgorithmTags $parsed.Title $body
            }

            $result = Write-ImportedNote $Kind $ArchiveName $path $parsed.Title $body $tags
            $results.Add($result)
        }
    }
    finally {
        $inner.Dispose()
    }

    return [pscustomobject]@{
        archive = $ArchiveName
        kind = $Kind
        imported = $results.Count
        skipped = $skipped
        entries = $results.ToArray()
    }
}

if (Test-Path -LiteralPath $outputRoot) {
    $existing = @(Get-ChildItem -LiteralPath $outputRoot -Recurse -File -Filter *.md -ErrorAction SilentlyContinue)
    if ($existing.Count -gt 0 -and -not $Force) {
        throw "Import destination already contains Markdown files. Move or review them before rerunning: $outputRoot"
    }
    elseif ($existing.Count -gt 0 -and $Force) {
        $resolvedOutputRoot = [IO.Path]::GetFullPath($outputRoot).TrimEnd([IO.Path]::DirectorySeparatorChar)
        foreach ($file in $existing) {
            $resolvedFile = [IO.Path]::GetFullPath($file.FullName)
            $isInsideOutput = $resolvedFile.StartsWith(
                $resolvedOutputRoot + [IO.Path]::DirectorySeparatorChar,
                [StringComparison]::OrdinalIgnoreCase
            )
            $isGeneratedName = $file.Name -match "^(studies|algorithms)-[0-9a-f]{10}\.md$"
            $hasImportMarker = (Get-Content -LiteralPath $file.FullName -Encoding UTF8 -TotalCount 20) -match "Notion에서 자동 변환한 비공개 초안"

            if (-not ($isInsideOutput -and $isGeneratedName -and $hasImportMarker)) {
                throw "Force cleanup refused a file that does not look generated: $resolvedFile"
            }
            [IO.File]::Delete($resolvedFile)
        }
    }
}

[IO.Directory]::CreateDirectory($outputRoot) | Out-Null
[IO.Directory]::CreateDirectory((Join-Path $outputRoot "studies")) | Out-Null
[IO.Directory]::CreateDirectory((Join-Path $outputRoot "algorithms")) | Out-Null
[IO.Directory]::CreateDirectory((Split-Path -Parent $reportPath)) | Out-Null
[IO.Directory]::CreateDirectory($tempRoot) | Out-Null

try {
    $studies = Import-Archive "Studies.zip" "studies"
    $algorithms = Import-Archive "algorithms.zip" "algorithms"
    $allEntries = @($studies.entries) + @($algorithms.entries)

    $manifest = [ordered]@{
        importedAt = $ImportDate
        generatedBy = "scripts/import-notion.ps1"
        archives = @($studies, $algorithms)
        totalImported = $allEntries.Count
    }
    [IO.File]::WriteAllText($manifestPath, ($manifest | ConvertTo-Json -Depth 8), $utf8NoBom)

    $studyGroups = $studies.entries | ForEach-Object { $_.tags[1] } | Group-Object | Sort-Object Name
    $report = New-Object System.Collections.Generic.List[string]
    $report.Add("# Notion 실제 가져오기 결과")
    $report.Add("")
    $report.Add("가져온 날짜: $ImportDate")
    $report.Add("")
    $report.Add("## 요약")
    $report.Add("")
    $report.Add("| 원본 | 가져온 초안 | 제외 | 빈 문서 | 중복 | 인덱스 |")
    $report.Add("| --- | ---: | ---: | ---: | ---: | ---: |")
    $report.Add("| Studies.zip | $($studies.imported) | $($studies.skipped.excluded) | $($studies.skipped.empty) | $($studies.skipped.duplicate) | $($studies.skipped.index) |")
    $report.Add("| algorithms.zip | $($algorithms.imported) | $($algorithms.skipped.excluded) | $($algorithms.skipped.empty) | $($algorithms.skipped.duplicate) | $($algorithms.skipped.index) |")
    $report.Add("")
    $report.Add("총 $($allEntries.Count)개 Markdown을 `src/content/notes/imported`에 `draft: true`로 가져왔다.")
    $report.Add("")
    $report.Add("## 공부 기록 분류")
    $report.Add("")
    foreach ($group in $studyGroups) {
        $report.Add("- $($group.Name): $($group.Count)개")
    }
    $report.Add("")
    $report.Add("## 처리 원칙")
    $report.Add("")
    $report.Add("- Notion 로컬 링크는 텍스트만 남겼다.")
    $report.Add("- 이미지와 첨부파일은 원본 ZIP에 보존하고 자동 게시하지 않았다.")
    $report.Add("- 일정표, OPIc, 취업 자료, 빈 페이지, 완전 중복은 제외했다.")
    $report.Add("- 모든 문서는 비공개 초안이며 공개 전 검증이 필요하다.")
    $report.Add("")
    $report.Add("전체 파일별 매핑은 `import-manifest.json`에서 확인할 수 있다.")
    $report.Add("")
    [IO.File]::WriteAllText($reportPath, ($report -join "`n"), $utf8NoBom)

    Write-Output "Imported $($studies.imported) study notes and $($algorithms.imported) algorithm notes."
    Write-Output "Manifest: $manifestPath"
}
finally {
    if (Test-Path -LiteralPath $tempRoot) {
        [IO.Directory]::Delete($tempRoot, $true)
    }
}
