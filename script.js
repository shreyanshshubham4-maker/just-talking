/* =========================
   MASTER VALENTINE JS
   Scene-based • No Scroll
========================= */

let scenes = [];
let current = 0;

/* ===== Scene Control ===== */
function showScene(index) {
  current = Math.max(0, Math.min(index, scenes.length - 1));
  scenes.forEach((s, i) => {
    s.classList.toggle("is-active", i === current);
  });
}

function nextScene() {
  showScene(current + 1);
}

/* Called by your HTML button */
function startExperience() {
  nextScene();
  startHeartsOnce();
}

/* YES button */
function sayYes() {
  const yesScene = document.getElementById("yesScreen");
  const idx = scenes.findIndex(s => s === yesScene);
  if (idx !== -1) showScene(idx);
  burstHearts(30);
}

/* ===== NO Button Dodge ===== */
const noBtn = document.getElementById("noBtn");
const btnWrap = document.querySelector(".buttons");

if (noBtn && btnWrap) {
  const dodge = () => {
    const w = btnWrap.offsetWidth / 2;
    const x = (Math.random() * 2 - 1) * w;
    const y = (Math.random() * 2 - 1) * 24;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
  };

  noBtn.addEventListener("mouseenter", dodge);
  noBtn.addEventListener("touchstart", dodge, { passive: true });
}

/* ===== Auto Next Buttons ===== */
function addNextButtons() {
  scenes.forEach((scene, i) => {
    if (i === scenes.length - 1) return;
    if (scene.classList.contains("question")) return;
    if (scene.id === "yesScreen") return;

    const btn = document.createElement("button");
    btn.textContent = "Next →";
    btn.className = "next-btn";
    btn.onclick = nextScene;
    scene.appendChild(btn);
  });
}

/* ===== Hearts ===== */
function createHeart(dx = 0) {
  const h = document.createElement("div");
  h.className = "heart";
  h.style.left = Math.random() * 100 + "vw";
  h.style.setProperty("--dx", dx + "px");
  h.style.setProperty("--dur", 5 + Math.random() * 3 + "s");
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 8000);
}

function startHearts() {
  setInterval(() => createHeart(Math.random() * 300 - 150), 600);
}

function burstHearts(n = 12) {
  for (let i = 0; i < n; i++) {
    createHeart(Math.random() * 500 - 250);
  }
}

function startHeartsOnce() {
  if (window.__hearts) return;
  window.__hearts = true;
  startHearts();
}

/* ===== Init ===== */
document.addEventListener("DOMContentLoaded", () => {
  scenes = Array.from(document.querySelectorAll("section"));
  addNextButtons();
  showScene(0);
});
