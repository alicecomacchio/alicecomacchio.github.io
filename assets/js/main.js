const buttons = document.querySelectorAll(".lang-button");
const themeButtons = document.querySelectorAll(".theme-button");
const translatableNodes = document.querySelectorAll("[data-it][data-en]");
const currentPdfLinks = document.querySelectorAll(".current-pdf-link");
const themeGraphics = document.querySelectorAll(".theme-graphic");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const menuLinks = document.querySelectorAll(".section-menu a");
const root = document.documentElement;

const languageKey = "alice-cv-language";
const themeKey = "alice-cv-theme";

function setLanguage(lang) {
  root.lang = lang;

  translatableNodes.forEach((node) => {
    node.textContent = node.dataset[lang];
  });

  currentPdfLinks.forEach((link) => {
    link.href = lang === "en" ? "./print/cv-en.html" : "./print/cv-it.html";
  });

  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === lang);
  });

  window.localStorage.setItem(languageKey, lang);
}

function setTheme(theme) {
  root.dataset.theme = theme;

  themeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === theme);
  });

  themeGraphics.forEach((image) => {
    image.src = theme === "dark" ? image.dataset.darkSrc : image.dataset.lightSrc;
  });

  window.localStorage.setItem(themeKey, theme);
}

function setMenuState(isOpen) {
  root.dataset.menuOpen = isOpen ? "true" : "false";

  if (mobileMenuToggle) {
    mobileMenuToggle.setAttribute("aria-expanded", String(isOpen));
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.lang);
  });
});

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(button.dataset.theme);
  });
});

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener("click", () => {
    setMenuState(root.dataset.menuOpen !== "true");
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

const preferredLanguage = window.localStorage.getItem(languageKey) || "it";
const preferredTheme =
  window.localStorage.getItem(themeKey) ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

setLanguage(preferredLanguage);
setTheme(preferredTheme);
setMenuState(false);
