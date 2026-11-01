/**
 * ============================================================================
 * VOLTGUARD — ADVANCED HOME WIRING & ARCHITECTURAL ELECTRICAL (HOME 2)
 * Master Interactive JavaScript (Home 2 Edition)
 *
 * Features:
 *  - Theme Toggle (Dark Mode #101C22 Midnight Teal & Light Mode #EAF8FA Pale Aqua) synchronized with Home 1
 *  - Direction Toggle (LTR & RTL) synchronized with Home 1 (Dynamic LTR/RTL button label)
 *  - Dynamic Copyright Year & Sticky Header Elevation
 *  - Automated Continuous Scrolling Marquee Carousel with smooth pause-on-hover & touch swipe
 *  - Smooth Scrolling for all navigation links with sticky header offset
 *  - Dynamic ScrollSpy tracking active sections
 *  - Interactive Modals System (Quote, Login/Register, Dashboard, Coming Soon, 404)
 *  - Password Visibility Eye Toggle
 *  - Contact & Quote Form Submissions with Toast Feedback
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

  // Marquee Carousel Elements
  const marqueeViewport = document.getElementById('marqueeViewport');
  const marqueeTrack = document.getElementById('marqueeTrack');

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

  // Open Modal Buttons
  const openLoginBtns = document.querySelectorAll('.open-login-btn');
  const openDashboardBtns = document.querySelectorAll('.open-dashboard-btn');
  const openQuoteBtns = document.querySelectorAll('.open-quote-modal-btn');
  const openComingSoonBtns = document.querySelectorAll('.open-coming-soon-btn');
  const open404Btns = document.querySelectorAll('.open-404-btn');

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
     4. Dark / Light Mode System (Synced with Home 1 Preference)
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
     5. RTL / LTR Direction System (Synced with Home 1 Preference)
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
     6. Desktop Classy Dropdown Navigation
     -------------------------------------------------------------------------- */
  function openDropdown() {
    if (!homeDropdownParent || !homeDropdownBtn) return;
    homeDropdownParent.classList.add('dropdown-open');
    homeDropdownBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    if (!homeDropdownParent || !homeDropdownBtn) return;
    homeDropdownParent.classList.remove('dropdown-open');
    homeDropdownBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown(e) {
    if (e) e.stopPropagation();
    if (!homeDropdownParent) return;
    if (homeDropdownParent.classList.contains('dropdown-open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  if (homeDropdownBtn) {
    homeDropdownBtn.addEventListener('click', toggleDropdown);

    // Keyboard Accessibility
    homeDropdownBtn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDropdown();
        const firstItem = homeDropdownParent.querySelector('.dropdown-item');
        if (firstItem) firstItem.focus();
      } else if (e.key === 'Escape') {
        closeDropdown();
      }
    });
  }

  // Hover support with intent grace period
  if (homeDropdownParent) {
    let dropdownTimeout = null;
    homeDropdownParent.addEventListener('mouseenter', () => {
      if (dropdownTimeout) clearTimeout(dropdownTimeout);
      openDropdown();
    });
    homeDropdownParent.addEventListener('mouseleave', () => {
      dropdownTimeout = setTimeout(closeDropdown, 180);
    });
  }

  // Close dropdown on click outside
  document.addEventListener('click', (e) => {
    if (homeDropdownParent && !homeDropdownParent.contains(e.target)) {
      closeDropdown();
    }
  });

  /* --------------------------------------------------------------------------
     7. Mobile Navigation Drawer & Accordion
     -------------------------------------------------------------------------- */
  function openMobileDrawer() {
    if (!mobileDrawer || !mobileDrawerBackdrop) return;
    mobileDrawer.classList.add('active');
    mobileDrawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileDrawer() {
    if (!mobileDrawer || !mobileDrawerBackdrop) return;
    mobileDrawer.classList.remove('active');
    mobileDrawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
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

  // Close mobile drawer upon clicking any navigation link
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (!link.classList.contains('accordion-header')) {
        closeMobileDrawer();
      }
    });
  });

  /* --------------------------------------------------------------------------
     8. Automated Continuous Scrolling Marquee Carousel
     Seamless clone-doubling & hover/touch controls
     -------------------------------------------------------------------------- */
  function initMarqueeCarousel() {
    if (!marqueeTrack) return;

    // Clone the cards so the track has a continuous second set for seamless loop
    const originalCards = Array.from(marqueeTrack.children);
    if (originalCards.length > 0 && originalCards.length <= 8) {
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        marqueeTrack.appendChild(clone);
      });
    }

    // Touch swipe support for mobile
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    if (marqueeViewport) {
      marqueeViewport.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - marqueeViewport.offsetLeft;
        scrollLeft = marqueeViewport.scrollLeft;
      }, { passive: true });

      marqueeViewport.addEventListener('touchend', () => {
        isDown = false;
      }, { passive: true });

      marqueeViewport.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - marqueeViewport.offsetLeft;
        const walk = (x - startX) * 1.5;
        marqueeViewport.scrollLeft = scrollLeft - walk;
      }, { passive: true });
    }
  }
  initMarqueeCarousel();

  /* --------------------------------------------------------------------------
     9. Smooth Scrolling for Internal Links & ScrollSpy
     -------------------------------------------------------------------------- */
  allInternalLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = mainHeader ? mainHeader.offsetHeight : 72;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight + 2;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile drawer if open
        closeMobileDrawer();
        closeDropdown();
      }
    });
  });

  // Dynamic ScrollSpy
  const sectionsToTrack = [
    document.getElementById('home'),
    document.getElementById('about'),
    document.getElementById('services'),
    document.getElementById('pricing'),
    document.getElementById('contact')
  ].filter(Boolean);

  function updateScrollSpy() {
    const scrollPos = window.scrollY + 120;
    let activeId = 'home';

    sectionsToTrack.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        activeId = sec.getAttribute('id');
      }
    });

    desktopNavLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active-link');
      } else if (!href && link.id === 'homeDropdownButton' && activeId === 'home') {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });
  }
  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();

  /* --------------------------------------------------------------------------
     10. Modals Management System
     -------------------------------------------------------------------------- */
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first input or button
    const focusable = modalEl.querySelector('input, select, textarea, button:not(.modal-close-btn)');
    if (focusable) {
      setTimeout(() => focusable.focus(), 80);
    }
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Quote Modal Handlers
  openQuoteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(quoteModalBackdrop);
    });
  });

  if (quoteModalClose) {
    quoteModalClose.addEventListener('click', () => closeModal(quoteModalBackdrop));
  }
  if (quoteModalBackdrop) {
    quoteModalBackdrop.addEventListener('click', (e) => {
      if (e.target === quoteModalBackdrop) closeModal(quoteModalBackdrop);
    });
  }

  // Login Modal Handlers
  openLoginBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(loginModalBackdrop);
    });
  });

  if (loginModalClose) {
    loginModalClose.addEventListener('click', () => closeModal(loginModalBackdrop));
  }
  if (loginModalBackdrop) {
    loginModalBackdrop.addEventListener('click', (e) => {
      if (e.target === loginModalBackdrop) closeModal(loginModalBackdrop);
    });
  }

  // Dashboard Modal Handlers
  openDashboardBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(dashboardModalBackdrop);
    });
  });

  if (dashboardModalClose) {
    dashboardModalClose.addEventListener('click', () => closeModal(dashboardModalBackdrop));
  }
  if (dashboardModalBackdrop) {
    dashboardModalBackdrop.addEventListener('click', (e) => {
      if (e.target === dashboardModalBackdrop) closeModal(dashboardModalBackdrop);
    });
  }

  // Coming Soon Modal Handlers
  openComingSoonBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(comingSoonModalBackdrop);
    });
  });

  if (comingSoonClose) {
    comingSoonClose.addEventListener('click', () => closeModal(comingSoonModalBackdrop));
  }
  if (comingSoonOkBtn) {
    comingSoonOkBtn.addEventListener('click', () => {
      closeModal(comingSoonModalBackdrop);
      showToast('You are on the VIP waitlist for AI Smart Load Center Telemetry!');
    });
  }
  if (comingSoonModalBackdrop) {
    comingSoonModalBackdrop.addEventListener('click', (e) => {
      if (e.target === comingSoonModalBackdrop) closeModal(comingSoonModalBackdrop);
    });
  }

  // 404 Modal Handlers
  open404Btns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(notFoundModalBackdrop);
    });
  });

  if (notFoundClose) {
    notFoundClose.addEventListener('click', () => closeModal(notFoundModalBackdrop));
  }
  if (notFoundHomeBtn) {
    notFoundHomeBtn.addEventListener('click', () => {
      closeModal(notFoundModalBackdrop);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  if (notFoundModalBackdrop) {
    notFoundModalBackdrop.addEventListener('click', (e) => {
      if (e.target === notFoundModalBackdrop) closeModal(notFoundModalBackdrop);
    });
  }

  // Global ESC Key Close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [
        quoteModalBackdrop,
        loginModalBackdrop,
        dashboardModalBackdrop,
        comingSoonModalBackdrop,
        notFoundModalBackdrop
      ].forEach((modal) => {
        if (modal && modal.classList.contains('active')) {
          closeModal(modal);
        }
      });
      closeMobileDrawer();
      closeDropdown();
    }
  });

  /* --------------------------------------------------------------------------
     11. Form Submissions with Interactive Feedback
     -------------------------------------------------------------------------- */
  if (quoteModalForm) {
    quoteModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const customerName = document.getElementById('quoteCustomerName')?.value || 'Client';
      const serviceName = document.getElementById('quoteServiceName')?.value || 'Service';
      closeModal(quoteModalBackdrop);
      quoteModalForm.reset();
      showToast(`Thank you, ${customerName}! Your ${serviceName} dispatch request is scheduled.`);
    });
  }

  // Auth Tabs Switching (Sign In / Register)
  const tabSignInBtn = document.getElementById('tabSignInBtn');
  const tabSignUpBtn = document.getElementById('tabSignUpBtn');
  const registerForm = document.getElementById('registerForm');
  const quickContactForm = document.getElementById('quickContactForm');

  if (tabSignInBtn && tabSignUpBtn && loginForm && registerForm) {
    tabSignInBtn.addEventListener('click', () => {
      tabSignInBtn.classList.add('active');
      tabSignUpBtn.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    });

    tabSignUpBtn.addEventListener('click', () => {
      tabSignUpBtn.classList.add('active');
      tabSignInBtn.classList.remove('active');
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('regFullName')?.value || 'Client';
      closeModal(loginModalBackdrop);
      registerForm.reset();
      showToast(`Welcome to VoltGuard, ${name}! Your resident account is created.`);
    });
  }

  if (quickContactForm) {
    quickContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('quickName')?.value || 'Client';
      quickContactForm.reset();
      showToast(`Thank you, ${name}! A master electrician will call you in under 15 minutes.`);
    });
  }

  if (forgotPasswordBtn) {
    forgotPasswordBtn.addEventListener('click', () => {
      closeModal(loginModalBackdrop);
      showToast('A secure password reset link has been dispatched to your email.');
    });
  }

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', () => {
      closeModal(loginModalBackdrop);
      showToast('Signed in via Google OAuth successfully.');
    });
  }

  if (appleLoginBtn) {
    appleLoginBtn.addEventListener('click', () => {
      closeModal(loginModalBackdrop);
      showToast('Signed in via Apple ID successfully.');
    });
  }

  if (dashDownloadCertBtn) {
    dashDownloadCertBtn.addEventListener('click', () => {
      showToast('Downloading VoltGuard Master Certified Safety Report (PDF)...');
    });
  }

  // Password Visibility Toggle
  togglePasswordBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      this.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  });

  /* --------------------------------------------------------------------------
     12. Initializations
     -------------------------------------------------------------------------- */
  initTheme();
  initDirection();

})();
