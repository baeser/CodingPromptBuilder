/* Classroom Code Prompt Builder — Treetown AI */

(function () {
  "use strict";

  const ids = [
    "userRole",
    "aiRole",
    "appIdea",
    "repoUrl",
    "contextDetails",
    "mustHaves",
  ];

  const outputEl = document.getElementById("promptOutput");
  const copyBtn = document.getElementById("copyBtn");
  const copyFeedback = document.getElementById("copyFeedback");

  /* ---- Build the prompt string ---- */
  function buildPrompt() {
    const v = {};
    ids.forEach((id) => {
      v[id] = document.getElementById(id).value.trim();
    });

    const anyFilled = ids.some((id) => v[id]);

    if (!anyFilled) {
      outputEl.innerHTML =
        '<span class="placeholder-text">Start filling in the sections on the left and your prompt will appear here...</span>';
      return;
    }

    const parts = [];

    // Opening — who I am + what I need (natural lead-in)
    if (v.userRole && v.aiRole) {
      parts.push(
        `I'm a ${v.userRole}. I'd like you to act as ${v.aiRole}.`
      );
    } else if (v.userRole) {
      parts.push(`I'm a ${v.userRole} and I need your help building a classroom tool.`);
    } else if (v.aiRole) {
      parts.push(`I'd like you to act as ${v.aiRole}.`);
    }

    // The ask — what to build
    if (v.appIdea) {
      parts.push(
        `Here's what I need you to build:\n\n${v.appIdea}\n\nPlease make this a simple, browser-based app using HTML, CSS, and JavaScript that works on school devices like Chromebooks and iPads.`
      );
    }

    // Repo
    if (v.repoUrl) {
      parts.push(
        `The GitHub repo for this project is: ${v.repoUrl}\nPlease structure the code for that repo with an index.html as the entry point.`
      );
    }

    // Context — classroom details woven in naturally
    if (v.contextDetails) {
      parts.push(
        `Here's some context about my classroom and students:\n\n${v.contextDetails}`
      );
    }

    // Must-haves
    if (v.mustHaves) {
      parts.push(
        `The tool must include the following:\n\n${v.mustHaves}`
      );
    }

    // Closing guidelines — conversational, not a bulleted config file
    parts.push(
      `A few more things: keep the interface clean and student-friendly with large, readable text and clear buttons. It should work well on both laptops and tablets. Don't require any external accounts or logins unless I specifically asked for them. And please include brief code comments so I can understand and customize it later.`
    );

    outputEl.textContent = parts.join("\n\n");
  }

  /* ---- Copy to clipboard ---- */
  function copyPrompt() {
    const text = outputEl.textContent;
    if (!text) return;

    navigator.clipboard.writeText(text).then(
      () => showFeedback("Copied! Paste it into your AI coding assistant."),
      () => showFeedback("Copy failed — try selecting the text manually.")
    );
  }

  function showFeedback(msg) {
    copyFeedback.textContent = msg;
    setTimeout(() => {
      copyFeedback.textContent = "";
    }, 3500);
  }

  /* ---- Wire up events ---- */
  ids.forEach((id) => {
    document.getElementById(id).addEventListener("input", buildPrompt);
  });

  copyBtn.addEventListener("click", copyPrompt);

  /* Initial render */
  buildPrompt();
})();
