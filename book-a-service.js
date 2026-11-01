/**
 * ============================================================================
 * VOLTGUARD - DEDICATED PREMIUM "BOOK A SERVICE" SCRIPT
 * book-a-service.js
 * ============================================================================
 */

(function () {
  'use strict';

  const htmlEl = document.documentElement;

  // Top action toggles
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');

  // Form elements
  const bookingForm = document.getElementById('voltguardBookingForm');
  const serviceTiles = document.querySelectorAll('.service-tile-btn');
  const selectedServiceInput = document.getElementById('selectedServiceInput');
  const urgencyTiles = document.querySelectorAll('.urgency-card-btn');
  const selectedUrgencyInput = document.getElementById('selectedUrgencyInput');

  // Summary elements
  const summaryServiceName = document.getElementById('summaryServiceName');
  const summaryDispatchNote = document.getElementById('summaryDispatchNote');
  const summaryEstimateVal = document.getElementById('summaryEstimateVal');

  // Views
  const bookingFormView = document.getElementById('bookingFormView');
  const bookingSuccessView = document.getElementById('bookingSuccessView');

  // Success Ticket Fields
  const ticketRefNumber = document.getElementById('ticketRefNumber');
  const ticketService = document.getElementById('ticketService');
  const ticketDateTime = document.getElementById('ticketDateTime');
  const ticketAddress = document.getElementById('ticketAddress');
  const ticketContact = document.getElementById('ticketContact');

  // Toast elements
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  /* --------------------------------------------------------------------------
     1. Toast Notification Helper
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
     2. Dark / Light Mode System (Synced with Site Preference)
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

  /* --------------------------------------------------------------------------
     3. RTL / LTR Direction System (Synced with Site Preference)
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
    showToast(`Direction switched to ${nextDir.toUpperCase()}`);
  }

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', toggleDirection);
  }

  /* --------------------------------------------------------------------------
     4. Service Selection Handler
     -------------------------------------------------------------------------- */
  function updateServiceSelection(serviceKey) {
    let matchedTile = null;

    serviceTiles.forEach(tile => {
      const key = tile.getAttribute('data-service-key');
      if (key === serviceKey) {
        tile.classList.add('selected');
        tile.setAttribute('aria-pressed', 'true');
        matchedTile = tile;
      } else {
        tile.classList.remove('selected');
        tile.setAttribute('aria-pressed', 'false');
      }
    });

    if (matchedTile) {
      const name = matchedTile.getAttribute('data-service-name') || 'Whole-Home Rewiring';
      const price = matchedTile.getAttribute('data-service-price') || '$280+';

      if (selectedServiceInput) selectedServiceInput.value = name;
      if (summaryServiceName) summaryServiceName.textContent = name;
      if (summaryEstimateVal) summaryEstimateVal.textContent = price;
    }
  }

  serviceTiles.forEach(tile => {
    tile.addEventListener('click', function () {
      const key = this.getAttribute('data-service-key');
      updateServiceSelection(key);
    });
  });

  /* --------------------------------------------------------------------------
     5. Urgency / Dispatch Priority Selection Handler
     -------------------------------------------------------------------------- */
  urgencyTiles.forEach(tile => {
    tile.addEventListener('click', function () {
      urgencyTiles.forEach(t => t.classList.remove('selected'));
      this.classList.add('selected');
      const val = this.getAttribute('data-urgency') || 'standard';
      if (selectedUrgencyInput) selectedUrgencyInput.value = val;

      if (summaryDispatchNote) {
        if (val === 'emergency') {
          summaryDispatchNote.innerHTML = '<strong style="color:var(--color-secondary);">⚡ 15-Minute Priority Emergency Dispatch Activated</strong>';
        } else {
          summaryDispatchNote.textContent = 'Scheduled appointment with 2-hour arrival window.';
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     6. Pre-select Service from URL Query Parameter
     -------------------------------------------------------------------------- */
  function checkUrlParamService() {
    try {
      const params = new URLSearchParams(window.location.search);
      const serviceParam = params.get('service');
      if (serviceParam) {
        const normalized = serviceParam.toLowerCase().trim();
        const exists = Array.from(serviceTiles).some(t => t.getAttribute('data-service-key') === normalized);
        if (exists) {
          updateServiceSelection(normalized);
        } else {
          updateServiceSelection('wiring');
        }
      }
    } catch (e) {
      // Fallback
    }
  }

  /* --------------------------------------------------------------------------
     7. Form Submission & Ticket Generation
     -------------------------------------------------------------------------- */
  if (bookingForm) {
    // Set default date to today or tomorrow
    const bookingDateInput = document.getElementById('bookingDate');
    if (bookingDateInput) {
      const today = new Date().toISOString().split('T')[0];
      bookingDateInput.setAttribute('min', today);
      bookingDateInput.value = today;
    }

    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const customerName = document.getElementById('customerName')?.value.trim() || 'Valued Client';
      const customerPhone = document.getElementById('customerPhone')?.value.trim() || 'N/A';
      const customerEmail = document.getElementById('customerEmail')?.value.trim() || 'N/A';
      const customerAddress = document.getElementById('customerAddress')?.value.trim() || 'Local Service District';
      const bookingDate = document.getElementById('bookingDate')?.value || 'Today';
      const bookingTime = document.getElementById('bookingTimeSlot')?.value || 'Morning (8:00 AM – 12:00 PM)';
      const serviceName = selectedServiceInput?.value || 'Whole-Home Rewiring';
      const urgency = selectedUrgencyInput?.value || 'standard';

      // Generate Reference Number
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const refCode = `VG-${new Date().getFullYear()}-${randomId}`;

      // Populate Success View
      if (ticketRefNumber) ticketRefNumber.textContent = refCode;
      if (ticketService) ticketService.textContent = serviceName;
      if (ticketDateTime) {
        ticketDateTime.textContent = urgency === 'emergency' 
          ? '⚡ Immediate Priority (Within 15–20 Mins)' 
          : `${bookingDate} • ${bookingTime}`;
      }
      if (ticketAddress) ticketAddress.textContent = customerAddress;
      if (ticketContact) ticketContact.textContent = `${customerName} (${customerPhone})`;

      // Switch View
      if (bookingFormView) bookingFormView.style.display = 'none';
      if (bookingSuccessView) {
        bookingSuccessView.classList.add('active');
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }

      showToast(`Booking ${refCode} Confirmed! Electrician Dispatched.`);
    });
  }

  // Initialize
  initTheme();
  initDirection();
  checkUrlParamService();
})();
