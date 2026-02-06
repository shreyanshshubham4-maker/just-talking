/* =========================
   Scene navigation + heart bursts
========================= */

const scenes = Array.from(document.querySelectorAll(".scene"));
let current = 0;

function showScene(i) {
  if (!scenes.length) return;
  current = Math.max(0, Math.min(i, scenes.length - 1));
  scenes.forEach((s, idx) => s.classList.toggle("is-active", idx === current));
}

function burstHearts(n = 14) {
  for (let i = 0; i < n; i++) {
    const h = document.createElement("div");
    h.className = "heart";

    const left = 20 + Math.random() * 60;
    const dx = (Math.random() * 2 - 1) * 320;
    const dur = 3.8 + Math.random() * 1.8;

    h.style.left = `${left}vw`;
    h.style.setProperty("--dx", `${dx}px`);
    h.style.setProperty("--dur", `${dur}s`);

    document.body.appendChild(h);
    setTimeout(() => h.remove(), (dur + 0.3) * 1000);
  }
}

function nextScene() {
  burstHearts(18);
  showScene(current + 1);
}

function goToYes() {
  burstHearts(34);
  const yesIndex = scenes.findIndex(s => s.id === "yesScreen");
  if (yesIndex >= 0) showScene(yesIndex);
}

function restart() {
  burstHearts(22);
  showScene(0);
}

function setupButtons() {
  // Every .next goes to next scene + heart burst
  document.querySelectorAll("button.next").forEach(btn => {
    btn.addEventListener("click", nextScene);
  });

  // YES
  const yesBtn = document.getElementById("yesBtn");
  if (yesBtn) yesBtn.addEventListener("click", goToYes);

  // NO dodges
  const noBtn = document.getElementById("noBtn");
  const wrap = document.querySelector(".buttons");
  if (noBtn && wrap) {
    const dodge = () => {
      const maxX = (wrap.offsetWidth - noBtn.offsetWidth) / 2;
      const x = (Math.random() * 2 - 1) * maxX;
      const y = (Math.random() * 2 - 1) * 24;
      noBtn.style.transform = `translate(${x}px, ${y}px)`;
    };
    noBtn.addEventListener("mouseenter", dodge);
    noBtn.addEventListener("touchstart", dodge, { passive: true });
    noBtn.addEventListener("click", () => { burstHearts(10); dodge(); });
  }

  // Replay
  const restartBtn = document.querySelector("button.restart");
  if (restartBtn) restartBtn.addEventListener("click", restart);
}

function init() {
  setupButtons();
  showScene(0);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
