/* =========================================================
   ILTS — Service Detail Pages JavaScript (service-detail.js)
   Shared script for all 9 individual service pages
   main.js handles: navbar, hamburger, AOS, back-to-top
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initImgHover();
    initStepHover();
  });

  /* ---- Subtle zoom on intro images on scroll ---- */
  function initImgHover() {
    const imgs = document.querySelectorAll('.sd-img-main, .sd-img-secondary');
    imgs.forEach(img => {
      img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.03)';
        img.style.transition = 'transform 0.5s ease';
      });
      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
    });
  }

  /* ---- Step circle pulse on hover ---- */
  function initStepHover() {
    const steps = document.querySelectorAll('.sd-step');
    steps.forEach(step => {
      const circle = step.querySelector('.sd-step-circle');
      if (!circle) return;
      step.addEventListener('mouseenter', () => {
        circle.style.boxShadow = '0 0 0 8px rgba(196,154,60,0.15)';
      });
      step.addEventListener('mouseleave', () => {
        circle.style.boxShadow = '';
      });
    });
  }

})();