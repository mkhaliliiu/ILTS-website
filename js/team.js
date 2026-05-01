/* =========================================================
   ILTS — Team Page JavaScript (team.js)
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initCardTilt();
  });

  /* Subtle 3D tilt on team cards */
  function initCardTilt() {
    const cards = document.querySelectorAll('.team-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform =
          `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

})();