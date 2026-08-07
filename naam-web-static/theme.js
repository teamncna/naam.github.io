// theme.js - dark/light theme persistence + toggle button wiring

(function applyStoredTheme() {
  const stored = localStorage.getItem("theme");
  const theme = stored === "light" || stored === "dark" ? stored : "dark";
  document.documentElement.setAttribute("data-theme", theme);
})();

const SUN_ICON = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7"/></svg>`;
const MOON_ICON = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.7 6.7 0 0 0 10.5 10.5Z"/></svg>`;

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

function initThemeToggle(buttonEl) {
  if (!buttonEl) return;

  function render() {
    const theme = currentTheme();
    buttonEl.innerHTML = theme === "dark" ? SUN_ICON : MOON_ICON;
    buttonEl.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
    buttonEl.setAttribute("title", buttonEl.getAttribute("aria-label"));
  }

  render();
  buttonEl.addEventListener("click", () => {
    setTheme(currentTheme() === "dark" ? "light" : "dark");
    render();
  });
}

window.initThemeToggle = initThemeToggle;
