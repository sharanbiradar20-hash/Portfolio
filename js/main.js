/* ============================================================
   MAIN.JS — Portfolio Interactivity
   Author: Sharan Marulsidh Biradar
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // THEME TOGGLE (Light / Dark)
  // ============================================================
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Read stored preference or default to dark
    const stored = localStorage.getItem('theme');
    const theme = stored === 'light' ? 'light' : 'dark';
    applyTheme(theme);

    toggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      const isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', isDark ? 'false' : 'true');
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');

      // Swap icon
      const sunIcon = toggle.querySelector('.icon-sun');
      const moonIcon = toggle.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = isDark ? 'none' : 'block';
        moonIcon.style.display = isDark ? 'block' : 'none';
      }
    }
  }

  // ============================================================
  // MOBILE MENU TOGGLE
  // ============================================================
  function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.contains('is-open');

      if (isOpen) {
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileNav.classList.add('is-open');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close menu on link click
    const mobileLinks = mobileNav.querySelectorAll('.nav-link');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        mobileNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        menuToggle.focus();
      }
    });
  }

  // ============================================================
  // TERMINAL TYPING ANIMATION
  // ============================================================
  function initTerminalAnimation() {
    const terminal = document.querySelector('.terminal__body');
    if (!terminal) return;

    const lines = terminal.querySelectorAll('.terminal__line');
    let delay = 300;

    lines.forEach(function (line, index) {
      setTimeout(function () {
        line.style.opacity = '1';
        line.style.transform = 'translateY(0)';
      }, delay);
      delay += 80;
    });
  }

  // ============================================================
  // ACTIVE NAV LINK HIGHLIGHT
  // ============================================================
  function initActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // ============================================================
  // CONTACT FORM VALIDATION (Accessible)
  // ============================================================
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      // Clear all errors
      const groups = form.querySelectorAll('.form-group');
      groups.forEach(function (group) {
        group.classList.remove('has-error');
      });

      // Validate name
      const nameInput = form.querySelector('#contact-name');
      if (nameInput && nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required');
        isValid = false;
      }

      // Validate email
      const emailInput = form.querySelector('#contact-email');
      if (emailInput) {
        const emailVal = emailInput.value.trim();
        if (emailVal === '') {
          showError(emailInput, 'Email is required');
          isValid = false;
        } else if (!isValidEmail(emailVal)) {
          showError(emailInput, 'Please enter a valid email');
          isValid = false;
        }
      }

      // Validate message
      const messageInput = form.querySelector('#contact-message');
      if (messageInput && messageInput.value.trim() === '') {
        showError(messageInput, 'Message is required');
        isValid = false;
      }

      if (isValid) {
        // Show success
        form.style.display = 'none';
        var successMsg = document.getElementById('form-success');
        if (successMsg) {
          successMsg.classList.add('is-visible');
          successMsg.removeAttribute('hidden');
        }

        // Announce to screen readers
        const liveRegion = document.getElementById('form-status');
        if (liveRegion) {
          liveRegion.textContent = 'Your message has been sent successfully.';
        }
      } else {
        // Focus first error field
        const firstError = form.querySelector('.has-error input, .has-error textarea');
        if (firstError) firstError.focus();
      }
    });
  }

  function showError(input, message) {
    const group = input.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    const errorEl = group.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', errorEl.id);
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ============================================================
  // SCROLL HEADER EFFECT
  // ============================================================
  function initScrollHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 10) {
        header.style.backgroundColor = 'var(--color-surface)';
        header.style.backdropFilter = 'blur(12px)';
        header.style.webkitBackdropFilter = 'blur(12px)';
      } else {
        header.style.backgroundColor = 'var(--color-bg)';
        header.style.backdropFilter = 'none';
        header.style.webkitBackdropFilter = 'none';
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ============================================================
  // INITIALIZE ALL
  // ============================================================
  function init() {
    initTheme();
    initMobileMenu();
    initTerminalAnimation();
    initActiveNav();
    initContactForm();
    initScrollHeader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
