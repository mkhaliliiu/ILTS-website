/* =========================================================
   ILTS — Services Page JavaScript (services.js)
   Page-specific interactions for services.html
   main.js handles: navbar, hamburger, AOS, back-to-top
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initCardMouseParallax();
    initCardKeyboardNav();
  });

  /* ---- Subtle mouse-tracking parallax on card images ---- */
  function initCardMouseParallax() {
    const cards = document.querySelectorAll('.srv-card');

    cards.forEach(card => {
      const img = card.querySelector('.srv-card-img');
      if (!img) return;

      card.addEventListener('mousemove', (e) => {
        const rect    = card.getBoundingClientRect();
        const x       = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 to 0.5
        const y       = (e.clientY - rect.top)  / rect.height - 0.5;
        const moveX   = x * 12;
        const moveY   = y * 8;
        img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
      });

      card.addEventListener('mouseleave', () => {
        img.style.transform = '';
      });
    });
  }

  /* ---- Keyboard navigation: Enter key activates card link ---- */
  function initCardKeyboardNav() {
    const cards = document.querySelectorAll('.srv-card');
    cards.forEach(card => {
      card.setAttribute('tabindex', '0');
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

})();