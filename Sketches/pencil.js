/* ============================================================
   SICPES · Renderizador de Bocetos a Lápiz (Rough.js)
   Alineado 1:1 en medidas (390 × 844 Móvil / 1440 × 900 PWA) y
   ubicación exacta de componentes con 4 · Prototipo (#mkCanvas).
   ============================================================ */
(function () {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const PEN = '#171717';
  const PAPER = '#FFFDF8';
  const NOTE = '#FFF2A8';
  const STICKY_TEXT = '#3D3520';
  const HAND = "'Patrick Hand', 'Caveat', cursive, system-ui";
  const DISPLAY = "'Caveat', 'Patrick Hand', cursive, system-ui";

  const SHARED = ['splash', 'forgotPassword', 'lockAccount', 'unlockAccount', 'loading', 'aboutSoftware', 'aboutTeam'];
  const STUDENT = ['splash', 'landing', 'studentLogin', 'forgotPassword', 'lockAccount', 'unlockAccount', 'register', 'verifyEmail', 'loading', 'home', 'reserve', 'roomDetail', 'requestStatus', 'payments', 'paymentDetail', 'rateService', 'rateConfirm', 'profile', 'aboutSoftware', 'aboutTeam'];
  const ADMIN = ['splash', 'adminLogin', 'forgotPassword', 'lockAccount', 'unlockAccount', 'loading', 'reservations', 'assignRoom', 'pendingPayments', 'validatePayment', 'debts', 'floors', 'settings', 'aboutSoftware', 'aboutTeam'];

  const META = {
    splash: { code: 'C1', title: 'SPLASH SCREEN' }, landing: { code: 'E1', title: 'LANDING' }, studentLogin: { code: 'E2', title: 'INICIAR SESIÓN' },
    forgotPassword: { code: 'E3', title: 'RECUPERAR CONTRASEÑA' }, lockAccount: { code: 'C2', title: 'CUENTA BLOQUEADA' },
    unlockAccount: { code: 'C3', title: 'CÓDIGO DE DESBLOQUEO' }, register: { code: 'E4', title: 'CREAR CUENTA' },
    verifyEmail: { code: 'E5', title: 'VERIFICAR CORREO' }, loading: { code: 'E6', title: 'SINCRONIZANDO' },
    home: { code: 'E7', title: 'INICIO' }, reserve: { code: 'E8', title: 'RESERVAR HABITACIÓN' },
    roomDetail: { code: 'E9', title: 'DETALLE DE HABITACIÓN' }, requestStatus: { code: 'E10', title: 'ESTADO DE MI PETICIÓN' },
    payments: { code: 'E11', title: 'GESTIÓN DE PAGOS' }, paymentDetail: { code: 'E12', title: 'DETALLE DE PAGO' },
    rateService: { code: 'E13', title: 'EVALUAR EL SERVICIO' }, rateConfirm: { code: 'E14', title: 'EVALUACIÓN ENVIADA' },
    profile: { code: 'E15', title: 'CUENTA / PERFIL' }, aboutSoftware: { code: 'C4', title: 'ACERCA DEL SOFTWARE' },
    aboutTeam: { code: 'C5', title: 'ACERCA DEL EQUIPO' }, adminLogin: { code: 'A1', title: 'ACCESO ADMINISTRADOR' },
    reservations: { code: 'A2', title: 'RESERVACIONES' }, assignRoom: { code: 'A3', title: 'ASIGNAR HABITACIÓN' },
    pendingPayments: { code: 'A4', title: 'PAGOS PENDIENTES' }, validatePayment: { code: 'A5', title: 'VALIDAR PAGO' },
    debts: { code: 'A6', title: 'ADEUDOS' }, floors: { code: 'A7', title: 'PISOS' }, settings: { code: 'A8', title: 'CONFIGURACIÓN GLOBAL' }
  };

  const SCREEN_NOTES = {
    splash: 'arranque -> E1 o A1',
    landing: 'CTA principal -> abre E8',
    studentLogin: 'valida credenciales -> E6',
    forgotPassword: 'envía enlace -> vuelve a login',
    lockAccount: '3 intentos -> desbloqueo C3',
    unlockAccount: 'valida OTP 6 dígitos -> E6',
    register: 'registro -> verificar correo E5',
    verifyEmail: 'confirma OTP -> carga E6',
    loading: 'sincroniza -> redirige a Home',
    home: 'resumen residente -> E8 / E11',
    reserve: 'configura y solicita -> E10',
    roomDetail: 'solicitar cuarto -> abre E10',
    requestStatus: 'línea de tiempo de solicitud',
    payments: 'historial y carga -> abre E12',
    paymentDetail: 'comprobante digital + voucher',
    rateService: 'califica 1-5 -> abre E14',
    rateConfirm: 'confirmación -> vuelve a E7',
    profile: 'datos y accesos -> C4 / C5',
    aboutSoftware: 'ficha técnica -> equipo C5',
    aboutTeam: 'créditos UTXJ -> volver',
    adminLogin: 'acceso admin -> carga E6',
    reservations: 'seleccionar solicitud -> A3',
    assignRoom: 'asignar o rechazar -> A2',
    pendingPayments: 'revisar pago -> abre A5',
    validatePayment: 'aprobar o rechazar -> A4',
    debts: 'cartera vencida -> recordatorio',
    floors: 'alta/baja de pisos y cuartos',
    settings: 'tarifas y avisos globales'
  };

  const state = { role: 'student', platform: 'mobile', screen: 'splash' };
  let lastFocus = null;

  function node(name, attrs) {
    const item = document.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function (key) { item.setAttribute(key, attrs[key]); });
    return item;
  }

  function sizeFor(platform) {
    return platform === 'pwa'
      ? { width: 1440, height: 900, tx: 0 }
      : { width: 390, height: 844, tx: 0 };
  }

  function roughIn(svg) {
    if (typeof rough !== 'undefined') {
      const r = rough.svg(svg);
      const api = {};
      ['rectangle', 'line', 'circle', 'ellipse', 'path', 'polygon', 'linearPath', 'curve', 'arc'].forEach(function (name) {
        api[name] = function () {
          const el = r[name].apply(r, arguments);
          if (el) svg.appendChild(el);
          return el;
        };
      });
      return api;
    }
    return {
      rectangle: function (x, y, w, h, opts) {
        const el = node('rect', { x: x, y: y, width: w, height: h, fill: (opts && opts.fill) || 'none', stroke: (opts && opts.stroke) || PEN, 'stroke-width': (opts && opts.strokeWidth) || 1.6, rx: 3 });
        svg.appendChild(el);
        return el;
      },
      line: function (x1, y1, x2, y2, opts) {
        const el = node('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: (opts && opts.stroke) || PEN, 'stroke-width': (opts && opts.strokeWidth) || 1.6 });
        svg.appendChild(el);
        return el;
      },
      circle: function (x, y, d, opts) {
        const el = node('circle', { cx: x, cy: y, r: d / 2, fill: (opts && opts.fill) || 'none', stroke: (opts && opts.stroke) || PEN, 'stroke-width': (opts && opts.strokeWidth) || 1.6 });
        svg.appendChild(el);
        return el;
      },
      polygon: function (points, opts) {
        const pts = (points || []).map(function (pt) { return pt[0] + ',' + pt[1]; }).join(' ');
        const el = node('polygon', { points: pts, fill: (opts && opts.fill) || 'none', stroke: (opts && opts.stroke) || PEN, 'stroke-width': (opts && opts.strokeWidth) || 1.6 });
        svg.appendChild(el);
        return el;
      }
    };
  }

  function rect(r, x, y, w, h, extra) {
    const options = Object.assign({ stroke: PEN, strokeWidth: 1.6, roughness: 0.85, bowing: 0.65, fill: PAPER, fillStyle: 'solid' }, extra || {});
    return r.rectangle(x, y, w, h, options);
  }

  function line(r, x1, y1, x2, y2, width) {
    return r.line(x1, y1, x2, y2, { stroke: PEN, strokeWidth: width || 1.5, roughness: 0.75, bowing: 0.55 });
  }

  function text(svg, x, y, value, size, options) {
    const opts = options || {};
    const item = node('text', {
      x: x,
      y: y,
      fill: opts.fill || PEN,
      'font-family': opts.display ? DISPLAY : HAND,
      'font-size': size || 14,
      'font-weight': opts.weight || 400,
      'text-anchor': opts.anchor || 'start'
    });
    if (opts.spacing) item.setAttribute('letter-spacing', opts.spacing);
    if (opts.halo) {
      item.setAttribute('style', 'paint-order: stroke; stroke: #FAF7EE; stroke-width: 3.4px; stroke-linejoin: round;');
    }
    item.textContent = value == null ? '' : String(value);
    svg.appendChild(item);
    return item;
  }

  function centeredText(svg, x, y, value, size, options) {
    return text(svg, x, y, value, size, Object.assign({ anchor: 'middle' }, options || {}));
  }

  function fit(value, max) {
    const str = String(value == null ? '' : value);
    return str.length > max ? str.slice(0, Math.max(1, max - 1)) + '…' : str;
  }

  function drawImage(r, svg, p) {
    rect(r, p.x, p.y, p.w, p.h, { strokeWidth: 1.7, roughness: 0.8, fill: '#F5F0E3' });
    line(r, p.x + 3, p.y + 3, p.x + p.w - 3, p.y + p.h - 3, 1.3);
    line(r, p.x + p.w - 3, p.y + 3, p.x + 3, p.y + p.h - 3, 1.3);
    if (p.label && p.w >= 46 && p.h >= 24) {
      const lblW = Math.min(p.w - 8, p.label.length * 6.2 + 12);
      r.rectangle(p.x + (p.w - lblW) / 2, p.y + (p.h - 16) / 2, lblW, 16, { fill: '#FFFDF8', fillStyle: 'solid', stroke: PEN, strokeWidth: 1.1, roughness: 0.5 });
      centeredText(svg, p.x + p.w / 2, p.y + p.h / 2 + 3.5, fit(p.label, 24), 9.5, { weight: 700 });
    }
  }

  function drawAvatar(r, svg, p) {
    const diam = Math.max(10, (p.r || 14) * 2);
    r.circle(p.x, p.y, diam, { stroke: PEN, strokeWidth: 1.6, roughness: 0.65, fill: '#FFFDF8', fillStyle: 'solid' });
    const rad = (diam / 2) * 0.65;
    line(r, p.x - rad, p.y - rad, p.x + rad, p.y + rad, 1.3);
    line(r, p.x + rad, p.y - rad, p.x - rad, p.y + rad, 1.3);
  }

  function drawNote(r, svg, p, width) {
    const val = p.text || '';
    const dest = p.go || null;
    const noteW = Math.min(200, Math.max(88, val.length * 6.2 + 20));
    const noteH = 24;
    let nx = Math.max(8, Math.min(width - noteW - 8, p.x));
    let ny = Math.max(8, p.y);
    const targetX = p.target && Number(p.target.x) || (nx - 16);
    const targetY = p.target && Number(p.target.y) || (ny + 10);

    const markerId = 'arrow-' + Math.random().toString(36).slice(2, 8);
    const rootSvg = svg.ownerSVGElement || svg;
    let defs = rootSvg.querySelector('defs');
    if (!defs) {
      defs = node('defs');
      rootSvg.insertBefore(defs, rootSvg.firstChild);
    }
    const marker = node('marker', { id: markerId, markerWidth: 7, markerHeight: 6, refX: 6, refY: 3, orient: 'auto' });
    marker.appendChild(node('path', { d: 'M0,0 L0,6 L7,3 z', fill: PEN }));
    defs.appendChild(marker);

    const curve = node('path', {
      d: 'M ' + (nx + noteW / 2) + ' ' + (ny + noteH / 2) + ' Q ' + ((nx + targetX) / 2) + ' ' + (Math.min(ny, targetY) - 12) + ' ' + targetX + ' ' + targetY,
      fill: 'none', stroke: PEN, 'stroke-width': 1.4, 'stroke-linecap': 'round', 'stroke-dasharray': '3 2', 'marker-end': 'url(#' + markerId + ')'
    });
    svg.appendChild(curve);

    const g = dest
      ? node('g', { 'class': 'pencil-interactive clickable', 'data-shell-go': dest, 'role': 'button', 'tabindex': '0' })
      : svg;
    if (dest) svg.appendChild(g);
    const cR = roughIn(g);
    const noteRect = cR.rectangle(nx, ny, noteW, noteH, {
      stroke: dest ? '#2F8A5C' : '#B8A856', strokeWidth: 1.3, fill: NOTE, fillStyle: 'solid', roughness: 1.1
    });
    const noteText = text(g, nx + 8, ny + 16, fit(val, 30), 11, { fill: STICKY_TEXT });
    noteRect.setAttribute('transform', 'rotate(-1.2 ' + (nx + noteW / 2) + ' ' + (ny + noteH / 2) + ')');
    noteText.setAttribute('transform', 'rotate(-1.2 ' + (nx + noteW / 2) + ' ' + (ny + noteH / 2) + ')');
  }

  function resolveActionDest(action, role) {
    if (!action) return null;
    const isAdmin = role === 'admin';
    if (action === 'student-login' || action === 'admin-login' || action === 'verify-email' || action === 'unlock-code') return 'loading';
    if (action === 'register') return 'verifyEmail';
    if (action === 'forgot-send') return isAdmin ? 'adminLogin' : 'studentLogin';
    if (action === 'reserve' || action === 'room-request') return 'requestStatus';
    if (action === 'send-rating') return 'rateConfirm';
    if (action === 'assign-room' || action === 'reject-room') return 'reservations';
    if (action === 'approve-payment' || action === 'reject-payment') return 'pendingPayments';
    if (action === 'logout') return isAdmin ? 'adminLogin' : 'studentLogin';
    return null;
  }

  function labelForImageEl(el) {
    if (el.classList.contains('mk-splash-emblem')) return 'LOGO SICPES';
    if (el.classList.contains('mk-qr')) return 'QR';
    if (el.classList.contains('mk-proof')) return 'VOUCHER SPEI';
    if (el.classList.contains('mk-dropzone')) return 'ARCHIVO';
    if (el.classList.contains('mk-profile-cover')) return 'PORTADA';
    if (el.classList.contains('mk-room-thumb') || el.classList.contains('mk-room-option-thumb')) return 'CUARTO';
    return 'FOTO';
  }

  /* ---------- Trazador 1:1 desde el DOM en vivo de 4 · Prototipo (#mkCanvas) ---------- */

  function tracePrototypeToPencil(r, group, mkCanvas, W, H, screenId, platform, currentRole) {
    const cRect = mkCanvas.getBoundingClientRect();
    if (cRect.width < 10 || cRect.height < 10) return false;
    const scaleX = cRect.width / W;
    const scaleY = cRect.height / H;

    function rel(el) {
      if (!el || el.hidden) return null;
      const cs = window.getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') return null;
      const br = el.getBoundingClientRect();
      if (br.width < 1 || br.height < 1) return null;
      const x = (br.left - cRect.left) / scaleX;
      const y = (br.top - cRect.top) / scaleY;
      const w = br.width / scaleX;
      const h = br.height / scaleY;
      return { el: el, cs: cs, x: x, y: y, w: w, h: h, cx: x + w / 2, cy: y + h / 2, right: x + w, bottom: y + h };
    }

    function inViewport(b) {
      return b && b.bottom > 1 && b.y < H - 1 && b.right > 1 && b.x < W - 1;
    }

    // 1. Marco exterior exacto (390 × 844 en Móvil, 1440 × 900 en PWA)
    r.rectangle(1.5, 1.5, W - 3, H - 3, { stroke: PEN, strokeWidth: 2.3, roughness: 0.75, fill: 'none' });

    // 2. Barras de estructura / Chrome (statusbar, browser bar, appbar, topbar, sidebar, auth-art, bottomnav, footer)
    const statusEl = mkCanvas.querySelector('.mk-statusbar');
    if (statusEl) {
      const b = rel(statusEl);
      if (inViewport(b)) {
        line(r, b.x, b.bottom, b.right, b.bottom, 1.3);
        line(r, b.right - 46, b.cy + 4, b.right - 46, b.cy - 1, 1.3);
        line(r, b.right - 42, b.cy + 4, b.right - 42, b.cy - 3, 1.4);
        line(r, b.right - 38, b.cy + 4, b.right - 38, b.cy - 5, 1.5);
        r.rectangle(b.right - 31, b.cy - 4, 15, 8, { stroke: PEN, strokeWidth: 1.2, fill: 'none', roughness: 0.5 });
      }
    }

    const browserEl = mkCanvas.querySelector('.mk-browser');
    if (browserEl) {
      const b = rel(browserEl);
      if (inViewport(b)) {
        rect(r, b.x, b.y, b.w, b.h, { fill: '#F3EFE2', strokeWidth: 1.5 });
        mkCanvas.querySelectorAll('.mk-browser-dots i').forEach(dot => {
          const db = rel(dot);
          if (db) r.circle(db.cx, db.cy, Math.max(7, db.w), { stroke: PEN, strokeWidth: 1.3, fill: '#FFFDF8', fillStyle: 'solid' });
        });
        const urlEl = mkCanvas.querySelector('.mk-browser-url');
        const ub = urlEl ? rel(urlEl) : null;
        if (ub) {
          rect(r, ub.x, ub.y, ub.w, ub.h, { fill: '#FFFDF8', strokeWidth: 1.2 });
        }
      }
    }

    mkCanvas.querySelectorAll('.mk-appbar, .mk-pwa-top, .mk-public-top, .mk-auth-m-top, .mk-auth-m-foot, .mk-landing-footer').forEach(el => {
      const b = rel(el);
      if (inViewport(b)) {
        rect(r, b.x, b.y, b.w, b.h, { fill: '#F5F0E3', strokeWidth: 1.5 });
      }
    });

    const sideEl = mkCanvas.querySelector('.mk-pwa-side');
    if (sideEl) {
      const b = rel(sideEl);
      if (inViewport(b)) {
        rect(r, b.x, b.y, b.w, b.h, { fill: '#F6F2E6', strokeWidth: 1.6 });
      }
    }

    const authArtEl = mkCanvas.querySelector('.mk-auth-art');
    if (authArtEl) {
      const b = rel(authArtEl);
      if (inViewport(b)) {
        r.rectangle(b.x, b.y, b.w, b.h, {
          stroke: PEN, strokeWidth: 1.6, fill: 'rgba(23,23,23,0.06)',
          fillStyle: 'hachure', fillWeight: 0.9, hachureAngle: -38, hachureGap: 11, roughness: 0.8
        });
      }
    }

    const bottomNavEl = mkCanvas.querySelector('.mk-bottomnav');
    if (bottomNavEl) {
      const b = rel(bottomNavEl);
      if (inViewport(b)) {
        rect(r, b.x, b.y, b.w, b.h, { fill: '#F5F0E3', strokeWidth: 1.6 });
      }
    }

    // 3. Tarjetas y contenedores ordenados de mayor a menor área
    const cardSelector = [
      '.mk-card', '.mk-stat', '.mk-feature', '.mk-kpi', '.mk-fact',
      '.mk-auth-m-card', '.mk-auth-p-card', '.mk-loading-card', '.mk-floating-card',
      '.mk-status-hero', '.mk-list-row', '.mk-room-option',
      '.mk-notice', '.mk-soft-note', '.mk-security-note',
      '.mk-amount-block', '.mk-receipt-amount', '.mk-side-help',
      '.mk-service-grid span', '.mk-service-item', '.mk-quote',
      '.mk-skeleton-box', '.mk-skeleton-panel', '.mk-sk-block', '.mk-splash-badge'
    ].join(',');

    const cardBoxes = Array.from(mkCanvas.querySelectorAll(cardSelector))
      .map(el => rel(el))
      .filter(b => inViewport(b) && b.w >= 18 && b.h >= 16)
      .sort((a, b) => (b.w * b.h) - (a.w * a.h));

    cardBoxes.forEach(b => {
      const isTinted = b.el.matches('.mk-stat, .mk-feature, .mk-kpi, .mk-fact, .mk-soft-note, .mk-security-note, .mk-notice, .mk-status-hero, .mk-amount-block, .mk-receipt-amount, .mk-side-help, .mk-service-grid span, .mk-service-item, .mk-quote');
      const isSelected = b.el.classList.contains('selected');
      if (isSelected) {
        r.rectangle(b.x, b.y, b.w, b.h, {
          stroke: PEN, strokeWidth: 1.9, fill: 'rgba(23,23,23,0.08)',
          fillStyle: 'hachure', fillWeight: 1.0, hachureGap: 6, roughness: 0.8
        });
      } else {
        rect(r, b.x, b.y, b.w, b.h, {
          fill: isTinted ? '#F5F0E3' : '#FFFDF8',
          strokeWidth: b.el.matches('.mk-card, .mk-auth-m-card, .mk-auth-p-card, .mk-loading-card, .mk-floating-card') ? 1.65 : 1.3,
          roughness: 0.8
        });
      }
    });

    // 4. Imágenes, fotos, miniaturas, portada, dropzones y QR (cajas con cruz X)
    const imgSelector = '.mk-photo-wrap, .mk-room-thumb, .mk-gallery-main, .mk-gallery-thumbs button, .mk-auth-art-visual, .mk-proof, .mk-room-option-thumb, .mk-profile-cover, .mk-dropzone, .mk-qr, .mk-splash-emblem';
    mkCanvas.querySelectorAll(imgSelector).forEach(el => {
      const b = rel(el);
      if (!inViewport(b) || b.w < 14 || b.h < 14) return;
      if (el.classList.contains('mk-dropzone')) {
        r.rectangle(b.x, b.y, b.w, b.h, { stroke: PEN, strokeWidth: 1.4, fill: '#F7F3E8', fillStyle: 'solid', roughness: 0.85 });
        return;
      }
      const showLabel = b.w >= 54 && b.h >= 34 && !el.closest('.mk-gallery-thumbs');
      drawImage(r, group, {
        x: b.x,
        y: b.y,
        w: b.w,
        h: b.h,
        label: showLabel ? labelForImageEl(el) : ''
      });
    });

    // 5. Logos, avatares y círculos con X
    mkCanvas.querySelectorAll('.mk-logo-img').forEach(el => {
      const b = rel(el);
      if (inViewport(b)) {
        drawImage(r, group, { x: b.x, y: b.y, w: b.w, h: b.h, label: '' });
      }
    });

    const avatarSelector = '.mk-avatar, .mk-status-hero-icon, .mk-stat-icon, .mk-list-avatar, .mk-timeline-dot, .mk-spinner, .mk-sk-circle, .mk-splash-dots i';
    mkCanvas.querySelectorAll(avatarSelector).forEach(el => {
      const b = rel(el);
      if (!inViewport(b)) return;
      const rad = Math.max(5, Math.min(b.w, b.h) / 2);
      drawAvatar(r, group, { x: b.cx, y: b.cy, r: rad });
    });

    // 6. Barras de progreso, ocupación y líneas divisorias
    mkCanvas.querySelectorAll('.mk-progress, .mk-occupancy').forEach(el => {
      const b = rel(el);
      if (!inViewport(b)) return;
      rect(r, b.x, b.y, b.w, b.h, { fill: '#F2EDE0', strokeWidth: 1.3 });
      const fillEl = el.firstElementChild;
      const fb = fillEl ? rel(fillEl) : null;
      const fw = (fb && fb.w > 4) ? fb.w : Math.round(b.w * 0.65);
      r.rectangle(b.x, b.y, Math.min(b.w, fw), b.h, {
        stroke: PEN, strokeWidth: 1.3, fill: PEN,
        fillStyle: 'hachure', fillWeight: 1.3, hachureGap: 3.5, roughness: 0.6
      });
    });

    mkCanvas.querySelectorAll('.mk-sk-line').forEach(el => {
      const b = rel(el);
      if (inViewport(b)) {
        line(r, b.x, b.cy, b.right, b.cy, 2.2);
      }
    });

    mkCanvas.querySelectorAll('.mk-divider, .mk-receipt-lines span, .mk-price-lines span, .mk-info-rows > div, .mk-switch-list label').forEach(el => {
      const b = rel(el);
      if (!inViewport(b)) return;
      if (el.classList.contains('mk-divider')) {
        line(r, b.x, b.cy, b.cx - 48, b.cy, 1.1);
        line(r, b.cx + 48, b.cy, b.right, b.cy, 1.1);
      } else {
        line(r, b.x, b.bottom, b.right, b.bottom, 0.9);
      }
    });

    // 7. Botones, opciones, pestañas de filtro, celdas de calificación, chips de estado e ítems de navegación
    const btnSelector = [
      '.mk-btn', '.mk-choice', '.mk-filter-tab', '.mk-rating-cell',
      '.mk-side-item', '.mk-pwa-link', '.mk-navitem',
      '.mk-social-row button', '.mk-iconbtn', '.mk-menu-btn',
      '.mk-stepper span', '.mk-status', '.mk-room-tags span',
      '.mk-loading-steps span', '.mk-profile-links button'
    ].join(',');

    mkCanvas.querySelectorAll(btnSelector).forEach(el => {
      const b = rel(el);
      if (!inViewport(b) || b.w < 12 || b.h < 12) return;

      if (el.classList.contains('mk-navitem')) {
        if (el.classList.contains('active')) {
          r.rectangle(b.x + 6, b.y + 4, b.w - 12, b.h - 8, {
            stroke: PEN, strokeWidth: 1.3, fill: 'rgba(23,23,23,0.09)',
            fillStyle: 'hachure', hachureGap: 5, roughness: 0.7
          });
        }
        drawAvatar(r, group, { x: b.cx, y: b.y + 15, r: 7 });
        return;
      }

      const isPrimary = el.classList.contains('mk-primary');
      const isActive = el.classList.contains('active') || el.classList.contains('selected');

      if (isPrimary) {
        r.rectangle(b.x, b.y, b.w, b.h, {
          stroke: PEN, strokeWidth: 2.0, fill: PEN,
          fillStyle: 'hachure', fillWeight: 1.35, hachureAngle: -42, hachureGap: 3.8, roughness: 0.85
        });
      } else if (isActive) {
        r.rectangle(b.x, b.y, b.w, b.h, {
          stroke: PEN, strokeWidth: 1.8, fill: '#575248',
          fillStyle: 'hachure', fillWeight: 1.1, hachureAngle: -42, hachureGap: 4.8, roughness: 0.8
        });
      } else {
        rect(r, b.x, b.y, b.w, b.h, {
          fill: el.matches('.mk-status, .mk-room-tags span, .mk-stepper span, .mk-loading-steps span') ? '#F5F0E3' : '#FFFDF8',
          strokeWidth: 1.35,
          roughness: 0.75
        });
      }
    });

    // 8. Campos de formulario (inputs, selects, textareas, OTP y checkboxes/switches)
    mkCanvas.querySelectorAll('.mk-field input, .mk-field select, .mk-field textarea, .mk-code-row input').forEach(el => {
      const b = rel(el);
      if (!inViewport(b)) return;
      rect(r, b.x, b.y, b.w, b.h, { fill: '#FFFFFF', strokeWidth: 1.65, roughness: 0.75 });
      const rawVal = (
        el.value ||
        el.getAttribute('placeholder') ||
        (el.tagName === 'SELECT' && el.options && el.options[0] ? el.options[0].text : '') ||
        ''
      ).trim();

      if (el.closest('.mk-code-row')) {
        centeredText(group, b.cx, b.cy + 6, rawVal || '•', 18, { weight: 700, display: true });
      } else {
        if (rawVal) {
          const maxChars = Math.max(6, Math.floor((b.w - 24) / 6.4));
          const ty = el.tagName === 'TEXTAREA' ? (b.y + 18) : (b.cy + 4.5);
          text(group, b.x + 11, ty, fit(rawVal, maxChars), 12, { fill: el.value ? PEN : '#6B6559' });
        }
        line(r, b.x + 10, b.bottom - 6, b.x + Math.min(b.w - 18, 140), b.bottom - 6, 0.9);
        if (el.tagName === 'SELECT') {
          line(r, b.right - 18, b.cy - 2, b.right - 14, b.cy + 3, 1.3);
          line(r, b.right - 14, b.cy + 3, b.right - 10, b.cy - 2, 1.3);
        }
      }
    });

    mkCanvas.querySelectorAll('input[type="checkbox"]').forEach(el => {
      const b = rel(el);
      if (!inViewport(b)) return;
      rect(r, b.x, b.y, Math.max(13, b.w), Math.max(13, b.h), {
        fill: el.checked ? '#E8E2D2' : '#FFFFFF',
        strokeWidth: 1.4
      });
      if (el.checked) {
        line(r, b.x + 3, b.cy, b.cx, b.bottom - 3, 1.4);
        line(r, b.cx, b.bottom - 3, b.right - 2, b.y + 3, 1.4);
      }
    });

    // 9. Todos los textos visibles posicionados en sus coordenadas reales línea por línea
    const range = document.createRange();
    const walker = document.createTreeWalker(mkCanvas, NodeFilter.SHOW_TEXT, null);
    let textNode;
    while ((textNode = walker.nextNode())) {
      const fullStr = (textNode.nodeValue || '').replace(/\s+/g, ' ').trim();
      if (!fullStr) continue;
      const parent = textNode.parentElement;
      if (!parent) continue;
      const pTag = parent.tagName.toLowerCase();
      if (pTag === 'script' || pTag === 'style' || pTag === 'svg' || pTag === 'option' || pTag === 'textarea' || pTag === 'input') continue;
      if (parent.closest('svg, .mk-qr')) continue;

      const cs = window.getComputedStyle(parent);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;

      range.selectNodeContents(textNode);
      const clientRects = Array.from(range.getClientRects()).filter(cr => cr.width >= 2 && cr.height >= 4);
      if (!clientRects.length) continue;

      const fs = parseFloat(cs.fontSize) || 12;
      const isBold = parseInt(cs.fontWeight, 10) >= 600 || cs.fontWeight === 'bold' || pTag === 'strong' || pTag === 'b' || pTag === 'h1' || pTag === 'h2' || pTag === 'h3';
      const isDisplay = isBold && (fs >= 14 || pTag === 'h1' || pTag === 'h2' || pTag === 'h3' || parent.matches('.mk-display, .mk-page-title, .mk-auth-title, .mk-title'));
      const onHatched = Boolean(parent.closest('.mk-btn.mk-primary, .mk-choice.selected, .mk-filter-tab.active, .mk-side-item.active, .mk-pwa-link.active, .mk-rating-cell.selected'));
      const fontSize = isDisplay ? Math.round(fs * 1.08) : Math.round(fs * 1.02);

      if (clientRects.length === 1) {
        const cr = clientRects[0];
        const rx = (cr.left - cRect.left) / scaleX;
        const ry = (cr.top - cRect.top) / scaleY;
        const rh = cr.height / scaleY;
        if (ry + rh < 2 || ry > H - 2) continue;
        text(group, rx, ry + rh * 0.78, fullStr, fontSize, {
          weight: isBold ? 700 : 400,
          display: isDisplay,
          halo: onHatched
        });
      } else {
        // Repartir palabras proporcionalmente al ancho de cada renglón envuelto por el navegador
        const words = fullStr.split(' ');
        const totalW = clientRects.reduce((acc, cr) => acc + cr.width, 0) || 1;
        let wordIdx = 0;
        for (let i = 0; i < clientRects.length; i++) {
          const cr = clientRects[i];
          const rx = (cr.left - cRect.left) / scaleX;
          const ry = (cr.top - cRect.top) / scaleY;
          const rh = cr.height / scaleY;
          const share = i === clientRects.length - 1
            ? (words.length - wordIdx)
            : Math.max(1, Math.round((cr.width / totalW) * words.length));
          const lineWords = words.slice(wordIdx, wordIdx + share);
          wordIdx += share;
          if (!lineWords.length) continue;
          if (ry + rh < 2 || ry > H - 2) continue;
          text(group, rx, ry + rh * 0.78, lineWords.join(' '), fontSize, {
            weight: isBold ? 700 : 400,
            display: isDisplay,
            halo: onHatched
          });
        }
      }
    }

    // 10. Zonas clicables interactivas exactas (1:1 con botones y enlaces de #mkCanvas)
    mkCanvas.querySelectorAll('[data-mk-go], [data-mk-action]').forEach(el => {
      const dest = el.dataset.mkGo || resolveActionDest(el.dataset.mkAction, currentRole);
      if (!dest || !META[dest]) return;
      const b = rel(el);
      if (!inViewport(b)) return;
      const targetMeta = META[dest];
      const titleText = 'Ir a: ' + targetMeta.code + ' · ' + targetMeta.title;
      const g = node('g', {
        'class': 'pencil-interactive clickable',
        'data-shell-go': dest,
        'role': 'button',
        'tabindex': '0',
        'aria-label': titleText
      });
      const tip = node('title');
      tip.textContent = titleText;
      g.appendChild(tip);
      g.appendChild(node('rect', {
        x: b.x,
        y: b.y,
        width: b.w,
        height: b.h,
        rx: 4,
        fill: 'transparent',
        'pointer-events': 'all'
      }));
      group.appendChild(g);
    });

    // 11. Nota adhesiva manuscrita apuntando al CTA principal
    const primaryBtn = mkCanvas.querySelector('.mk-btn.mk-primary, [data-mk-go]');
    const pb = primaryBtn ? rel(primaryBtn) : null;
    const noteStr = SCREEN_NOTES[screenId];
    if (noteStr && pb && inViewport(pb)) {
      const dest = primaryBtn.dataset.mkGo || resolveActionDest(primaryBtn.dataset.mkAction, currentRole);
      const nx = platform === 'pwa' ? Math.min(W - 210, Math.max(230, pb.right + 18)) : Math.max(14, Math.min(W - 185, pb.cx - 20));
      const ny = platform === 'pwa' ? Math.max(46, pb.y - 34) : Math.max(36, Math.min(H - 86, pb.bottom + 10));
      drawNote(r, group, {
        x: nx,
        y: ny,
        text: noteStr,
        go: dest,
        target: { x: pb.cx, y: pb.cy }
      }, W);
    }

    return true;
  }

  function buildSvg(screenId, platform, forDownload) {
    const dimensions = sizeFor(platform);
    const svg = node('svg', {
      viewBox: '0 0 ' + dimensions.width + ' ' + dimensions.height,
      preserveAspectRatio: 'xMidYMid meet',
      role: 'img',
      'aria-label': 'Boceto a lápiz de ' + ((META[screenId] && META[screenId].title) || screenId)
    });
    if (forDownload) {
      svg.setAttribute('width', dimensions.width);
      svg.setAttribute('height', dimensions.height);
      svg.setAttribute('xmlns', NS);
    } else {
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
    }

    const defs = node('defs');
    const filter = node('filter', { id: 'pencil-wobble', x: '-2%', y: '-2%', width: '104%', height: '104%' });
    const feTurb = node('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.035', numOctaves: '2', result: 'noise' });
    const feDisp = node('feDisplacementMap', { in: 'SourceGraphic', in2: 'noise', scale: '1.05', xChannelSelector: 'R', yChannelSelector: 'G' });
    filter.appendChild(feTurb);
    filter.appendChild(feDisp);
    defs.appendChild(filter);

    const patternId = 'dots-' + screenId + '-' + platform + '-' + Math.random().toString(36).slice(2, 7);
    const pattern = node('pattern', { id: patternId, width: 18, height: 18, patternUnits: 'userSpaceOnUse' });
    pattern.appendChild(node('circle', { cx: 2, cy: 2, r: 0.85, fill: '#DDD7C4' }));
    defs.appendChild(pattern);
    svg.appendChild(defs);

    const rx = platform === 'mobile' ? 35 : 12;
    svg.appendChild(node('rect', { x: 0, y: 0, width: dimensions.width, height: dimensions.height, rx: rx, fill: '#FAF7EE' }));
    svg.appendChild(node('rect', { x: 0, y: 0, width: dimensions.width, height: dimensions.height, rx: rx, fill: 'url(#' + patternId + ')' }));

    const group = node('g', { filter: 'url(#pencil-wobble)' });
    svg.appendChild(group);

    const r = roughIn(group);
    const spec = (window.PENCIL_SCREENS || {})[screenId];
    const currentRole = (spec && spec.role === 'Administrador') ? 'admin' : (state.role === 'admin' ? 'admin' : 'student');

    const mkCanvas = document.getElementById('mkCanvas');
    let traced = false;
    if (mkCanvas && window.SicpesMockups) {
      const prevScreen = window.SicpesMockups.getScreen();
      const prevRole = window.SicpesMockups.getRole();
      const prevPlat = window.SicpesMockups.getPlatform();
      const needSwitch = prevScreen !== screenId || prevPlat !== platform || prevRole !== currentRole;
      if (needSwitch) {
        window.SicpesMockups.showScreen(screenId, currentRole, platform);
      }
      if (screenId === 'loading') {
        const fill = mkCanvas.querySelector('.mk-progress-fill');
        const pct = mkCanvas.querySelector('#mkProgressPercent');
        if (fill) fill.style.width = '68%';
        if (pct) pct.textContent = '68%';
      }
      traced = tracePrototypeToPencil(r, group, mkCanvas, dimensions.width, dimensions.height, screenId, platform, currentRole);
      if (needSwitch && forDownload) {
        window.SicpesMockups.showScreen(prevScreen, prevRole, prevPlat);
      }
    }

    if (!traced) {
      setTimeout(renderStage, 60);
    }

    return svg;
  }

  function stage() { return document.getElementById('pencilStage'); }
  function modal() { return document.getElementById('pencilModal'); }

  function renderStage() {
    const host = stage();
    if (!host) return;
    host.innerHTML = '';
    host.appendChild(buildSvg(state.screen, state.platform, false));
  }

  function renderModal() {
    const host = document.getElementById('pencilModalSheet');
    if (!host) return;
    host.innerHTML = '';
    host.appendChild(buildSvg(state.screen, state.platform, false));
    const meta = META[state.screen] || { code: '', title: state.screen };
    const code = document.getElementById('pencilModalCode');
    const title = document.getElementById('pencilModalTitle');
    const role = document.getElementById('pencilModalRole');
    const screens = screensForRole();
    const curIdx = screens.indexOf(state.screen) + 1;
    const total = screens.length;

    if (code) code.textContent = meta.code;
    if (title) title.textContent = meta.title;
    if (role) {
      role.textContent = (state.role === 'admin' ? 'ADMINISTRADOR' : state.role === 'shared' ? 'COMUNES (AMBOS ROLES)' : 'ESTUDIANTE') +
        ' · ' + (state.platform === 'mobile' ? 'MÓVIL' : 'PWA') +
        ' (Lámina ' + (curIdx || 1) + ' de ' + total + ')';
    }
  }

  function openModal() {
    const dialog = modal();
    if (!dialog) return;
    lastFocus = document.activeElement;
    renderModal();
    dialog.hidden = false;
    document.body.classList.add('pencil-modal-open');
    const close = dialog.querySelector('[data-pencil-close]');
    if (close) close.focus({ preventScroll: true });
  }

  function closeModal() {
    const dialog = modal();
    if (!dialog) return;
    dialog.hidden = true;
    document.body.classList.remove('pencil-modal-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true });
    lastFocus = null;
  }

  function screensForRole() { return state.role === 'admin' ? ADMIN : state.role === 'shared' ? SHARED : STUDENT; }

  function navigate(delta) {
    const screens = screensForRole();
    let index = screens.indexOf(state.screen);
    if (index < 0) index = delta > 0 ? -1 : 0;
    const next = screens[(index + delta + screens.length) % screens.length];
    showScreen(next, state.role, state.platform, true);
  }

  function showScreen(id, role, platform, fromModal) {
    if (role === 'student' || role === 'admin' || role === 'shared') state.role = role;
    if (platform === 'mobile' || platform === 'pwa') state.platform = platform;
    if (META[id]) state.screen = id;
    renderStage();
    const dialog = modal();
    if (dialog && !dialog.hidden) renderModal();
    if (!window.SicpesShell || window.SicpesShell.getState().section === 'sketches') {
      window.dispatchEvent(new CustomEvent('sicpes:screen', {
        detail: { section: 'sketches', platform: state.platform, screen: state.screen, role: state.role }
      }));
    }
    if (fromModal && dialog && dialog.hidden) openModal();
  }

  function download(screenId, platform, role) {
    const plat = platform || state.platform;
    const curRole = role || state.role;
    const meta = META[screenId] || { code: screenId };
    const svg = buildSvg(screenId, plat, true);
    const serialized = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = function () {
      const scale = 2;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(sizeFor(plat).width * scale);
      canvas.height = Math.round(sizeFor(plat).height * scale);
      const context = canvas.getContext('2d');
      context.fillStyle = '#FAF7EE';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const link = document.createElement('a');
      link.download = 'sicpes-sketch-' + (meta.code || screenId) + '-' + curRole + '-' + plat + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      URL.revokeObjectURL(url);
    };
    image.onerror = function () {
      URL.revokeObjectURL(url);
      if (window.SicpesShell && window.SicpesShell.toast) window.SicpesShell.toast('No se pudo generar la lámina.');
    };
    image.src = url;
  }

  function downloadCurrent() {
    download(state.screen, state.platform, state.role);
  }

  async function downloadAll() {
    const screens = screensForRole();
    for (let index = 0; index < screens.length; index += 1) {
      download(screens[index], state.platform, state.role);
      await new Promise(function (resolve) { setTimeout(resolve, 220); });
    }
  }

  function onKeydown(event) {
    const dialog = modal();
    if (!dialog || dialog.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      navigate(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      navigate(-1);
    }
  }

  function onStageClick(event) {
    const interactive = event.target.closest('[data-shell-go]');
    if (interactive) {
      const dest = interactive.getAttribute('data-shell-go');
      if (dest) {
        event.preventDefault();
        event.stopPropagation();
        if (window.SicpesShell) {
          window.SicpesShell.showScreen(dest);
        } else {
          showScreen(dest, state.role, state.platform, false);
        }
        return;
      }
    }
    if (event.target.closest('[data-pencil-zoom]')) {
      event.preventDefault();
      openModal();
    }
  }

  function onStageDblClick(event) {
    if (!event.target.closest('[data-shell-go]')) {
      openModal();
    }
  }

  function onModalSheetClick(event) {
    const interactive = event.target.closest('[data-shell-go]');
    if (interactive) {
      const dest = interactive.getAttribute('data-shell-go');
      if (dest) {
        event.preventDefault();
        event.stopPropagation();
        showScreen(dest, state.role, state.platform, true);
        if (window.SicpesShell) {
          window.SicpesShell.showScreen(dest, { preserveModal: true });
        }
      }
    }
  }

  function init() {
    const host = stage();
    if (host) {
      host.addEventListener('click', onStageClick);
      host.addEventListener('dblclick', onStageDblClick);
    }

    const modalSheet = document.getElementById('pencilModalSheet');
    if (modalSheet) {
      modalSheet.addEventListener('click', onModalSheetClick);
    }

    document.querySelectorAll('[data-pencil-close]').forEach(function (button) {
      button.addEventListener('click', closeModal);
    });

    const zoomFab = document.getElementById('pencilZoomFab');
    if (zoomFab) zoomFab.addEventListener('click', openModal);

    const one = document.getElementById('pencilDownloadOne');
    const all = document.getElementById('pencilDownloadAll');
    const prev = document.getElementById('pencilNavPrev');
    const next = document.getElementById('pencilNavNext');
    if (one) one.addEventListener('click', downloadCurrent);
    if (all) all.addEventListener('click', downloadAll);
    if (prev) prev.addEventListener('click', function () { navigate(-1); });
    if (next) next.addEventListener('click', function () { navigate(1); });
    document.addEventListener('keydown', onKeydown);
    renderStage();
  }

  window.SicpesSketches = {
    showScreen: showScreen,
    getScreen: function () { return state.screen; },
    getRole: function () { return state.role; },
    getPlatform: function () { return state.platform; },
    closeModal: closeModal,
    openModal: openModal,
    downloadCurrent: downloadCurrent,
    downloadAll: downloadAll,
    refresh: renderStage
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
