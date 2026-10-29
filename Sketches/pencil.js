(function () {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const PEN = '#171717';
  const PAPER = '#FFFDF8';
  const NOTE = '#FFF2A8';
  const STICKY_TEXT = '#3D3520';
  const HAND = "'Patrick Hand', 'Caveat', cursive, system-ui";
  const DISPLAY = "'Caveat', 'Patrick Hand', cursive, system-ui";

  const SHARED = ['splash', 'loading', 'forgotPassword', 'lockAccount', 'unlockAccount', 'aboutSoftware', 'aboutTeam'];
  const STUDENT = ['splash', 'landing', 'studentLogin', 'forgotPassword', 'lockAccount', 'unlockAccount', 'register', 'verifyEmail', 'loading', 'home', 'reserve', 'roomDetail', 'requestStatus', 'payments', 'paymentDetail', 'rateService', 'rateConfirm', 'profile', 'aboutSoftware', 'aboutTeam'];
  const ADMIN = ['splash', 'adminLogin', 'forgotPassword', 'lockAccount', 'unlockAccount', 'loading', 'reservations', 'assignRoom', 'pendingPayments', 'validatePayment', 'debts', 'floors', 'settings', 'aboutSoftware', 'aboutTeam'];

  const NAV_SCREENS = new Set(['home', 'reserve', 'roomDetail', 'requestStatus', 'payments', 'paymentDetail', 'rateService', 'rateConfirm', 'profile', 'reservations', 'assignRoom', 'pendingPayments', 'validatePayment', 'debts', 'floors', 'settings']);

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

  function menuFor(role, platform) {
    return role === 'admin'
      ? [['reservations', 'Reservaciones'], ['pendingPayments', 'Pagos'], ['floors', 'Pisos'], ['settings', 'Configuración']]
      : [['home', 'Inicio'], ['reserve', platform === 'pwa' ? 'Reservar' : 'Peticiones'], ['payments', 'Pagos'], ['profile', 'Cuenta']];
  }

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

  const CODE_TO_ID = {};
  Object.keys(META).forEach(function (id) {
    CODE_TO_ID[META[id].code] = id;
  });

  const state = { role: 'student', platform: 'mobile', screen: 'landing' };
  let lastFocus = null;

  function node(name, attrs) {
    const item = document.createElementNS(NS, name);
    Object.keys(attrs || {}).forEach(function (key) { item.setAttribute(key, attrs[key]); });
    return item;
  }

  function sizeFor(platform) {
    return platform === 'pwa'
      ? { width: 1200, height: 820, tx: 0 }
      : { width: 440, height: 880, tx: 0 };
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
    // Fallback simple si rough no está cargado
    return {
      rectangle: function (x, y, w, h, opts) {
        const el = node('rect', { x: x, y: y, width: w, height: h, fill: (opts && opts.fill) || 'none', stroke: (opts && opts.stroke) || PEN, 'stroke-width': (opts && opts.strokeWidth) || 1.8, rx: 3 });
        svg.appendChild(el);
        return el;
      },
      line: function (x1, y1, x2, y2, opts) {
        const el = node('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: (opts && opts.stroke) || PEN, 'stroke-width': (opts && opts.strokeWidth) || 1.8 });
        svg.appendChild(el);
        return el;
      },
      circle: function (x, y, d, opts) {
        const el = node('circle', { cx: x, cy: y, r: d / 2, fill: (opts && opts.fill) || 'none', stroke: (opts && opts.stroke) || PEN, 'stroke-width': (opts && opts.strokeWidth) || 1.8 });
        svg.appendChild(el);
        return el;
      },
      polygon: function (points, opts) {
        const pts = (points || []).map(function (pt) { return pt[0] + ',' + pt[1]; }).join(' ');
        const el = node('polygon', { points: pts, fill: (opts && opts.fill) || 'none', stroke: (opts && opts.stroke) || PEN, 'stroke-width': (opts && opts.strokeWidth) || 1.8 });
        svg.appendChild(el);
        return el;
      }
    };
  }

  function rect(r, x, y, w, h, extra) {
    const options = Object.assign({ stroke: PEN, strokeWidth: 1.8, roughness: 0.9, bowing: 0.7, fill: PAPER, fillStyle: 'solid' }, extra || {});
    return r.rectangle(x, y, w, h, options);
  }

  function line(r, x1, y1, x2, y2, width) {
    return r.line(x1, y1, x2, y2, { stroke: PEN, strokeWidth: width || 1.8, roughness: 0.8, bowing: 0.6 });
  }

  function text(svg, x, y, value, size, options) {
    const opts = options || {};
    const item = node('text', {
      x: x, y: y, fill: opts.fill || PEN, 'font-family': opts.display ? DISPLAY : HAND,
      'font-size': size || 15, 'font-weight': opts.weight || 400, 'text-anchor': opts.anchor || 'start'
    });
    if (opts.spacing) item.setAttribute('letter-spacing', opts.spacing);
    if (opts.transform) item.setAttribute('transform', opts.transform);
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

  function resolveScreenFromCode(str) {
    if (!str) return null;
    const match = String(str).match(/\b([C][1-5]|[EA][1-9]|E1[0-5]|A[1-8])\b/);
    if (match && CODE_TO_ID[match[1]]) return CODE_TO_ID[match[1]];
    return null;
  }

  function wrapInteractive(svg, dest, label, callback) {
    if (!dest) {
      callback(svg);
      return;
    }
    const targetMeta = META[dest] || { code: '', title: dest };
    const titleText = 'Ir a: ' + (targetMeta.code ? targetMeta.code + ' · ' : '') + targetMeta.title;
    const g = node('g', {
      'class': 'pencil-interactive clickable',
      'data-shell-go': dest,
      'role': 'button',
      'tabindex': '0',
      'aria-label': label ? (label + ' (' + titleText + ')') : titleText
    });
    const tip = node('title');
    tip.textContent = titleText;
    g.appendChild(tip);
    svg.appendChild(g);
    callback(g);
  }

  // 1. Recuadro de etiqueta en la esquina superior izquierda [ E1 · LANDING ]
  function drawTag(r, svg, p) {
    const val = p.text || 'PANTALLA';
    const tagW = Math.max(110, val.length * 7.8 + 22);
    const tagH = 24;
    r.rectangle(p.x, p.y, tagW, tagH, { stroke: PEN, strokeWidth: 1.8, fill: '#FFFFFF', fillStyle: 'solid', roughness: 0.6 });
    text(svg, p.x + 10, p.y + 16, val, 11, { weight: 700, display: false, spacing: '0.08em' });
  }

  // 2. Marco de teléfono móvil con status bar
  function drawPhoneFrame(r, svg, p) {
    // Sombra suave a mano
    rect(r, p.x + 8, p.y + 10, p.w, p.h, { fill: '#1E1E1E', stroke: '#1E1E1E', roughness: 0.5 });
    // Carcasa principal
    rect(r, p.x, p.y, p.w, p.h, { strokeWidth: 2.6, roughness: 0.7, fill: '#FFFFFF', fillStyle: 'solid' });
    // Bocina / Altavoz superior
    line(r, p.x + p.w / 2 - 32, p.y + 14, p.x + p.w / 2 + 32, p.y + 14, 2);
    // Cámara frontal (círculo con X pequeño)
    r.circle(p.x + p.w / 2 - 46, p.y + 14, 7, { stroke: PEN, strokeWidth: 1.4, roughness: 0.6 });
    line(r, p.x + p.w / 2 - 48, p.y + 12, p.x + p.w / 2 - 44, p.y + 16, 1);
    line(r, p.x + p.w / 2 - 44, p.y + 12, p.x + p.w / 2 - 48, p.y + 16, 1);
    // Barra de estado: Hora 9:41 e indicadores simulados
    text(svg, p.x + 22, p.y + 36, '9:41', 11, { weight: 700 });
    // Iconos de señal y batería
    line(r, p.x + p.w - 56, p.y + 33, p.x + p.w - 56, p.y + 26, 1.4);
    line(r, p.x + p.w - 51, p.y + 33, p.x + p.w - 51, p.y + 23, 1.6);
    line(r, p.x + p.w - 46, p.y + 33, p.x + p.w - 46, p.y + 20, 1.8);
    // Batería
    r.rectangle(p.x + p.w - 38, p.y + 24, 20, 10, { strokeWidth: 1.4, fill: 'none', roughness: 0.6 });
    r.rectangle(p.x + p.w - 18, p.y + 27, 2.5, 4, { strokeWidth: 1.2, fill: PEN, fillStyle: 'solid' });
    // Barra inferior home indicator
    line(r, p.x + p.w / 2 - 45, p.y + p.h - 12, p.x + p.w / 2 + 45, p.y + p.h - 12, 2.8);
  }

  // 3. Marco de ventana de navegador (PWA) con barra de direcciones
  function drawBrowserFrame(r, svg, p) {
    rect(r, p.x + 8, p.y + 10, p.w, p.h, { fill: '#1E1E1E', stroke: '#1E1E1E', roughness: 0.5 });
    rect(r, p.x, p.y, p.w, p.h, { strokeWidth: 2.6, roughness: 0.7, fill: '#FFFFFF', fillStyle: 'solid' });
    // Barra superior
    line(r, p.x, p.y + 36, p.x + p.w, p.y + 36, 1.8);
    // 3 botones de ventana (o o o)
    [0, 1, 2].forEach(function (i) {
      r.circle(p.x + 18 + i * 16, p.y + 18, 9, { stroke: PEN, strokeWidth: 1.4, roughness: 0.5, fill: 'none' });
    });
    // Barra de direcciones URL
    const urlBoxW = Math.min(p.w - 180, 560);
    const urlBoxX = p.x + (p.w - urlBoxW) / 2;
    rect(r, urlBoxX, p.y + 8, urlBoxW, 20, { strokeWidth: 1.3, roughness: 0.6, fill: '#F8F6F0' });
    // Icono candado en URL
    r.circle(urlBoxX + 14, p.y + 17, 6, { stroke: PEN, strokeWidth: 1.2, fill: 'none' });
    text(svg, urlBoxX + 26, p.y + 22, p.url || 'https://app.sicpes.mx', 10, { fill: '#444' });
    // Controles de minimizar / cerrar
    text(svg, p.x + p.w - 48, p.y + 22, '— □ ×', 11, { fill: '#777' });
  }

  // 4. Imagen: cuadrado / rectángulo cruzado por una gran X
  function drawImage(r, svg, p) {
    rect(r, p.x, p.y, p.w, p.h, { strokeWidth: 1.9, roughness: 0.8 });
    // Gran X de esquina a esquina
    line(r, p.x + 4, p.y + 4, p.x + p.w - 4, p.y + p.h - 4, 1.5);
    line(r, p.x + p.w - 4, p.y + 4, p.x + 4, p.y + p.h - 4, 1.5);
    if (p.label) {
      const lblW = Math.min(p.w - 12, p.label.length * 6.5 + 16);
      r.rectangle(p.x + (p.w - lblW) / 2, p.y + (p.h - 18) / 2, lblW, 18, { fill: '#FFFDF8', stroke: PEN, strokeWidth: 1.2, roughness: 0.6 });
      centeredText(svg, p.x + p.w / 2, p.y + (p.h) / 2 + 4, fit(p.label, 30), 10, { weight: 700 });
    }
  }

  // 5. Avatar / Foto de perfil: círculo cruzado por una X
  function drawAvatar(r, svg, p) {
    const diam = (p.r || 16) * 2;
    r.circle(p.x, p.y, diam, { stroke: PEN, strokeWidth: 1.8, roughness: 0.7, fill: '#FFFDF8' });
    const rad = (p.r || 16) * 0.7;
    line(r, p.x - rad, p.y - rad, p.x + rad, p.y + rad, 1.5);
    line(r, p.x + rad, p.y - rad, p.x - rad, p.y + rad, 1.5);
  }

  // 6. Rayas horizontales de texto
  function drawTextLines(r, svg, p) {
    const count = p.count || 2;
    const spacing = 10;
    const thick = p.thickness || 1.8;
    for (let i = 0; i < count; i++) {
      const len = (p.lengths && p.lengths[i]) || (p.w ? p.w * (1 - i * 0.2) : 160);
      const y = p.y + i * spacing;
      line(r, p.x, y, p.x + len, y, thick);
    }
  }

  // 7. Barra de búsqueda con lupa
  function drawSearchBar(r, svg, p) {
    rect(r, p.x, p.y, p.w, p.h || 34, { strokeWidth: 1.8, roughness: 0.75 });
    // Lupa (círculo con palito)
    r.circle(p.x + 16, p.y + (p.h || 34) / 2 - 1, 10, { stroke: PEN, strokeWidth: 1.5, fill: 'none' });
    line(r, p.x + 20, p.y + (p.h || 34) / 2 + 3, p.x + 25, p.y + (p.h || 34) / 2 + 8, 1.8);
    text(svg, p.x + 34, p.y + (p.h || 34) / 2 + 5, fit(p.placeholder || 'Buscar...', 40), 12, { fill: '#666' });
  }

  // 8. Chip / Pastilla
  function drawChip(r, svg, p) {
    const chipW = p.w || Math.max(50, (p.text || '').length * 7 + 18);
    const chipH = p.h || 24;
    const dest = p.go || null;
    wrapInteractive(svg, dest, p.text, function (container) {
      const cR = roughIn(container);
      cR.rectangle(p.x, p.y, chipW, chipH, { stroke: PEN, strokeWidth: 1.6, roughness: 0.7, fill: p.active ? '#EAE5D4' : '#FFFDF8' });
      centeredText(container, p.x + chipW / 2, p.y + chipH / 2 + 4, fit(p.text || '', 20), 10.5, { weight: p.active ? 700 : 400 });
      if (dest) {
        const hit = node('rect', { x: p.x, y: p.y, width: chipW, height: chipH, fill: 'transparent', 'pointer-events': 'all' });
        container.appendChild(hit);
      }
    });
  }

  // 9. Campo de formulario
  function drawField(r, svg, p) {
    text(svg, p.x, p.y - 6, fit(p.label || '', 50), 10, { spacing: '0.08em', weight: 700 });
    rect(r, p.x, p.y, p.w, 42, { strokeWidth: 1.8, roughness: 0.75 });
    line(r, p.x + 12, p.y + 28, p.x + Math.min(p.w - 24, 180), p.y + 28, 1.2);
    text(svg, p.x + 12, p.y + 22, fit(p.placeholder || 'Escribe aquí…', 32), 12, { fill: '#777' });
  }

  // 10. Botón redondeado con interactividad
  function drawButton(r, svg, p) {
    const dest = p.go || null;
    wrapInteractive(svg, dest, p.text, function (container) {
      const cR = roughIn(container);
      if (p.style === 'hatched') {
        cR.rectangle(p.x, p.y, p.w, p.h, {
          stroke: PEN, strokeWidth: 2.2, fill: PEN, fillStyle: 'hachure',
          fillWeight: 1.5, hachureAngle: -42, hachureGap: 3.2, roughness: 0.85
        });
        centeredText(container, p.x + p.w / 2, p.y + p.h / 2 + 5, p.text || '', 15, { fill: '#FFFDF8', weight: 700, display: true });
      } else if (p.style === 'link') {
        text(container, p.x, p.y + (p.h || 20) / 2 + 5, p.text || '', 12, { weight: 700, fill: PEN });
        line(cR, p.x, p.y + (p.h || 20) / 2 + 8, p.x + Math.min(p.w, p.text.length * 7), p.y + (p.h || 20) / 2 + 8, 1.2);
      } else {
        rect(cR, p.x, p.y, p.w, p.h, { strokeWidth: 2.0, roughness: 0.8 });
        centeredText(container, p.x + p.w / 2, p.y + p.h / 2 + 5, p.text || '', 14, { weight: 400, display: true });
      }
      if (dest) {
        const hit = node('rect', { x: p.x, y: p.y, width: p.w, height: p.h || 24, fill: 'transparent', 'pointer-events': 'all' });
        container.appendChild(hit);
      }
    });
  }

  // 11. Barra inferior de navegación (móvil) con iconos circulares con X
  function drawBottomNav(r, svg, p, role) {
    rect(r, p.x, p.y, p.w, 48, { strokeWidth: 2.0, roughness: 0.7, fill: '#FFFDF8' });
    const itemW = p.w / Math.max(1, (p.items || []).length);
    const menu = menuFor(role, 'mobile');

    (p.items || []).forEach(function (item, index) {
      const dest = (menu[index] && menu[index][0]) || null;
      const cx = p.x + itemW * index + itemW / 2;
      wrapInteractive(svg, dest, item, function (container) {
        const cR = roughIn(container);
        if (index === p.active) {
          cR.rectangle(p.x + itemW * index + 4, p.y + 3, itemW - 8, 42, {
            stroke: 'none', fill: '#EAE5D4', fillStyle: 'solid', roughness: 0.7
          });
        }
        // Icono circular con X
        cR.circle(cx, p.y + 16, 15, { stroke: PEN, strokeWidth: 1.4, roughness: 0.6 });
        line(cR, cx - 4, p.y + 12, cx + 4, p.y + 20, 1.2);
        line(cR, cx + 4, p.y + 12, cx - 4, p.y + 20, 1.2);
        // Texto
        centeredText(container, cx, p.y + 38, fit(item, 12), 10, { weight: index === p.active ? 700 : 400 });
        const hit = node('rect', { x: p.x + itemW * index, y: p.y, width: itemW, height: 48, fill: 'transparent', 'pointer-events': 'all' });
        container.appendChild(hit);
      });
    });
  }

  // 12. Barra lateral de navegación (PWA)
  function drawSideNav(r, svg, p, role) {
    rect(r, p.x, p.y, p.w, p.h || 650, { strokeWidth: 2.0, roughness: 0.75, fill: '#FFFDF8' });
    line(r, p.x + 10, p.y + 44, p.x + p.w - 10, p.y + 44, 1.4);
    text(svg, p.x + 14, p.y + 30, 'SICPES MENÚ', 12, { spacing: '0.12em', weight: 700 });

    const menu = menuFor(role, 'pwa');
    const activeIndex = Number.isInteger(p.active) ? p.active : 0;

    (p.items || []).forEach(function (item, index) {
      const dest = (menu[index] && menu[index][0]) || null;
      wrapInteractive(svg, dest, item, function (container) {
        const cR = roughIn(container);
        const iy = p.y + 55 + index * 46;
        if (index === activeIndex) {
          cR.rectangle(p.x + 8, iy, p.w - 16, 36, {
            stroke: 'none', fill: '#EAE5D4', fillStyle: 'solid', roughness: 0.7
          });
        }
        // Icono circular con X
        cR.circle(p.x + 24, iy + 18, 16, { stroke: PEN, strokeWidth: 1.4, roughness: 0.6 });
        line(cR, p.x + 20, iy + 14, p.x + 28, iy + 22, 1.2);
        line(cR, p.x + 28, iy + 14, p.x + 20, iy + 22, 1.2);
        // Texto
        text(container, p.x + 44, iy + 22, fit(item, 18), 13.5, { weight: index === activeIndex ? 700 : 400 });
        const hit = node('rect', { x: p.x + 8, y: iy, width: p.w - 16, height: 36, fill: 'transparent', 'pointer-events': 'all' });
        container.appendChild(hit);
      });
    });
  }

  // 13. Barra superior de PWA
  function drawTopNav(r, svg, p) {
    const items = p.items || [];
    const count = Math.max(1, items.length);
    const itemW = p.w / count;
    items.forEach(function (item, index) {
      centeredText(svg, p.x + itemW * index + itemW / 2, p.y + 18, fit(item, 14), 12, { weight: 400 });
    });
  }

  // 14. Anotación manuscrita con flecha curva
  function drawNote(r, svg, p, width) {
    const val = p.text || '';
    const dest = p.go || resolveScreenFromCode(val);
    const noteW = Math.min(220, Math.max(85, val.length * 6.5 + 24));
    const noteH = 28;
    let nx = p.x;
    let ny = p.y;
    if (nx + noteW > width - 10) nx = Math.max(10, width - noteW - 10);
    const targetX = p.target && Number(p.target.x) || nx - 20;
    const targetY = p.target && Number(p.target.y) || ny + 10;

    const markerId = 'arrow-' + Math.random().toString(36).slice(2, 8);
    const rootSvg = svg.ownerSVGElement || svg;
    let defs = rootSvg.querySelector('defs');
    if (!defs) {
      defs = node('defs');
      rootSvg.insertBefore(defs, rootSvg.firstChild);
    }
    const marker = node('marker', { id: markerId, markerWidth: 8, markerHeight: 6, refX: 7, refY: 3, orient: 'auto' });
    marker.appendChild(node('path', { d: 'M0,0 L0,6 L8,3 z', fill: PEN }));
    defs.appendChild(marker);

    const curve = node('path', {
      d: 'M ' + (nx + 10) + ' ' + (ny + 14) + ' Q ' + ((nx + targetX) / 2) + ' ' + (targetY + 20) + ' ' + targetX + ' ' + targetY,
      fill: 'none', stroke: PEN, 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-dasharray': '3 2', 'marker-end': 'url(#' + markerId + ')'
    });
    svg.appendChild(curve);

    wrapInteractive(svg, dest, val, function (container) {
      const cR = roughIn(container);
      const noteRect = cR.rectangle(nx, ny, noteW, noteH, {
        stroke: dest ? '#2F8A5C' : '#B8A856', strokeWidth: 1.4, fill: NOTE, fillStyle: 'solid', roughness: 1.3
      });
      const noteText = text(container, nx + 8, ny + 18, fit(val, 32), 12, { fill: STICKY_TEXT });
      noteRect.setAttribute('transform', 'rotate(-1.5 ' + (nx + noteW / 2) + ' ' + (ny + noteH / 2) + ')');
      noteText.setAttribute('transform', 'rotate(-1.5 ' + (nx + noteW / 2) + ' ' + (ny + noteH / 2) + ')');
      if (dest) {
        const hit = node('rect', { x: nx, y: ny, width: noteW, height: noteH, fill: 'transparent', 'pointer-events': 'all' });
        container.appendChild(hit);
      }
    });
  }

  // 15. Tabs
  function drawTabs(r, svg, p) {
    const count = Math.max(1, (p.items || []).length);
    const width = (p.w || 320) / count;
    rect(r, p.x, p.y, p.w || 320, 32, { strokeWidth: 1.6, roughness: 0.7 });
    (p.items || []).forEach(function (item, index) {
      const x = p.x + index * width;
      if (index > 0) line(r, x, p.y + 2, x, p.y + 30, 1.2);
      if (index === p.active) {
        r.rectangle(x + 4, p.y + 22, width - 8, 4, { stroke: PEN, strokeWidth: 2.8, roughness: 0.6, fill: PEN, fillStyle: 'solid' });
      }
      centeredText(svg, x + width / 2, p.y + 19, fit(item, 14), 11, { weight: index === p.active ? 700 : 400 });
    });
  }

  // 16. Tabla
  function drawTable(r, svg, p) {
    const headers = p.headers || [];
    const rows = p.rows || [];
    const col = p.w / Math.max(1, headers.length);
    const rowH = 34;
    const h = 30 + rows.length * rowH;
    rect(r, p.x, p.y, p.w, h, { strokeWidth: 1.8, roughness: 0.75 });
    r.rectangle(p.x + 2, p.y + 2, p.w - 4, 28, { stroke: 'none', fill: '#ECE7DA', fillStyle: 'solid', roughness: 0.6 });

    headers.forEach(function (header, index) {
      text(svg, p.x + 8 + index * col, p.y + 20, fit(header, Math.max(5, Math.floor(col / 7))), 11, { weight: 700 });
    });
    rows.forEach(function (row, rowIndex) {
      const y = p.y + 30 + rowIndex * rowH;
      if (rowIndex > 0) line(r, p.x + 2, y, p.x + p.w - 2, y, 1.1);
      row.forEach(function (cell, cellIndex) {
        text(svg, p.x + 8 + cellIndex * col, y + 22, fit(cell, Math.max(5, Math.floor(col / 6.5))), 11, { weight: cellIndex === 0 ? 700 : 400 });
      });
    });
  }

  // 17. 5 Estrellas a lápiz
  function drawStars(r, svg, p) {
    for (let index = 0; index < 5; index += 1) {
      const cx = p.x + 18 + index * 36;
      const cy = p.y + 12;
      const points = [];
      for (let point = 0; point < 10; point += 1) {
        const radius = point % 2 === 0 ? 15 : 6.5;
        const angle = -Math.PI / 2 + point * Math.PI / 5;
        points.push([cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius]);
      }
      r.polygon(points, { stroke: PEN, strokeWidth: 1.6, roughness: 0.8, fill: '#FFFDF8' });
    }
  }

  // Despachador principal de partes
  function drawPart(r, svg, p, width, mobileDevice, screenId, role) {
    if (p.type === 'tag') return drawTag(r, svg, p);
    if (p.type === 'phoneFrame') return drawPhoneFrame(r, svg, p);
    if (p.type === 'browserFrame') return drawBrowserFrame(r, svg, p);
    if (p.type === 'header') {
      rect(r, p.x, p.y, p.w, p.h || 30, { fill: '#F5F1E5', strokeWidth: 1.8 });
      text(svg, p.x + 12, p.y + (p.h || 30) - 9, fit(p.label || 'SICPES', 30), 14, { weight: 700, display: true });
      line(r, p.x + 12, p.y + (p.h || 30) - 4, p.x + Math.min(p.w - 12, 110), p.y + (p.h || 30) - 4, 1.2);
      return;
    }
    if (p.type === 'title') return text(svg, p.x, p.y, fit(p.text || '', 42), p.size || 24, { weight: 700, display: true });
    if (p.type === 'subtitle') return text(svg, p.x, p.y, fit(p.text || '', 60), p.size || 12, { weight: 400 });
    if (p.type === 'sectionTitle') {
      text(svg, p.x, p.y, fit(p.text || '', 45), 14, { weight: 700 });
      line(r, p.x, p.y + 4, p.x + Math.min(180, (p.text || '').length * 7), p.y + 4, 1.2);
      return;
    }
    if (p.type === 'image') return drawImage(r, svg, p);
    if (p.type === 'avatar') return drawAvatar(r, svg, p);
    if (p.type === 'textLines') return drawTextLines(r, svg, p);
    if (p.type === 'searchBar') return drawSearchBar(r, svg, p);
    if (p.type === 'chip') return drawChip(r, svg, p);
    if (p.type === 'field') return drawField(r, svg, p);
    if (p.type === 'button') return drawButton(r, svg, p);
    if (p.type === 'card') {
      const dest = p.go || null;
      wrapInteractive(svg, dest, 'Tarjeta', function (container) {
        const cR = roughIn(container);
        rect(cR, p.x, p.y, p.w, p.h, { strokeWidth: 1.8, roughness: 0.75 });
        if (dest) {
          const hit = node('rect', { x: p.x, y: p.y, width: p.w, height: p.h, fill: 'transparent', 'pointer-events': 'all' });
          container.appendChild(hit);
        }
      });
      return;
    }
    if (p.type === 'tabs') return drawTabs(r, svg, p);
    if (p.type === 'table') return drawTable(r, svg, p);
    if (p.type === 'stars') return drawStars(r, svg, p);
    if (p.type === 'divider') {
      line(r, p.x, p.y, p.x + p.w / 2 - 45, p.y, 1.2);
      centeredText(svg, p.x + p.w / 2, p.y + 4, fit(p.text || 'O', 25), 10, { fill: '#777' });
      line(r, p.x + p.w / 2 + 45, p.y, p.x + p.w, p.y, 1.2);
      return;
    }
    if (p.type === 'bottomNav') return drawBottomNav(r, svg, p, role);
    if (p.type === 'sideNav') return drawSideNav(r, svg, p, role);
    if (p.type === 'topNav') return drawTopNav(r, svg, p);
    if (p.type === 'note') return drawNote(r, svg, p, width);
  }

  function buildSvg(screenId, platform, forDownload) {
    const spec = (window.PENCIL_SCREENS || {})[screenId];
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
    // Filtro de distorsión orgánica para trazo a mano
    const filter = node('filter', { id: 'pencil-wobble', x: '-2%', y: '-2%', width: '104%', height: '104%' });
    const feTurb = node('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.035', numOctaves: '2', result: 'noise' });
    const feDisp = node('feDisplacementMap', { in: 'SourceGraphic', in2: 'noise', scale: '1.2', xChannelSelector: 'R', yChannelSelector: 'G' });
    filter.appendChild(feTurb);
    filter.appendChild(feDisp);
    defs.appendChild(filter);

    // Patrón de puntos de cuaderno de bocetos
    const patternId = 'dots-' + screenId + '-' + platform + '-' + Math.random().toString(36).slice(2, 7);
    const pattern = node('pattern', { id: patternId, width: 20, height: 20, patternUnits: 'userSpaceOnUse' });
    pattern.appendChild(node('circle', { cx: 2, cy: 2, r: 0.9, fill: '#DDD7C4' }));
    defs.appendChild(pattern);
    svg.appendChild(defs);

    // Fondo de papel
    svg.appendChild(node('rect', { x: 0, y: 0, width: dimensions.width, height: dimensions.height, fill: '#FAF7EE' }));
    svg.appendChild(node('rect', { x: 0, y: 0, width: dimensions.width, height: dimensions.height, fill: 'url(#' + patternId + ')' }));

    if (!spec) {
      text(svg, 30, 70, 'FALTA DEFINIR ' + screenId, 22, { fill: '#9B2C2C', weight: 700 });
      return svg;
    }

    const group = node('g', { filter: 'url(#pencil-wobble)' });
    svg.appendChild(group);

    const r = roughIn(group);
    const parts = platform === 'mobile' ? (spec.mobile || []) : (spec.desktop || []);
    const currentRole = spec.role === 'Administrador' ? 'admin' : (state.role === 'admin' ? 'admin' : 'student');

    parts.forEach(function (part) {
      drawPart(r, group, part, dimensions.width, platform === 'mobile', screenId, currentRole);
    });

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
