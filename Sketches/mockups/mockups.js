/* ============================================================
   MOCKUPS · ALTA FIDELIDAD
   Las 23 pantallas con el diseño final de SICPES.
   Reutiliza MOCK / PWA_MOCK y SCREEN_ACTIONS desde data.js.
   ============================================================ */
(function () {
  'use strict';

  const D = window.SICPES_DATA;
  if (!D) { console.error('[mockups] Falta data.js'); return; }

  const CODES = D.codes;
  const TITLES = {};
  Object.keys(D.screens).forEach(id => { TITLES[id] = D.screens[id].title; });
  const FLOWS = { student: D.student, admin: D.admin };
  const AUTH = new Set(['studentLogin', 'forgotPassword', 'register', 'verifyEmail', 'adminLogin']);
  const ROOT = D.roots;

  const state = {
    screen: 'landing',
    role: 'student',
    platform: 'mobile',
    history: [],
    type: 'Individual',
    filter: 'Todas',
    paymentFilter: 'Todos',
    debtFilter: 'Todos',
    rating: 0,
    timer: null,
    toastTimer: null
  };

  const $ = sel => document.querySelector(sel);
  const canvas = $('#mkCanvas');

  let photoSeq = 0;

  /* ---------- Utilidades ---------- */
  function esc(value) {
    return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function money(value) {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value);
  }
  function data() { return state.platform === 'mobile' ? D.mobile : D.pwa; }
  function isRoot(id) { return state.platform === 'mobile' ? ROOT.has(id) : D.pwaRoots.has(id); }
  function toast(message) {
    const el = $('#mkToast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(state.toastTimer);
    state.toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  }

  const ICONS = {
    home: '<path d="M3 10.8 12 3l9 7.8V21H3V10.8Z"/><path d="M9 21v-7h6v7"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M8 3v3M16 3v3M3 9h18"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
    check: '<path d="m4 12 5 5L20 6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chevronLeft: '<path d="m15 6-6 6 6 6"/>',
    chevronRight: '<path d="m9 6 6 6-6 6"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
    download: '<path d="M12 4v12M7 11l5 5 5-5"/><path d="M4 20h16"/>',
    logout: '<path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.56V21h-4v-.09a1.7 1.7 0 0 0-1-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1H3v-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3.09V3h4v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1H21v4h-.09a1.7 1.7 0 0 0-1.51 1Z"/>',
    bed: '<path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6"/><path d="M3 18h18M3 21v-3M21 21v-3"/><path d="M7 10V7h5v3"/>',
    wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0M11 18.5a2 2 0 0 1 2 0"/><circle cx="12" cy="21" r=".5" fill="currentColor"/>',
    shield: '<path d="M12 3 4.5 6v5c0 4.7 3.2 8.2 7.5 10 4.3-1.8 7.5-5.3 7.5-10V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
    star: '<path d="m12 3 2.7 5.5 6 .9-4.4 4.3 1 6-5.3-2.8L6.7 19.7l1-6L3.3 9.4l6-.9L12 3Z"/>',
    mapPin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    building: '<path d="M4 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17"/><path d="M15 9h4a1 1 0 0 1 1 1v11M2 21h20"/><path d="M7 7h4M7 11h4M7 15h4M18 13h.01M18 17h.01"/>',
    wallet: '<path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M3 9h16M16 13h2"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.5a6.5 6.5 0 0 1 3.5 5.5"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M16 7l3 3M14 9l3 3"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    sparkles: '<path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z"/><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z"/>',
    leaf: '<path d="M20 4C10 4 4 8 4 16c0 2 1 4 1 4s2-1 4-1c8 0 11-6 11-15Z"/><path d="M4 20c3-6 7-9 12-11"/>',
    bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    qr: '<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2zM18 14h2v6h-2zM14 18h2v2h-2z"/>',
    phone: '<path d="M6 3h3l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'
  };

  function icon(name, size) {
    const body = ICONS[name] || ICONS.sparkles;
    return `<svg class="mk-icon" width="${size || 18}" height="${size || 18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  }

  function statusKey(value) {
    const s = String(value).toLowerCase();
    if (s.includes('acept') || s.includes('pagado') || s.includes('disponible')) return 'ok';
    if (s.includes('revis')) return 'rev';
    if (s.includes('rechaz') || s.includes('vencid')) return 'no';
    return 'pend';
  }
  function status(value, extra) {
    return `<span class="mk-status mk-${statusKey(value)}${extra ? ' ' + extra : ''}"><i></i>${esc(value)}</span>`;
  }

  function logoLockup(compact) {
    return `<span class="mk-logo-lockup${compact ? ' mk-logo-compact' : ''}"><img class="mk-logo-img" src="../images/SICPES_Producto.png" alt="SICPES"><span class="mk-logo-word">SICPES<small>Residencial</small></span></span>`;
  }
  function avatar(name, extra) {
    const initials = String(name || 'SICPES').split(' ').filter(Boolean).slice(0, 2).map(x => x[0]).join('').toUpperCase();
    return `<span class="mk-avatar${extra ? ' ' + extra : ''}">${initials}</span>`;
  }

  function photo(kind) {
    const id = 'mkpg' + (++photoSeq);
    const label = kind === 'building' ? 'Residencia SICPES' : kind === 'receipt' ? 'Comprobante de pago' : kind === 'success' ? 'Evaluación enviada' : 'Habitación de la residencia';
    let body = '';
    if (kind === 'building') {
      body = `
        <rect width="640" height="420" fill="#E5F1E8"/>
        <circle cx="520" cy="82" r="46" fill="#F6D98B" opacity=".85"/>
        <rect x="70" y="96" width="210" height="300" rx="10" fill="#D9E7DC"/>
        <rect x="210" y="60" width="260" height="336" rx="12" fill="#FDFBF7"/>
        <rect x="406" y="140" width="160" height="256" rx="10" fill="#CFE4D5"/>
        <rect x="240" y="96" width="44" height="46" rx="5" fill="#81C784"/>
        <rect x="306" y="96" width="44" height="46" rx="5" fill="#81C784"/>
        <rect x="372" y="96" width="44" height="46" rx="5" fill="#81C784"/>
        <rect x="240" y="164" width="44" height="46" rx="5" fill="#81C784"/>
        <rect x="306" y="164" width="44" height="46" rx="5" fill="#81C784"/>
        <rect x="372" y="164" width="44" height="46" rx="5" fill="#81C784"/>
        <rect x="304" y="304" width="76" height="92" rx="6" fill="#2F8A5C"/>
        <rect x="118" y="146" width="44" height="36" rx="4" fill="#FDFBF7" opacity=".8"/>
        <rect x="184" y="146" width="44" height="36" rx="4" fill="#FDFBF7" opacity=".8"/>
        <rect x="118" y="208" width="44" height="36" rx="4" fill="#FDFBF7" opacity=".8"/>
        <rect x="184" y="208" width="44" height="36" rx="4" fill="#FDFBF7" opacity=".8"/>
        <path d="M40 396c16-40 28-56 44-72 22 24 32 48 36 72Z" fill="#4CAF50"/>
        <path d="M548 396c14-44 26-64 48-84 20 28 28 52 32 84Z" fill="#2F8A5C"/>
        <path d="M492 396c10-32 20-46 34-62 16 20 24 42 28 62Z" fill="#81C784"/>
        <rect x="0" y="392" width="640" height="28" fill="#C7CCB9"/>
      `;
    } else if (kind === 'receipt') {
      body = `
        <rect width="640" height="420" fill="#EDF5EF"/>
        <rect x="190" y="34" width="260" height="352" rx="14" fill="#FDFBF7" stroke="#C7CCB9" stroke-width="2"/>
        <rect x="218" y="64" width="90" height="12" rx="6" fill="#2F8A5C"/>
        <rect x="218" y="88" width="150" height="8" rx="4" fill="#C7CCB9"/>
        <rect x="218" y="128" width="204" height="48" rx="8" fill="#F0F6F0"/>
        <rect x="234" y="144" width="60" height="8" rx="4" fill="#81C784"/>
        <rect x="234" y="158" width="104" height="8" rx="4" fill="#C7CCB9"/>
        <path d="M218 200h204M218 228h204M218 256h150" stroke="#D7E3D8" stroke-width="2" stroke-linecap="round"/>
        <circle cx="320" cy="316" r="30" fill="#DCFCE7"/>
        <path d="m306 316 10 10 20-22" fill="none" stroke="#2F8A5C" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    } else if (kind === 'success') {
      body = `
        <rect width="640" height="420" fill="#F3FAF4"/>
        <circle cx="320" cy="196" r="118" fill="#DCFCE7"/>
        <circle cx="320" cy="196" r="84" fill="#81C784" opacity=".45"/>
        <circle cx="320" cy="196" r="56" fill="#2F8A5C"/>
        <path d="m292 196 20 20 40-46" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M112 126c16-30 30-44 50-58 16 22 24 44 27 58Z" fill="#81C784"/>
        <path d="M492 330c18-36 32-52 54-66 18 24 26 48 29 66Z" fill="#4CAF50"/>
        <circle cx="128" cy="316" r="12" fill="#C7CCB9"/>
        <circle cx="510" cy="96" r="9" fill="#F6D98B"/>
      `;
    } else {
      const variant = kind === 'room2' ? 2 : kind === 'room3' ? 3 : 1;
      const wall = variant === 2 ? '#EAF4EC' : variant === 3 ? '#F8F1E8' : '#F3EFE6';
      const blanket = variant === 2 ? '#4CAF50' : variant === 3 ? '#81C784' : '#2F8A5C';
      const pillow = variant === 3 ? '#FFF5E8' : '#FFFFFF';
      body = `
        <rect width="640" height="420" fill="${wall}"/>
        <rect x="0" y="300" width="640" height="120" fill="#E6DFD2"/>
        <rect x="44" y="48" width="212" height="166" rx="10" fill="#BFDDE8"/>
        <rect x="44" y="48" width="212" height="166" rx="10" fill="none" stroke="#FDFBF7" stroke-width="10"/>
        <path d="M56 196h188M150 56v146" stroke="#FDFBF7" stroke-width="5" opacity=".85"/>
        <path d="M58 62c30 22 38 54 26 88M244 62c-30 22-38 54-26 88" fill="none" stroke="#FDFBF7" stroke-width="9" stroke-linecap="round" opacity=".75"/>
        <rect x="300" y="238" width="290" height="84" rx="18" fill="${blanket}"/>
        <rect x="316" y="204" width="112" height="58" rx="12" fill="${pillow}"/>
        <rect x="442" y="216" width="118" height="46" rx="10" fill="#E9F3EA"/>
        <rect x="300" y="316" width="290" height="14" rx="7" fill="#1F5D3E" opacity=".35"/>
        <rect x="268" y="260" width="30" height="82" rx="8" fill="#8B6B4A"/>
        <circle cx="282" cy="248" r="17" fill="#C7CCB9"/>
        <rect x="66" y="312" width="128" height="10" rx="5" fill="#C7CCB9"/>
        <rect x="86" y="336" width="96" height="10" rx="5" fill="#D8D2C6"/>
        <path d="M576 300c-12-28-12-56 4-82 18 18 28 40 30 66 0 8-2 14-4 16Z" fill="#4CAF50"/>
        <path d="M590 300v-64" stroke="#2F8A5C" stroke-width="5" stroke-linecap="round"/>
        <rect x="562" y="300" width="48" height="24" rx="6" fill="#8B6B4A"/>
      `;
    }
    return `<svg class="mk-photo" viewBox="0 0 640 420" role="img" aria-label="${esc(label)}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".18"/><stop offset="1" stop-color="#2F8A5C" stop-opacity=".14"/></linearGradient></defs>${body}<rect width="640" height="420" fill="url(#${id})"/></svg>`;
  }

  function field(label, placeholder, type, value) {
    return `<label class="mk-field"><span>${label}</span><input type="${type || 'text'}" placeholder="${placeholder || ''}" value="${esc(value || '')}"></label>`;
  }
  function pageHead(eyebrow, title, lead, right) {
    return `<div class="mk-page-head"><div><span class="mk-eyebrow">${eyebrow}</span><h1 class="mk-page-title">${title}</h1>${lead ? `<p class="mk-lead">${lead}</p>` : ''}</div>${right ? `<div class="mk-head-actions">${right}</div>` : ''}</div>`;
  }
  function stat(label, value, iconName) {
    return `<div class="mk-stat"><span class="mk-stat-icon">${icon(iconName, 17)}</span><strong>${value}</strong><small>${label}</small></div>`;
  }
  function emptyNote(text) { return `<p class="mk-empty-note">${text}</p>`; }
  function filterTabs(values, active, key) {
    return `<div class="mk-filter-tabs">${values.map(v => `<button type="button" class="mk-filter-tab${v === active ? ' active' : ''}" data-mk-filter="${esc(v)}" data-mk-filter-key="${key}">${esc(v)}</button>`).join('')}</div>`;
  }

  function mobileStatus() {
    return `<div class="mk-statusbar"><span>9:41</span><span class="mk-status-icons">${icon('wifi', 13)}<span class="mk-battery"></span></span></div>`;
  }
  function browserBar(route) {
    return `<div class="mk-browser"><span class="mk-browser-dots"><i></i><i></i><i></i></span><span class="mk-browser-url">app.sicpes.mx${esc(route || '/')}</span><span class="mk-browser-mini">◻ ◻</span></div>`;
  }

  function navItems(role, platform) {
    return role === 'student'
      ? [['home', 'home', 'Inicio'], ['reserve', 'calendar', platform === 'pwa' ? 'Reservar' : 'Peticiones'], ['payments', 'card', 'Pagos'], ['profile', 'user', 'Cuenta']]
      : [['reservations', 'calendar', 'Reservaciones'], ['pendingPayments', 'wallet', 'Pagos'], ['floors', 'building', 'Pisos'], ['settings', 'settings', 'Configuración']];
  }
  function activeNav(id) {
    if (id === 'home' || id === 'requestStatus' || id === 'rateConfirm') return 'home';
    if (id === 'reserve' || id === 'roomDetail') return 'reserve';
    if (id === 'payments' || id === 'paymentDetail') return 'payments';
    if (id === 'profile' || id === 'rateService') return 'profile';
    if (id === 'reservations' || id === 'assignRoom') return 'reservations';
    if (id === 'pendingPayments' || id === 'validatePayment' || id === 'debts') return 'pendingPayments';
    if (id === 'floors') return 'floors';
    if (id === 'settings') return 'settings';
    return '';
  }

  function mobileShell(role, active, content) {
    const M = data();
    const name = role === 'student' ? M.student.name : 'Admin SICPES';
    return `<div class="mk-app mk-mobile-app">
      ${mobileStatus()}
      <header class="mk-appbar">
        <button class="mk-brand-btn" type="button" data-mk-go="${role === 'student' ? 'home' : 'reservations'}">${logoLockup(true)}</button>
        <div class="mk-appbar-actions">
          <button type="button" class="mk-iconbtn" data-mk-go="${role === 'student' ? 'payments' : 'pendingPayments'}" aria-label="Avisos">${icon('bell', 18)}<i class="mk-dot"></i></button>
          ${avatar(name, 'mk-avatar-sm')}
        </div>
      </header>
      <main class="mk-scroll">${content}</main>
      <nav class="mk-bottomnav" aria-label="Navegación principal">${navItems(role, 'mobile').map(([id, ic, label]) => `<button type="button" class="mk-navitem${active === id ? ' active' : ''}" data-mk-go="${id}">${icon(ic, 20)}<span>${label}</span></button>`).join('')}</nav>
    </div>`;
  }

  function pwaShell(role, active, content) {
    const M = data();
    const name = role === 'student' ? M.student.name : 'Admin SICPES';
    const links = navItems(role, 'pwa');
    const route = (D.pwaScreens[state.screen] && D.pwaScreens[state.screen].route) || '/';
    return `<div class="mk-app mk-pwa-app">
      ${browserBar(route)}
      <header class="mk-pwa-top">
        <button class="mk-brand-btn" type="button" data-mk-go="${role === 'student' ? 'home' : 'reservations'}">${logoLockup()}</button>
        <nav class="mk-pwa-links" aria-label="Navegación principal">${links.map(([id, ic, label]) => `<button type="button" class="mk-pwa-link${active === id ? ' active' : ''}" data-mk-go="${id}">${icon(ic, 16)}${label}</button>`).join('')}</nav>
        <div class="mk-pwa-user">${avatar(name, 'mk-avatar-sm')}<span>${esc(name)}</span><button type="button" class="mk-iconbtn" data-mk-go="${role === 'student' ? 'payments' : 'pendingPayments'}" aria-label="Avisos">${icon('bell', 17)}<i class="mk-dot"></i></button></div>
      </header>
      <div class="mk-pwa-body">
        <aside class="mk-pwa-side">
          <span class="mk-side-label">${role === 'student' ? 'RESIDENTE' : 'ADMINISTRACIÓN'}</span>
          ${links.map(([id, ic, label]) => `<button type="button" class="mk-side-item${active === id ? ' active' : ''}" data-mk-go="${id}">${icon(ic, 17)}<span>${label}</span></button>`).join('')}
          <div class="mk-side-help"><span class="mk-side-label">AYUDA</span><button type="button" class="mk-side-item" data-mk-go="${role === 'student' ? 'profile' : 'settings'}">${icon('shield', 17)}<span>Soporte SICPES</span></button></div>
        </aside>
        <main class="mk-pwa-main">${content}</main>
      </div>
    </div>`;
  }

  function authFrame(role, content) {
    const M = data();
    const isAdmin = role === 'admin';
    if (state.platform === 'mobile') {
      return `<div class="mk-app mk-auth-m">
        ${mobileStatus()}
        <div class="mk-auth-m-top"><button type="button" class="mk-iconbtn" data-mk-go="landing" aria-label="Volver">${icon('chevronLeft', 20)}</button>${logoLockup(true)}<span class="mk-auth-m-top-spacer"></span></div>
        <div class="mk-auth-m-scroll"><div class="mk-auth-m-card">${content}</div></div>
        <div class="mk-auth-m-foot">${icon('shield', 14)} Entorno seguro para residentes SICPES</div>
      </div>`;
    }
    return `<div class="mk-app mk-auth-pwa">
      ${browserBar(isAdmin ? '/admin' : '/login')}
      <aside class="mk-auth-art${isAdmin ? ' mk-auth-art-admin' : ''}">
        ${logoLockup()}
        <span class="mk-eyebrow">${isAdmin ? 'ACCESO RESTRINGIDO' : 'PORTAL DEL RESIDENTE'}</span>
        <h2>${isAdmin ? 'Control total de la residencia.' : 'Tu residencia, en un solo lugar.'}</h2>
        <p>${isAdmin ? 'Gestiona reservaciones, pagos y espacios desde un panel diseñado para administración.' : 'Consulta tu habitación, sube comprobantes y mantente al día con los avisos de SICPES.'}</p>
        <div class="mk-auth-art-visual">${photo(isAdmin ? 'building' : 'room2')}</div>
        <ul class="mk-checklist">
          <li>${icon('check', 15)} ${isAdmin ? 'Reservaciones y pagos centralizados' : 'Reserva y consulta tu habitación'}</li>
          <li>${icon('check', 15)} ${isAdmin ? 'Validación de comprobantes' : 'Pagos y comprobantes en línea'}</li>
          <li>${icon('check', 15)} ${isAdmin ? 'Inventario de pisos y espacios' : 'Avisos y evaluación del servicio'}</li>
        </ul>
      </aside>
      <main class="mk-auth-panel"><div class="mk-auth-p-card">${content}</div><p class="mk-auth-p-foot">© 2025 SICPES · Residencias estudiantiles</p></main>
    </div>`;
  }

  function landingFrame(content) {
    if (state.platform === 'mobile') {
      return `<div class="mk-app mk-landing-m">${mobileStatus()}<div class="mk-landing-scroll">${content}</div></div>`;
    }
    return `<div class="mk-app mk-landing-pwa">${browserBar('/')}${content}</div>`;
  }

  function loadingFrame(content) {
    if (state.platform === 'mobile') {
      return `<div class="mk-app mk-loading-m">${mobileStatus()}${content}</div>`;
    }
    return `<div class="mk-app mk-loading-pwa">${browserBar('/cargando')}${content}</div>`;
  }

  /* ---------- Vistas ---------- */
  function landingView() {
    return `<div class="mk-landing">
      <header class="mk-public-top">
        ${logoLockup()}
        <nav class="mk-public-links">
          <button type="button" data-mk-go="roomDetail">Habitaciones</button>
          <button type="button" data-mk-go="reserve">Reservar</button>
          <button type="button" class="mk-btn mk-ghost mk-sm" data-mk-go="studentLogin">Iniciar sesión</button>
        </nav>
        <button type="button" class="mk-menu-btn" data-mk-go="studentLogin" aria-label="Abrir menú">${icon('menu', 22)}</button>
      </header>
      <div class="mk-landing-grid">
        <div class="mk-landing-copy">
          <span class="mk-eyebrow">VIVIENDA UNIVERSITARIA · 2025</span>
          <h1 class="mk-display">Encuentra tu espacio ideal para vivir y estudiar</h1>
          <p class="mk-lead">Una residencia segura, cómoda y cerca de tu campus. Reserva, paga y resuelve todo desde un mismo lugar.</p>
          <div class="mk-cta-row">
            <button type="button" class="mk-btn mk-primary" data-mk-go="reserve">Explorar habitaciones ${icon('arrowRight', 17)}</button>
            <button type="button" class="mk-btn mk-ghost" data-mk-go="studentLogin">Iniciar sesión</button>
          </div>
          <div class="mk-trust-row">
            <span>${icon('shield', 16)} Espacios verificados</span>
            <span>${icon('star', 16)} 4.9 / 5 residencias</span>
          </div>
        </div>
        <div class="mk-landing-art">
          <div class="mk-photo-wrap mk-photo-hero">${photo('room')}</div>
          <div class="mk-floating-card mk-float-main">
            <span class="mk-status mk-ok"><i></i>Disponible</span>
            <strong>Habitación 204</strong>
            <small>Individual · ${money(2500)}/mes</small>
          </div>
          <div class="mk-floating-card mk-float-secondary">${icon('shield', 17)} Pago seguro y comprobantes en línea</div>
        </div>
      </div>
      <div class="mk-feature-row">
        <article class="mk-feature">${icon('building', 22)}<strong>Residencias verificadas</strong><span>Espacios seguros y equipados</span></article>
        <article class="mk-feature">${icon('wallet', 22)}<strong>Pagos en línea</strong><span>Sube tu comprobante sin trámites</span></article>
        <article class="mk-feature">${icon('leaf', 22)}<strong>Comunidad SICPES</strong><span>Cerca de tu campus y tu gente</span></article>
      </div>
      <footer class="mk-landing-footer"><span>${logoLockup(true)}</span><span>© 2025 SICPES · Residencias estudiantiles</span></footer>
    </div>`;
  }

  function studentLoginView() {
    return `<span class="mk-eyebrow">INICIAR SESIÓN</span>
      <h2 class="mk-auth-title">Qué gusto verte de nuevo.</h2>
      <p class="mk-lead">Ingresa a tu cuenta para continuar con tu reservación.</p>
      ${field('CORREO ELECTRÓNICO', 'nombre@correo.com', 'email')}
      ${field('CONTRASEÑA', '••••••••', 'password')}
      <div class="mk-inline-between"><label class="mk-checkline"><input type="checkbox"> Recordarme</label><button type="button" class="mk-text-link" data-mk-go="forgotPassword">¿Olvidaste tu contraseña?</button></div>
      <button type="button" class="mk-btn mk-primary mk-block" data-mk-action="student-login">Entrar ${icon('arrowRight', 17)}</button>
      <div class="mk-divider">O CONTINÚA CON</div>
      <div class="mk-social-row"><button type="button" data-mk-action="social">Google</button><button type="button" data-mk-action="social">Facebook</button><button type="button" data-mk-action="social">LinkedIn</button></div>
      <p class="mk-auth-note">¿No tienes cuenta? <button type="button" class="mk-text-link" data-mk-go="register">Regístrate</button></p>`;
  }

  function adminLoginView() {
    return `<span class="mk-eyebrow">SICPES · ADMINISTRACIÓN</span>
      <h2 class="mk-auth-title">Panel administrativo</h2>
      <p class="mk-lead">Acceso exclusivo para personal autorizado.</p>
      ${field('CORREO ADMINISTRADOR', 'admin@sicpes.mx', 'email')}
      ${field('CONTRASEÑA', '••••••••', 'password')}
      <button type="button" class="mk-btn mk-primary mk-block" data-mk-action="admin-login">Entrar al panel ${icon('arrowRight', 17)}</button>
      <div class="mk-security-note">${icon('shield', 18)} <span>Conexión segura. Los accesos quedan registrados.</span></div>
      <p class="mk-auth-note">¿Eres estudiante? <button type="button" class="mk-text-link" data-mk-go="studentLogin">Ir al portal</button></p>`;
  }

  function registerView() {
    return `<span class="mk-eyebrow">NUEVO RESIDENTE</span>
      <h2 class="mk-auth-title">Crea tu cuenta</h2>
      <p class="mk-lead">Registra tus datos para comenzar tu reservación.</p>
      <div class="mk-form-grid">
        ${field('NOMBRE COMPLETO', 'Nombre y apellidos')}
        ${field('CORREO ELECTRÓNICO', 'nombre@correo.com', 'email')}
        ${field('CONTRASEÑA', 'Mínimo 8 caracteres', 'password')}
        ${field('CONFIRMAR CONTRASEÑA', 'Repite tu contraseña', 'password')}
      </div>
      <label class="mk-checkline"><input type="checkbox"> Acepto los términos, condiciones y el aviso de privacidad.</label>
      <button type="button" class="mk-btn mk-primary mk-block" data-mk-action="register">Registrarme ${icon('arrowRight', 17)}</button>
      <p class="mk-auth-note">¿Ya tienes cuenta? <button type="button" class="mk-text-link" data-mk-go="studentLogin">Iniciar sesión</button></p>`;
  }

  function forgotPasswordView() {
    return `<span class="mk-eyebrow">RECUPERAR ACCESO</span>
      <h2 class="mk-auth-title">Recupera tu contraseña</h2>
      <p class="mk-lead">Escribe tu correo y te enviaremos un enlace seguro para restablecerla.</p>
      ${field('CORREO ELECTRÓNICO', 'nombre@correo.com', 'email')}
      <button type="button" class="mk-btn mk-primary mk-block" data-mk-action="forgot-send">Enviar enlace ${icon('mail', 17)}</button>
      <div class="mk-soft-note">${icon('clock', 17)} El enlace estará activo durante 30 minutos.</div>
      <p class="mk-auth-note">¿Recordaste tu contraseña? <button type="button" class="mk-text-link" data-mk-go="studentLogin">Iniciar sesión</button></p>`;
  }

  function verifyEmailView() {
    const M = data();
    return `<span class="mk-eyebrow">CONFIRMA TU CUENTA</span>
      <h2 class="mk-auth-title">Verifica tu correo</h2>
      <p class="mk-lead">Enviamos un código de 6 dígitos a <strong>${esc(M.student.email)}</strong>.</p>
      <div class="mk-code-row" role="group" aria-label="Código de verificación">${[2, 0, 4, '', '', ''].map((v, i) => `<input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito ${i + 1}" value="${v}">`).join('')}</div>
      <button type="button" class="mk-btn mk-primary mk-block" data-mk-action="verify-email">Verificar código</button>
      <p class="mk-auth-note">¿No recibiste el código? <button type="button" class="mk-text-link" data-mk-action="resend-code">Reenviar código</button></p>`;
  }

  function loadingView() {
    return `<div class="mk-loading-card">
      ${logoLockup()}
      <span class="mk-eyebrow">PREPARANDO TU ESPACIO</span>
      <h2>Sincronizando tu residencia</h2>
      <p class="mk-lead">Estamos conectando tus reservaciones, pagos y avisos.</p>
      <div class="mk-progress"><div class="mk-progress-fill"></div></div>
      <div class="mk-progress-caption"><span id="mkProgressText">Conectando con SICPES</span><strong id="mkProgressPercent">0%</strong></div>
      <div class="mk-loading-steps"><span class="done">${icon('check', 14)} Cuenta</span><span>${icon('clock', 14)} Reservación</span><span>${icon('clock', 14)} Pagos</span></div>
    </div>`;
  }

  function homeView() {
    const M = data();
    return `${pageHead('PANEL DEL RESIDENTE', `Hola, ${esc(M.student.name.split(' ')[0])}`, 'Este es el resumen de tu residencia y tus próximos movimientos.', `<button type="button" class="mk-btn mk-ghost mk-sm" data-mk-go="profile">${icon('user', 17)} Mi cuenta</button>`)}
      <div class="mk-stat-grid">
        ${stat('Habitación', esc(M.student.room), 'bed')}
        ${stat('Piso', esc(M.student.floor), 'building')}
        ${stat('Tipo', esc(M.student.type), 'home')}
        ${stat('Próximo pago', money(900), 'wallet')}
      </div>
      <div class="mk-dash-grid">
        <article class="mk-card mk-card-room">
          <div class="mk-card-head"><span class="mk-eyebrow">TU RESERVACIÓN</span>${status('En revisión')}</div>
          <div class="mk-room-strip">
            <div class="mk-room-thumb">${photo('room2')}</div>
            <div><strong>Residencia SICPES · ${esc(M.student.room)}</strong><small>${esc(M.student.type)} · ${esc(M.student.floor)}</small><span class="mk-mini-strong">Ingreso 01/09/2025</span></div>
          </div>
          <button type="button" class="mk-btn mk-secondary mk-block" data-mk-go="requestStatus">Ver estado de mi petición</button>
        </article>
        <article class="mk-card mk-card-pay">
          <div class="mk-card-head"><span class="mk-eyebrow">PRÓXIMO PAGO</span>${status('Pendiente')}</div>
          <div class="mk-amount-block"><strong>${money(900)}</strong><small>Mantenimiento · vence ${esc(M.student.due)}</small></div>
          <button type="button" class="mk-btn mk-primary mk-block" data-mk-go="payments">Ir a pagos ${icon('arrowRight', 16)}</button>
        </article>
      </div>
      <div class="mk-dash-grid">
        <article class="mk-card">
          <div class="mk-card-head"><h3 class="mk-card-title">Avisos</h3><button type="button" class="mk-text-link" data-mk-go="payments">Ver todos</button></div>
          ${M.student.notices.map(n => `<div class="mk-notice" data-mk-go="payments">${icon('bell', 16)}<span>${esc(n)}</span>${icon('chevronRight', 15)}</div>`).join('')}
        </article>
        <article class="mk-card mk-feature-room">
          <div class="mk-card-head"><span class="mk-eyebrow">HABITACIÓN DESTACADA</span>${status('Disponible')}</div>
          <div class="mk-room-thumb mk-room-thumb-wide">${photo('room3')}</div>
          <div class="mk-inline-between"><div><strong>Habitación ${esc(M.rooms[0].id)}</strong><small class="mk-muted">${esc(M.rooms[0].type)} · ${money(M.rooms[0].amount)}/mes</small></div><button type="button" class="mk-btn mk-secondary mk-sm" data-mk-go="roomDetail">Ver</button></div>
        </article>
      </div>
      <article class="mk-card mk-eval-banner">
        <div>${icon('star', 22)}<div><strong>¿Cómo ha sido tu experiencia?</strong><small>Tu opinión nos ayuda a mejorar el servicio.</small></div></div>
        <button type="button" class="mk-btn mk-primary mk-sm" data-mk-go="rateService">Evaluar servicio</button>
      </article>`;
  }

  function reserveView() {
    const M = data();
    const type = state.type;
    const amount = M.prices[type];
    return `${pageHead('NUEVA RESERVACIÓN', 'Reserva tu habitación', 'Elige el espacio que mejor se adapte a ti.')}
      <div class="mk-form-layout">
        <div class="mk-card mk-form-card">
          <div class="mk-stepper"><span class="active">1 Datos</span><span>2 Habitación</span><span>3 Confirmar</span></div>
          ${field('FECHA DE INGRESO', '', 'date', '2025-12-01')}
          <div class="mk-field"><span>TIPO DE HABITACIÓN</span><div class="mk-choice-row"><button type="button" class="mk-choice${type === 'Individual' ? ' selected' : ''}" data-mk-type="Individual">${icon('bed', 17)} Individual<small>${money(M.prices.Individual)} / mes</small></button><button type="button" class="mk-choice${type === 'Compartida' ? ' selected' : ''}" data-mk-type="Compartida">${icon('users', 17)} Compartida<small>${money(M.prices.Compartida)} / mes</small></button></div></div>
          <div class="mk-form-grid">
            <label class="mk-field"><span>PISO</span><select><option>Segundo piso</option><option>Primer piso</option><option>Planta baja</option></select></label>
            <label class="mk-field"><span>HABITACIÓN</span><select><option>204 · Disponible</option><option>202 · Disponible</option><option>201 · Disponible</option></select></label>
          </div>
          <div class="mk-cta-row"><button type="button" class="mk-btn mk-secondary" data-mk-go="roomDetail">Ver detalle</button><button type="button" class="mk-btn mk-primary" data-mk-action="reserve">Reservar ${icon('arrowRight', 16)}</button></div>
        </div>
        <aside class="mk-card mk-summary">
          <span class="mk-eyebrow">RESUMEN</span>
          <div class="mk-room-thumb mk-room-thumb-wide">${photo('room')}</div>
          <h3>Habitación 204</h3>
          <p class="mk-muted">${type} · Segundo piso · Disponible</p>
          <div class="mk-price-lines"><span>Renta mensual <strong>${money(amount)}</strong></span><span>Depósito <strong>${money(amount)}</strong></span><span class="total">Total al reservar <strong>${money(amount * 2)}</strong></span></div>
          <div class="mk-soft-note">${icon('shield', 17)} La asignación final se confirma al terminar el registro.</div>
        </aside>
      </div>`;
  }

  function roomDetailView() {
    const M = data();
    const room = M.rooms[0];
    return `${pageHead('HABITACIÓN DISPONIBLE', `Habitación ${esc(room.id)}`, `${esc(room.type)} · ${esc(room.floor)}`, `<button type="button" class="mk-btn mk-ghost mk-sm" data-mk-go="reserve">${icon('chevronLeft', 16)} Volver</button>`)}
      <div class="mk-gallery">
        <div class="mk-gallery-main">${photo('room')}</div>
        <div class="mk-gallery-thumbs"><button type="button" class="active">${photo('room')}</button><button type="button">${photo('room2')}</button><button type="button">${photo('room3')}</button></div>
      </div>
      <div class="mk-detail-grid">
        <div>
          <article class="mk-card mk-detail-facts">
            <div class="mk-fact">${icon('bed', 20)}<span><small>Tipo</small><strong>${esc(room.type)}</strong></span></div>
            <div class="mk-fact">${icon('building', 20)}<span><small>Piso</small><strong>${esc(room.floor)}</strong></span></div>
            <div class="mk-fact">${icon('wallet', 20)}<span><small>Precio</small><strong>${money(room.amount)}/mes</strong></span></div>
            <div class="mk-fact">${icon('check', 20)}<span><small>Estado</small>${status(room.available ? 'Disponible' : 'Ocupada')}</span></div>
          </article>
          <h2 class="mk-section-title">Servicios incluidos</h2>
          <div class="mk-service-grid">${room.services.map(s => `<span>${icon('check', 15)} ${esc(s)}</span>`).join('')}</div>
          <h2 class="mk-section-title">Sobre la habitación</h2>
          <p class="mk-body-text">Un espacio luminoso y equipado para que te concentres en estudiar. Incluye mobiliario, internet de alta velocidad y servicios básicos, a unos minutos de tu campus.</p>
        </div>
        <aside class="mk-card mk-booking-card">
          <span class="mk-eyebrow">RESERVA ESTA HABITACIÓN</span>
          <div class="mk-amount-block"><strong>${money(room.amount)}</strong><small>por mes · servicios incluidos</small></div>
          <div class="mk-soft-note">${icon('shield', 17)} Sin cargos ocultos. Confirmación en 24 h.</div>
          <button type="button" class="mk-btn mk-primary mk-block" data-mk-action="room-request">Solicitar esta habitación ${icon('arrowRight', 16)}</button>
          <button type="button" class="mk-btn mk-ghost mk-block" data-mk-go="reserve">Comparar opciones</button>
        </aside>
      </div>`;
  }

  function requestStatusView() {
    const M = data();
    return `${pageHead('SEGUIMIENTO DE RESERVA', 'Estado de mi petición', `${esc(M.student.type)} · Habitación ${esc(M.student.room)}`)}
      <div class="mk-status-hero">
        <div class="mk-status-hero-icon">${icon('clock', 26)}</div>
        <div><span class="mk-eyebrow">ESTADO ACTUAL</span><h2>En revisión</h2><p>El administrador está validando tu solicitud.</p></div>
        ${status('En revisión')}
      </div>
      <article class="mk-card">
        <div class="mk-timeline">
          <div class="mk-timeline-item done"><span class="mk-timeline-dot">${icon('check', 12)}</span><div><strong>Pendiente</strong><small>Solicitud enviada · 28/11/2025</small></div></div>
          <div class="mk-timeline-item current"><span class="mk-timeline-dot">${icon('clock', 12)}</span><div><strong>En revisión</strong><small>Estamos validando tu información y disponibilidad.</small></div></div>
          <div class="mk-timeline-item"><span class="mk-timeline-dot"></span><div><strong>Aceptada / Rechazada</strong><small>Pendiente de resolución.</small></div></div>
        </div>
      </article>
      <div class="mk-dash-grid">
        <article class="mk-card"><div class="mk-card-head"><h3 class="mk-card-title">Habitación asignada</h3>${status('Por confirmar')}</div><div class="mk-room-strip"><div class="mk-room-thumb">${photo('room2')}</div><div><strong>Habitación ${esc(M.student.room)}</strong><small>${esc(M.student.type)} · ${esc(M.student.floor)}</small><span class="mk-mini-strong">Se confirma al aceptar tu solicitud</span></div></div></article>
        <article class="mk-card"><div class="mk-card-head"><h3 class="mk-card-title">¿Necesitas ayuda?</h3></div><p class="mk-muted">Escríbenos si tu solicitud tarda más de 24 horas.</p><button type="button" class="mk-btn mk-secondary mk-block" data-mk-action="social">${icon('mail', 16)} Contactar a SICPES</button></article>
      </div>
      <button type="button" class="mk-btn mk-ghost mk-block" data-mk-go="home">Volver al inicio</button>`;
  }

  function paymentsView() {
    const M = data();
    return `${pageHead('ESTADO DE CUENTA', 'Gestión de pagos', 'Consulta tus cuotas, comprobantes e historial.', `<button type="button" class="mk-btn mk-ghost mk-sm" data-mk-action="download">${icon('download', 16)} Estado de cuenta</button>`)}
      <div class="mk-stat-grid">
        ${stat('Próximo pago', money(900), 'wallet')}
        ${stat('Vencimiento', esc(M.student.due), 'calendar')}
        ${stat('Pagado este año', money(22500), 'check')}
        ${stat('Comprobantes', '3', 'card')}
      </div>
      <div class="mk-dash-grid">
        <article class="mk-card mk-pay-hero"><div class="mk-card-head"><span class="mk-eyebrow">TU PRÓXIMO PAGO</span>${status('Pendiente')}</div><div class="mk-amount-block"><strong>${money(900)}</strong><small>Cuota de mantenimiento · ${esc(M.student.due)}</small></div><button type="button" class="mk-btn mk-primary mk-block" data-mk-action="request-payment">Solicitar pago ${icon('arrowRight', 16)}</button></article>
        <article class="mk-card"><div class="mk-card-head"><h3 class="mk-card-title">Subir comprobante</h3></div><label class="mk-dropzone">${icon('upload', 24)}<strong>Selecciona un archivo</strong><small>PNG, JPG o PDF · máx. 5 MB</small><input type="file" accept="image/*,.pdf" data-mk-receipt></label></article>
      </div>
      <h2 class="mk-section-title">Historial de pagos</h2>
      <div class="mk-list">
        <article class="mk-list-row" data-mk-go="paymentDetail"><div class="mk-list-avatar">${icon('card', 18)}</div><div class="mk-list-main"><strong>${money(2500)} · Noviembre 2025</strong><small>Renta mensual · 01/11/2025</small></div>${status('En revisión')}${icon('chevronRight', 16)}</article>
        <article class="mk-list-row"><div class="mk-list-avatar">${icon('card', 18)}</div><div class="mk-list-main"><strong>${money(2500)} · Octubre 2025</strong><small>Renta mensual · 01/10/2025</small></div>${status('Pagado')}${icon('chevronRight', 16)}</article>
        <article class="mk-list-row"><div class="mk-list-avatar">${icon('card', 18)}</div><div class="mk-list-main"><strong>${money(900)} · Septiembre 2025</strong><small>Mantenimiento · 01/09/2025</small></div>${status('Pagado')}${icon('chevronRight', 16)}</article>
      </div>`;
  }

  function paymentDetailView() {
    const M = data();
    const p = M.payments[1];
    return `${pageHead('COMPROBANTE DE PAGO', 'Detalle de pago', 'Consulta el estado y sube tu comprobante.', `<button type="button" class="mk-btn mk-ghost mk-sm" data-mk-go="payments">${icon('chevronLeft', 16)} Volver</button>`)}
      <div class="mk-detail-grid">
        <article class="mk-card mk-receipt">
          <div class="mk-receipt-top">${logoLockup(true)}<div><span class="mk-eyebrow">RECIBO</span><strong>#SIC-2025-11</strong></div></div>
          <div class="mk-receipt-amount"><span>Total del pago</span><strong>${money(p.amount)}</strong>${status(p.status)}</div>
          <div class="mk-receipt-lines"><span>Concepto <strong>Renta mensual</strong></span><span>Habitación <strong>${esc(p.room)}</strong></span><span>Periodo <strong>Noviembre 2025</strong></span><span>Registro <strong>${esc(p.date)}</strong></span></div>
          <div class="mk-receipt-foot"><span class="mk-qr">${icon('qr', 44)}</span><div><strong>Comprobante digital</strong><small>Válido como acuse de pago SICPES</small></div></div>
        </article>
        <div>
          <article class="mk-card"><div class="mk-card-head"><h3 class="mk-card-title">Subir comprobante</h3>${status('Pendiente')}</div><label class="mk-dropzone">${icon('upload', 24)}<strong>Selecciona tu comprobante</strong><small>PNG, JPG o PDF · máx. 5 MB</small><input type="file" accept="image/*,.pdf" data-mk-receipt></label><div class="mk-soft-note">${icon('clock', 17)} La validación puede tardar hasta 24 horas.</div></article>
          <article class="mk-card"><div class="mk-card-head"><h3 class="mk-card-title">Historial</h3></div><div class="mk-list compact"><div class="mk-list-row"><div class="mk-list-main"><strong>${money(2500)} · Octubre 2025</strong><small>01/10/2025</small></div>${status('Pagado')}</div><div class="mk-list-row"><div class="mk-list-main"><strong>${money(900)} · Septiembre 2025</strong><small>01/09/2025</small></div>${status('Pagado')}</div></div></article>
        </div>
      </div>`;
  }

  function rateServiceView() {
    return `${pageHead('HU-SIC-05 · SATISFACCIÓN', 'Evalúa el servicio', '¿Qué tan satisfecho estás con tu estancia en SICPES?')}
      <div class="mk-rate-layout">
        <article class="mk-card">
          <div class="mk-rating-scale" role="group" aria-label="Calificación de 1 a 5">${[1, 2, 3, 4, 5].map(n => `<button type="button" class="mk-rating-cell${state.rating === n ? ' selected' : ''}" data-mk-rate="${n}" aria-label="${n} de 5">${icon('star', 24)}<span>${n}</span></button>`).join('')}</div>
          <div class="mk-rating-labels"><span>1 · Muy insatisfecho</span><span>5 · Muy satisfecho</span></div>
          <p class="mk-rating-value">${state.rating ? `Seleccionaste ${state.rating} de 5 · ${D.ratings[state.rating]}` : 'Selecciona una calificación para continuar'}</p>
          <label class="mk-field"><span>COMENTARIO (OPCIONAL)</span><textarea rows="4" maxlength="500" placeholder="Cuéntanos tu experiencia…" data-mk-comment></textarea></label>
          <div class="mk-counter"><span data-mk-count>0</span> / 500</div>
          <button type="button" class="mk-btn mk-primary mk-block" data-mk-action="send-rating"${state.rating ? '' : ' disabled'}>Enviar evaluación ${icon('arrowRight', 16)}</button>
        </article>
        <aside class="mk-card mk-rate-aside">
          <span class="mk-eyebrow">TU OPINIÓN IMPORTA</span>
          <div class="mk-quote">“${state.rating ? D.ratings[state.rating] : 'Cada comentario nos ayuda a mejorar la experiencia de todos los residentes.'}”</div>
          <ul class="mk-checklist"><li>${icon('check', 15)} Atención del personal</li><li>${icon('check', 15)} Estado de las instalaciones</li><li>${icon('check', 15)} Rapidez en pagos y reservas</li></ul>
          <div class="mk-soft-note">${icon('shield', 17)} Tu evaluación es confidencial.</div>
        </aside>
      </div>`;
  }

  function rateConfirmView() {
    return `<div class="mk-success-layout">
      <div class="mk-photo-wrap mk-success-photo">${photo('success')}</div>
      <span class="mk-eyebrow">EVALUACIÓN ENVIADA</span>
      <h1 class="mk-page-title">¡Gracias por tu opinión!</h1>
      <p class="mk-lead">Tu evaluación se registró correctamente. Gracias por ayudarnos a mejorar SICPES.</p>
      <div class="mk-card mk-success-card">${icon('star', 20)}<div><strong>${state.rating ? `${state.rating} de 5 · ${D.ratings[state.rating]}` : 'Evaluación registrada'}</strong><small>La retroalimentación llega al equipo administrativo.</small></div></div>
      <button type="button" class="mk-btn mk-primary" data-mk-go="home">Volver a Inicio ${icon('arrowRight', 16)}</button>
    </div>`;
  }

  function profileView() {
    const M = data();
    return `<div class="mk-profile-hero"><div class="mk-profile-cover"></div><div class="mk-profile-id">${avatar(M.student.name, 'mk-avatar-lg')}<div><h1>${esc(M.student.name)}</h1><p>${esc(M.student.email)}</p>${status('Residente activo')}</div><button type="button" class="mk-btn mk-ghost mk-sm" data-mk-action="social">${icon('settings', 16)} Editar</button></div></div>
      <div class="mk-stat-grid">
        ${stat('Habitación', esc(M.student.room), 'bed')}
        ${stat('Tipo', esc(M.student.type), 'home')}
        ${stat('Ingreso', '01/09/2025', 'calendar')}
        ${stat('Renta', money(M.student.amount), 'wallet')}
      </div>
      <div class="mk-dash-grid">
        <article class="mk-card"><div class="mk-card-head"><h3 class="mk-card-title">Datos personales</h3></div><div class="mk-info-rows"><div><small>Nombre completo</small><strong>${esc(M.student.name)}</strong></div><div><small>Correo</small><strong>${esc(M.student.email)}</strong></div><div><small>Teléfono</small><strong>+52 55 1234 5678</strong></div><div><small>Habitación</small><strong>${esc(M.student.room)} · ${esc(M.student.floor)}</strong></div></div></article>
        <article class="mk-card"><div class="mk-card-head"><h3 class="mk-card-title">Accesos rápidos</h3></div><div class="mk-profile-links"><button type="button" data-mk-go="rateService">${icon('star', 17)} Evaluar el servicio ${icon('chevronRight', 15)}</button><button type="button" data-mk-go="payments">${icon('card', 17)} Métodos de pago ${icon('chevronRight', 15)}</button><button type="button" data-mk-go="requestStatus">${icon('calendar', 17)} Mi reservación ${icon('chevronRight', 15)}</button><button type="button" data-mk-action="logout">${icon('logout', 17)} Cerrar sesión ${icon('chevronRight', 15)}</button></div></article>
      </div>`;
  }

  function reservationsView() {
    const M = data();
    const filtered = state.filter === 'Todas' ? M.reservations : M.reservations.filter(r => r.status === state.filter);
    return `${pageHead('PANEL ADMINISTRATIVO', 'Reservaciones', 'Gestiona las solicitudes de los estudiantes.', `<button type="button" class="mk-btn mk-ghost mk-sm" data-mk-action="download">${icon('download', 16)} Exportar</button>`)}
      <div class="mk-stat-grid">
        ${stat('Total', M.reservations.length, 'users')}
        ${stat('Pendientes', M.reservations.filter(x => x.status === 'Pendiente').length, 'clock')}
        ${stat('Aceptadas', M.reservations.filter(x => x.status === 'Aceptada').length, 'check')}
        ${stat('Rechazadas', M.reservations.filter(x => x.status === 'Rechazada').length, 'close')}
      </div>
      <div class="mk-toolbar">${filterTabs(['Todas', 'Pendiente', 'Aceptada', 'Rechazada'], state.filter, 'reservation')}<button type="button" class="mk-btn mk-ghost mk-sm">${icon('filter', 15)} Filtros</button></div>
      <div class="mk-list mk-admin-list">
        ${filtered.map(r => `<article class="mk-list-row" data-mk-go="assignRoom"><div class="mk-list-avatar">${avatar(r.name)}</div><div class="mk-list-main"><strong>${esc(r.name)}</strong><small>${esc(r.type)} · Hab. ${esc(r.room)}</small></div><div class="mk-list-money">${money(r.amount)}<small>/mes</small></div>${status(r.status)}<button type="button" class="mk-btn mk-secondary mk-xs" data-mk-go="assignRoom">Asignar</button></article>`).join('')}
      </div>`;
  }

  function assignRoomView() {
    const M = data();
    const r = M.reservations[0];
    return `${pageHead('GESTIÓN DE RESERVACIONES', 'Asignar habitación', 'Revisa la solicitud y asigna un espacio.', `<button type="button" class="mk-btn mk-ghost mk-sm" data-mk-go="reservations">${icon('chevronLeft', 16)} Volver</button>`)}
      <div class="mk-detail-grid">
        <div>
          <article class="mk-card mk-applicant"><div class="mk-applicant-head">${avatar(r.name, 'mk-avatar-lg')}<div><span class="mk-eyebrow">SOLICITANTE</span><h2>${esc(r.name)}</h2><p>${esc(r.type)} · Habitación solicitada ${esc(r.room)}</p></div>${status(r.status)}</div><div class="mk-info-rows"><div><small>Monto mensual</small><strong>${money(r.amount)}</strong></div><div><small>Fecha de solicitud</small><strong>01/12/2025</strong></div><div><small>Contacto</small><strong>elena.perez@email.com</strong></div><div><small>Ingreso</small><strong>01/12/2025</strong></div></div></article>
          <h2 class="mk-section-title">Habitaciones disponibles</h2>
          <div class="mk-room-options">${M.rooms.filter(x => x.available).map((room, i) => `<button type="button" class="mk-room-option${i === 0 ? ' selected' : ''}"><span class="mk-room-option-thumb">${photo(i === 0 ? 'room2' : 'room3')}</span><span><strong>Habitación ${esc(room.id)}</strong><small>${esc(room.type)} · ${esc(room.floor)}</small><b>${money(room.amount)}/mes</b></span><i></i></button>`).join('')}</div>
        </div>
        <aside class="mk-card mk-decision"><span class="mk-eyebrow">DECISIÓN</span><h3>Asignar habitación</h3><p class="mk-muted">Al confirmar, se notificará al estudiante y se actualizará su estado.</p><label class="mk-field"><span>NOTA PARA EL ESTUDIANTE (OPCIONAL)</span><textarea rows="3" placeholder="Ej. Tu habitación está lista…"></textarea></label><button type="button" class="mk-btn mk-primary mk-block" data-mk-action="assign-room">${icon('check', 17)} Asignar</button><button type="button" class="mk-btn mk-danger-ghost mk-block" data-mk-action="reject-room">${icon('close', 17)} Rechazar</button></aside>
      </div>`;
  }

  function pendingPaymentsView() {
    const M = data();
    const filtered = state.paymentFilter === 'Todos' ? M.payments : M.payments.filter(p => p.status === state.paymentFilter);
    return `${pageHead('CONTROL DE COBROS', 'Pagos pendientes', 'Revisa comprobantes y actualiza el estado de cuenta.', `<button type="button" class="mk-btn mk-ghost mk-sm" data-mk-go="debts">${icon('wallet', 16)} Ver adeudos</button>`)}
      <div class="mk-stat-grid">
        ${stat('Total', M.payments.length, 'card')}
        ${stat('Pendientes', M.payments.filter(p => p.status === 'Pendiente').length, 'clock')}
        ${stat('En revisión', '1', 'search')}
        ${stat('Por cobrar', money(6300), 'wallet')}
      </div>
      <div class="mk-toolbar">${filterTabs(['Todos', 'Pendiente', 'En revisión'], state.paymentFilter, 'payment')}<button type="button" class="mk-btn mk-ghost mk-sm">${icon('filter', 15)} Filtros</button></div>
      <div class="mk-list mk-admin-list">
        ${filtered.map(p => `<article class="mk-list-row" data-mk-go="validatePayment"><div class="mk-list-avatar">${avatar(p.name)}</div><div class="mk-list-main"><strong>${esc(p.name)}</strong><small>Habitación ${esc(p.room)} · ${esc(p.date)}</small></div><div class="mk-list-money">${money(p.amount)}<small>mensual</small></div>${status(p.status)}<button type="button" class="mk-btn mk-secondary mk-xs" data-mk-go="validatePayment">Validar</button></article>`).join('')}
      </div>`;
  }

  function validatePaymentView() {
    const M = data();
    const p = M.payments[2];
    return `${pageHead('CONTROL DE COBROS', 'Validar pago', 'Revisa el comprobante antes de aprobar.', `<button type="button" class="mk-btn mk-ghost mk-sm" data-mk-go="pendingPayments">${icon('chevronLeft', 16)} Volver</button>`)}
      <div class="mk-detail-grid">
        <article class="mk-card"><div class="mk-card-head"><div class="mk-applicant-head mk-applicant-inline">${avatar(p.name)}<div><span class="mk-eyebrow">PAGO RECIBIDO</span><h2>${esc(p.name)}</h2><p>Habitación ${esc(p.room)} · ${esc(p.date)}</p></div></div>${status(p.status)}</div><div class="mk-receipt-amount"><span>Monto declarado</span><strong>${money(p.amount)}</strong>${status(p.status)}</div><div class="mk-proof">${photo('receipt')}</div><div class="mk-soft-note">${icon('shield', 17)} Comprobante recibido el 01/11/2025 a las 18:42 h.</div></article>
        <aside class="mk-card mk-decision"><span class="mk-eyebrow">REVISIÓN</span><h3>¿El comprobante es válido?</h3><div class="mk-info-rows"><div><small>Monto esperado</small><strong>${money(2500)}</strong></div><div><small>Monto recibido</small><strong>${money(p.amount)}</strong></div><div><small>Periodo</small><strong>Noviembre 2025</strong></div></div><label class="mk-field"><span>MOTIVO DE RECHAZO (OPCIONAL)</span><textarea rows="3" placeholder="Ej. El monto no coincide…"></textarea></label><button type="button" class="mk-btn mk-primary mk-block" data-mk-action="approve-payment">${icon('check', 17)} Aprobar pago</button><button type="button" class="mk-btn mk-danger-ghost mk-block" data-mk-action="reject-payment">${icon('close', 17)} Rechazar</button></aside>
      </div>`;
  }

  function debtsView() {
    const M = data();
    const filtered = state.debtFilter === 'Todos' ? M.debts : M.debts.filter(d => state.debtFilter === '1 mes' ? d.months === 1 : d.months >= 2);
    const total = M.debts.reduce((sum, d) => sum + d.amount * d.months, 0);
    return `${pageHead('SEGUIMIENTO DE ADEUDOS', 'Adeudos', 'Estudiantes con pagos vencidos.', `<button type="button" class="mk-btn mk-ghost mk-sm" data-mk-go="pendingPayments">${icon('chevronLeft', 16)} Pagos pendientes</button>`)}
      <div class="mk-stat-grid">${stat('Con adeudo', M.debts.length, 'users')}${stat('Total adeudado', money(total), 'wallet')}${stat('Vencidos', '1', 'clock')}${stat('Recordatorios', '2 enviados', 'mail')}</div>
      <div class="mk-toolbar">${filterTabs(['Todos', '1 mes', '2+ meses'], state.debtFilter, 'debt')}<button type="button" class="mk-btn mk-ghost mk-sm">${icon('download', 15)} Exportar</button></div>
      <div class="mk-debt-grid">${filtered.map(d => `<article class="mk-card mk-debt-card"><div class="mk-card-head"><div class="mk-applicant-head mk-applicant-inline">${avatar(d.name)}<div><strong>${esc(d.name)}</strong><small class="mk-muted">Habitación ${esc(d.room)} · ${d.months} ${d.months === 1 ? 'mes' : 'meses'}</small></div></div>${status(d.status)}</div><div class="mk-amount-block"><strong>${money(d.amount)}</strong><small>por mes vencido</small></div><div class="mk-inline-between"><span class="mk-muted">Total ${money(d.amount * d.months)}</span><button type="button" class="mk-btn mk-secondary mk-sm" data-mk-action="send-reminder">${icon('mail', 15)} Enviar recordatorio</button></div></article>`).join('')}</div>`;
  }

  function floorsView() {
    const M = data();
    return `${pageHead('INVENTARIO RESIDENCIAL', 'Pisos y habitaciones', 'Administra los espacios disponibles.', `<button type="button" class="mk-btn mk-ghost mk-sm" data-mk-action="add-floor">${icon('plus', 16)} Agregar piso</button>`)}
      <div class="mk-dash-grid mk-floors-layout">
        <div class="mk-floor-grid">${M.floors.map((f, i) => `<article class="mk-card mk-floor-card"><div class="mk-card-head"><div><span class="mk-eyebrow">PISO ${i + 1}</span><h3>${esc(f.name)}</h3></div><button type="button" class="mk-text-link" data-mk-remove-floor="${i}">Eliminar</button></div><div class="mk-occupancy"><span style="width:${Math.min(100, f.rooms.length * 22)}%"></span></div><p class="mk-muted">${f.rooms.length} habitaciones · ${f.rooms.filter(x => x !== '302').length} disponibles</p><div class="mk-room-tags">${f.rooms.map(r => `<span>${esc(r)}</span>`).join('')}</div></article>`).join('')}</div>
        <aside class="mk-card mk-floor-form"><span class="mk-eyebrow">NUEVO PISO</span><h3>Agregar habitaciones</h3><label class="mk-field"><span>NOMBRE DEL PISO</span><input placeholder="Ej. Tercer piso" data-mk-floor-name></label><label class="mk-field"><span>HABITACIONES</span><textarea rows="2" placeholder="301, 302, 303" data-mk-floor-rooms></textarea></label><button type="button" class="mk-btn mk-primary mk-block" data-mk-action="add-floor">${icon('plus', 16)} Agregar piso</button><div class="mk-soft-note">${icon('building', 17)} Los cambios se reflejan en el inventario al instante.</div></aside>
      </div>`;
  }

  function settingsView() {
    const M = data();
    return `${pageHead('PREFERENCIAS DEL SISTEMA', 'Configuración global', 'Precios, notificaciones y datos administrativos.')}
      <div class="mk-dash-grid mk-settings-layout">
        <article class="mk-card"><div class="mk-card-head"><h3 class="mk-card-title">Precios mensuales</h3>${status('Activo')}</div><div class="mk-form-grid">${field('HABITACIÓN INDIVIDUAL (MXN)', '$2,500', 'number', M.prices.Individual)}${field('HABITACIÓN COMPARTIDA (MXN)', '$1,800', 'number', M.prices.Compartida)}</div><label class="mk-field"><span>CORREO DEL ADMINISTRADOR</span><input type="email" value="admin@sicpes.mx"></label><button type="button" class="mk-btn mk-primary" data-mk-action="save-settings">${icon('check', 16)} Guardar cambios</button></article>
        <article class="mk-card"><div class="mk-card-head"><h3 class="mk-card-title">Notificaciones del sistema</h3></div><div class="mk-switch-list"><label>Nuevas reservaciones<input type="checkbox" checked></label><label>Pagos pendientes<input type="checkbox" checked></label><label>Avisos a residentes<input type="checkbox"></label><label>Reporte semanal<input type="checkbox" checked></label></div><div class="mk-soft-note">${icon('bell', 17)} Los avisos se envían al correo y a la PWA.</div></article>
      </div>
      <article class="mk-card mk-danger-zone"><div class="mk-card-head"><h3 class="mk-card-title">Cierre de periodo</h3>${status('Pendiente')}</div><p class="mk-muted">Cierra el periodo actual para generar los estados de cuenta del siguiente mes.</p><button type="button" class="mk-btn mk-danger-ghost" data-mk-action="social">Cerrar periodo</button></article>`;
  }

  const VIEWS = {
    landing: landingView,
    studentLogin: studentLoginView,
    forgotPassword: forgotPasswordView,
    register: registerView,
    verifyEmail: verifyEmailView,
    loading: loadingView,
    home: homeView,
    reserve: reserveView,
    roomDetail: roomDetailView,
    requestStatus: requestStatusView,
    payments: paymentsView,
    paymentDetail: paymentDetailView,
    rateService: rateServiceView,
    rateConfirm: rateConfirmView,
    profile: profileView,
    adminLogin: adminLoginView,
    reservations: reservationsView,
    assignRoom: assignRoomView,
    pendingPayments: pendingPaymentsView,
    validatePayment: validatePaymentView,
    debts: debtsView,
    floors: floorsView,
    settings: settingsView
  };

  /* ---------- Navegación y render ---------- */
  function go(id, options) {
    if (!D.screens[id] || !VIEWS[id]) return;
    options = options || {};
    if (state.screen !== id && !options.replace) state.history.push(state.screen);
    state.screen = id;
    const role = D.screens[id].role;
    if (role === 'student' || role === 'admin') state.role = role;
    render();
  }
  function back() {
    const previous = state.history.pop();
    if (previous) { state.screen = previous; render(); }
    else toast('No hay una pantalla anterior.');
  }
  function setRole(role) {
    state.role = role;
    state.history = [];
    state.screen = role === 'student' ? 'landing' : 'adminLogin';
    render();
  }
  function setPlatform(platform) {
    state.platform = platform;
    state.history = [];
    render();
  }

  function renderScreenList() {
    const list = $('#mkScreenList');
    if (!list) return;
    list.innerHTML = FLOWS[state.role].map(id => `<button type="button" class="mk-screen-link${id === state.screen ? ' active' : ''}" data-mk-go="${id}"><span>${CODES[id]}</span><span>${esc(TITLES[id])}</span></button>`).join('');
    document.querySelectorAll('[data-mk-role]').forEach(b => b.classList.toggle('active', b.dataset.mkRole === state.role));
    document.querySelectorAll('[data-mk-platform]').forEach(b => b.classList.toggle('active', b.dataset.mkPlatform === state.platform));
  }

  function renderDestinations() {
    const el = $('#mkDestinations');
    if (!el) return;
    const actions = (state.platform === 'mobile' ? D.actions : D.pwaActions)[state.screen] || [];
    el.innerHTML = actions.length
      ? actions.map(([id, label]) => `<button type="button" class="mk-destination" data-mk-go="${id}"><span>${esc(label)}</span><b>${CODES[id]} · ${esc(TITLES[id])}</b></button>`).join('')
      : emptyNote('Esta pantalla no tiene destinos directos.');
  }

  function frameFor(id, content) {
    if (id === 'landing') return landingFrame(content);
    if (id === 'loading') return loadingFrame(content);
    if (AUTH.has(id)) return authFrame(state.role, content);
    return state.platform === 'mobile' ? mobileShell(state.role, activeNav(id), content) : pwaShell(state.role, activeNav(id), content);
  }

  function render() {
    if (!canvas) return;
    clearInterval(state.timer);
    const view = VIEWS[state.screen] || landingView;
    canvas.className = 'mk-viewport ' + (state.platform === 'mobile' ? 'mk-mobile' : 'mk-pwa');
    canvas.innerHTML = frameFor(state.screen, view());

    const label = $('#mkScreenLabel');
    if (label) label.textContent = `${CODES[state.screen] || ''} · ${TITLES[state.screen] || state.screen}`;
    const size = $('#mkSize');
    if (size) size.textContent = state.platform === 'mobile' ? '390 × 844' : '1440 × 900';
    const roleCaption = $('#mkRoleCaption');
    if (roleCaption) roleCaption.textContent = state.role === 'student' ? 'ESTUDIANTE' : 'ADMINISTRADOR';
    const count = $('#mkScreenCount');
    if (count) count.textContent = `${FLOWS[state.role].length} pantallas · ${state.role === 'student' ? 'Rol Estudiante' : 'Rol Administrador'}`;
    const backBtn = $('#mkBack');
    if (backBtn) backBtn.hidden = isRoot(state.screen);

    renderScreenList();
    renderDestinations();
    fitMockup();
    if (state.screen === 'loading') startLoading();
    if(window.SicpesShell&&window.SicpesShell.getState().section==='mockups'){window.dispatchEvent(new CustomEvent('sicpes:screen',{detail:{section:'mockups',platform:state.platform,screen:state.screen,role:state.role}}));}
  }

  function startLoading() {
    let progress = 0;
    state.timer = setInterval(() => {
      progress = Math.min(progress + 9, 100);
      const fill = canvas.querySelector('.mk-progress-fill');
      const pct = canvas.querySelector('#mkProgressPercent');
      if (!fill || !pct) { clearInterval(state.timer); return; }
      fill.style.width = progress + '%';
      pct.textContent = progress + '%';
      if (progress === 100) {
        clearInterval(state.timer);
        setTimeout(() => go(state.role === 'admin' ? 'reservations' : 'home', { replace: true }), 420);
      }
    }, 110);
  }

  function fitMockup() {
    const frame = $('#mkFrame');
    if (!frame || !canvas) return;
    const mobile = state.platform === 'mobile';
    const dw = mobile ? 390 : 1440;
    const dh = mobile ? 844 : 900;
    frame.classList.toggle('is-pwa', !mobile);
    frame.classList.toggle('is-mobile', mobile);
    if (window.SicpesShell) {
      canvas.style.transform = 'translateX(-50%)';
      frame.style.width = dw + 'px';
      frame.style.height = dh + 'px';
      return;
    }
    const stage = document.querySelector('.mk-stage');
    if (!stage) return;
    const availW = Math.max(280, stage.clientWidth - 8);
    const availH = Math.max(360, window.innerHeight - 230);
    const scale = Math.min(1, availW / dw, availH / dh);
    canvas.style.transform = `translateX(-50%) scale(${scale})`;
    frame.style.width = Math.round(dw * scale) + 'px';
    frame.style.height = Math.round(dh * scale) + 'px';
  }

  /* ---------- Eventos ---------- */
  document.addEventListener('click', e => {
    const target = e.target.closest('[data-mk-role],[data-mk-platform],[data-mk-go],[data-mk-action],[data-mk-filter],[data-mk-type],[data-mk-rate],[data-mk-remove-floor]');
    if (!target) return;

    if (target.dataset.mkRole) { setRole(target.dataset.mkRole); return; }
    if (target.dataset.mkPlatform) { setPlatform(target.dataset.mkPlatform); return; }
    if (target.dataset.mkGo) { go(target.dataset.mkGo); return; }
    if (target.dataset.mkType) { state.type = target.dataset.mkType; render(); return; }
    if (target.dataset.mkRate) {
      state.rating = Number(target.dataset.mkRate);
      canvas.querySelectorAll('.mk-rating-cell').forEach(c => c.classList.toggle('selected', Number(c.dataset.mkRate) === state.rating));
      const value = canvas.querySelector('.mk-rating-value');
      if (value) value.textContent = `Seleccionaste ${state.rating} de 5 · ${D.ratings[state.rating]}`;
      const submit = canvas.querySelector('[data-mk-action="send-rating"]');
      if (submit) submit.disabled = false;
      return;
    }
    if (target.dataset.mkFilter) {
      const key = target.dataset.mkFilterKey;
      if (key === 'reservation') state.filter = target.dataset.mkFilter;
      else if (key === 'payment') state.paymentFilter = target.dataset.mkFilter;
      else state.debtFilter = target.dataset.mkFilter;
      render();
      return;
    }
    if (target.dataset.mkRemoveFloor !== undefined) {
      data().floors.splice(Number(target.dataset.mkRemoveFloor), 1);
      toast('Piso eliminado.');
      render();
      return;
    }

    const action = target.dataset.mkAction;
    if (action === 'back') { back(); return; }
    if (action === 'student-login') { state.role = 'student'; go('loading'); return; }
    if (action === 'admin-login') { state.role = 'admin'; go('loading'); return; }
    if (action === 'register') {
      const checked = canvas.querySelector('.mk-auth-m-card input[type=checkbox], .mk-auth-p-card input[type=checkbox]');
      if (checked && !checked.checked) { toast('Acepta los términos para continuar.'); return; }
      state.role = 'student';
      go('verifyEmail');
      return;
    }
    if (action === 'verify-email') { toast('Código verificado correctamente.'); setTimeout(() => go('loading'), 450); return; }
    if (action === 'resend-code') { toast('Código reenviado a tu correo.'); return; }
    if (action === 'forgot-send') { toast('Enlace de recuperación enviado.'); return; }
    if (action === 'reserve') { toast('¡Reservación confirmada!'); setTimeout(() => go('requestStatus'), 550); return; }
    if (action === 'room-request') { toast('Solicitud enviada.'); setTimeout(() => go('requestStatus'), 500); return; }
    if (action === 'send-rating') {
      if (!state.rating) { toast('Selecciona una calificación para continuar.'); return; }
      toast('Tu evaluación se registró correctamente.');
      go('rateConfirm');
      return;
    }
    if (action === 'assign-room') { toast('Habitación asignada correctamente.'); go('reservations'); return; }
    if (action === 'reject-room') { toast('Solicitud rechazada.'); go('reservations'); return; }
    if (action === 'approve-payment') { toast('Pago aprobado.'); go('pendingPayments'); return; }
    if (action === 'reject-payment') { toast('Pago rechazado.'); go('pendingPayments'); return; }
    if (action === 'send-reminder') { toast('Recordatorio enviado.'); return; }
    if (action === 'request-payment') { toast('Solicitud de pago enviada.'); return; }
    if (action === 'download') { toast('Estado de cuenta generado (demo).'); return; }
    if (action === 'logout') { state.history = []; setRole('student'); go('studentLogin', { replace: true }); return; }
    if (action === 'social') { toast('Acción disponible en la versión final.'); return; }
    if (action === 'save-settings') {
      const nums = canvas.querySelectorAll('input[type=number]');
      if (nums[0]) data().prices.Individual = Number(nums[0].value) || data().prices.Individual;
      if (nums[1]) data().prices.Compartida = Number(nums[1].value) || data().prices.Compartida;
      toast('Cambios guardados.');
      return;
    }
    if (action === 'add-floor') {
      const name = canvas.querySelector('[data-mk-floor-name]');
      const rooms = canvas.querySelector('[data-mk-floor-rooms]');
      const floorName = name && name.value.trim();
      const roomList = rooms && rooms.value.split(',').map(x => x.trim()).filter(Boolean);
      if (!floorName || !roomList || !roomList.length) { toast('Agrega el nombre del piso y al menos una habitación.'); return; }
      data().floors.unshift({ name: floorName, rooms: roomList });
      toast('Piso agregado.');
      render();
      return;
    }
  });

  document.addEventListener('input', e => {
    if (e.target.matches('[data-mk-comment]')) {
      const counter = canvas.querySelector('[data-mk-count]');
      if (counter) counter.textContent = e.target.value.length;
    }
  });
  document.addEventListener('change', e => {
    if (e.target.matches('[data-mk-receipt]') && e.target.files && e.target.files.length) {
      toast(`Archivo listo: ${e.target.files[0].name}`);
    }
  });
  const backBtn = $('#mkBack');
  if (backBtn) backBtn.addEventListener('click', back);
  window.addEventListener('resize', fitMockup);

  /* ---------- API para el selector de fidelidad ---------- */
  window.SicpesMockups = {
    showScreen: function (id, role, platform) {
      if (!D.screens[id]) return;
      if (platform === 'mobile' || platform === 'pwa') state.platform = platform;
      if (role === 'student' || role === 'admin') state.role = role;
      else if (D.screens[id].role === 'student' || D.screens[id].role === 'admin') state.role = D.screens[id].role;
      state.screen = id;
      state.history = [];
      render();
    },
    getScreen: function () { return state.screen; },
    getRole: function () { return state.role; },
    getPlatform: function () { return state.platform; },
    refit: fitMockup
  };

  render();
})();
