export const profile = {
  user: "silver",
  host: "portfolio",
  path: "~",
  bootLines: [
    "booting artificialsilver.dev...",
    "loading tiny terminal portfolio...",
    "type 'help' to begin.",
  ],
};

export const commandEntries = [
  {
    name: "help",
    description: "사용 가능한 명령어를 보여줍니다.",
    output: [
      "available commands:",
      "",
      "  help        show this message",
      "  about       short introduction",
      "  skills      languages and tools",
      "  projects    selected projects",
      "  contact     contact links",
      "  whoami      print current identity",
      "  clear       clear terminal",
    ],
  },
  {
    name: "about",
    description: "소개를 출력합니다.",
    output: [
      "조은 / artificialsilver",
      "",
      "고려대학교에서 정보보호를 공부하고 있습니다.",
      "보안, 금융 시스템, 웹 프로젝트에 관심이 있습니다.",
    ],
  },
  {
    name: "skills",
    description: "기술 스택을 출력합니다.",
    output: [
      "languages:",
      "  Java, Python, JavaScript, HTML, CSS",
      "",
      "interests:",
      "  security, web, finance security, tiny useful tools",
    ],
  },
  {
    name: "projects",
    description: "프로젝트 목록을 출력합니다.",
    output: [
      "selected projects:",
      "",
      "  artificialsilver.github.io",
      "    terminal-style personal portfolio",
      "",
      "  KU-Timetable-Solver",
      "    timetable helper project",
      "",
      "  ascii-art-forge",
      "    ASCII art project written in Java",
    ],
  },
  {
    name: "contact",
    description: "연락처를 출력합니다.",
    output: [
      "mail:     s1lv3r@korea.ac.kr",
      "github:   https://github.com/artificialsilver",
      "linkedin: https://www.linkedin.com/in/artificialsilver/",
      "velog:    https://velog.io/@s1lv3r/posts",
    ],
  },
  {
    name: "whoami",
    description: "현재 사용자를 출력합니다.",
    output: ["silver"],
  },
];

export const commands = Object.fromEntries(
  commandEntries.map((command) => [command.name, command])
);
