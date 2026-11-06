/**
 * ============================================================================
 * VOLTGUARD — ELECTRICIAN & HOME WIRING SERVICE
 * Master Interactive JavaScript (Home 1 Edition)
 *
 * Features:
 *  - Theme Toggle (Dark Mode #101C22 Midnight Teal & Light Mode #EAF8FA Pale Aqua) with live persistence
 *  - Direction Toggle (LTR & RTL) with live persistence
 *  - Dynamic Copyright Year & Scroll Sticky Header Elevation
 *  - Precision Smooth Scrolling for All 6 Navigation Links (80px Sticky Offset)
 *  - Dynamic ScrollSpy (Auto-highlights Active Nav Link with Underline)
 *  - Interactive Modals System:
 *      * Quote & Rapid Dispatch Modal (#quoteModalBackdrop)
 *      * Login & Account Portal Modal (#loginModalBackdrop)
 *      * Real-Time Telemetry Customer Dashboard Modal (#dashboardModalBackdrop)
 *      * Feature Coming Soon Notice Modal (#comingSoonModalBackdrop)
 *      * 404 Disconnected Preview Modal (#notFoundModalBackdrop)
 *  - Password Visibility Eye Icon Toggle
 *  - Quick Booking & Quote Form Handlers with Toast Feedback
 *  - Mobile Navigation Drawer with Accordion
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
  const switchHome2Option = document.getElementById('switchHome2Option');

  // Nav Links
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const allInternalLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  // Mobile Drawer
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileHomeAccordionBtn = document.getElementById('mobileHomeAccordionBtn');
  const mobileHomeAccordion = document.getElementById('mobileHomeAccordion');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-sublink');

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

  // Modal Backdrops
  const quoteModalBackdrop = document.getElementById('quoteModalBackdrop');
  const quoteModalClose = document.getElementById('quoteModalClose');
  const quoteModalForm = document.getElementById('quoteModalForm');

  const loginModalBackdrop = document.getElementById('loginModalBackdrop');
  const loginModalClose = document.getElementById('loginModalClose');
  const loginForm = document.getElementById('loginForm');
  const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
  const googleLoginBtn = document.getElementById('googleLoginBtn');
  const appleLoginBtn = document.getElementById('appleLoginBtn');

  const dashboardModalBackdrop = document.getElementById('dashboardModalBackdrop');
  const dashboardModalClose = document.getElementById('dashboardModalClose');
  const dashDownloadCertBtn = document.getElementById('dashDownloadCertBtn');

  const comingSoonModalBackdrop = document.getElementById('comingSoonModalBackdrop');
  const comingSoonClose = document.getElementById('comingSoonClose');
  const comingSoonOkBtn = document.getElementById('comingSoonOkBtn');

  const notFoundModalBackdrop = document.getElementById('notFoundModalBackdrop');
  const notFoundClose = document.getElementById('notFoundClose');
  const notFoundHomeBtn = document.getElementById('notFoundHomeBtn');

  // Open Buttons
  const openLoginBtns = document.querySelectorAll('.open-login-btn');
  const openDashboardBtns = document.querySelectorAll('.open-dashboard-btn');
  const openQuoteBtns = document.querySelectorAll('.open-quote-modal-btn');
  const openComingSoonBtns = document.querySelectorAll('.open-coming-soon-btn');
  const open404Btns = document.querySelectorAll('.open-404-btn');

  // Quick Contact & Booking Form
  const quickContactForm = document.getElementById('quickContactForm');

  // Password Visibility Toggle Buttons
  const togglePasswordBtns = document.querySelectorAll('.toggle-password-btn');

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
    if (window.scrollY > 20) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* --------------------------------------------------------------------------
     3. Toast Notification Helper
     -------------------------------------------------------------------------- */
  function showToast(message, duration = 3400) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('active');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('active');
    }, duration);
  }

  /* --------------------------------------------------------------------------
     4. Dark / Light Mode System (With Live Sync & Persistence)
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
     5. RTL / LTR Direction System (With Live Sync & Persistence)
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
     6. Desktop Dropdown Navigation
     -------------------------------------------------------------------------- */
  let isDropdownOpen = false;

  function openDropdown() {
    if (!homeDropdownParent || !homeDropdownBtn) return;
    isDropdownOpen = true;
    homeDropdownParent.classList.add('open', 'active');
    homeDropdownBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    if (!homeDropdownParent || !homeDropdownBtn) return;
    isDropdownOpen = false;
    homeDropdownParent.classList.remove('open', 'active');
    homeDropdownBtn.setAttribute('aria-expanded', 'false');
  }

  if (homeDropdownBtn) {
    homeDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDropdownOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    if (homeDropdownParent) {
      let dropdownTimer = null;
      homeDropdownParent.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) {
          if (dropdownTimer) clearTimeout(dropdownTimer);
          openDropdown();
        }
      });

      homeDropdownParent.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 1024) {
          dropdownTimer = setTimeout(() => {
            closeDropdown();
          }, 180);
        }
      });
    }
  }

  dropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
      closeDropdown();
    });
  });

  /* --------------------------------------------------------------------------
     7. Mobile Navigation Drawer & Accordion
     -------------------------------------------------------------------------- */
  function openMobileDrawer() {
    if (!mobileDrawer || !mobileDrawerBackdrop) return;
    mobileDrawer.classList.add('active', 'open');
    mobileDrawerBackdrop.classList.add('active', 'open');
    mobileDrawerBackdrop.setAttribute('aria-hidden', 'false');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    if (!mobileDrawer || !mobileDrawerBackdrop) return;
    mobileDrawer.classList.remove('active', 'open');
    mobileDrawerBackdrop.classList.remove('active', 'open');
    mobileDrawerBackdrop.setAttribute('aria-hidden', 'true');
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('active');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  }
  if (mobileDrawerBackdrop) {
    mobileDrawerBackdrop.addEventListener('click', closeMobileDrawer);
  }

  if (mobileHomeAccordionBtn && mobileHomeAccordion) {
    mobileHomeAccordionBtn.addEventListener('click', () => {
      const isOpen = mobileHomeAccordion.classList.contains('open');
      mobileHomeAccordion.classList.toggle('open', !isOpen);
      mobileHomeAccordionBtn.setAttribute('aria-expanded', (!isOpen).toString());
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  /* --------------------------------------------------------------------------
     8. Modal System (Open / Close Handlers)
     -------------------------------------------------------------------------- */
  function openModal(modalEl) {
    if (!modalEl) return;
    closeMobileDrawer();
    closeDropdown();
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const focusable = modalEl.querySelector('input:not([type="hidden"]), select, textarea, button.btn-primary');
    if (focusable) setTimeout(() => focusable.focus(), 120);
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function closeAllModals() {
    const activeModals = document.querySelectorAll('.modal-backdrop.active');
    activeModals.forEach(m => closeModal(m));
  }

  // Quote Modal Triggers
  openQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(quoteModalBackdrop);
    });
  });

  if (quoteModalClose) {
    quoteModalClose.addEventListener('click', () => closeModal(quoteModalBackdrop));
  }

  if (quoteModalForm) {
    quoteModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(quoteModalBackdrop);
      const name = document.getElementById('quoteCustomerName')?.value || 'Valued Customer';
      const svc = document.getElementById('quoteServiceName')?.value || 'Selected Service';
      quoteModalForm.reset();
      showToast(`Thank you, ${name}! Your dispatch quote for ${svc} has been prioritized. Dispatching in 15 mins.`, 4500);
    });
  }

  // Login Modal Triggers
  openLoginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(loginModalBackdrop);
    });
  });

  if (loginModalClose) {
    loginModalClose.addEventListener('click', () => closeModal(loginModalBackdrop));
  }

  // Auth Tabs (Sign In / Register inside modal)
  const registerForm = document.getElementById('registerForm');
  const tabSignInBtn = document.getElementById('tabSignInBtn');
  const tabSignUpBtn = document.getElementById('tabSignUpBtn');

  if (tabSignInBtn && tabSignUpBtn && loginForm && registerForm) {
    tabSignInBtn.addEventListener('click', () => {
      tabSignInBtn.classList.add('active');
      tabSignInBtn.setAttribute('aria-selected', 'true');
      tabSignUpBtn.classList.remove('active');
      tabSignUpBtn.setAttribute('aria-selected', 'false');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    });

    tabSignUpBtn.addEventListener('click', () => {
      tabSignUpBtn.classList.add('active');
      tabSignUpBtn.setAttribute('aria-selected', 'true');
      tabSignInBtn.classList.remove('active');
      tabSignInBtn.setAttribute('aria-selected', 'false');
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value || 'Client';
      closeModal(loginModalBackdrop);
      loginForm.reset();
      showToast(`Welcome back, ${email}! Secure session active.`, 4000);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regFullName')?.value || 'New User';
      closeModal(loginModalBackdrop);
      registerForm.reset();
      showToast(`Account successfully created for ${name}! Welcome to VoltGuard.`, 4500);
    });
  }

  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Password reset link sent to your registered email address.');
    });
  }

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', () => {
      closeModal(loginModalBackdrop);
      showToast('Authenticated securely via Google Identity.');
    });
  }

  if (appleLoginBtn) {
    appleLoginBtn.addEventListener('click', () => {
      closeModal(loginModalBackdrop);
      showToast('Authenticated securely via Apple ID.');
    });
  }

  // Dashboard Modal Triggers
  openDashboardBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(dashboardModalBackdrop);
    });
  });

  if (dashboardModalClose) {
    dashboardModalClose.addEventListener('click', () => closeModal(dashboardModalBackdrop));
  }

  if (dashDownloadCertBtn) {
    dashDownloadCertBtn.addEventListener('click', () => {
      showToast('Generating official IEEE & NECA Safety Compliance Certificate PDF...');
      setTimeout(() => {
        showToast('Safety Certificate #VG-8841-CERT downloaded successfully!');
      }, 1200);
    });
  }

  // Coming Soon Modal Triggers
  openComingSoonBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(comingSoonModalBackdrop);
    });
  });

  if (comingSoonClose) {
    comingSoonClose.addEventListener('click', () => closeModal(comingSoonModalBackdrop));
  }
  if (comingSoonOkBtn) {
    comingSoonOkBtn.addEventListener('click', () => closeModal(comingSoonModalBackdrop));
  }

  // 404 Preview Modal Triggers
  open404Btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(notFoundModalBackdrop);
    });
  });

  if (notFoundClose) {
    notFoundClose.addEventListener('click', () => closeModal(notFoundModalBackdrop));
  }
  if (notFoundHomeBtn) {
    notFoundHomeBtn.addEventListener('click', () => closeModal(notFoundModalBackdrop));
  }

  // Backdrop click listeners for all modals
  const allModals = [quoteModalBackdrop, loginModalBackdrop, dashboardModalBackdrop, comingSoonModalBackdrop, notFoundModalBackdrop];
  allModals.forEach(backdrop => {
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          closeModal(backdrop);
        }
      });
    }
  });

  // Password Visibility Eye Icon Toggle
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const inputWrap = btn.closest('.password-input-wrap');
      if (!inputWrap) return;
      const input = inputWrap.querySelector('input');
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        btn.setAttribute('aria-label', 'Hide password');
      } else {
        input.type = 'password';
        btn.setAttribute('aria-label', 'Show password');
      }
    });
  });

  // Quick Contact & Service Booking Form
  if (quickContactForm) {
    quickContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quickName')?.value || 'Valued Homeowner';
      const svc = document.getElementById('quickService')?.value || 'Electrical Service';
      quickContactForm.reset();
      showToast(`Thank you, ${name}! Your booking for ${svc} has been received. Our dispatch team is calling you now.`, 4800);
    });
  }

  /* --------------------------------------------------------------------------
     9. Precision Smooth Navigation & Section Connection
     -------------------------------------------------------------------------- */
  allInternalLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetHash = this.getAttribute('href');
      if (!targetHash || !targetHash.startsWith('#') || targetHash === '#') return;

      // If link is specifically a modal trigger, skip scroll interception
      if (
        this.classList.contains('open-login-btn') ||
        this.classList.contains('open-dashboard-btn') ||
        this.classList.contains('open-coming-soon-btn') ||
        this.classList.contains('open-404-btn') ||
        this.classList.contains('open-quote-modal-btn')
      ) {
        return;
      }

      const targetElement = document.querySelector(targetHash);
      if (targetElement) {
        e.preventDefault();
        closeMobileDrawer();
        closeDropdown();

        const headerHeight = mainHeader ? mainHeader.getBoundingClientRect().height : 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update active class immediately on clicked desktop link
        desktopNavLinks.forEach(l => l.classList.remove('active-page'));
        if (targetHash === '#home') {
          if (homeDropdownBtn) homeDropdownBtn.classList.add('active-page');
        } else {
          const matchedDesktopLink = document.querySelector(`.desktop-nav .nav-link[href="${targetHash}"]`);
          if (matchedDesktopLink) {
            matchedDesktopLink.classList.add('active-page');
          }
        }

        try {
          history.pushState(null, null, targetHash);
        } catch (_) { }
      }
    });
  });

  /* --------------------------------------------------------------------------
     10. Dynamic ScrollSpy: Auto-Highlights Active Nav Link
     -------------------------------------------------------------------------- */
  const sectionIds = ['home', 'about', 'services', 'pricing', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  function handleScrollSpy() {
    const scrollPos = window.scrollY + 100;

    let currentSectionId = '';
    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (sec.offsetTop <= scrollPos) {
        currentSectionId = sec.getAttribute('id');
        break;
      }
    }

    if (!currentSectionId && sections.length > 0) {
      currentSectionId = sections[0].getAttribute('id');
    }

    if (currentSectionId) {
      desktopNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          link.classList.add('active-page');
        } else if (link.id === 'homeDropdownButton') {
          link.classList.add('active-page');
        } else {
          link.classList.remove('active-page');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScrollSpy, { passive: true });

  /* --------------------------------------------------------------------------
     11. Global Keyboard & Outside Click Handlers
     -------------------------------------------------------------------------- */
  document.addEventListener('click', (e) => {
    if (isDropdownOpen && homeDropdownParent && !homeDropdownParent.contains(e.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeAllModals();

      if (isDropdownOpen) {
        closeDropdown();
        if (homeDropdownBtn) homeDropdownBtn.focus();
      }

      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeMobileDrawer();
        if (mobileMenuToggle) mobileMenuToggle.focus();
      }
    }
  });

  /* --------------------------------------------------------------------------
     12. Initializations
     -------------------------------------------------------------------------- */
  initTheme();
  initDirection();

})();
