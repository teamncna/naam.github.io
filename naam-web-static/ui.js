// ui.js - shared in-site UI primitives (confirm modal, etc.)
// `message` is inserted as HTML — callers must escapeHtml() any
// user-provided text they interpolate into it.
function showConfirmModal(message, opts = {}) {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
      <div class="modal-card">
        <p class="modal-message">${message}</p>
        <div class="modal-actions">
          <button type="button" class="btn subtle" data-action="cancel">${
            opts.cancelText || "Cancel"
          }</button>
          <button type="button" class="btn" data-action="confirm">${
            opts.confirmText || "Yes, I'm sure"
          }</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    function cleanup(result) {
      overlay.remove();
      resolve(result);
    }

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) cleanup(false);
    });
    overlay
      .querySelector('[data-action="cancel"]')
      .addEventListener("click", () => cleanup(false));
    overlay
      .querySelector('[data-action="confirm"]')
      .addEventListener("click", () => cleanup(true));
  });
}

window.showConfirmModal = showConfirmModal;
