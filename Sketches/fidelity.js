/* ============================================================
   SELECTOR DE FIDELIDAD
   Coordina Sketches, Wireframes (móvil/PWA) y Mockups (móvil/PWA)
   conservando pantalla, rol y plataforma al saltar entre secciones.
   ============================================================ */
(function () {
  'use strict';

  const ORDER = ['sketches', 'wireframes', 'mockups'];
  const LABELS = { sketches: 'Sketches', wireframes: 'Wireframes', mockups: 'Mockups' };
  const state = { section: 'wireframes', platform: 'mobile' };

  const $ = sel => document.querySelector(sel);

  function validSection(value) {
    return ORDER.indexOf(value) !== -1;
  }

  function readContext() {
    if (state.section === 'sketches' && window.SicpesSketches) {
      const api = window.SicpesSketches;
      return { screen: api.getScreen(), role: api.getRole(), platform: api.getPlatform() };
    }
    if (state.section === 'mockups' && window.SicpesMockups) {
      const api = window.SicpesMockups;
      return { screen: api.getScreen(), role: api.getRole(), platform: api.getPlatform() };
    }
    const api = state.platform === 'pwa' ? window.SicpesWireframePwa : window.SicpesWireframeMobile;
    if (api) return { screen: api.getScreen(), role: api.getRole(), platform: state.platform };
    return { screen: 'landing', role: 'student', platform: state.platform };
  }

  function closeOverlays() {
    const diagram = $('#diagramView');
    if (diagram && !diagram.hidden) {
      const close = diagram.querySelector('[data-close-diagram]');
      if (close) close.click();
    }
    const map = $('#pwaMapView');
    if (map && !map.hidden) {
      const close = map.querySelector('[data-pwa-close-map]');
      if (close) close.click();
    }
  }

  function paintChrome() {
    const tools = $('#wireframeTools');
    const pencil = $('#pencilView');
    const mobile = $('#mobileView');
    const pwa = $('#pwaView');
    const mockups = $('#mockupsView');

    if (state.section === 'wireframes') {
      if (typeof pwaSetView === 'function') pwaSetView(state.platform);
    } else if (state.section === 'sketches') {
      if (typeof pwaSetView === 'function') pwaSetView('pencil');
    } else {
      if (typeof pwaSetView === 'function') pwaSetView('wireframes');
      if (mobile) mobile.hidden = true;
      if (pwa) pwa.hidden = true;
    }

    if (tools) tools.hidden = state.section !== 'wireframes';
    if (pencil) pencil.hidden = state.section !== 'sketches';
    if (mockups) mockups.hidden = state.section !== 'mockups';
    if (state.section !== 'wireframes') {
      if (mobile) mobile.hidden = true;
      if (pwa) pwa.hidden = true;
    }
  }

  function paintControls() {
    document.querySelectorAll('[data-fidelity]').forEach(button => {
      const active = button.dataset.fidelity === state.section;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    document.querySelectorAll('[data-wire-platform]').forEach(button => {
      const active = button.dataset.wirePlatform === state.platform;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    const next = ORDER[(ORDER.indexOf(state.section) + 1) % ORDER.length];
    const jump = $('#fidelityJump');
    if (jump) {
      jump.textContent = `Ver en ${LABELS[next]}`;
      jump.title = `Saltar a ${LABELS[next]} conservando pantalla, rol y plataforma`;
    }
    document.querySelectorAll('[data-fidelity-jump]').forEach(button => {
      button.title = `Saltar a ${LABELS[next]} conservando pantalla, rol y plataforma`;
    });
  }

  function hashFor() {
    const platform = state.platform === 'pwa' ? '/pwa' : '';
    return '#' + state.section + platform;
  }

  function writeHash() {
    const next = hashFor();
    if (location.hash !== next) history.replaceState(null, '', next);
  }

  function applyWireframes(context) {
    const api = state.platform === 'pwa' ? window.SicpesWireframePwa : window.SicpesWireframeMobile;
    if (!api) return;
    api.showScreen(context.screen, context.role);
  }

  function show(section, context) {
    if (!validSection(section)) return;
    const ctx = context || readContext();
    closeOverlays();
    if (window.SicpesSketches) window.SicpesSketches.closeModal();

    state.section = section;
    if (ctx.platform === 'pwa' || ctx.platform === 'mobile') state.platform = ctx.platform;

    paintChrome();

    if (section === 'wireframes') {
      applyWireframes(ctx);
    } else if (section === 'sketches' && window.SicpesSketches) {
      window.SicpesSketches.showScreen(ctx.screen, ctx.role, state.platform);
    } else if (section === 'mockups' && window.SicpesMockups) {
      window.SicpesMockups.showScreen(ctx.screen, ctx.role, state.platform);
      requestAnimationFrame(() => {
        if (window.SicpesMockups) window.SicpesMockups.refit();
        setTimeout(() => window.SicpesMockups && window.SicpesMockups.refit(), 220);
      });
    }

    paintControls();
    writeHash();
  }

  function jump() {
    const context = readContext();
    const next = ORDER[(ORDER.indexOf(state.section) + 1) % ORDER.length];
    show(next, context);
  }

  function parseHash() {
    const raw = decodeURIComponent(location.hash.replace(/^#/, '')).trim().toLowerCase();
    if (!raw) return null;
    const parts = raw.split('/');
    if (!validSection(parts[0])) return null;
    const platform = parts[1] === 'pwa' ? 'pwa' : parts[1] === 'mobile' ? 'mobile' : null;
    return { section: parts[0], platform: platform };
  }

  document.addEventListener('click', event => {
    const fidelity = event.target.closest('[data-fidelity]');
    if (fidelity) {
      event.preventDefault();
      if (fidelity.dataset.fidelity !== state.section) show(fidelity.dataset.fidelity);
      return;
    }

    const platform = event.target.closest('[data-wire-platform]');
    if (platform) {
      event.preventDefault();
      if (state.section !== 'wireframes' || platform.dataset.wirePlatform !== state.platform) {
        const context = readContext();
        context.platform = platform.dataset.wirePlatform;
        show('wireframes', context);
      }
      return;
    }

    if (event.target.closest('#fidelityJump,[data-fidelity-jump]')) {
      event.preventDefault();
      jump();
      return;
    }

    if (event.target.closest('[data-mk-platform],[data-pencil-platform]')) {
      setTimeout(() => {
        if (state.section !== 'mockups' && state.section !== 'sketches') return;
        const context = readContext();
        if ((context.platform === 'pwa' || context.platform === 'mobile') && context.platform !== state.platform) {
          state.platform = context.platform;
          paintControls();
          writeHash();
        }
      }, 0);
    }
  });

  window.addEventListener('hashchange', () => {
    const parsed = parseHash();
    if (!parsed) return;
    const platform = parsed.platform || 'mobile';
    if (parsed.section === state.section && platform === state.platform) return;
    const context = readContext();
    context.platform = platform;
    show(parsed.section, context);
  });

  function init() {
    const initial = readContext();
    const parsed = parseHash();
    if (parsed) {
      if (parsed.platform) initial.platform = parsed.platform;
      show(parsed.section, initial);
    } else {
      show('wireframes', initial);
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
