export const profile = {
  system: "silversystem",
  path: "~",
  reservedUsers: ["root", "silver"],
  bootLines: [
    "booting artificialsilver.dev...",
    "loading silversystem login shell...",
    "enter your name to continue.",
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
      "  papers      paper list",
      "  contact     contact links",
      "  whoami      print current identity",
      "  logout      return to login prompt",
      "  clear       clear terminal",
    ],
  },
  {
    name: "about",
    description: "소개를 출력합니다.",
    output: [
      "조은 / artificialsilver",
      "",
      "고려대학교에서 정보보호를 공부하고 있습니다."
    ],
  },
  {
    name: "skills",
    description: "기술 스택을 출력합니다.",
    output: [
      "저는 할 줄 아는 게 없어요!",
      "I don't know how to do anything"
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
    name: "papers",
    description: "논문 목록을 출력합니다.",
    output: [
      "papers:",
      "",
      "  한국정보보호학회 2026 하계학술대회",
      "    EIP-7702 스폰서 기반 위임 철회 메커니즘 설계",
    ],
  },
  {
    name: "whoami",
    description: "현재 사용자를 출력합니다.",
    output: ["{user}@{system}"],
  },
  {
    name: "logout",
    description: "로그인 화면으로 돌아갑니다.",
    output: ["logging out {user}..."],
  },
];

export const commands = Object.fromEntries(
  commandEntries.map((command) => [command.name, command])
);
