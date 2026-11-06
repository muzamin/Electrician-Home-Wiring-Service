/**
 * ============================================================================
 * VOLTGUARD — PRICING PAGE INTERACTIVE SCRIPT (pricing.js)
 * Master Interactive JavaScript for Pricing Hub, Comparison Matrix & Quotes
 *
 * Core Capabilities:
 *  - Theme Toggle (Dark Mode #101C22 Midnight Teal & Light Mode #EAF8FA Pale Aqua)
 *  - Direction Toggle (LTR & RTL with dynamic state)
 *  - Sticky Header Elevation
 *  - Classy Dropdown & Mobile Drawer with Accordion
 *  - Dynamic Copyright Year
 *  - Interactive Plan Scope Billing Switcher (Residential vs Bulk Commercial)
 *  - Plan Selection & Quote Modal Pre-filling
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

  // Pricing Scope Switcher
  const btnScopeResidential = document.getElementById('btnScopeResidential');
  const btnScopeBulk = document.getElementById('btnScopeBulk');
  const priceAmount1 = document.getElementById('priceAmount1');
  const priceAmount2 = document.getElementById('priceAmount2');
  const priceAmount3 = document.getElementById('priceAmount3');
  const priceUnit1 = document.getElementById('priceUnit1');
  const priceUnit2 = document.getElementById('priceUnit2');
  const priceUnit3 = document.getElementById('priceUnit3');


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
     7. Interactive Plan Scope Switcher (Residential vs Commercial Bulk)
     -------------------------------------------------------------------------- */
  function setPricingScope(mode) {
    if (mode === 'bulk') {
      if (btnScopeBulk) btnScopeBulk.classList.add('active');
      if (btnScopeResidential) btnScopeResidential.classList.remove('active');

      if (priceAmount1) priceAmount1.textContent = '125';
      if (priceUnit1) priceUnit1.textContent = '/ per property (Bulk)';

      if (priceAmount2) priceAmount2.textContent = '415';
      if (priceUnit2) priceUnit2.textContent = '/ multi-unit rate';

      if (priceAmount3) priceAmount3.textContent = '1,060';
      if (priceUnit3) priceUnit3.textContent = '/ commercial contract';

      showToast('15% Commercial & Multi-Property discount applied');
    } else {
      if (btnScopeResidential) btnScopeResidential.classList.add('active');
      if (btnScopeBulk) btnScopeBulk.classList.remove('active');

      if (priceAmount1) priceAmount1.textContent = '149';
      if (priceUnit1) priceUnit1.textContent = '/ flat diagnostic fee';

      if (priceAmount2) priceAmount2.textContent = '489';
      if (priceUnit2) priceUnit2.textContent = '/ comprehensive scope';

      if (priceAmount3) priceAmount3.textContent = '1,250';
      if (priceUnit3) priceUnit3.textContent = '/ starting commercial spec';

      showToast('Standard residential flat rates displayed');
    }
  }

  if (btnScopeResidential) {
    btnScopeResidential.addEventListener('click', () => setPricingScope('residential'));
  }
  if (btnScopeBulk) {
    btnScopeBulk.addEventListener('click', () => setPricingScope('bulk'));
  }



  /* --------------------------------------------------------------------------
     9. Interactive Modal Suite & Pre-filling
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

  // Hook up quote openers with prefill
  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planPrefill = btn.getAttribute('data-plan-prefill');
      if (planPrefill && quoteServiceName) {
        if (planPrefill === 'essential') {
          quoteServiceName.value = 'Essential Diagnostic ($149)';
        } else if (planPrefill === 'complete') {
          quoteServiceName.value = 'Complete Home Wiring ($489)';
        } else if (planPrefill === 'enterprise') {
          quoteServiceName.value = 'Commercial Master Plan ($1,250)';
        } else if (planPrefill === 'custom') {
          quoteServiceName.value = 'Custom Quotation Request';
        }
      }
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
      showToast('Custom quote dispatched! Our licensed master electrician will call within 15 minutes with your binding quote.');
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModalBackdrop);
      loginForm.reset();
      showToast('Customer portal authenticated. Loading service invoices & estimates.');
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
     11. Interactive 3D Tier Showcase Carousel
     -------------------------------------------------------------------------- */
  function initTierCarousel() {
    const stage = document.getElementById('tierCarouselStage');
    const cards = Array.from(document.querySelectorAll('.tier-showcase-card'));
    const prevBtn = document.getElementById('carouselPrevBtn');
    const nextBtn = document.getElementById('carouselNextBtn');
    const dots = Array.from(document.querySelectorAll('.carousel-dot'));

    if (!stage || cards.length === 0) return;

    let currentIndex = 1; // Default to Center Card (Client Favorite, Card 2)
    let autoPlayTimer = null;
    const total = cards.length;

    function updateCards(targetIndex) {
      currentIndex = (targetIndex + total) % total;

      cards.forEach((card, idx) => {
        card.classList.remove('active', 'pos-left', 'pos-right');

        if (idx === currentIndex) {
          card.classList.add('active');
        } else if (idx === (currentIndex - 1 + total) % total) {
          card.classList.add('pos-left');
        } else {
          card.classList.add('pos-right');
        }
      });

      // Update dots indicator
      dots.forEach((dot, dotIdx) => {
        if (dotIdx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      updateCards(currentIndex + 1);
    }

    function prevSlide() {
      updateCards(currentIndex - 1);
    }

    // Button Listeners
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        resetAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        resetAutoPlay();
      });
    }

    // Dot navigation
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        updateCards(idx);
        resetAutoPlay();
      });
    });

    // Allow clicking peeking side cards to bring them to focus
    cards.forEach((card, idx) => {
      card.addEventListener('click', (e) => {
        // If clicking a link or button inside the active card, let it trigger normally
        if (card.classList.contains('active')) return;

        // If clicking peeking cards, navigate to it
        e.preventDefault();
        updateCards(idx);
        resetAutoPlay();
      });
    });

    // Auto-advance every 5.5s with hover pause
    function startAutoPlay() {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
      autoPlayTimer = setInterval(nextSlide, 5500);
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }

    stage.addEventListener('mouseenter', stopAutoPlay);
    stage.addEventListener('mouseleave', startAutoPlay);

    // Initial state
    updateCards(currentIndex);
    startAutoPlay();
  }

  /* --------------------------------------------------------------------------
     Initialization
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();
    initTierCarousel();
  });

  // Expose global helpers
  window.VoltGuardPricing = {
    showToast,
    toggleTheme,
    toggleDirection,
    setPricingScope,
    openModal
  };

})();

