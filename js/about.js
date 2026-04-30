/* =========================================================
   ILTS — About Page JavaScript (about.js)
   Page-specific interactions for about.html
   main.js handles: navbar, hamburger, AOS, counters, back-to-top
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initLeaderCards();
    initMosaicParallax();
  });

  /* ---- Subtle tilt effect on leader cards ---- */
  function initLeaderCards() {
    const cards = document.querySelectorAll('.leader-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const centerX = rect.width  / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) *  3;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---- Subtle parallax on mosaic images on scroll ---- */
  function initMosaicParallax() {
    const mosaic = document.querySelector('.why-img-mosaic');
    if (!mosaic) return;

    window.addEventListener('scroll', () => {
      const rect   = mosaic.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      const progress  = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const offset    = (progress - 0.5) * 30;
      const imgs      = mosaic.querySelectorAll('.mosaic-img');

      imgs.forEach((img, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        img.style.transform = `translateY(${offset * dir * 0.4}px)`;
      });
    }, { passive: true });
  }

})();