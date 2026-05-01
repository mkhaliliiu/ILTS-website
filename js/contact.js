/* =========================================================
   ILTS — Contact Page JavaScript (contact.js)
   Form validation + submission handling
   ========================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initForm();
    initInputAnimations();
  });

  /* ---- Form Validation & Submit ---- */
  function initForm() {
    const form      = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const success   = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm()) return;

      // Show loading state
      const btnText    = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      const btnIcon    = submitBtn.querySelector('.btn-icon');
      submitBtn.disabled = true;
      btnText.style.display    = 'none';
      btnLoading.style.display = 'inline-flex';
      if (btnIcon) btnIcon.style.display = 'none';

      // Simulate send (replace with real API/EmailJS/Formspree endpoint)
      setTimeout(() => {
        submitBtn.disabled = false;
        btnText.style.display    = 'inline';
        btnLoading.style.display = 'none';
        if (btnIcon) btnIcon.style.display = 'inline';

        // Show success
        success.style.display = 'flex';
        form.reset();

        // Scroll to success message
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Hide after 6s
        setTimeout(() => { success.style.display = 'none'; }, 6000);
      }, 1600);
    });

    // Live validation on blur
    const required = ['firstName', 'lastName', 'email', 'service', 'message'];
    required.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('blur', () => validateField(id));
      el.addEventListener('input', () => {
        if (el.classList.contains('error')) validateField(id);
      });
    });
  }

  function validateForm() {
    const fields = ['firstName', 'lastName', 'email', 'service', 'message'];
    let valid = true;
    fields.forEach(id => { if (!validateField(id)) valid = false; });
    return valid;
  }

  function validateField(id) {
    const el    = document.getElementById(id);
    const error = document.getElementById(id + 'Error');
    if (!el) return true;

    let ok = true;

    if (id === 'email') {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      ok = el.value.trim() !== '' && re.test(el.value.trim());
    } else {
      ok = el.value.trim() !== '';
    }

    if (!ok) {
      el.classList.add('error');
      if (error) error.classList.add('visible');
    } else {
      el.classList.remove('error');
      if (error) error.classList.remove('visible');
    }

    return ok;
  }

  /* ---- Input focus animation ---- */
  function initInputAnimations() {
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.closest('.form-group').classList.add('focused');
      });
      input.addEventListener('blur', () => {
        input.closest('.form-group').classList.remove('focused');
      });
    });
  }

})();