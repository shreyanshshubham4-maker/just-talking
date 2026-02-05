function startExperience() {
  document.getElementById("recap")
    .scrollIntoView({ behavior: "smooth" });
}

const noBtn = document.getElementById("noBtn");

noBtn.addEventListener("mouseover", () => {
  const x = Math.random() * 240 - 120;
  const y = Math.random() * 120 - 60;
  const rot = Math.random() * 40 - 20;

  noBtn.style.transform =
    `translate(${x}px, ${y}px) rotate(${rot}deg)`;
});

noBtn.addEventListener("click", () => {
  noBtn.innerText = "Nice try.";
  noBtn.style.transform += " rotate(90deg)";
});

function sayYes() {
  document.querySelector(".question").style.display = "none";
  document.getElementById("yesScreen")
    .classList.remove("hidden");

  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}
