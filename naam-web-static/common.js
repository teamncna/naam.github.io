// common.js - shared utilities & constants for all pages

function isLoggedIn() {
  const userId = localStorage.getItem("userId");
  return Boolean(userId);
}

function requireLogin() {
  if (!isLoggedIn()) {
    alert("Please sign in with Google first.");
    window.location.href = "login.html";
  }
}

window.isLoggedIn = isLoggedIn;
window.requireLogin = requireLogin;

// ✅ Use Cloudinary base URL for member photos
const PHOTO_BASE_URL =
  "https://res.cloudinary.com/dp9lcdlgk/image/upload/peopleImages/";

// very small helper functions used in templates
function escapeHtml(s) {
  return String(s || "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

// Helper to get full photo URL (handles missing photo_link gracefully)
function getPhotoUrl(photo_link) {
  if (!photo_link || photo_link.trim() === "") {
    return "/assets/default-profile.jpeg"; // fallback placeholder in your project
  }
  return `${PHOTO_BASE_URL}${encodeURIComponent(photo_link)}`;
}

// Expose to global (used in templates)
window.escapeHtml = escapeHtml;
window.getPhotoUrl = getPhotoUrl;
window.PHOTO_BASE_URL = PHOTO_BASE_URL;
