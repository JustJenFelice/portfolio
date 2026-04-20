// Intro animations + theme toggle.
// Initial theme class is applied in a small inline <script> in the <head> so the
// correct color scheme is present before first paint; this file handles the
// interactive bits.
(function () {
  'use strict';

  const root = document.documentElement;
  const body = document.body;
  const toggle = document.getElementById('switch');
  const copyrightYear = document.getElementById('copyright-year');
  const darkMql = window.matchMedia('(prefers-color-scheme: dark)');

  function currentMode() {
    return root.classList.contains('is-dark') ? 'dark' : 'light';
  }

  function setMode(mode, options) {
    const save = options && options.save;
    root.classList.toggle('is-dark', mode === 'dark');
    root.classList.toggle('is-light', mode !== 'dark');
    if (toggle) {
      toggle.setAttribute('aria-pressed', mode === 'dark' ? 'true' : 'false');
    }
    if (save) {
      try {
        localStorage.setItem('theme', mode);
      } catch (_) {
        /* storage unavailable; ignore */
      }
    }
  }

  // Sync the initial aria-pressed state with the class applied in <head>.
  setMode(currentMode());

  if (toggle) {
    toggle.addEventListener('click', function () {
      setMode(currentMode() === 'light' ? 'dark' : 'light', { save: true });
    });
  }

  // React to OS-level theme changes only when the user hasn't chosen explicitly.
  function handleOsChange(e) {
    try {
      if (localStorage.getItem('theme')) return;
    } catch (_) {
      /* ignore */
    }
    setMode(e.matches ? 'dark' : 'light');
  }
  if (typeof darkMql.addEventListener === 'function') {
    darkMql.addEventListener('change', handleOsChange);
  } else if (typeof darkMql.addListener === 'function') {
    darkMql.addListener(handleOsChange);
  }

  // Trigger intro transitions on the next frame so the initial unstyled state
  // paints first.
  function markLoaded() {
    body.classList.add('loaded');
  }
  if ('requestAnimationFrame' in window) {
    requestAnimationFrame(function () {
      requestAnimationFrame(markLoaded);
    });
  } else {
    setTimeout(markLoaded, 0);
  }

  if (copyrightYear) {
    copyrightYear.textContent = String(new Date().getFullYear());
  }
})();
