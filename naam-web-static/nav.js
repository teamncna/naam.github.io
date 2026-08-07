// nav.js - single source of truth for the site header/footer (all authenticated pages)

const NAV_LINKS = [
  { key: "landing", href: "landing.html", label: "Home" },
  { key: "members", href: "members.html", label: "Members" },
  { key: "analytics", href: "analytics.html", label: "Analytics" },
  { key: "profile", href: "profile.html", label: "Profile" },
];

function renderHeader(activeKey) {
  const mount = document.getElementById("app-header");
  if (!mount) return;

  const linksHtml = NAV_LINKS.map(
    (link) =>
      `<a href="${link.href}"${
        link.key === activeKey ? ' class="active"' : ""
      }>${link.label}</a>`
  ).join("");

  mount.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a href="landing.html" class="brand">NAAM</a>
        <button id="navToggle" class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <nav id="siteNav" class="nav">${linksHtml}</nav>
        <div class="header-actions">
          <button id="themeToggle" class="icon-btn" type="button"></button>
          <button id="logoutBtn" class="btn outline small" type="button">Logout</button>
        </div>
      </div>
      <div class="tile-rule"></div>
    </header>
  `;

  window.initThemeToggle(document.getElementById("themeToggle"));

  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to sign out?")) {
      window.signOut();
    }
  });
}

function renderFooter() {
  const mount = document.getElementById("app-footer");
  if (!mount) return;
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="tile-rule"></div>
      <div class="container">
        <p>&copy; 2026 Northern California Nagaratharas Association.</p>
      </div>
    </footer>
  `;
}

window.renderHeader = renderHeader;
window.renderFooter = renderFooter;
