/**
 * ============================================================================
 * VOLTGUARD — CONTACT PAGE INTERACTIVE SCRIPT (contact.js)
 * Master Interactive JavaScript for Contact Hub, Service Inquiries & Dispatch
 *
 * Core Capabilities:
 *  - Theme Toggle (Dark Mode #101C22 Midnight Teal & Light Mode #EAF8FA Pale Aqua)
 *  - Direction Toggle (LTR & RTL with dynamic state)
 *  - Sticky Header Elevation
 *  - Classy Dropdown & Mobile Drawer with Accordion
 *  - Dynamic Copyright Year
 *  - Contact Form Dispatch Submission & Validation
 *  - Interactive FAQ Accordions (Expand / Collapse)
 *  - Interactive Modal Suite (Quote, Login, Dashboard, Coming Soon, 404)
 *  - Toast Notifications
 * ============================================================================
 */

(function () {
  'use strict';

  // --- Element Selectors ---
  const htmlEl = document.documentElement;
  const mainHeader = document.getElementById('mainHeader');

  // Navigation & Dropdown
  const homeDropdownParent = document.getElementById('homeDropdownParent');
  const homeDropdownBtn = document.getElementById('homeDropdownButton');
  const dropdownItems = document.querySelectorAll('.dropdown-item');

  // Mobile Drawer
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileHomeAccordionBtn = document.getElementById('mobileHomeAccordionBtn');
  const mobileHomeAccordion = document.getElementById('mobileHomeAccordion');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link:not(.accordion-header), .mobile-sublink');

  // Theme & RTL
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const mobileThemeLabel = document.getElementById('mobileThemeLabel');
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const mobileRtlToggleBtn = document.getElementById('mobileRtlToggleBtn');
  const mobileRtlLabel = document.getElementById('mobileRtlLabel');

  // Toast
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  // Year
  const currentYearSpan = document.getElementById('currentYear');

  // Contact Form
  const contactForm = document.getElementById('contactForm');
  const contactSubmitBtn = document.getElementById('contactSubmitBtn');

  // FAQs
  const faqAccordionItems = document.querySelectorAll('.faq-accordion-item');

  // Modals
  const quoteModalBackdrop = document.getElementById('quoteModalBackdrop');
  const quoteModalClose = document.getElementById('quoteModalClose');
  const quoteModalForm = document.getElementById('quoteModalForm');
  const quoteServiceName = document.getElementById('quoteServiceName');

  const loginModalBackdrop = document.getElementById('loginModalBackdrop');
  const loginModalClose = document.getElementById('loginModalClose');
  const loginForm = document.getElementById('loginForm');

  const dashboardModalBackdrop = document.getElementById('dashboardModalBackdrop');
  const dashboardModalClose = document.getElementById('dashboardModalClose');

  const comingSoonModalBackdrop = document.getElementById('comingSoonModalBackdrop');
  const comingSoonClose = document.getElementById('comingSoonClose');
  const comingSoonOkBtn = document.getElementById('comingSoonOkBtn');

  const notFoundModalBackdrop = document.getElementById('notFoundModalBackdrop');
  const notFoundClose = document.getElementById('notFoundClose');
  const notFoundHomeBtn = document.getElementById('notFoundHomeBtn');

  // Open Buttons
  const openQuoteBtns = document.querySelectorAll('.open-quote-modal-btn');
  const openLoginBtns = document.querySelectorAll('.open-login-btn');
  const openDashboardBtns = document.querySelectorAll('.open-dashboard-btn');
  const openComingSoonBtns = document.querySelectorAll('.open-coming-soon-btn');
  const open404Btns = document.querySelectorAll('.open-404-btn');

  /* --------------------------------------------------------------------------
     1. Dynamic Copyright Year
     -------------------------------------------------------------------------- */
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     2. Sticky Header Elevation on Scroll
     -------------------------------------------------------------------------- */
  function handleHeaderScroll() {
    if (!mainHeader) return;
    if (window.scrollY > 15) {
      mainHeader.classList.add('header-scrolled');
    } else {
      mainHeader.classList.remove('header-scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* --------------------------------------------------------------------------
     3. Theme Management (Synchronized with localStorage)
     -------------------------------------------------------------------------- */
  function updateThemeUI(theme) {
    htmlEl.setAttribute('data-theme', theme);
    const isDark = theme === 'dark';

    const lightIcons = document.querySelectorAll('.icon-sun');
    const darkIcons = document.querySelectorAll('.icon-moon');

    lightIcons.forEach(icon => {
      icon.style.display = isDark ? 'inline-block' : 'none';
    });
    darkIcons.forEach(icon => {
      icon.style.display = isDark ? 'none' : 'inline-block';
    });

    if (mobileThemeLabel) {
      mobileThemeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('voltguard_theme_preference') || 'dark';
    updateThemeUI(savedTheme);
  }

  function toggleTheme() {
    const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('voltguard_theme_preference', nextTheme);
    updateThemeUI(nextTheme);
    showToast(nextTheme === 'dark' ? 'Switched to Midnight Teal Dark Mode' : 'Switched to Pale Aqua Light Mode');
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

  /* --------------------------------------------------------------------------
     4. Direction (LTR / RTL) Management
     -------------------------------------------------------------------------- */
  function updateRtlUI(dir) {
    htmlEl.setAttribute('dir', dir);
    if (mobileRtlLabel) {
      mobileRtlLabel.textContent = dir === 'rtl' ? 'LTR View' : 'RTL View';
    }
  }

  function initDirection() {
    const savedDir = localStorage.getItem('voltguard_direction_preference') || 'ltr';
    updateRtlUI(savedDir);
  }

  function toggleDirection() {
    const currentDir = htmlEl.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    localStorage.setItem('voltguard_direction_preference', nextDir);
    updateRtlUI(nextDir);
    showToast(nextDir === 'rtl' ? 'Direction set to RTL (Arabic / Hebrew)' : 'Direction set to LTR (Standard)');
  }

  if (rtlToggleBtn) rtlToggleBtn.addEventListener('click', toggleDirection);
  if (mobileRtlToggleBtn) mobileRtlToggleBtn.addEventListener('click', toggleDirection);

  /* --------------------------------------------------------------------------
     5. Classy Home Dropdown (Desktop)
     -------------------------------------------------------------------------- */
  let isDropdownOpen = false;

  function toggleHomeDropdown(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    isDropdownOpen = !isDropdownOpen;
    if (homeDropdownParent) {
      homeDropdownParent.classList.toggle('active', isDropdownOpen);
      homeDropdownParent.classList.toggle('open', isDropdownOpen);
    }
    if (homeDropdownBtn) {
      homeDropdownBtn.setAttribute('aria-expanded', isDropdownOpen ? 'true' : 'false');
    }
  }

  function closeHomeDropdown() {
    if (!isDropdownOpen) return;
    isDropdownOpen = false;
    if (homeDropdownParent) {
      homeDropdownParent.classList.remove('active', 'open');
    }
    if (homeDropdownBtn) {
      homeDropdownBtn.setAttribute('aria-expanded', 'false');
    }
  }

  if (homeDropdownBtn) {
    homeDropdownBtn.addEventListener('click', toggleHomeDropdown);
  }

  dropdownItems.forEach(item => {
    item.addEventListener('click', () => {
      closeHomeDropdown();
    });
  });

  document.addEventListener('click', (e) => {
    if (homeDropdownParent && !homeDropdownParent.contains(e.target)) {
      closeHomeDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeHomeDropdown();
      closeMobileDrawer();
      closeAllModals();
    }
  });

  /* --------------------------------------------------------------------------
     6. Mobile Drawer Navigation
     -------------------------------------------------------------------------- */
  function openMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open', 'active');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.add('open', 'active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open', 'active');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('open', 'active');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);

  if (mobileHomeAccordionBtn && mobileHomeAccordion) {
    mobileHomeAccordionBtn.addEventListener('click', () => {
      const isExpanded = mobileHomeAccordion.classList.toggle('open');
      mobileHomeAccordionBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  /* --------------------------------------------------------------------------
     7. Contact Form Handling
     -------------------------------------------------------------------------- */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (contactSubmitBtn) {
        contactSubmitBtn.disabled = true;
        contactSubmitBtn.innerHTML = `
          <span>Dispatching Request...</span>
        `;
      }

      setTimeout(() => {
        contactForm.reset();
        if (contactSubmitBtn) {
          contactSubmitBtn.disabled = false;
          contactSubmitBtn.innerHTML = `
            <span>Send Request &amp; Lock Priority</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          `;
        }
        showToast('Inquiry logged successfully! A licensed master electrician will call within 15 minutes.');
      }, 700);
    });
  }

  /* --------------------------------------------------------------------------
     8. FAQ Accordion Logic
     -------------------------------------------------------------------------- */
  faqAccordionItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    const answerPane = item.querySelector('.faq-answer-pane');

    if (questionBtn && answerPane) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        faqAccordionItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('open')) {
            otherItem.classList.remove('open');
            const otherBtn = otherItem.querySelector('.faq-question-btn');
            const otherPane = otherItem.querySelector('.faq-answer-pane');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherPane) otherPane.style.display = 'none';
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          questionBtn.setAttribute('aria-expanded', 'false');
          answerPane.style.display = 'none';
        } else {
          item.classList.add('open');
          questionBtn.setAttribute('aria-expanded', 'true');
          answerPane.style.display = 'block';
        }
      });
    }
  });

  /* --------------------------------------------------------------------------
     9. Interactive Modal Suite
     -------------------------------------------------------------------------- */
  function openModal(modal) {
    if (!modal) return;
    closeAllModals();
    closeMobileDrawer();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    [quoteModalBackdrop, loginModalBackdrop, dashboardModalBackdrop, comingSoonModalBackdrop, notFoundModalBackdrop].forEach(m => {
      if (m && m.classList.contains('open')) {
        closeModal(m);
      }
    });
  }

  // Hook up quote openers
  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(quoteModalBackdrop);
    });
  });

  openLoginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(loginModalBackdrop);
    });
  });

  openDashboardBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(dashboardModalBackdrop);
    });
  });

  openComingSoonBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(comingSoonModalBackdrop);
    });
  });

  open404Btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(notFoundModalBackdrop);
    });
  });

  // Modal Closers
  if (quoteModalClose) quoteModalClose.addEventListener('click', () => closeModal(quoteModalBackdrop));
  if (loginModalClose) loginModalClose.addEventListener('click', () => closeModal(loginModalBackdrop));
  if (dashboardModalClose) dashboardModalClose.addEventListener('click', () => closeModal(dashboardModalBackdrop));
  if (comingSoonClose) comingSoonClose.addEventListener('click', () => closeModal(comingSoonModalBackdrop));
  if (comingSoonOkBtn) comingSoonOkBtn.addEventListener('click', () => closeModal(comingSoonModalBackdrop));
  if (notFoundClose) notFoundClose.addEventListener('click', () => closeModal(notFoundModalBackdrop));
  if (notFoundHomeBtn) notFoundHomeBtn.addEventListener('click', () => closeModal(notFoundModalBackdrop));

  // Close modals when clicking backdrop
  [quoteModalBackdrop, loginModalBackdrop, dashboardModalBackdrop, comingSoonModalBackdrop, notFoundModalBackdrop].forEach(backdrop => {
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          closeModal(backdrop);
        }
      });
    }
  });

  // Form Submissions
  if (quoteModalForm) {
    quoteModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(quoteModalBackdrop);
      quoteModalForm.reset();
      showToast('Emergency quote dispatched! Our licensed master electrician will call within 15 minutes.');
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModalBackdrop);
      loginForm.reset();
      showToast('Client portal verified. Loading active circuit status.');
    });
  }

  /* --------------------------------------------------------------------------
     10. Toast Notification Helper
     -------------------------------------------------------------------------- */
  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    if (toastTimer) clearTimeout(toastTimer);

    toastMessage.textContent = msg;
    toastNotification.classList.add('visible');

    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('visible');
    }, 4200);
  }

  /* --------------------------------------------------------------------------
     Initialization
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();
  });

  // Expose global helpers
  window.VoltGuardContact = {
    showToast,
    toggleTheme,
    toggleDirection,
    openModal
  };

})();

