/* ============================================================
   SICPES · Shell Compartido Mejorado
   Gobierna chrome, contexto, migas de pan, búsqueda de pantallas,
   zoom interactivo, paneles colapsables y navegación entre fidelidades.
   ============================================================ */
(function () {
  'use strict';

  const SECTIONS = ['sketches', 'wireframes', 'mockups'];
  const SECTION_LABEL = { sketches: 'SKETCHES', wireframes: 'WIREFRAMES', mockups: 'MOCKUPS' };
  const PLATFORM_LABEL = { mobile: 'MÓVIL', pwa: 'PWA' };
  const ROLE_LABEL = { student: 'ESTUDIANTE', admin: 'ADMINISTRADOR', shared: 'COMUNES (AMBOS ROLES)' };
  const STORE_KEY = 'sicpes-shell-context';

  const state = {
    section: 'wireframes',
    platform: 'mobile',
    role: 'student',
    screen: 'landing',
    history: [],
    zones: false,
    searchQuery: '',
    pending: null
  };

  const zoomState = {
    mode: 'fit',
    manualScale: 1.0,
    currentScale: 1.0
  };

  const $ = selector => document.querySelector(selector);
  const byId = id => document.getElementById(id);

  function data() {
    return window.SICPES_DATA || null;
  }

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[char]);
  }

  function screensForRole(role) {
    const D = data();
    if (!D) return [];
    if (role === 'shared') return D.shared || [];
    return (role === 'admin' ? D.admin : D.student) || [];
  }

  function actionMap() {
    const D = data();
    if (!D) return {};
    return state.platform === 'pwa' ? D.pwaActions : D.actions;
  }

  function screenMeta(screen) {
    const D = data();
    return D && D.screens ? D.screens[screen] : null;
  }

  function screenCode(screen) {
    const D = data();
    return (D && D.codes && D.codes[screen]) || '';
  }

  function screenTitle(screen) {
    const meta = screenMeta(screen);
    return meta ? meta.title : screen;
  }

  function validScreen(screen, role) {
    const screens = screensForRole(role);
    return screens.includes(screen);
  }

  function initialScreen(role) {
    if (role === 'shared') return 'splash';
    return role === 'admin' ? 'adminLogin' : 'landing';
  }

  function signature(detail) {
    return [detail.section, detail.platform, detail.screen, detail.role].join('|');
  }

  function activeSurface() {
    if (state.section === 'sketches') return byId('pencilView');
    if (state.section === 'mockups') return byId('mockupsView');
    return state.platform === 'pwa' ? byId('pwaView') : byId('mobileView');
  }

  function naturalSize() {
    if (state.section === 'sketches') {
      return state.platform === 'mobile'
        ? { width: 440, height: 880 }
        : { width: 1200, height: 820 };
    }
    if (state.section === 'mockups') {
      return state.platform === 'mobile'
        ? { width: 390, height: 844 }
        : { width: 1440, height: 900 };
    }
    return state.platform === 'pwa'
      ? { width: 1440, height: 900 }
      : { width: 414, height: 868 };
  }

  function refit() {
    const device = byId('shellDevice');
    const viewport = byId('surfaceViewport');
    const surface = activeSurface();
    if (!device || !viewport || !surface) return;

    const size = naturalSize();
    const availW = Math.max(120, device.clientWidth - 28);
    const availH = Math.max(120, device.clientHeight - 24);

    let scale = 1.0;
    if (zoomState.mode === 'manual') {
      scale = zoomState.manualScale;
    } else {
      if (state.platform === 'pwa') {
        scale = Math.min(1.35, Math.max(0.35, availW / size.width));
      } else {
        const scaleH = availH / size.height;
        const scaleW = availW / size.width;
        scale = Math.min(1.05, Math.max(0.4, Math.min(scaleH, scaleW)));
      }
    }

    zoomState.currentScale = scale;
    const scaledW = Math.round(size.width * scale);
    const scaledH = Math.round(size.height * scale);

    surface.style.width = size.width + 'px';
    surface.style.height = size.height + 'px';
    surface.style.transform = 'scale(' + scale + ')';
    surface.style.transformOrigin = 'top left';

    viewport.style.width = scaledW + 'px';
    viewport.style.height = scaledH + 'px';

    const vOffset = Math.max(0, Math.round((availH - scaledH) / 2));
    viewport.style.marginTop = vOffset + 'px';

    device.style.setProperty('--surface-scale', String(scale));

    const zoomVal = byId('shellZoomVal');
    if (zoomVal) zoomVal.textContent = Math.round(scale * 100) + '%';
    const fitBtn = byId('shellZoomFit');
    if (fitBtn) fitBtn.classList.toggle('active', zoomState.mode === 'fit');
    const b100Btn = byId('shellZoom100');
    if (b100Btn) b100Btn.classList.toggle('active', zoomState.mode === 'manual' && Math.abs(scale - 1.0) < 0.02);
  }

  function scheduleRefit() {
    requestAnimationFrame(refit);
    setTimeout(refit, 60);
    setTimeout(refit, 220);
  }

  function updateSurfaces() {
    const mobile = byId('mobileView');
    const pwa = byId('pwaView');
    const pencil = byId('pencilView');
    const mockups = byId('mockupsView');
    const device = byId('shellDevice');
    if (!mobile || !pwa || !pencil || !mockups || !device) return;

    mobile.hidden = !(state.section === 'wireframes' && state.platform === 'mobile');
    pwa.hidden = !(state.section === 'wireframes' && state.platform === 'pwa');
    pencil.hidden = state.section !== 'sketches';
    mockups.hidden = state.section !== 'mockups';

    document.body.classList.remove(
      'shell-section-sketches', 'shell-section-wireframes', 'shell-section-mockups',
      'shell-platform-mobile', 'shell-platform-pwa'
    );
    document.body.classList.add('shell-section-' + state.section, 'shell-platform-' + state.platform);
    device.dataset.section = state.section;
    device.dataset.platform = state.platform;

    const frame = byId('mkFrame');
    if (frame) {
      frame.classList.toggle('is-pwa', state.platform === 'pwa');
      frame.classList.toggle('is-mobile', state.platform === 'mobile');
    }
  }

  /* ---------- Migas de pan (Breadcrumbs) ---------- */
  function getBreadcrumbs(screen, role) {
    if (role === 'admin') {
      const paths = {
        splash: [{ id: 'splash', title: 'Splash Screen' }],
        adminLogin: [{ id: 'adminLogin', title: 'Acceso admin' }],
        forgotPassword: [{ id: 'adminLogin', title: 'Acceso admin' }, { id: 'forgotPassword', title: 'Recuperar contraseña' }],
        lockAccount: [{ id: 'adminLogin', title: 'Acceso admin' }, { id: 'lockAccount', title: 'Cuenta bloqueada' }],
        unlockAccount: [{ id: 'adminLogin', title: 'Acceso admin' }, { id: 'lockAccount', title: 'Bloqueo' }, { id: 'unlockAccount', title: 'Código de desbloqueo' }],
        reservations: [{ id: 'reservations', title: 'Reservaciones' }],
        assignRoom: [{ id: 'reservations', title: 'Reservaciones' }, { id: 'assignRoom', title: 'Asignar habitación' }],
        pendingPayments: [{ id: 'pendingPayments', title: 'Pagos pendientes' }],
        validatePayment: [{ id: 'pendingPayments', title: 'Pagos pendientes' }, { id: 'validatePayment', title: 'Validar pago' }],
        debts: [{ id: 'pendingPayments', title: 'Pagos pendientes' }, { id: 'debts', title: 'Adeudos' }],
        floors: [{ id: 'floors', title: 'Pisos y habitaciones' }],
        settings: [{ id: 'settings', title: 'Configuración' }],
        aboutSoftware: [{ id: 'settings', title: 'Configuración' }, { id: 'aboutSoftware', title: 'Acerca del software' }],
        aboutTeam: [{ id: 'settings', title: 'Configuración' }, { id: 'aboutSoftware', title: 'Software' }, { id: 'aboutTeam', title: 'Acerca del equipo' }],
        loading: [{ id: 'adminLogin', title: 'Acceso admin' }, { id: 'loading', title: 'Sincronizando' }]
      };
      return paths[screen] || [{ id: screen, title: screenTitle(screen) }];
    }

    const studentPaths = {
      splash: [{ id: 'splash', title: 'Splash Screen' }],
      landing: [{ id: 'landing', title: 'Landing' }],
      studentLogin: [{ id: 'landing', title: 'Landing' }, { id: 'studentLogin', title: 'Iniciar sesión' }],
      forgotPassword: [{ id: 'studentLogin', title: 'Iniciar sesión' }, { id: 'forgotPassword', title: 'Recuperar contraseña' }],
      lockAccount: [{ id: 'studentLogin', title: 'Iniciar sesión' }, { id: 'lockAccount', title: 'Cuenta bloqueada' }],
      unlockAccount: [{ id: 'studentLogin', title: 'Iniciar sesión' }, { id: 'lockAccount', title: 'Bloqueo' }, { id: 'unlockAccount', title: 'Código de desbloqueo' }],
      register: [{ id: 'studentLogin', title: 'Iniciar sesión' }, { id: 'register', title: 'Crear cuenta' }],
      verifyEmail: [{ id: 'register', title: 'Crear cuenta' }, { id: 'verifyEmail', title: 'Verificar correo' }],
      loading: [{ id: 'loading', title: 'Sincronizando' }],
      home: [{ id: 'home', title: 'Inicio' }],
      reserve: [{ id: 'home', title: 'Inicio' }, { id: 'reserve', title: 'Reservar habitación' }],
      roomDetail: [{ id: 'home', title: 'Inicio' }, { id: 'reserve', title: 'Reservar' }, { id: 'roomDetail', title: 'Detalle de habitación' }],
      requestStatus: [{ id: 'home', title: 'Inicio' }, { id: 'requestStatus', title: 'Estado de mi petición' }],
      payments: [{ id: 'home', title: 'Inicio' }, { id: 'payments', title: 'Gestión de pagos' }],
      paymentDetail: [{ id: 'home', title: 'Inicio' }, { id: 'payments', title: 'Pagos' }, { id: 'paymentDetail', title: 'Detalle de pago' }],
      rateService: [{ id: 'home', title: 'Inicio' }, { id: 'profile', title: 'Cuenta' }, { id: 'rateService', title: 'Evaluar el servicio' }],
      rateConfirm: [{ id: 'home', title: 'Inicio' }, { id: 'rateService', title: 'Evaluar' }, { id: 'rateConfirm', title: 'Confirmación' }],
      profile: [{ id: 'home', title: 'Inicio' }, { id: 'profile', title: 'Cuenta / Perfil' }],
      aboutSoftware: [{ id: 'profile', title: 'Cuenta' }, { id: 'aboutSoftware', title: 'Acerca del software' }],
      aboutTeam: [{ id: 'profile', title: 'Cuenta' }, { id: 'aboutSoftware', title: 'Software' }, { id: 'aboutTeam', title: 'Acerca del equipo' }]
    };
    return studentPaths[screen] || [{ id: screen, title: screenTitle(screen) }];
  }

  function renderBreadcrumbs() {
    const box = byId('shellBreadcrumbs');
    if (!box) return;
    const crumbs = getBreadcrumbs(state.screen, state.role);
    if (!crumbs || crumbs.length <= 1) {
      box.innerHTML = '';
      return;
    }
    box.innerHTML = crumbs.map((crumb, idx) => {
      const isLast = idx === crumbs.length - 1;
      if (isLast) {
        return '<span class="shell-crumb-current" aria-current="page">' + esc(crumb.title) + '</span>';
      }
      return '<button type="button" class="shell-crumb-btn" data-shell-go="' + esc(crumb.id) + '">' + esc(crumb.title) + '</button>' +
        '<span class="shell-crumb-sep">/</span>';
    }).join('');
  }

  /* ---------- Lista de pantallas con apartado de pantallas en común ---------- */
  function renderScreenList() {
    const list = byId('shellScreenList');
    if (!list) return;
    const D = data();
    const sharedIds = (D && D.shared) || [];
    const sharedSet = new Set(sharedIds);
    const screens = screensForRole(state.role);
    const query = (state.searchQuery || '').trim().toLowerCase();
    let matches = 0;

    function renderBtn(id, isShared) {
      const active = id === state.screen;
      const title = screenTitle(id);
      const code = screenCode(id);
      const matchesSearch = !query || code.toLowerCase().includes(query) || title.toLowerCase().includes(query) || (isShared && 'comun común compartida'.includes(query));
      if (matchesSearch) matches++;
      const badge = isShared ? '<em class="shell-shared-badge">COMÚN</em>' : '';
      return '<button type="button" class="screen-link' + (active ? ' active' : '') + (isShared ? ' is-shared' : '') + (matchesSearch ? '' : ' hidden') +
        '" data-shell-go="' + esc(id) + '"' + (active ? ' aria-current="page"' : '') + '>' +
        '<span>' + esc(code) + '</span><span>' + esc(title) + badge + '</span></button>';
    }

    let html = '';
    if (state.role === 'shared') {
      html += '<div class="shell-shared-summary"><strong>Apartado · Pantallas en común (' + sharedIds.length + ')</strong><p>Interfaces compartidas entre <b>Estudiante (Usuario)</b> y <b>Administrador</b>: Splash, Carga, Recuperación, Bloqueo, Desbloqueo, Acerca del software y Acerca del equipo.</p></div>';
      html += sharedIds.map(id => renderBtn(id, true)).join('');
    } else {
      const exclusiveIds = screens.filter(id => !sharedSet.has(id));
      const roleTitle = state.role === 'admin' ? 'Exclusivas · Administrador (' + exclusiveIds.length + ')' : 'Exclusivas · Estudiante (' + exclusiveIds.length + ')';
      html += '<div class="shell-group-title">' + esc(roleTitle) + '</div>';
      html += exclusiveIds.map(id => renderBtn(id, false)).join('');
      html += '<div class="shell-group-title shell-group-shared">Apartado · Pantallas en común (' + sharedIds.length + ')</div>';
      html += sharedIds.map(id => renderBtn(id, true)).join('');
    }

    if (query && matches === 0) {
      list.innerHTML = html + '<div class="shell-no-match">Sin resultados para "' + esc(query) + '"</div>';
    } else {
      list.innerHTML = html;
    }
  }

  function renderDestinations() {
    const box = byId('shellDestinations');
    if (!box) return;
    const actions = actionMap()[state.screen] || [];
    if (!actions.length) {
      box.innerHTML = '<p class="no-destinations">Esta pantalla no tiene destinos directos.</p>';
      return;
    }
    box.innerHTML = actions.map(([id, label]) => {
      return '<button type="button" class="destination-link" data-shell-go="' + esc(id) + '">' +
        '<span>' + esc(label) + '</span><b>→ ' + esc(screenCode(id)) + ' · ' + esc(screenTitle(id)) + '</b></button>';
    }).join('');
  }

  function updateControls() {
    document.querySelectorAll('[data-shell-section]').forEach(button => {
      if (button.classList.contains('brand')) return;
      const active = button.dataset.shellSection === state.section;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('[data-shell-role]').forEach(button => {
      const active = button.dataset.shellRole === state.role;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('[data-shell-platform]').forEach(button => {
      const active = button.dataset.shellPlatform === state.platform;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });

    const next = SECTIONS[(SECTIONS.indexOf(state.section) + 1) % SECTIONS.length];
    const jump = byId('fidelityJump');
    if (jump) {
      jump.textContent = 'Ver en ' + (next.charAt(0).toUpperCase() + next.slice(1));
      jump.title = 'Saltar a ' + next + ' conservando pantalla, rol y plataforma';
    }

    const zones = byId('shellZones');
    if (zones) {
      zones.textContent = state.zones ? 'Ocultar zonas clicables' : 'Mostrar zonas clicables';
      zones.setAttribute('aria-pressed', String(state.zones));
    }

    const roleCaption = byId('shellRoleCaption');
    if (roleCaption) roleCaption.textContent = ROLE_LABEL[state.role];
    const fidelity = byId('shellFidelityCaption');
    if (fidelity) {
      fidelity.textContent = (state.section === 'sketches' ? 'SKETCH' : state.section === 'mockups' ? 'MOCKUP' : 'WIREFRAME') +
        ' · ' + PLATFORM_LABEL[state.platform];
    }

    const sectionLabel = byId('shellSectionLabel');
    if (sectionLabel) {
      sectionLabel.textContent = SECTION_LABEL[state.section] + ' · ' + PLATFORM_LABEL[state.platform];
    }
    document.body.classList.toggle('shell-zones-on', state.zones);
    document.body.classList.toggle('zones-on', state.zones);
    document.body.classList.toggle('pwa-zones-on', state.zones);
  }

  function updateStageLabel() {
    const code = byId('shellScreenCode');
    const label = byId('shellScreenLabel');
    const size = byId('shellSize');
    const meta = screenMeta(state.screen);
    if (code) code.textContent = screenCode(state.screen);
    if (label) label.textContent = meta ? meta.label : String(state.screen).toUpperCase();
    if (size) {
      const dims = state.section === 'sketches'
        ? (state.platform === 'pwa' ? 'LÁMINA · 1200 × 820' : 'LÁMINA · 440 × 880')
        : (state.platform === 'pwa' ? '1440 × 900' : '390 × 844');
      size.textContent = dims;
    }
    renderBreadcrumbs();
  }

  function updateStepNav() {
    const screens = screensForRole(state.role);
    const index = screens.indexOf(state.screen);
    const indicator = byId('shellStepIndicator');
    const prevBtn = byId('shellPrevStep');
    const nextBtn = byId('shellNextStep');

    if (indicator) {
      indicator.textContent = (index >= 0 ? (index + 1) : 1) + ' / ' + screens.length;
    }
    if (prevBtn) {
      const prevId = screens[(index - 1 + screens.length) % screens.length];
      prevBtn.title = 'Anterior: ' + screenCode(prevId) + ' · ' + screenTitle(prevId);
    }
    if (nextBtn) {
      const nextId = screens[(index + 1) % screens.length];
      nextBtn.title = 'Siguiente: ' + screenCode(nextId) + ' · ' + screenTitle(nextId);
    }
  }

  function updateBack() {
    const back = byId('shellBack');
    if (!back) return;
    const hasHistory = state.history.length > 0;
    back.hidden = !hasHistory;
    if (hasHistory) {
      const prev = state.history[state.history.length - 1];
      const prevTitle = prev && prev.screen ? screenTitle(prev.screen) : '';
      back.textContent = '← Volver a ' + (prevTitle || 'anterior');
    }
  }

  function updateCount() {
    const count = byId('shellScreenCount');
    if (!count) return;
    const D = data();
    const sharedLen = (D && D.shared && D.shared.length) || 7;
    if (state.role === 'shared') {
      count.textContent = sharedLen + ' pantallas en común · Estudiante y Administrador (28 totales)';
    } else {
      const total = screensForRole(state.role).length;
      const excl = total - sharedLen;
      count.textContent = total + ' pantallas (' + excl + ' exclusivas + ' + sharedLen + ' en común) · Rol ' + (state.role === 'student' ? 'Estudiante' : 'Administrador');
    }
  }

  function updateUI() {
    updateSurfaces();
    updateControls();
    updateStageLabel();
    renderScreenList();
    renderDestinations();
    updateStepNav();
    updateBack();
    updateCount();
  }

  function closeOverlays() {
    const diagram = byId('diagramView');
    if (diagram && !diagram.hidden) {
      const close = diagram.querySelector('[data-close-diagram]');
      if (close) close.click();
    }
    const map = byId('pwaMapView');
    if (map && !map.hidden) {
      const close = map.querySelector('[data-pwa-close-map]');
      if (close) close.click();
    }
    const shortcuts = byId('shortcutsModal');
    if (shortcuts && !shortcuts.hidden) {
      shortcuts.hidden = true;
    }
  }

  function applyAdapter() {
    const effectiveRole = state.role === 'admin' ? 'admin' : 'student';
    const detail = {
      section: state.section,
      platform: state.platform,
      screen: state.screen,
      role: effectiveRole
    };
    state.pending = signature(detail);

    if (state.section === 'wireframes') {
      const api = state.platform === 'pwa' ? window.SicpesWireframePwa : window.SicpesWireframeMobile;
      if (api) api.showScreen(state.screen, effectiveRole);
    } else if (state.section === 'sketches') {
      if (window.SicpesSketches) window.SicpesSketches.showScreen(state.screen, state.role, state.platform);
    } else if (window.SicpesMockups) {
      window.SicpesMockups.showScreen(state.screen, effectiveRole, state.platform);
    }
  }

  function writeHash() {
    const next = '#' + state.section + '/' + state.platform + '/' + state.role + '/' + state.screen;
    if (location.hash !== next) {
      try {
        history.replaceState(null, '', next);
      } catch (error) {
        location.hash = next;
      }
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        section: state.section,
        platform: state.platform,
        role: state.role,
        screen: state.screen
      }));
    } catch (error) {
      /* almacenamiento no disponible */
    }
  }

  function syncFromDevice(detail) {
    if (!detail || detail.section !== state.section) return;
    const incoming = signature(detail);
    if (state.pending === incoming) {
      state.pending = null;
      return;
    }

    const changed = detail.screen !== state.screen || detail.platform !== state.platform;
    if (!changed) return;

    if (state.role !== 'shared' && (detail.role === 'student' || detail.role === 'admin')) state.role = detail.role;
    if (detail.platform === 'mobile' || detail.platform === 'pwa') state.platform = detail.platform;
    if (detail.screen) state.screen = detail.screen;

    if (!validScreen(state.screen, state.role)) {
      const meta = screenMeta(state.screen);
      state.role = meta && meta.role === 'admin' ? 'admin' : 'student';
    }

    if (state.history.length > 20) state.history.shift();
    state.history.push({
      section: state.section,
      platform: detail.platform || state.platform,
      screen: detail.screen || state.screen,
      role: state.role
    });
    updateUI();
    writeHash();
    persist();
    scheduleRefit();
  }

  function navigate(screen, options) {
    options = options || {};
    if (!screenMeta(screen)) return;

    const meta = screenMeta(screen);
    let nextRole = state.role;
    if (meta.role === 'student' || meta.role === 'admin') {
      nextRole = meta.role;
    }
    const same = screen === state.screen && nextRole === state.role;
    if (options.push !== false && !same) {
      state.history.push({
        section: state.section,
        platform: state.platform,
        screen: state.screen,
        role: state.role
      });
    }
    state.screen = screen;
    state.role = nextRole;
    closeOverlays();
    if (!options.preserveModal && window.SicpesSketches) {
      window.SicpesSketches.closeModal();
    }
    applyAdapter();
    updateUI();
    writeHash();
    persist();
    scheduleRefit();
  }

  function back() {
    const previous = state.history.pop();
    if (!previous) return;
    state.section = previous.section || state.section;
    state.platform = previous.platform || state.platform;
    state.role = previous.role || state.role;
    state.screen = previous.screen || initialScreen(state.role);
    closeOverlays();
    if (window.SicpesSketches) window.SicpesSketches.closeModal();
    applyAdapter();
    updateUI();
    writeHash();
    persist();
    scheduleRefit();
  }

  function step(delta) {
    const screens = screensForRole(state.role);
    const index = screens.indexOf(state.screen);
    if (index < 0) return;
    const nextIndex = (index + delta + screens.length) % screens.length;
    navigate(screens[nextIndex]);
  }

  function setRole(role) {
    if (role !== 'student' && role !== 'admin' && role !== 'shared') return;
    if (role === state.role) return;
    state.role = role;
    state.screen = initialScreen(role);
    state.history = [];
    state.searchQuery = '';
    zoomState.mode = 'fit';
    const searchInput = byId('shellSearchInput');
    if (searchInput) searchInput.value = '';
    closeOverlays();
    if (window.SicpesSketches) window.SicpesSketches.closeModal();
    applyAdapter();
    updateUI();
    writeHash();
    persist();
    scheduleRefit();
  }

  function setPlatform(platform) {
    if (platform !== 'mobile' && platform !== 'pwa') return;
    if (platform === state.platform) return;
    state.platform = platform;
    state.history = [];
    zoomState.mode = 'fit';
    closeOverlays();
    if (window.SicpesSketches) window.SicpesSketches.closeModal();
    applyAdapter();
    updateUI();
    writeHash();
    persist();
    scheduleRefit();
  }

  function setSection(section, options) {
    options = options || {};
    if (!SECTIONS.includes(section) || (section === state.section && !options.force)) return;
    state.section = section;
    state.history = [];
    zoomState.mode = 'fit';
    closeOverlays();
    if (window.SicpesSketches) window.SicpesSketches.closeModal();
    applyAdapter();
    updateUI();
    writeHash();
    persist();
    scheduleRefit();
  }

  function jumpFidelity() {
    const next = SECTIONS[(SECTIONS.indexOf(state.section) + 1) % SECTIONS.length];
    setSection(next);
  }

  function toggleZones() {
    state.zones = !state.zones;
    updateControls();
    persist();
  }

  function openMap() {
    closeOverlays();
    if (state.platform === 'pwa') {
      const button = byId('pwaMap');
      if (button) button.click();
    } else {
      const button = byId('diagramToggle');
      if (button) button.click();
    }

    setTimeout(() => {
      const eyebrow = document.querySelector('#diagramView .eyebrow, #pwaMapView .pwa-eyebrow');
      if (eyebrow) {
        eyebrow.textContent = 'MAPA DE PANTALLAS · ' + SECTION_LABEL[state.section] + ' ' + PLATFORM_LABEL[state.platform];
      }
      document.querySelectorAll('#diagramCanvas .thumb, #pwaMapCanvas .pwa-map-thumb').forEach(thumb => {
        const id = thumb.dataset.go || thumb.dataset.pwaGo;
        const isCurrent = id === state.screen;
        thumb.classList.toggle('current', isCurrent);
      });
    }, 40);
  }

  function toggleShortcutsModal() {
    const modal = byId('shortcutsModal');
    if (!modal) return;
    modal.hidden = !modal.hidden;
  }

  function safeName(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function toast(message) {
    const el = byId('toast') || byId('pwaToast') || byId('mkToast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  function downloadCurrent() {
    if (state.section === 'sketches' && window.SicpesSketches && window.SicpesSketches.downloadCurrent) {
      try {
        window.SicpesSketches.downloadCurrent();
      } catch (error) {
        toast('No se pudo descargar el boceto.');
      }
      return;
    }

    let targetEl = null;
    const baseName = 'sicpes-' + safeName(state.section) + '-' + state.platform + '-' + safeName(screenCode(state.screen));
    if (state.section === 'mockups') {
      targetEl = byId('mkFrame');
    } else if (state.platform === 'pwa') {
      targetEl = document.querySelector('#pwaView .pwa-window');
    } else {
      targetEl = document.querySelector('#mobileView .phone');
    }

    if (!targetEl) {
      toast('No hay pantalla visible para descargar.');
      return;
    }

    if (window.html2canvas) {
      toast('Generando imagen de alta resolución...');
      const surface = activeSurface();
      const prevTransform = surface ? surface.style.transform : '';
      if (surface) surface.style.transform = 'none';

      window.html2canvas(targetEl, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF'
      }).then(canvas => {
        if (surface) surface.style.transform = prevTransform;
        const link = document.createElement('a');
        link.download = baseName + '.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        toast('Descarga completada.');
      }).catch(err => {
        if (surface) surface.style.transform = prevTransform;
        console.error(err);
        toast('Error al exportar la imagen.');
      });
    } else {
      toast('Descarga de alta resolución disponible en Bocetos (SVG/PNG).');
    }
  }

  function parseHash() {
    const raw = decodeURIComponent(location.hash.replace(/^#/, '')).trim().toLowerCase();
    if (!raw) return null;
    const parts = raw.split('/').filter(Boolean);
    if (!SECTIONS.includes(parts[0])) return null;

    const res = { section: parts[0] };
    if (parts[1] === 'pwa' || parts[1] === 'mobile') {
      res.platform = parts[1];
    }
    if (parts[2] === 'student' || parts[2] === 'admin' || parts[2] === 'shared') {
      res.role = parts[2];
    }
    if (parts[3] && screenMeta(parts[3])) {
      res.screen = parts[3];
    } else if (parts[1] && screenMeta(parts[1])) {
      res.screen = parts[1];
    }
    return res;
  }

  function restoreContext() {
    let stored = null;
    try {
      stored = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    } catch (error) {
      stored = null;
    }
    if (!stored) return;

    if (SECTIONS.includes(stored.section)) state.section = stored.section;
    if (stored.platform === 'mobile' || stored.platform === 'pwa') state.platform = stored.platform;
    if (stored.role === 'student' || stored.role === 'admin' || stored.role === 'shared') state.role = stored.role;
    if (stored.screen && validScreen(stored.screen, state.role)) state.screen = stored.screen;
  }

  function init() {
    if (!data()) {
      console.error('[shell] SICPES_DATA no está disponible.');
      return;
    }

    restoreContext();
    const parsed = parseHash();
    if (parsed) {
      state.section = parsed.section;
      if (parsed.platform) state.platform = parsed.platform;
      if (parsed.role) state.role = parsed.role;
      if (parsed.screen) state.screen = parsed.screen;
    }
    if (!validScreen(state.screen, state.role)) state.screen = initialScreen(state.role);

    document.addEventListener('click', event => {
      const diagramThumb = event.target.closest('#diagramView [data-go], #pwaMapView [data-pwa-go], #pwaMapView [data-go]');
      if (diagramThumb) {
        const dest = diagramThumb.dataset.go || diagramThumb.dataset.pwaGo;
        if (dest && screenMeta(dest)) {
          event.preventDefault();
          event.stopPropagation();
          closeOverlays();
          navigate(dest);
          return;
        }
      }
    }, true);

    document.addEventListener('click', event => {
      const section = event.target.closest('[data-shell-section]');
      if (section) {
        event.preventDefault();
        setSection(section.dataset.shellSection);
        return;
      }

      const role = event.target.closest('[data-shell-role]');
      if (role) {
        event.preventDefault();
        setRole(role.dataset.shellRole);
        return;
      }

      const platform = event.target.closest('[data-shell-platform]');
      if (platform) {
        event.preventDefault();
        setPlatform(platform.dataset.shellPlatform);
        return;
      }

      const destination = event.target.closest('[data-shell-go]');
      if (destination) {
        event.preventDefault();
        navigate(destination.dataset.shellGo);
        return;
      }

      if (event.target.closest('#fidelityJump')) {
        event.preventDefault();
        jumpFidelity();
        return;
      }

      if (event.target.closest('#shellBack')) {
        event.preventDefault();
        back();
        return;
      }

      if (event.target.closest('#shellPrevStep')) {
        event.preventDefault();
        step(-1);
        return;
      }

      if (event.target.closest('#shellNextStep')) {
        event.preventDefault();
        step(1);
        return;
      }

      if (event.target.closest('#shellZones')) {
        event.preventDefault();
        toggleZones();
        return;
      }

      if (event.target.closest('#shellMap')) {
        event.preventDefault();
        openMap();
        return;
      }

      if (event.target.closest('#shellShortcutsBtn')) {
        event.preventDefault();
        toggleShortcutsModal();
        return;
      }

      if (event.target.closest('[data-shortcuts-close]')) {
        event.preventDefault();
        const modal = byId('shortcutsModal');
        if (modal) modal.hidden = true;
        return;
      }

      if (event.target.closest('#shellSearchClear')) {
        event.preventDefault();
        const searchInput = byId('shellSearchInput');
        if (searchInput) {
          searchInput.value = '';
          state.searchQuery = '';
          renderScreenList();
          byId('shellSearchClear').hidden = true;
          searchInput.focus();
        }
        return;
      }

      if (event.target.closest('#shellDownload')) {
        event.preventDefault();
        downloadCurrent();
      }
    });

    const zoomInBtn = byId('shellZoomIn');
    const zoomOutBtn = byId('shellZoomOut');
    const zoomFitBtn = byId('shellZoomFit');
    const zoom100Btn = byId('shellZoom100');

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        zoomState.mode = 'manual';
        zoomState.manualScale = Math.min(2.0, Number((zoomState.currentScale + 0.1).toFixed(2)));
        refit();
      });
    }
    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        zoomState.mode = 'manual';
        zoomState.manualScale = Math.max(0.3, Number((zoomState.currentScale - 0.1).toFixed(2)));
        refit();
      });
    }
    if (zoomFitBtn) {
      zoomFitBtn.addEventListener('click', () => {
        zoomState.mode = 'fit';
        refit();
      });
    }
    if (zoom100Btn) {
      zoom100Btn.addEventListener('click', () => {
        zoomState.mode = 'manual';
        zoomState.manualScale = 1.0;
        refit();
      });
    }

    const toggleSidebarBtn = byId('toggleSidebarBtn');
    const expandSidebarBtn = byId('expandSidebarBtn');
    const toggleNavBtn = byId('toggleNavBtn');
    const expandNavBtn = byId('expandNavBtn');
    const workspace = byId('shellWorkspace');

    function toggleLeft() {
      if (!workspace) return;
      workspace.classList.toggle('left-collapsed');
      const isCollapsed = workspace.classList.contains('left-collapsed');
      if (toggleSidebarBtn) {
        toggleSidebarBtn.title = isCollapsed ? 'Expandir panel de pantallas' : 'Colapsar panel de pantallas';
        toggleSidebarBtn.textContent = isCollapsed ? '▶' : '◀';
      }
      scheduleRefit();
    }

    function toggleRight() {
      if (!workspace) return;
      workspace.classList.toggle('right-collapsed');
      const isCollapsed = workspace.classList.contains('right-collapsed');
      if (toggleNavBtn) {
        toggleNavBtn.title = isCollapsed ? 'Expandir panel de destinos' : 'Colapsar panel de destinos';
        toggleNavBtn.textContent = isCollapsed ? '◀' : '▶';
      }
      scheduleRefit();
    }

    if (toggleSidebarBtn) toggleSidebarBtn.addEventListener('click', toggleLeft);
    if (expandSidebarBtn) expandSidebarBtn.addEventListener('click', toggleLeft);
    if (toggleNavBtn) toggleNavBtn.addEventListener('click', toggleRight);
    if (expandNavBtn) expandNavBtn.addEventListener('click', toggleRight);

    const searchInput = byId('shellSearchInput');
    const searchClear = byId('shellSearchClear');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        state.searchQuery = searchInput.value;
        if (searchClear) searchClear.hidden = !searchInput.value;
        renderScreenList();
      });
      searchInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault();
          const firstVisible = document.querySelector('#shellScreenList .screen-link:not(.hidden)');
          if (firstVisible && firstVisible.dataset.shellGo) {
            navigate(firstVisible.dataset.shellGo);
            searchInput.blur();
          }
        } else if (event.key === 'Escape') {
          searchInput.value = '';
          state.searchQuery = '';
          if (searchClear) searchClear.hidden = true;
          renderScreenList();
        }
      });
    }

    window.addEventListener('sicpes:screen', event => {
      syncFromDevice(event.detail);
    });

    window.addEventListener('hashchange', () => {
      const parsedNow = parseHash();
      if (!parsedNow) return;
      let needsRefit = false;
      if (parsedNow.section && parsedNow.section !== state.section) {
        state.section = parsedNow.section;
        needsRefit = true;
      }
      if (parsedNow.platform && parsedNow.platform !== state.platform) {
        state.platform = parsedNow.platform;
        needsRefit = true;
      }
      if (parsedNow.role && parsedNow.role !== state.role) {
        state.role = parsedNow.role;
        needsRefit = true;
      }
      if (parsedNow.screen && parsedNow.screen !== state.screen) {
        state.screen = parsedNow.screen;
      }
      closeOverlays();
      applyAdapter();
      updateUI();
      persist();
      if (needsRefit) scheduleRefit();
    });

    window.addEventListener('keydown', event => {
      const targetTag = (event.target && event.target.tagName) || '';
      if (targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT') {
        return;
      }

      const pencilMod = byId('pencilModal');
      if (pencilMod && !pencilMod.hidden) return;

      if (event.key === 'Escape') {
        closeOverlays();
        return;
      }

      if (event.key === '1') {
        event.preventDefault();
        setSection('sketches');
        return;
      }
      if (event.key === '2') {
        event.preventDefault();
        setSection('wireframes');
        return;
      }
      if (event.key === '3') {
        event.preventDefault();
        setSection('mockups');
        return;
      }

      const keyLower = event.key.toLowerCase();
      if (keyLower === 'm') {
        event.preventDefault();
        setPlatform('mobile');
        return;
      }
      if (keyLower === 'p') {
        event.preventDefault();
        setPlatform('pwa');
        return;
      }
      if (keyLower === 'r') {
        event.preventDefault();
        const order = ['student', 'admin', 'shared'];
        const nextR = order[(order.indexOf(state.role) + 1) % order.length];
        setRole(nextR);
        return;
      }
      if (keyLower === 'z') {
        event.preventDefault();
        toggleZones();
        return;
      }
      if (keyLower === 'd') {
        event.preventDefault();
        openMap();
        return;
      }
      if (event.key === '?' || (keyLower === 'h' && !event.ctrlKey && !event.metaKey)) {
        event.preventDefault();
        toggleShortcutsModal();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
        return;
      }
      if (event.key === 'Backspace') {
        event.preventDefault();
        back();
        return;
      }
      if ((event.key === '+' || event.key === '=') && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        zoomState.mode = 'manual';
        zoomState.manualScale = Math.min(2.0, Number((zoomState.currentScale + 0.1).toFixed(2)));
        refit();
        return;
      }
      if ((event.key === '-' || event.key === '_') && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        zoomState.mode = 'manual';
        zoomState.manualScale = Math.max(0.3, Number((zoomState.currentScale - 0.1).toFixed(2)));
        refit();
        return;
      }
      if (event.key === '0' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        zoomState.mode = 'fit';
        refit();
        return;
      }
    });

    if (window.ResizeObserver) {
      new ResizeObserver(refit).observe(byId('shellDevice'));
    }
    window.addEventListener('resize', scheduleRefit);

    applyAdapter();
    updateUI();
    writeHash();
    persist();
    scheduleRefit();
  }

  window.SicpesShell = {
    getState: function () {
      return {
        section: state.section,
        platform: state.platform,
        role: state.role,
        screen: state.screen
      };
    },
    showScreen: navigate,
    setSection: setSection,
    setPlatform: setPlatform,
    setRole: setRole,
    back: back,
    step: step,
    toggleZones: toggleZones,
    openMap: openMap,
    refit: refit,
    toast: toast
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
