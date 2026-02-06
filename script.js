const scenes = [...document.querySelectorAll(".scene")];
let index = 0;

/* ---------- INIT ---------- */
scenes[0].classList.add("active");

/* ---------- HEARTS ---------- */
function hearts(count = 16) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4000);
  }
}

/* ---------- SCENE SWITCH ---------- */
function goToScene(i) {
  if (!scenes[i]) return;
  scenes[index].classList.remove("active");
  index = i;
  scenes[index].classList.add("active");
}

function nextScene() {
  hearts(18);
  goToScene(index + 1);
}

/* ---------- GLOBAL NEXT HANDLER (KEY FIX) ---------- */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("next")) {
    nextScene();
  }
});

/* ---------- LOADING BAR (REAL SUSPENSE) ---------- */
const loadingProgress = document.querySelector(".loading .progress");
if (loadingProgress) {
  setTimeout(() => {
    loadingProgress.style.transition = "width 2.8s linear";
    loadingProgress.style.width = "100%";
    setTimeout(() => nextScene(), 3000);
  }, 400);
}

/* ---------- YES / NO ---------- */
const yesBtn = document.getElementById("yesBtn");
if (yesBtn) {
  yesBtn.addEventListener("click", () => {
    hearts(36);
    const yesIndex = scenes.findIndex(s => s.id === "yesScreen");
    goToScene(yesIndex);
  });
}

const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("mouseenter", () => {
    noBtn.style.transform =
      `translate(${(Math.random() * 60) - 30}px, ${(Math.random() * 20) - 10}px)`;
  });
}
