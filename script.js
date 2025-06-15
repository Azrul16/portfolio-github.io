// Update year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple burger menu toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  nav.classList.toggle('nav-active');
});
