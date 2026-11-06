/**
 * ============================================================================
 * VOLTGUARD — ELECTRICAL SAFETY TIPS INTERACTIVE SCRIPT (safety.js)
 * Master Interactive JavaScript for Electrical Safety Hub, Warning Signs,
 * Panel Guidance, Interactive Safety Checklist & Modals
 *
 * Core Capabilities:
 *  - Theme Toggle (Midnight Teal Dark Mode & Pale Aqua Light Mode)
 *  - Direction Toggle (LTR & RTL with dynamic state)
 *  - Sticky Header Elevation
 *  - Classy Dropdown & Mobile Drawer with Accordion
 *  - Dynamic Copyright Year
 *  - Smooth Scrolling to Safety Rules Section
 *  - Interactive 8-Item Safety Checklist with Live Progress & LocalStorage Persistence
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

  // Hero Smooth Scroll
  const heroExploreBtn = document.getElementById('heroExploreBtn');
  const safetyRulesSection = document.getElementById('safetyRulesSection');

  // Interactive Checklist Selectors
  const checklistRows = document.querySelectorAll('.checklist-item-row');
  const checklistProgressFill = document.getElementById('checklistProgressFill');
  const checklistProgressCount = document.getElementById('checklistProgressCount');
  const checklistCompletionBanner = document.getElementById('checklistCompletionBanner');
  const resetChecklistBtn = document.getElementById('resetChecklistBtn');

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

  // Trigger Buttons
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
    showToast(nextDir === 'rtl' ? 'Direction set to RTL (Right-to-Left)' : 'Direction set to LTR (Standard)');
  }

  if (rtlToggleBtn) rtlToggleBtn.addEventListener('click', toggleDirection);
  if (mobileRtlToggleBtn) mobileRtlToggleBtn.addEventListener('click', toggleDirection);

  /* --------------------------------------------------------------------------
     5. Home Dropdown Menu Interactions
     -------------------------------------------------------------------------- */
  if (homeDropdownBtn && homeDropdownParent) {
    homeDropdownBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isExpanded = homeDropdownParent.classList.contains('active');
      if (isExpanded) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    function openDropdown() {
      homeDropdownParent.classList.add('active', 'open');
      homeDropdownBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      homeDropdownParent.classList.remove('active', 'open');
      homeDropdownBtn.setAttribute('aria-expanded', 'false');
    }

    document.addEventListener('click', function (e) {
      if (!homeDropdownParent.contains(e.target)) {
        closeDropdown();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && homeDropdownParent.classList.contains('active')) {
        closeDropdown();
        homeDropdownBtn.focus();
      }
    });

    dropdownItems.forEach(item => {
      item.addEventListener('click', function () {
        closeDropdown();
      });
    });
  }

  /* --------------------------------------------------------------------------
     6. Mobile Drawer Navigation & Accordion
     -------------------------------------------------------------------------- */
  function openMobileDrawer() {
    if (!mobileDrawer || !mobileDrawerBackdrop) return;
    mobileDrawer.classList.add('open', 'active');
    mobileDrawerBackdrop.classList.add('open', 'active');
    document.body.style.overflow = 'hidden';
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileDrawer() {
    if (!mobileDrawer || !mobileDrawerBackdrop) return;
    mobileDrawer.classList.remove('open', 'active');
    mobileDrawerBackdrop.classList.remove('open', 'active');
    document.body.style.overflow = '';
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);

  if (mobileHomeAccordionBtn && mobileHomeAccordion) {
    mobileHomeAccordionBtn.addEventListener('click', function () {
      const isExpanded = mobileHomeAccordion.classList.contains('open');
      if (isExpanded) {
        mobileHomeAccordion.classList.remove('open');
        mobileHomeAccordionBtn.classList.remove('open');
      } else {
        mobileHomeAccordion.classList.add('open');
        mobileHomeAccordionBtn.classList.add('open');
      }
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  /* --------------------------------------------------------------------------
     7. Hero Explore Button Smooth Scroll
     -------------------------------------------------------------------------- */
  if (heroExploreBtn && safetyRulesSection) {
    heroExploreBtn.addEventListener('click', function (e) {
      e.preventDefault();
      safetyRulesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /* --------------------------------------------------------------------------
     8. Interactive 8-Item Electrical Safety Checklist
     -------------------------------------------------------------------------- */
  const CHECKLIST_STORAGE_KEY = 'voltguard_safety_checklist';

  function getStoredChecklistState() {
    try {
      const stored = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveChecklistState(indicesArray) {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(indicesArray));
    } catch (e) {
      // Storage unavailable or quota reached
    }
  }

  function updateChecklistProgress() {
    const totalItems = checklistRows.length || 8;
    const checkedRows = document.querySelectorAll('.checklist-item-row.checked');
    const checkedCount = checkedRows.length;
    const percentage = Math.round((checkedCount / totalItems) * 100);

    if (checklistProgressFill) {
      checklistProgressFill.style.width = percentage + '%';
    }

    if (checklistProgressCount) {
      checklistProgressCount.textContent = checkedCount + ' of ' + totalItems + ' items reviewed';
    }

    if (checklistCompletionBanner) {
      if (checkedCount === totalItems) {
        checklistCompletionBanner.classList.add('visible');
      } else {
        checklistCompletionBanner.classList.remove('visible');
      }
    }

    // Save checked indices
    const checkedIndices = [];
    checkedRows.forEach(row => {
      const idx = row.getAttribute('data-index');
      if (idx !== null) {
        checkedIndices.push(parseInt(idx, 10));
      }
    });
    saveChecklistState(checkedIndices);
  }

  function initChecklist() {
    const savedIndices = getStoredChecklistState();

    checklistRows.forEach((row, index) => {
      row.setAttribute('data-index', index.toString());
      row.setAttribute('role', 'checkbox');
      row.setAttribute('tabindex', '0');

      if (savedIndices.includes(index)) {
        row.classList.add('checked');
        row.setAttribute('aria-checked', 'true');
      } else {
        row.classList.remove('checked');
        row.setAttribute('aria-checked', 'false');
      }

      // Click toggle
      row.addEventListener('click', function () {
        const isChecked = row.classList.contains('checked');
        if (isChecked) {
          row.classList.remove('checked');
          row.setAttribute('aria-checked', 'false');
        } else {
          row.classList.add('checked');
          row.setAttribute('aria-checked', 'true');
        }
        updateChecklistProgress();
      });

      // Keyboard accessibility (Space and Enter to toggle)
      row.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          row.click();
        }
      });
    });

    updateChecklistProgress();
  }

  if (resetChecklistBtn) {
    resetChecklistBtn.addEventListener('click', function () {
      checklistRows.forEach(row => {
        row.classList.remove('checked');
        row.setAttribute('aria-checked', 'false');
      });
      localStorage.removeItem(CHECKLIST_STORAGE_KEY);
      updateChecklistProgress();
      showToast('Safety checklist reset to 0% progress');
    });
  }

  /* --------------------------------------------------------------------------
     9. Universal Modal Control Functions
     -------------------------------------------------------------------------- */
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first interactive element
    const focusable = modalEl.querySelector('button, input, select, textarea, [tabindex="0"]');
    if (focusable) focusable.focus();
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Bind close buttons & backdrop click
  const allModalBackdrops = [
    quoteModalBackdrop,
    loginModalBackdrop,
    dashboardModalBackdrop,
    comingSoonModalBackdrop,
    notFoundModalBackdrop
  ];

  allModalBackdrops.forEach(backdrop => {
    if (!backdrop) return;
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // Global ESC key listener for modals
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      allModalBackdrops.forEach(modal => {
        if (modal && modal.classList.contains('open')) {
          closeModal(modal);
        }
      });
      closeMobileDrawer();
    }
  });

  /* --------------------------------------------------------------------------
     10. Specific Modal Handlers
     -------------------------------------------------------------------------- */
  // A. Quote / Request Electrician Modal
  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const servicePreset = btn.getAttribute('data-service') || 'Comprehensive Electrical Safety Inspection';
      if (quoteServiceName) {
        quoteServiceName.value = servicePreset;
      }
      openModal(quoteModalBackdrop);
    });
  });

  if (quoteModalClose) {
    quoteModalClose.addEventListener('click', function () {
      closeModal(quoteModalBackdrop);
    });
  }

  if (quoteModalForm) {
    quoteModalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      closeModal(quoteModalBackdrop);
      quoteModalForm.reset();
      showToast('Inspection request received! A certified technician will contact you shortly.');
    });
  }

  // B. Login Modal
  openLoginBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(loginModalBackdrop);
    });
  });

  if (loginModalClose) {
    loginModalClose.addEventListener('click', function () {
      closeModal(loginModalBackdrop);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      closeModal(loginModalBackdrop);
      loginForm.reset();
      showToast('Signed in successfully! Welcome to VoltGuard.');
    });
  }

  // C. Dashboard Modal
  openDashboardBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(dashboardModalBackdrop);
    });
  });

  if (dashboardModalClose) {
    dashboardModalClose.addEventListener('click', function () {
      closeModal(dashboardModalBackdrop);
    });
  }

  // D. Coming Soon Modal
  openComingSoonBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(comingSoonModalBackdrop);
    });
  });

  if (comingSoonClose) {
    comingSoonClose.addEventListener('click', function () {
      closeModal(comingSoonModalBackdrop);
    });
  }

  if (comingSoonOkBtn) {
    comingSoonOkBtn.addEventListener('click', function () {
      closeModal(comingSoonModalBackdrop);
    });
  }

  // E. 404 Modal
  open404Btns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal(notFoundModalBackdrop);
    });
  });

  if (notFoundClose) {
    notFoundClose.addEventListener('click', function () {
      closeModal(notFoundModalBackdrop);
    });
  }

  if (notFoundHomeBtn) {
    notFoundHomeBtn.addEventListener('click', function () {
      closeModal(notFoundModalBackdrop);
      window.location.href = 'index.html';
    });
  }

  /* --------------------------------------------------------------------------
     11. Toast Notification Utility
     -------------------------------------------------------------------------- */
  function showToast(message) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('visible');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastNotification.classList.remove('visible');
    }, 4000);
  }

  /* --------------------------------------------------------------------------
     12. Initialise on DOM Ready
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initDirection();
    initChecklist();
  });

})();

