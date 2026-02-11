let current = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function updateDots() {
  dots.forEach((d, i) => {
    d.classList.toggle("active", i === current);
  });
}

function nextSlide() {
  slides[current].classList.remove("active");
  current++;
  slides[current].classList.add("active");
  updateDots();
}

function nextSlideWithDelay(btn) {
  btn.innerText = "Just a sec…";
  btn.disabled = true;

  setTimeout(() => {
    btn.innerText = "Continue";
    btn.disabled = false;
    nextSlide();
  }, 400);
}

function yes() {
  slides[current].classList.remove("active");
  document.getElementById("yes-slide").classList.add("active");
}

function notYet() {
  window.location.href = "https://open.spotify.com/track/0TL0LFcwIBF5eX7arDIKxY?si=lt7r0FKvQJq1tzJK17xKDg";
}

/* Floating hearts */
setInterval(() => {
  const heart = document.createElement("span");
  heart.textContent = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 12000);
}, 900);
