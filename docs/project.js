(() => {
  const data = window.PORTFOLIO_DATA;
  const $ = (selector) => document.querySelector(selector);
  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const setText = (selector, text) => {
    const target = $(selector);
    if (target) target.textContent = text;
  };

  setText("#brandMark", data.profile.initials);
  setText("#brandName", data.profile.name);
  setText("#footerName", data.profile.name);
  setText("#year", new Date().getFullYear());

  const projectId = new URLSearchParams(window.location.search).get("id");
  const project = data.projects.find((item) => item.slug === projectId);

  if (!project) {
    $("#projectNotFound").hidden = false;
  } else {
    document.title = `${project.title} | ${data.profile.name}`;
    document.querySelector('meta[name="description"]').content = project.summary;
    setText("#projectEyebrow", `${project.category} · ${project.period}`);
    setText("#projectTitle", project.title);
    setText("#projectSummary", project.summary);

    const sections = $("#projectSections");
    (project.sections || []).forEach((section) => {
      const article = el("article", "project-section");
      article.append(el("h2", "", section.title));
      (section.paragraphs || []).forEach((paragraph) => article.append(el("p", "", paragraph)));
      if (section.points?.length) {
        const list = el("ul");
        section.points.forEach((point) => list.append(el("li", "", point)));
        article.append(list);
      }
      sections.append(article);
    });

    const facts = $("#projectFacts");
    [
      ["분야", project.category],
      ["기간", project.period]
    ].forEach(([label, value]) => {
      const row = el("div");
      row.append(el("dt", "", label), el("dd", "", value));
      facts.append(row);
    });

    const skills = $("#projectSkills");
    project.skills.forEach((skill) => skills.append(el("span", "tag", skill)));
    $("#projectContent").hidden = false;
  }

  const themeToggle = $("#themeToggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = savedTheme || (systemDark ? "dark" : "light");
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
  });
})();
