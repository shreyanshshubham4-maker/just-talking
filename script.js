/* =========================
   MASTER VALENTINE JS
   Scene-based • No Scroll • Bulletproof Init
========================= */

let scenes = [];
let current = 0;

function showScene(index) {
  if (!scenes.length) return;

  current = Math.max(0, Math.min(index, scenes.length - 1));
  scenes.forEach((s, i) => s.classList.toggle("is-active", i === current));
}

function nextScene() {
  showScene(current + 1);
}

/* Called by your HTML Continue button */
function startExperience() {
  nextScene();
  startHeartsOnce();
}

/* Called by YES button */
function sayYes() {
  const yesScene = document.getElementById("yesScreen");
  const idx = scenes.indexOf(yesScene);
  if (idx !== -1) showScene(idx);
  burstHearts(30);
}

/* NO button dodge */
function setupNoButton() {
  const noBtn = document.getElementById("noBtn");
  const btnWrap = document.querySelector(".buttons");
  if (!noBtn || !btnWrap) return;

  const dodge = () => {
    const w = btnWrap.offsetWidth / 2;
    const x = (Math.random() * 2 - 1) * w;
    const y = (Math.random() * 2 - 1) * 24;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  };

  noBtn.addEventListener("mouseenter", dodge);
  noBtn.addEventListener("touchstart", dodge, { passive: true });
}

/* Add Next buttons automatically */
function addNextButtons() {
  scenes.forEach((scene, i) => {
    if (i === scenes.length - 1) return;
    if (scene.classList.contains("question")) return;
    if (scene.id === "yesScreen") return;

    // Prevent duplicates
    if (scene.querySelector(".next-btn")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = "Next →";
    btn.className = "next-btn";
    btn.addEventListener("click", nextScene);
    scene.appendChild(btn);
  });
}

/* Hearts */
function createHeart(dx = 0) {
  const h = document.createElement("div");
  h.className = "heart";
  h.style.left = Math.random() * 100 + "vw";
  h.style.setProperty("--dx", dx + "px");
  h.style.setProperty("--dur", (5 + Math.random() * 3) + "s");
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 9000);
}

function startHearts() {
  setInterval(() => createHeart(Math.random() * 300 - 150), 600);
}

function burstHearts(n = 12) {
  for (let i = 0; i < n; i++) createHeart(Math.random() * 500 - 250);
}

function startHeartsOnce() {
  if (window.__heartsStarted) return;
  window.__heartsStarted = true;
  startHearts();
}

/* Init (runs safely whether DOM is ready or already loaded) */
function init() {
  scenes = Array.from(document.querySelectorAll("section"));
  if (!scenes.length) return;

  addNextButtons();
  setupNoButton();

  // Force show first scene always
  showScene(0);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
