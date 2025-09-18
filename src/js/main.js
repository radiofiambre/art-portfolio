'use strict';

const menuToggle = document.querySelector('.menuToggle');
const navLinks = document.querySelector('.navLinks');
const links = document.querySelectorAll('.link');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});