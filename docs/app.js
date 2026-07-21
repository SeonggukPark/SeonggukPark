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

  document.title = `${data.profile.name} | Portfolio`;
  setText("#brandMark", data.profile.initials);
  setText("#brandName", data.profile.name);
  setText("#heroEyebrow", data.profile.eyebrow);
  setText("#profileName", data.profile.name);
  setText("#profileRole", data.profile.role);
  setText("#footerName", data.profile.name);
  setText("#year", new Date().getFullYear());

  const heroTitle = $("#heroTitle");
  heroTitle.innerHTML = data.profile.title
    .split("\n")
    .map((line) => line.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char])))
    .join("<br />");

  setText("#heroDescription", data.profile.description);
  setText("#contactText", data.profile.contactDescription || "이메일이나 외부 채널로 연락해 주세요.");

  const facts = $("#profileFacts");
  data.profile.facts.forEach((fact) => {
    const row = el("div");
    row.append(el("dt", "", fact.label), el("dd", "", fact.value));
    facts.append(row);
  });

  const about = $("#aboutCopy");
  data.profile.about.forEach((paragraph) => about.append(el("p", "", paragraph)));

  const heroActions = $("#heroActions");
  const projectsButton = el("a", "button primary", "프로젝트 보기");
  projectsButton.href = "#projects";
  heroActions.append(projectsButton);

  if (data.profile.resumeUrl) {
    const resume = el("a", "button", "이력서 PDF");
    resume.href = data.profile.resumeUrl;
    resume.target = "_blank";
    resume.rel = "noreferrer";
    heroActions.append(resume);
  }

  const heroLinks = $("#heroLinks");
  data.profile.links.filter((item) => item.url).forEach((item) => {
    const li = el("li");
    const link = el("a", "", item.label);
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    li.append(link);
    heroLinks.append(li);
  });
  if (!heroLinks.children.length) heroLinks.append(el("li", "", "GitHub · Velog · Notion 링크를 content.js에 입력하세요."));

  const skillGroups = $("#skillGroups");
  data.skills.forEach((group) => {
    const card = el("article", "skill-group");
    card.append(el("h3", "", group.name));
    const tags = el("div", "tag-list");
    group.items.forEach((item) => tags.append(el("span", "tag", item)));
    card.append(tags);
    skillGroups.append(card);
  });

  const experienceList = $("#experienceList");
  data.experience.forEach((item) => {
    const article = el("article", "timeline-item");
    article.append(el("div", "timeline-period", item.period));
    const body = el("div");
    body.append(el("h3", "", item.organization));
    body.append(el("p", "timeline-role", item.role));
    body.append(el("p", "timeline-description", item.description));
    if (item.points?.length) {
      const list = el("ul", "timeline-points");
      item.points.forEach((point) => list.append(el("li", "", point)));
      body.append(list);
    }
    article.append(body);
    experienceList.append(article);
  });

  const projectGrid = $("#projectGrid");
  const categories = ["전체", ...new Set(data.projects.map((project) => project.category))];
  const filters = $("#projectFilters");

  function renderProjects(category = "전체") {
    projectGrid.innerHTML = "";
    const projects = category === "전체" ? data.projects : data.projects.filter((project) => project.category === category);
    if (!projects.length) {
      projectGrid.append(el("div", "empty-state", "해당 프로젝트가 없습니다."));
      return;
    }
    projects.forEach((project) => {
      const card = el("a", "project-card");
      card.href = `./project.html?id=${encodeURIComponent(project.slug)}`;
      card.setAttribute("aria-label", `${project.title} 프로젝트 상세 보기`);
      const meta = el("div", "project-meta");
      meta.append(el("span", "", project.category), el("span", "", project.period));
      card.append(meta, el("h3", "", project.title), el("p", "", project.summary));
      const tags = el("div", "tag-list");
      project.skills.forEach((skill) => tags.append(el("span", "tag", skill)));
      card.append(tags);
      const links = el("div", "project-links");
      links.append(el("span", "", "프로젝트 자세히 보기 →"));
      card.append(links);
      projectGrid.append(card);
    });
  }

  categories.forEach((category, index) => {
    const button = el("button", "filter-button", category);
    button.type = "button";
    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
    button.addEventListener("click", () => {
      filters.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
      renderProjects(category);
    });
    filters.append(button);
  });
  renderProjects();

  const studyCategories = $("#studyCategories");
  data.study.forEach((item) => {
    const card = el("article", "study-category");
    card.append(el("h3", "", item.title), el("p", "", item.description));
    if (item.url) {
      const link = el("a", "", "기록 보기 ↗");
      link.href = item.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      card.append(link);
    }
    studyCategories.append(card);
  });

  const writingList = $("#writingList");
  data.writing.forEach((item) => {
    const row = el("article", "writing-item");
    row.append(el("span", "writing-source", item.source));
    const titleWrapper = item.url ? el("a") : el("div");
    if (item.url) {
      titleWrapper.href = item.url;
      titleWrapper.target = "_blank";
      titleWrapper.rel = "noreferrer";
    }
    titleWrapper.append(el("h3", "", item.title));
    row.append(titleWrapper, el("span", "writing-date", item.date));
    writingList.append(row);
  });

  const contactActions = $("#contactActions");
  if (data.profile.email) {
    const email = el("a", "button", "이메일 보내기");
    email.href = `mailto:${data.profile.email}`;
    contactActions.append(email);
  }
  data.profile.links.filter((item) => item.url).slice(0, 2).forEach((item) => {
    const link = el("a", "button", item.label);
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    contactActions.append(link);
  });
  if (!contactActions.children.length) contactActions.append(el("span", "", "content.js에서 연락처를 설정하세요."));

  const themeToggle = $("#themeToggle");
  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = savedTheme || (systemDark ? "dark" : "light");
  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
  });

  const menuToggle = $("#menuToggle");
  const mobileNav = $("#mobileNav");
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileNav.hidden = isOpen;
  });
  mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.hidden = true;
  }));
})();
