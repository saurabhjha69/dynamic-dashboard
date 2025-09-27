function initWatermark() {
  const wm = document.createElement("div");
  wm.innerText = "© Saurabh Jha 2025";
  wm.style.position = "fixed";
  wm.style.bottom = "5px";
  wm.style.right = "5px";
  wm.style.opacity = "0.5";
  wm.style.pointerEvents = "none"; // don’t block UI
  document.body.appendChild(wm);
}
initWatermark();