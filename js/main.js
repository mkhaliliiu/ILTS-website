/* =========================================================
   ILTS — Inspire Luxury Technical Services
   Main JavaScript
   ========================================================= */

(function () {
  'use strict';

  /* ---- DOM Ready ---- */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initNavScroll();
    initMobileMenu();
    initMobileDropdown();
    initSmoothScroll();
    initAOS();
    initCounters();
    initBackToTop();
    initNavActiveLinks();
  }

  /* ---- Navbar scroll shadow ---- */
  function initNavScroll() {
    const desktopNav = document.getElementById('desktopNav');
    const mobileNav  = document.getElementById('mobileNav');

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY > 50;
      if (desktopNav) desktopNav.classList.toggle('scrolled', scrolled);
      if (mobileNav)  mobileNav.classList.toggle('scrolled', scrolled);
    }, { passive: true });
  }

  /* ---- Mobile hamburger menu ---- */
  function initMobileMenu() {
    const btn  = document.getElementById('hamburgerBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        btn.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Mobile dropdown toggle ---- */
  function initMobileDropdown() {
    const toggles = document.querySelectorAll('.mobile-dropdown-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parent   = toggle.closest('.mobile-has-dropdown');
        const dropdown = parent.querySelector('.mobile-dropdown');
        const icon     = toggle.querySelector('i');
        const isOpen   = dropdown.classList.toggle('open');
        if (icon) icon.style.transform = isOpen ? 'rotate(180deg)' : '';
      });
    });
  }

  /* ---- Close mobile menu on link click ---- */
  function initSmoothScroll() {
    const mobileLinks = document.querySelectorAll('.mobile-link:not(.mobile-dropdown-toggle), .mobile-dropdown a');
    const menu = document.getElementById('mobileMenu');
    const btn  = document.getElementById('hamburgerBtn');

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (menu) menu.classList.remove('open');
        if (btn)  btn.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navOffset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - navOffset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---- Scroll-triggered animation (AOS-lite) ---- */
  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Respect delay from data-aos-delay attribute
          const delay = parseInt(entry.target.dataset.aosDelay || 0, 10);
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  /* ---- Animated Counters ---- */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    let started = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          counters.forEach(counter => animateCounter(counter));
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const step     = 16;
    const steps    = duration / step;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, step);
  }

  /* ---- Back to Top ---- */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Active nav link on scroll ---- */
  function initNavActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(sec => observer.observe(sec));
  }

})();