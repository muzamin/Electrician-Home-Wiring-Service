/**
 * ============================================================================
 * VOLTGUARD — ABOUT US INTERACTIVE SCRIPT (About.js)
 * Master Interactive JavaScript for About Page
 *
 * Synchronized with Home 1 & Home 2 Preferences:
 *  - Theme Toggle (Dark Mode #101C22 Midnight Teal & Light Mode #EAF8FA Pale Aqua)
 *  - Direction Toggle (LTR & RTL with dynamic label)
 *  - Sticky Header Elevation
 *  - Dynamic Copyright Year
 *  - Interactive Modals System (Quote, Login, Dashboard, Coming Soon, 404)
 *  - Mobile Navigation Drawer with Accordion
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

  // Modals
  const quoteModalBackdrop = document.getElementById('quoteModalBackdrop');
  const quoteModalClose = document.getElementById('quoteModalClose');
  const quoteModalForm = document.getElementById('quoteModalForm');

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
     3. Toast Notification Helper
     -------------------------------------------------------------------------- */
  function showToast(message, duration = 3200) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('active');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('active');
    }, duration);
  }

  /* --------------------------------------------------------------------------
     4. Dark / Light Mode System (Synced with Home 1 & Home 2 Preferences)
     -------------------------------------------------------------------------- */
  const THEME_STORAGE_KEY = 'voltguard_theme_preference';

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      themeToggleBtn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }

    if (mobileThemeLabel) {
      mobileThemeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      applyTheme(savedTheme);
    } else {
      applyTheme('dark');
    }
  }

  function toggleTheme() {
    const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', toggleTheme);
  }

  /* --------------------------------------------------------------------------
     5. RTL / LTR Direction System (Synced with Home 1 & Home 2 Preferences)
     -------------------------------------------------------------------------- */
  const RTL_STORAGE_KEY = 'voltguard_direction_preference';

  function applyDirection(dir) {
    const isRtl = dir === 'rtl';
    htmlEl.setAttribute('dir', dir);
    localStorage.setItem(RTL_STORAGE_KEY, dir);

    if (rtlToggleBtn) {
      rtlToggleBtn.setAttribute('aria-label', isRtl ? 'Switch layout to LTR' : 'Switch layout to RTL');
      rtlToggleBtn.title = isRtl ? 'Switch layout to LTR' : 'Switch layout to RTL';
      const rtlText = rtlToggleBtn.querySelector('.rtl-label');
      if (rtlText) {
        rtlText.textContent = isRtl ? 'LTR' : 'RTL';
      }
    }

    if (mobileRtlLabel) {
      mobileRtlLabel.textContent = isRtl ? 'Switch to LTR' : 'Switch to RTL';
    }
  }

  function initDirection() {
    const savedDir = localStorage.getItem(RTL_STORAGE_KEY);
    if (savedDir === 'rtl' || savedDir === 'ltr') {
      applyDirection(savedDir);
    } else {
      applyDirection('ltr');
    }
  }

  function toggleDirection() {
    const currentDir = htmlEl.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    applyDirection(nextDir);
    showToast(`Switched layout to ${nextDir.toUpperCase()}`);
  }

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', toggleDirection);
  }
  if (mobileRtlToggleBtn) {
    mobileRtlToggleBtn.addEventListener('click', toggleDirection);
  }

  /* --------------------------------------------------------------------------
     6. Desktop Classy Home Dropdown Menu
     -------------------------------------------------------------------------- */
  function closeHomeDropdown() {
    if (homeDropdownParent) {
      homeDropdownParent.classList.remove('open');
      if (homeDropdownBtn) {
        homeDropdownBtn.setAttribute('aria-expanded', 'false');
      }
    }
  }

  function toggleHomeDropdown(e) {
    e.stopPropagation();
    if (!homeDropdownParent) return;
    const isOpen = homeDropdownParent.classList.contains('open');
    if (isOpen) {
      closeHomeDropdown();
    } else {
      homeDropdownParent.classList.add('open');
      if (homeDropdownBtn) {
        homeDropdownBtn.setAttribute('aria-expanded', 'true');
      }
    }
  }

  if (homeDropdownBtn) {
    homeDropdownBtn.addEventListener('click', toggleHomeDropdown);
  }

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (homeDropdownParent && !homeDropdownParent.contains(e.target)) {
      closeHomeDropdown();
    }
  });

  // Keyboard escape closes dropdown
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeHomeDropdown();
      closeAllModals();
      closeMobileDrawer();
    }
  });

  /* --------------------------------------------------------------------------
     7. Mobile Drawer & Accordion
     -------------------------------------------------------------------------- */
  function openMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('active');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.add('active');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('active');
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('active');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openMobileDrawer);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);

  // Mobile Accordion
  if (mobileHomeAccordionBtn && mobileHomeAccordion) {
    mobileHomeAccordionBtn.addEventListener('click', () => {
      const isOpen = mobileHomeAccordion.classList.contains('open');
      if (isOpen) {
        mobileHomeAccordion.classList.remove('open');
        mobileHomeAccordionBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileHomeAccordion.classList.add('open');
        mobileHomeAccordionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  // Close drawer on link click
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  /* --------------------------------------------------------------------------
     8. Modal System (Quote, Login, Dashboard, Coming Soon, 404)
     -------------------------------------------------------------------------- */
  function openModal(modalBackdrop) {
    if (!modalBackdrop) return;
    closeAllModals();
    closeMobileDrawer();
    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalBackdrop) {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    const activeModals = document.querySelectorAll('.modal-backdrop.active');
    activeModals.forEach((m) => closeModal(m));
  }

  // Close backdrop click
  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // Hook Modal Buttons
  openQuoteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(quoteModalBackdrop);
    });
  });
  if (quoteModalClose) quoteModalClose.addEventListener('click', () => closeModal(quoteModalBackdrop));

  openLoginBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(loginModalBackdrop);
    });
  });
  if (loginModalClose) loginModalClose.addEventListener('click', () => closeModal(loginModalBackdrop));

  openDashboardBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(dashboardModalBackdrop);
    });
  });
  if (dashboardModalClose) dashboardModalClose.addEventListener('click', () => closeModal(dashboardModalBackdrop));

  openComingSoonBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(comingSoonModalBackdrop);
    });
  });
  if (comingSoonClose) comingSoonClose.addEventListener('click', () => closeModal(comingSoonModalBackdrop));
  if (comingSoonOkBtn) comingSoonOkBtn.addEventListener('click', () => closeModal(comingSoonModalBackdrop));

  open404Btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(notFoundModalBackdrop);
    });
  });
  if (notFoundClose) notFoundClose.addEventListener('click', () => closeModal(notFoundModalBackdrop));
  if (notFoundHomeBtn) notFoundHomeBtn.addEventListener('click', () => closeModal(notFoundModalBackdrop));

  /* --------------------------------------------------------------------------
     9. Form Submissions
     -------------------------------------------------------------------------- */
  if (quoteModalForm) {
    quoteModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('quoteClientName');
      const name = nameInput ? nameInput.value.trim() : 'Valued Client';
      closeModal(quoteModalBackdrop);
      quoteModalForm.reset();
      showToast(`Thank you, ${name}! Your service request has been logged. An electrician will call you in 15 mins.`);
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModalBackdrop);
      showToast('Signed in successfully! Welcome to VoltGuard Client Portal.');
    });
  }

  /* --------------------------------------------------------------------------
     10. Interactive Timeline Enhancements
     -------------------------------------------------------------------------- */
  function initTimelineInteractions() {
    const timelineItems = document.querySelectorAll('.timeline-node-item');
    if (!timelineItems.length) return;

    timelineItems.forEach((item) => {
      const marker = item.querySelector('.timeline-center-marker');
      const card = item.querySelector('.timeline-card-box');

      if (marker && card) {
        marker.addEventListener('mouseenter', () => item.classList.add('is-hovered'));
        marker.addEventListener('mouseleave', () => item.classList.remove('is-hovered'));
        card.addEventListener('mouseenter', () => item.classList.add('is-hovered'));
        card.addEventListener('mouseleave', () => item.classList.remove('is-hovered'));
      }
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-node-visible');
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      });

      timelineItems.forEach((item) => observer.observe(item));
    }
  }

  /* --------------------------------------------------------------------------
     11. Hero Discipline Pills & Monograph Showcase
     -------------------------------------------------------------------------- */
  function initHeroDisciplinePills() {
    const pills = document.querySelectorAll('.discipline-pill');
    const monographCard = document.getElementById('heroMonographCard');
    const monographImg = document.getElementById('monographImg');
    const badgeLeft = document.getElementById('monographBadgeLeft');
    const badgeRight = document.getElementById('monographBadgeRight');
    const categoryEl = document.getElementById('monographCategory');
    const titleEl = document.getElementById('monographTitle');
    const excerptEl = document.getElementById('monographExcerpt');
    const authorRole = document.getElementById('monographAuthorRole');

    if (!pills.length || !monographCard) return;

    const DATA = {
      'all': {
        img: 'https://images.unsplash.com/photo-1615774925655-a0e97fc85c14?auto=format&fit=crop&w=900&q=85',
        badgeL: 'FEATURED MONOGRAPH',
        badgeR: '4.9 CODE AUDIT RATING',
        category: 'COPPER INFRASTRUCTURE & SAFETY',
        title: 'The Art of Calibrated Copper & Living Safety Standards',
        excerpt: 'Uniting pure oxygen-free copper conduits with sub-degree thermal infrared audits for enduring architectural and household safety.',
        role: '18 yr exp • Chief Master Wireman'
      },
      'rewiring': {
        img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=900&q=80',
        badgeL: 'MINIMAL INVASIVE',
        badgeR: 'NEC 2024 COMPLIANT',
        category: 'NON-INVASIVE REWIRING',
        title: 'Surgical Cavity Wire Fishing & High-Amp Feeder Lines',
        excerpt: 'Replacing brittle aluminum and knob-and-tube runs with 99.9% oxygen-free THHN copper conductors without wall demolition.',
        role: '15 yr exp • Senior Rewiring Specialist'
      },
      'panels': {
        img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
        badgeL: 'REAL-TIME TELEMETRY',
        badgeR: 'DUAL AFCI/GFCI READY',
        category: 'AUTOMATED DISTRIBUTION',
        title: 'Architectural Smart Panels & Real-Time Telemetry',
        excerpt: 'Balancing split-phase current loads with computerized AFCI/GFCI breakers and automated battery storage shedding.',
        role: '14 yr exp • Smart Infrastructure Lead'
      },
      'ev': {
        img: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80',
        badgeL: 'LEVEL 2 HIGH-AMP',
        badgeR: 'NACS & J1772 CERTIFIED',
        category: 'HIGH-VOLTAGE MOBILITY',
        title: 'Dedicated 240V Rapid EV Charging Architecture',
        excerpt: 'Hardwired Level 2 charging stations with continuous-duty 50A/60A branch circuits and NEMA 4X weather protection.',
        role: '12 yr exp • EV Charging Engineer'
      },
      'thermal': {
        img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
        badgeL: 'FLIR MICRO-BOLOMETER',
        badgeR: '±0.1°C CALIBRATION',
        category: 'INFRARED SENSING',
        title: 'Sub-Degree FLIR Thermography & Micro-Arc Isolation',
        excerpt: 'Locating invisible hot spots, overloaded busbars, and latent ground faults before dangerous thermal runaway occurs.',
        role: '16 yr exp • Certified Thermal Inspector'
      },
      'industrial': {
        img: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=900&q=80',
        badgeL: 'COMMERCIAL 480V',
        badgeR: '22k AIC RATED',
        category: 'THREE-PHASE POWER',
        title: 'Heavy-Duty Industrial Switchboards & Harmonic Filtration',
        excerpt: 'Engineered 480V/240V distribution for commercial complexes with zero operational downtime and emergency SLAs.',
        role: '20 yr exp • Principal Electrical Engineer'
      }
    };

    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');

        const discipline = pill.getAttribute('data-discipline') || 'all';
        const item = DATA[discipline] || DATA['all'];

        monographCard.style.opacity = '0.7';
        monographCard.style.transform = 'translateY(2px)';

        setTimeout(() => {
          if (monographImg) monographImg.src = item.img;
          if (badgeLeft) badgeLeft.textContent = item.badgeL;
          if (badgeRight) badgeRight.textContent = item.badgeR;
          if (categoryEl) categoryEl.textContent = item.category;
          if (titleEl) titleEl.textContent = item.title;
          if (excerptEl) excerptEl.textContent = item.excerpt;
          if (authorRole) authorRole.textContent = item.role;

          monographCard.style.opacity = '1';
          monographCard.style.transform = 'translateY(0)';
        }, 140);
      });
    });
  }

  /* --------------------------------------------------------------------------
     12. Initialization
     -------------------------------------------------------------------------- */
  initTheme();
  initDirection();
  initTimelineInteractions();
  initHeroDisciplinePills();

})();

