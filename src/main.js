const app = document.getElementById("app");
const yearEl = document.getElementById("year");
const toggle = document.querySelector(".nav-toggle");
const mobileNav = document.getElementById("mobile-nav");
const navLinks = [...document.querySelectorAll(".nav a, .mobile-nav a")];

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const pages = {
  "/": {
    title: "조은",
    eyebrow: "artificialsilver",
    intro:
      "정보보호를 공부하고, 작고 단단한 웹 프로젝트를 만드는 고려대학교 학생입니다.",
    body: `
      <section class="home-hero">
        <div class="hero-copy reveal">
          <p class="eyebrow">안녕하세요, 저는</p>
          <h1>조은</h1>
          <p class="hero-handle">artificialsilver</p>
          <p class="hero-lead">
            고려대학교 정보보호 융합전공 학생이자 금융보안연구실 학부생 연구원입니다.
            이곳에는 소개, 경력, 학력, 기술, 프로젝트를 각각의 페이지로 나누어 담았습니다.
          </p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="#/projects">프로젝트 보기</a>
            <a class="btn btn-ghost" href="#/contact">연락하기</a>
          </div>
        </div>
        <div class="hero-note reveal" aria-label="프로필 요약">
          <span class="note-spark" aria-hidden="true">✦</span>
          <strong>사진 없이도 충분히 나답게</strong>
          <p>하얗고 말랑한 분위기로 정리한 포트폴리오입니다.</p>
        </div>
      </section>
      <section class="category-grid reveal" aria-label="카테고리">
        ${categoryCard("소개", "간단한 소개와 외부 프로필", "/about")}
        ${categoryCard("경력", "연구실 인턴 경험", "/experience")}
        ${categoryCard("학력", "전공과 동아리 활동", "/education")}
        ${categoryCard("기술", "사용하는 언어와 도구", "/skills")}
        ${categoryCard("프로젝트", "GitHub 저장소 일부", "/projects")}
        ${categoryCard("연락", "메일과 프로필 링크", "/contact")}
      </section>
    `,
  },
  "/about": {
    title: "소개",
    eyebrow: "About",
    intro: "정보보호와 웹 개발 사이에서 재미있는 문제를 찾고 있습니다.",
    body: `
      <section class="content-grid">
        <article class="panel reveal">
          <h2>한 줄 소개</h2>
          <p>
            고려대학교 정보보호 융합전공 학생입니다. 보안, 금융 시스템,
            웹 프로젝트에 관심을 두고 천천히 기록을 쌓고 있습니다.
          </p>
        </article>
        <article class="panel reveal">
          <h2>프로필</h2>
          <dl class="info-list">
            <div><dt>활동명</dt><dd>artificialsilver</dd></div>
            <div><dt>지역</dt><dd>대한민국 서울</dd></div>
            <div><dt>동아리</dt><dd>KUCC · 고려대학교 중앙 컴퓨터 동아리</dd></div>
          </dl>
        </article>
      </section>
      <div class="link-row reveal">
        <a class="btn btn-primary" href="https://github.com/artificialsilver" rel="noopener noreferrer">GitHub</a>
        <a class="btn btn-ghost" href="https://velog.io/@s1lv3r/posts" rel="noopener noreferrer">Velog</a>
      </div>
    `,
  },
  "/experience": {
    title: "경력",
    eyebrow: "Experience",
    intro: "연구실에서 배우고 실험하며 쌓아가는 경험입니다.",
    body: `
      <ol class="timeline reveal">
        ${timelineItem("2026년 1월 - 현재", "학부생 연구원 · 인턴", "고려대학교 정보보호대학원 금융보안연구실", "대한민국 서울 · 대면 근무")}
        ${timelineItem("2025년 7월 - 2025년 8월", "학부생 연구원 · 인턴", "Korea University 네트워크 및 보안 연구실", "대면 근무")}
      </ol>
    `,
  },
  "/education": {
    title: "학력",
    eyebrow: "Education",
    intro: "고려대학교에서 정보보호를 중심으로 공부하고 있습니다.",
    body: `
      <section class="panel reveal">
        <h2>Korea University · 고려대학교</h2>
        <p class="large-text">학사, 정보보호 융합전공</p>
        <p class="muted">2023년 3월 - 2028년 2월 예정</p>
      </section>
      <section class="panel soft-panel reveal">
        <h2>동아리 · 학회</h2>
        <p><strong>KUCC</strong> · 고려대학교 중앙 컴퓨터 동아리</p>
      </section>
    `,
  },
  "/skills": {
    title: "기술 스택",
    eyebrow: "Skills",
    intro: "지금 다루고 있거나 꾸준히 쓰는 기술입니다.",
    body: `
      <ul class="skill-tags reveal">
        <li>Java</li>
        <li>Python</li>
        <li>HTML</li>
        <li>JavaScript</li>
      </ul>
    `,
  },
  "/projects": {
    title: "프로젝트",
    eyebrow: "Projects",
    intro: "GitHub에 올라온 저장소 중 일부입니다.",
    body: `
      <section class="project-grid">
        ${projectCard("artificialsilver.github.io", "GitHub Pages로 호스팅하는 개인 사이트·포트폴리오 저장소입니다.", "GitHub Pages", "https://github.com/artificialsilver/artificialsilver.github.io")}
        ${projectCard("KU-Timetable-Solver", "고려대 수업 시간표를 다루는 HTML 기반 프로젝트입니다.", "HTML", "https://github.com/artificialsilver/KU-Timetable-Solver")}
        ${projectCard("ascii-art-forge", "Java로 만든 ASCII 아트 관련 프로젝트입니다.", "Java", "https://github.com/artificialsilver/ascii-art-forge")}
      </section>
    `,
  },
  "/contact": {
    title: "연락",
    eyebrow: "Contact",
    intro: "필요한 곳으로 편하게 연락하실 수 있습니다.",
    body: `
      <section class="contact-panel reveal">
        <a class="btn btn-primary btn-lg" href="mailto:s1lv3r@korea.ac.kr">s1lv3r@korea.ac.kr</a>
        <a class="btn btn-ghost btn-lg" href="https://www.linkedin.com/in/artificialsilver/" rel="noopener noreferrer">LinkedIn</a>
        <a class="btn btn-ghost btn-lg" href="https://github.com/artificialsilver" rel="noopener noreferrer">GitHub</a>
        <a class="btn btn-ghost btn-lg" href="https://velog.io/@s1lv3r/posts" rel="noopener noreferrer">Velog</a>
      </section>
    `,
  },
};

