import { commands, profile } from "./commands.js";

const HISTORY_LIMIT = 80;

export function createTerminal(root) {
  const state = {
    input: "",
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
        <label class="prompt" for="terminal-input">${promptText()}</label>
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
  const input = root.querySelector("#terminal-input");

  printLines(output, profile.bootLines, "system");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const rawCommand = input.value.trim();

    if (!rawCommand) {
      printCommand(output, "");
      input.value = "";
      return;
    }

    state.history = [rawCommand, ...state.history].slice(0, HISTORY_LIMIT);
    state.historyIndex = null;
    input.value = "";
    runCommand(output, rawCommand);
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

function runCommand(output, rawCommand) {
  const [name] = rawCommand.toLowerCase().split(/\s+/);
  printCommand(output, rawCommand);

  if (name === "clear") {
    output.innerHTML = "";
    return;
  }

  const command = commands[name];
  if (!command) {
    printLines(output, [
      `command not found: ${rawCommand}`,
      "type 'help' to see available commands.",
    ]);
    return;
  }

  printLines(output, command.output);
}

function printCommand(output, command) {
  const line = document.createElement("div");
  line.className = "terminal-line command-line";
  line.innerHTML = `<span class="prompt">${escapeHtml(promptText())}</span><span>${escapeHtml(command)}</span>`;
  output.append(line);
  scrollToBottom(output);
}

function printLines(output, lines, tone = "normal") {
  const block = document.createElement("div");
  block.className = `terminal-block ${tone}`;

  for (const text of lines) {
    const line = document.createElement("div");
    line.className = "terminal-line";
    line.textContent = text || "\u00a0";
    block.append(line);
  }

  output.append(block);
  scrollToBottom(output);
}

function promptText() {
  return `${profile.user}@${profile.host}:${profile.path}$`;
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
