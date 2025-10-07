// common.js - shared utilities & constants for all pages

function isLoggedIn() {
  const userId = localStorage.getItem("userId");
  return Boolean(userId);
}

function requireLogin() {
  if (!isLoggedIn()) {
    alert("Please sign in first.");
    window.location.href = "login.html";
  }
}

window.isLoggedIn = isLoggedIn;
window.requireLogin = requireLogin;

// small helper functions used in templates
function escapeHtml(s) {
  return String(s || "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

// ✅ Base URL for member photos on Render disk
const PHOTO_BASE_URL =
  "https://namma-ooru-backend-q34n.onrender.com/assets/peopleImages/";

// Helper to get full photo URL (handles missing photo_link gracefully)
function getPhotoUrl(photoLink) {
  if (!photoLink || photoLink === "") return "/assets/default-profile.jpeg";

  // If it's already a full URL
  if (photoLink.startsWith("http")) return photoLink;

  let filename = photoLink;

  // Remove /peopleImages/ or peopleImages/ if it's already in the filename
  filename = filename.replace(/^\/?(peopleImages\/)+/i, "");

  // Normalize .jpeg to .jpg (since server only has .jpg files)
  filename = filename.replace(/\.jpeg$/i, ".jpg");

  // If it still doesn't have an extension, add .jpg
  if (!filename.match(/\.(jpg|png|gif)$/i)) {
    filename += ".jpg";
  }

  return PHOTO_BASE_URL + filename;
}
// Expose to global
window.escapeHtml = escapeHtml;
window.getPhotoUrl = getPhotoUrl;
window.PHOTO_BASE_URL = PHOTO_BASE_URL;
