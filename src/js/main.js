"use strict";

// MENU

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll(".link");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// MODAL

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const modalDots = document.getElementById("modalDots");

const images = document.querySelectorAll(".article_image");
let currentImageIndex = 0;

// Create array with images data
const imageData = Array.from(images).map((img) => ({
  src: img.src,
  alt: img.alt,
}));

// Create navigation dots
function createDots() {
  modalDots.innerHTML = "";
  imageData.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "modal-dot";
    if (index === currentImageIndex) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      currentImageIndex = index;
      updateModalContent();
    });
    modalDots.appendChild(dot);
  });
}

// Open modal
function openModal(index) {
  currentImageIndex = index;
  createDots();
  updateModalContent();
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModal() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

// Update modal content
function updateModalContent() {
  const data = imageData[currentImageIndex];
  modalImage.src = data.src;
  modalImage.alt = data.alt;

  // Update modal dots
  const dots = modalDots.querySelectorAll(".modal-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentImageIndex);
  });
}

// Navigate to next image
function nextImage() {
  currentImageIndex =
    currentImageIndex === imageData.length - 1 ? 0 : currentImageIndex + 1;
  updateModalContent();
}

// Navigate to previous image
function prevImage() {
  currentImageIndex =
    currentImageIndex === 0 ? imageData.length - 1 : currentImageIndex - 1;
  updateModalContent();
}

// Event listeners
images.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});

modalClose.addEventListener("click", closeModal);

prevBtn.addEventListener("click", prevImage);

nextBtn.addEventListener("click", nextImage);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Keyboard
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("show")) return;

  switch (e.key) {
    case "Escape":
      closeModal();
      break;
    case "ArrowLeft":
      prevImage();
      break;
    case "ArrowRight":
      nextImage();
      break;
  }
});

// LIGHT/DARK THEME

// Theme toggle functionality
const toggleSwitch = document.querySelector('.toggle-switch');
const body = document.body;

// Verify theme + set light by defect
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update toggle to current theme
if (currentTheme === 'light') {
  toggleSwitch.classList.add('light');
}

// Event listener
toggleSwitch.addEventListener('click', () => {
  const isLight = toggleSwitch.classList.contains('light');
  
  if (isLight) {
    toggleSwitch.classList.remove('light');
    body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    toggleSwitch.classList.add('light');
    body.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// SMART HEADER

let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
  let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
    header.classList.add('hidden');
  } else if (currentScrollTop < lastScrollTop) {
    header.classList.remove('hidden');
  }
  
  lastScrollTop = currentScrollTop;
});