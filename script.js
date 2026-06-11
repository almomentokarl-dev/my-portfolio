const body = document.body;
const navRight = document.querySelector(".nav-right");
const menuToggle = document.querySelector(".menu-toggle");
const themeToggle = document.getElementById("themeToggle");
const scrollTopBtn = document.getElementById("scrollTop");
const yearEl = document.getElementById("year");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const reveals = document.querySelectorAll(".reveal");

yearEl.textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
}

themeToggle.addEventListener("click", () => {
  const isDark = body.getAttribute("data-theme") === "dark";
  const nextTheme = isDark ? "light" : "dark";
  if (nextTheme === "light") {
    body.removeAttribute("data-theme");
  } else {
    body.setAttribute("data-theme", "dark");
  }
  localStorage.setItem("theme", nextTheme);
});

menuToggle.addEventListener("click", () => {
  const isOpen = navRight.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navRight.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.18 });

reveals.forEach((el) => observer.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const activeId = entry.target.id;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 200;
  scrollTopBtn.classList.toggle("show", scrolled);
  document.querySelector(".header").classList.toggle("scrolled", window.scrollY > 10);
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const typingText = document.getElementById("typingText");
const phrases = ["Frontend Developer", "UI Enthusiast", "Problem Solver", "Creative Technologist"];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];
  typingText.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(typeLoop, 90);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 50);
    return;
  }

  deleting = !deleting;
  if (!deleting) {
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(typeLoop, deleting ? 800 : 220);
}

typeLoop();

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  alert("This is a frontend-only demo form. Hook it up to a backend when ready.");
});
