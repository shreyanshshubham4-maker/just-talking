const scenes = [...document.querySelectorAll(".scene")];
let index = 0;

/* INIT */
scenes[0].classList.add("active");

/* HEART BURST */
function hearts(count = 16) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 4000);
  }
}

/* NEXT SLIDE */
function next() {
  hearts(18);
  scenes[index].classList.remove("active");
  index++;
  if (scenes[index]) scenes[index].classList.add("active");
}

/* NEXT BUTTONS */
document.querySelectorAll(".next").forEach(btn =>
  btn.addEventListener("click", next)
);

/* LOADING BAR AUTO-ADVANCE */
const loading = document.querySelector(".loading .progress");
if (loading) {
  setTimeout(() => {
    loading.style.transition = "width 2.8s linear";
    loading.style.width = "100%";
    setTimeout(next, 3000);
  }, 400);
}

/* YES / NO */
const yesBtn = document.getElementById("yesBtn");
if (yesBtn) yesBtn.onclick = () => {
  hearts(30);
  scenes[index].classList.remove("active");
  scenes.find(s => s.id === "yesScreen").classList.add("active");
};

const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.onmouseenter = () => {
    noBtn.style.transform =
      `translate(${(Math.random()*60)-30}px, ${(Math.random()*20)-10}px)`;
  };
}
