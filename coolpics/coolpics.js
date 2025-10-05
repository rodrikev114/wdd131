// Simple menu toggle for mobile view
const menuButton = document.getElementById('menu');
const navLinks = document.getElementById('nav-links');

menuButton.addEventListener('click', () => {
  // Toggle visibility of navigation links
  if (navLinks.style.display === 'block') {
    navLinks.style.display = 'none';
  } else {
    navLinks.style.display = 'block';
  }
});
