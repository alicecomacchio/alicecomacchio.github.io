const buttons = document.querySelectorAll(".lang-button");
const themeButtons = document.querySelectorAll(".theme-button");
const translatableNodes = document.querySelectorAll("[data-it][data-en]");
const currentPdfLinks = document.querySelectorAll(".current-pdf-link");
const themeGraphics = document.querySelectorAll(".theme-graphic");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const menuLinks = document.querySelectorAll(".section-menu a");
const emailCta = document.querySelector(".contact-email-cta");
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

function decodeChars(chars) {
  return String.fromCharCode(...chars);
}

function initEmailCta() {
  if (!emailCta) {
    return;
  }

  const email = decodeChars([97, 108, 105, 99, 101, 99, 111, 109, 97, 99, 99, 104, 105, 111, 64, 103, 109, 97, 105, 108, 46, 99, 111, 109]);
  emailCta.addEventListener("click", () => {
    window.location.href = `mailto:${email}`;
  });
}

setLanguage(preferredLanguage);
setTheme(preferredTheme);
setMenuState(false);
initEmailCta();
