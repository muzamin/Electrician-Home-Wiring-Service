/**
 * ============================================================================
 * VOLTGUARD — STANDARD NAVIGATION HIGHLIGHT SCRIPT (standard_nav.js)
 * Automatically highlights the active navigation link corresponding to the
 * page currently being viewed, across both Desktop and Mobile drawer menus.
 * ============================================================================
 */

(function () {
  'use strict';

  function normalizePageName(path) {
    if (!path) return 'index.html';
    let clean = path.split('#')[0].split('?')[0];
    clean = decodeURIComponent(clean);
    const lastSlash = Math.max(clean.lastIndexOf('/'), clean.lastIndexOf('\\'));
    let filename = lastSlash >= 0 ? clean.substring(lastSlash + 1) : clean;
    filename = filename.trim().toLowerCase();

    if (!filename || filename === '' || filename === 'index.html') {
      return 'index.html';
    }
    if (filename === 'home 2.html') {
      return 'home 2.html';
    }
    if (filename === 'about.html') {
      return 'about.html';
    }
    if (filename === 'service.html' || filename === 'service detail.html') {
      return filename;
    }
    if (filename === 'pricing.html') {
      return 'pricing.html';
    }
    if (filename === 'safety.html') {
      return 'safety.html';
    }
    if (filename === 'contact.html') {
      return 'contact.html';
    }
    return filename;
  }

  function highlightActiveNavigation() {
    const currentPage = normalizePageName(window.location.pathname || window.location.href);

    // Desktop elements
    const homeDropdownBtn = document.getElementById('homeDropdownButton');
    const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link:not(.home-dropdown-trigger)');
    const dropdownItems = document.querySelectorAll('.classy-home-dropdown .dropdown-item');

    // Mobile elements
    const mobileHomeAccordionBtn = document.getElementById('mobileHomeAccordionBtn');
    const mobileSublinks = document.querySelectorAll('.mobile-accordion-content .mobile-sublink');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list .mobile-nav-link:not(.accordion-header)');

    // 1. Reset Desktop Active States
    if (homeDropdownBtn) {
      homeDropdownBtn.classList.remove('active-page');
      homeDropdownBtn.removeAttribute('aria-current');
    }
    desktopLinks.forEach(link => {
      link.classList.remove('active-page');
      link.removeAttribute('aria-current');
    });
    dropdownItems.forEach(item => {
      item.classList.remove('active-variant');
      const indicator = item.querySelector('.dropdown-active-indicator');
      if (indicator) indicator.remove();
    });

    // 2. Reset Mobile Active States
    if (mobileHomeAccordionBtn) {
      mobileHomeAccordionBtn.classList.remove('active-page');
      mobileHomeAccordionBtn.removeAttribute('aria-current');
    }
    mobileSublinks.forEach(sub => {
      sub.classList.remove('active-sublink');
    });
    mobileLinks.forEach(link => {
      link.classList.remove('active-page');
      link.removeAttribute('aria-current');
    });

    // 3. Apply Active State Based on Current Page
    if (currentPage === 'index.html') {
      // Home 1 (Residential)
      if (homeDropdownBtn) {
        homeDropdownBtn.classList.add('active-page');
      }
      dropdownItems.forEach(item => {
        const hp = item.getAttribute('data-homepage');
        const href = normalizePageName(item.getAttribute('href') || '');
        if (hp === '1' || href === 'index.html') {
          item.classList.add('active-variant');
          if (!item.querySelector('.dropdown-active-indicator')) {
            const dot = document.createElement('span');
            dot.className = 'dropdown-active-indicator';
            dot.title = 'Active Page';
            item.appendChild(dot);
          }
        }
      });

      if (mobileHomeAccordionBtn) {
        mobileHomeAccordionBtn.classList.add('active-page');
      }
      mobileSublinks.forEach(sub => {
        const hp = sub.getAttribute('data-homepage');
        const href = normalizePageName(sub.getAttribute('href') || '');
        if (hp === '1' || href === 'index.html') {
          sub.classList.add('active-sublink');
        }
      });
    } else if (currentPage === 'home 2.html') {
      // Home 2 (Commercial & Auto)
      if (homeDropdownBtn) {
        homeDropdownBtn.classList.add('active-page');
      }
      dropdownItems.forEach(item => {
        const hp = item.getAttribute('data-homepage');
        const href = normalizePageName(item.getAttribute('href') || '');
        if (hp === '2' || href === 'home 2.html') {
          item.classList.add('active-variant');
          if (!item.querySelector('.dropdown-active-indicator')) {
            const dot = document.createElement('span');
            dot.className = 'dropdown-active-indicator';
            dot.title = 'Active Page';
            item.appendChild(dot);
          }
        }
      });

      if (mobileHomeAccordionBtn) {
        mobileHomeAccordionBtn.classList.add('active-page');
      }
      mobileSublinks.forEach(sub => {
        const hp = sub.getAttribute('data-homepage');
        const href = normalizePageName(sub.getAttribute('href') || '');
        if (hp === '2' || href === 'home 2.html') {
          sub.classList.add('active-sublink');
        }
      });
    } else {
      // Other Pages: About, Services (or Service detail), Pricing, Safety, Contact
      const targetMatches = [currentPage];
      // For service detail, also highlight the parent Services nav
      if (currentPage === 'service detail.html') {
        targetMatches.push('service.html');
      }

      // Desktop Link match
      desktopLinks.forEach(link => {
        const linkPage = normalizePageName(link.getAttribute('href') || '');
        if (targetMatches.includes(linkPage)) {
          link.classList.add('active-page');
          link.setAttribute('aria-current', 'page');
        }
      });

      // Mobile Link match
      mobileLinks.forEach(link => {
        const linkPage = normalizePageName(link.getAttribute('href') || '');
        if (targetMatches.includes(linkPage)) {
          link.classList.add('active-page');
          link.setAttribute('aria-current', 'page');
        }
      });
    }
  }

  // Execute as early as possible
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightActiveNavigation);
  } else {
    highlightActiveNavigation();
  }

  // Expose globally in case dynamic page loaders or view transitions need to re-trigger it
  window.highlightActiveNavigation = highlightActiveNavigation;
})();