function categoryCard(title, text, path) {
  return `
    <a class="category-card" href="#${path}">
      <span aria-hidden="true">✧</span>
      <strong>${title}</strong>
      <small>${text}</small>
    </a>
  `;
}

function timelineItem(period, title, org, meta) {
  return `
    <li class="timeline-item">
      <div class="timeline-dot" aria-hidden="true"></div>
      <article class="panel timeline-card">
        <p class="muted">${period}</p>
        <h2>${title}</h2>
        <p>${org}</p>
        <small>${meta}</small>
      </article>
    </li>
  `;
}

function projectCard(title, text, tag, url) {
  return `
    <article class="project-card reveal">
      <span class="project-tag">${tag}</span>
      <h2>${title}</h2>
      <p>${text}</p>
      <a class="text-link" href="${url}" rel="noopener noreferrer">저장소 보기</a>
    </article>
  `;
}

function getPath() {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  return pages[raw] ? raw : "/";
}

function setActiveNav(path) {
  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${path}`;
    link.toggleAttribute("aria-current", isActive);
  });
}

function revealOnLoad() {
  const revealEls = document.querySelectorAll(".reveal");
  requestAnimationFrame(() => {
    revealEls.forEach((el, index) => {
      window.setTimeout(() => el.classList.add("is-visible"), index * 55);
    });
  });
}

function render() {
  const path = getPath();
  const page = pages[path];

  app.innerHTML = `
    <section class="page-shell">
      <div class="page-heading reveal">
        <p class="eyebrow">${page.eyebrow}</p>
        <h1>${page.title}</h1>
        <p>${page.intro}</p>
      </div>
      ${page.body}
    </section>
  `;

  document.title = `${page.title} · artificialsilver`;
  setActiveNav(path);
  revealOnLoad();
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "instant" });
}

if (toggle && mobileNav) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    toggle.setAttribute("aria-label", open ? "메뉴 열기" : "메뉴 닫기");
    mobileNav.hidden = open;
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "메뉴 열기");
      mobileNav.hidden = true;
    });
  });
}

window.addEventListener("hashchange", render);
render();
