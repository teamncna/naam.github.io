// common.js - shared utilities & constants for all pages

const SUPABASE_URL = "https://wiumkdcqcuzplvlvkuib.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpdW1rZGNxY3V6cGx2bHZrdWliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4MjE1ODAsImV4cCI6MjA5NjM5NzU4MH0.n5ciVetR3wlN8Zgit54qhG9cEX19pVGxjzJ6QT0fn_A";
const SUPABASE_API_URL = `${SUPABASE_URL}/functions/v1/api`;

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function getSession() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();
  return session;
}

function isLoggedIn() {
  return Boolean(localStorage.getItem("userId"));
}

async function requireLogin() {
  const session = await getSession();
  if (!session?.access_token) {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    alert("Please sign in first.");
    window.location.href = "login.html";
  }
}

async function apiFetch(path, options = {}) {
  const session = await getSession();
  if (!session?.access_token) {
    window.location.href = "login.html";
    throw new Error("Missing Supabase session");
  }

  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${session.access_token}`,
    ...(options.headers || {}),
  };

  return fetch(`${SUPABASE_API_URL}${path}`, {
    ...options,
    headers,
  });
}

async function apiJson(path, options = {}) {
  const response = await apiFetch(path, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || `Supabase API error ${response.status}`);
  }
  return data;
}

async function signOut() {
  await supabaseClient.auth.signOut();
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userName");
  window.location.href = "login.html";
}

function escapeHtml(s) {
  return String(s || "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])
  );
}

function getPhotoUrl(memberOrPhotoLink) {
  if (
    memberOrPhotoLink &&
    typeof memberOrPhotoLink === "object" &&
    memberOrPhotoLink.photo_signed_url
  ) {
    return memberOrPhotoLink.photo_signed_url;
  }

  if (typeof memberOrPhotoLink === "string" && memberOrPhotoLink.startsWith("http")) {
    return memberOrPhotoLink;
  }

  return "assets/default-profile.jpeg";
}

window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
window.SUPABASE_API_URL = SUPABASE_API_URL;
window.supabaseClient = supabaseClient;
window.getSession = getSession;
window.isLoggedIn = isLoggedIn;
window.requireLogin = requireLogin;
window.apiFetch = apiFetch;
window.apiJson = apiJson;
window.signOut = signOut;
window.escapeHtml = escapeHtml;
window.getPhotoUrl = getPhotoUrl;
