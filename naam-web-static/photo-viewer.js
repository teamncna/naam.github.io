// photo-viewer.js — pan/zoom widget for the family photo banner.
// Wraps an <img> inside a .photo-viewer container; supports mouse drag,
// trackpad/mouse wheel zoom (including pinch, which browsers report as a
// ctrl-modified wheel event), and external +/-/reset button hookups.

function createPhotoViewer(container) {
  const img = container.querySelector("img");
  if (!img) return null;

  const MIN_SCALE = 1;
  const MAX_SCALE = 4;
  let scale = 1;
  let tx = 0;
  let ty = 0;
  let panning = false;
  let startX = 0;
  let startY = 0;
  let startTx = 0;
  let startTy = 0;

  function apply() {
    img.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;
    container.classList.toggle("can-pan", scale > MIN_SCALE);
  }

  function setScale(next) {
    scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    if (scale === MIN_SCALE) {
      tx = 0;
      ty = 0;
    }
    apply();
  }

  container.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      setScale(scale * factor);
    },
    { passive: false }
  );

  container.addEventListener("pointerdown", (e) => {
    if (scale <= MIN_SCALE) return;
    panning = true;
    container.classList.add("panning");
    startX = e.clientX;
    startY = e.clientY;
    startTx = tx;
    startTy = ty;
    container.setPointerCapture(e.pointerId);
  });

  container.addEventListener("pointermove", (e) => {
    if (!panning) return;
    tx = startTx + (e.clientX - startX);
    ty = startTy + (e.clientY - startY);
    apply();
  });

  function endPan() {
    panning = false;
    container.classList.remove("panning");
  }
  container.addEventListener("pointerup", endPan);
  container.addEventListener("pointercancel", endPan);
  container.addEventListener("pointerleave", endPan);

  // Reset the view whenever a new photo is loaded into this viewer.
  img.addEventListener("load", () => setScale(MIN_SCALE));

  apply();

  return {
    zoomIn: () => setScale(scale * 1.25),
    zoomOut: () => setScale(scale * 0.8),
    reset: () => setScale(MIN_SCALE),
  };
}

window.initPhotoViewer = createPhotoViewer;
