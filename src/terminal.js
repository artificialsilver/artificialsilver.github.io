import { commands, profile } from "./commands.js";

const HISTORY_LIMIT = 80;

export function createTerminal(root) {
  const state = {
    user: null,
    history: [],
    historyIndex: null,
  };

  root.innerHTML = `
    <section class="terminal-shell">
      <div class="terminal-topbar" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <div class="terminal-screen" id="terminal-output" aria-live="polite"></div>
      <form class="terminal-input-row" id="terminal-form" autocomplete="off">
        <label class="prompt" for="terminal-input">${promptText(state)}</label>
        <input
          id="terminal-input"
          name="command"
          type="text"
          spellcheck="false"
          autocapitalize="off"
          autocomplete="off"
          aria-label="명령어 입력"
        />
      </form>
    </section>
  `;

  const output = root.querySelector("#terminal-output");
  const form = root.querySelector("#terminal-form");
  const prompt = root.querySelector(".terminal-input-row .prompt");
  const input = root.querySelector("#terminal-input");

  printLines(output, profile.bootLines, state, "system");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const rawInput = input.value.trim();

    if (!rawInput) {
      printCommand(output, "", state);
      input.value = "";
      return;
    }

    if (!state.user) {
      input.value = "";
      attemptLogin(output, prompt, rawInput, state);
      return;
    }

    state.history = [rawInput, ...state.history].slice(0, HISTORY_LIMIT);
    state.historyIndex = null;
    input.value = "";
    runCommand(output, prompt, rawInput, state);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!state.history.length) return;
      state.historyIndex =
        state.historyIndex === null
          ? 0
          : Math.min(state.historyIndex + 1, state.history.length - 1);
      input.value = state.history[state.historyIndex];
      moveCursorToEnd(input);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (state.historyIndex === null) return;
      state.historyIndex -= 1;
      input.value =
        state.historyIndex >= 0 ? state.history[state.historyIndex] : "";
      if (state.historyIndex < 0) state.historyIndex = null;
      moveCursorToEnd(input);
    }
  });

  root.addEventListener("click", () => input.focus());
  input.focus();
}

function attemptLogin(output, prompt, rawName, state) {
  printLogin(output, rawName);

  const name = normalizeName(rawName);
  if (!name) {
    printLines(output, ["login failed: enter at least one visible character."], state);
    return;
  }

  if (profile.reservedUsers.includes(name.toLowerCase())) {
    printLines(output, [
      `login denied: '${name}' is a reserved user.`,
      "try another name.",
    ], state);
    return;
  }

  state.user = name;
  prompt.textContent = promptText(state);
  printLines(output, [
    `welcome, ${name}.`,
    "type 'help' to begin.",
  ], state, "system");
}

function runCommand(output, prompt, rawCommand, state) {
  const [name] = rawCommand.toLowerCase().split(/\s+/);
  printCommand(output, rawCommand, state);

  if (name === "clear") {
    output.innerHTML = "";
    return;
  }

  const command = commands[name];
  if (!command) {
    printLines(output, [
      `command not found: ${rawCommand}`,
      "type 'help' to see available commands.",
    ], state);
    return;
  }

  printLines(output, command.output, state);

  if (name === "logout") {
    state.user = null;
    state.historyIndex = null;
    prompt.textContent = promptText(state);
  }
}

function printLogin(output, name) {
  const line = document.createElement("div");
  line.className = "terminal-line command-line";
  line.innerHTML = `<span class="prompt">${escapeHtml(promptText({ user: null }))}</span><span>${escapeHtml(name)}</span>`;
  output.append(line);
  scrollToBottom(output);
}

function printCommand(output, command, state) {
  const line = document.createElement("div");
  line.className = "terminal-line command-line";
  line.innerHTML = `<span class="prompt">${escapeHtml(promptText(state))}</span><span>${escapeHtml(command)}</span>`;
  output.append(line);
  scrollToBottom(output);
}

function printLines(output, lines, state, tone = "normal") {
  const block = document.createElement("div");
  block.className = `terminal-block ${tone}`;

  for (const text of lines) {
    const line = document.createElement("div");
    line.className = "terminal-line";
    line.textContent = formatLine(text, state) || "\u00a0";
    block.append(line);
  }

  output.append(block);
  scrollToBottom(output);
}

function promptText(state) {
  if (!state.user) {
    return `${profile.system} login:`;
  }

  return `${state.user}@${profile.system}:${profile.path}$`;
}

function normalizeName(name) {
  return name.replace(/\s+/g, "-").slice(0, 24);
}

function formatLine(text, state) {
  return text
    .replaceAll("{user}", state.user || "guest")
    .replaceAll("{system}", profile.system)
    .replaceAll("{path}", profile.path);
}

function scrollToBottom(output) {
  output.scrollTop = output.scrollHeight;
}

function moveCursorToEnd(input) {
  requestAnimationFrame(() => {
    input.selectionStart = input.value.length;
    input.selectionEnd = input.value.length;
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
