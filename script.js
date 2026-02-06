// --- Smooth start: scroll + kick off effects ---
function startExperience() {
  const recap = document.getElementById("recap");
  recap.scrollIntoView({ behavior: "smooth", block: "start" });

  // Start hearts once user interacts (better for performance + feels intentional)
  if (!window.__heartsStarted) {
    window.__heartsStarted = true;
    startHearts();
  }
}

// --- YES flow ---
function sayYes() {
  const q = document.querySelector(".question");
  const yes = document.getElementById("yesScreen");

  if (q) q.style.display = "none";
  if (yes) yes.classList.remove("hidden");

  yes.scrollIntoView({ behavior: "smooth", block: "start" });

  // make it EXTRA when she says yes
  burstHearts(26);
}

// --- NO button dodge (dramatic + not annoying on mobile) ---
const noBtn = document.getElementById("noBtn");
const buttonsWrap = document.querySelector(".buttons");

if (noBtn && buttonsWrap) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const dodge = () => {
    if (prefersReducedMotion) return;

    const wrapRect = buttonsWrap.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // keep movement inside the button wrapper area
    const maxX = (wrapRect.width - btnRect.width) / 2;
    const maxY = 26;

    const x = (Math.random() * 2 - 1) * maxX;
    const y = (Math.random() * 2 - 1) * maxY;
    const rot = (Math.random() * 2 - 1) * 10;

    noBtn.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
  };

  noBtn.addEventListener("mouseenter", dodge);
  noBtn.addEventListener("touchstart", dodge, { passive: true });

  noBtn.addEventListener("click", () => {
    noBtn.textContent = "Nice try.";
    burstHearts(10);
  });
}

// --- Scroll reveal (makes the page feel “premium”) ---
const sections = Array.from(document.querySelectorAll("section"));
sections.forEach((s) => s.classList.add("reveal"));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("is-visible");
    });
  },
  { threshold: 0.18 }
);

sections.forEach((s) => io.observe(s));

// --- Floating hearts engine ---
function makeHeart(options = {}) {
  const h = document.createElement("div");
  h.className = "heart";

  // randomize start position & drift
  const left = options.left ?? Math.random() * 100;
  const dx = options.dx ?? (Math.random() * 260 - 130);
  const dur = options.dur ?? (4.8 + Math.random() * 2.8);

  h.style.left = `${left}vw`;
  h.style.setProperty("--dx", `${dx}px`);
  h.style.setProperty("--dur", `${dur}s`);

  document.body.appendChild(h);

  // cleanup
  setTimeout(() => {
    h.remove();
  }, (dur + 0.2) * 1000);
}

function startHearts() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  // steady stream
  window.__heartInterval = setInterval(() => {
    makeHeart();
  }, 520);

  // occasional stronger wave
  setInterval(() => {
    burstHearts(8);
  }, 5200);
}

function burstHearts(n = 14) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  for (let i = 0; i < n; i++) {
    makeHeart({
      left: 20 + Math.random() * 60,
      dx: Math.random() * 360 - 180,
      dur: 4.2 + Math.random() * 2.2
    });
  }
}
