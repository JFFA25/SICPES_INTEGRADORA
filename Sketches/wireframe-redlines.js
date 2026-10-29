/* ============================================================
   SICPES · Wireframe Blueprint & Redline Engine (Estilo Órbita Kids / UOC)
   Genera dinámicamente:
   1) Lámina técnica #EFEFEF con cotas exteriores CAD (|<--->|) en negro y rojo (#E0003C)
   2) Píldoras redline (#E0003C sobre #FFF) de cajas (W×H rN ×K), tipografía (Aa fs/lh B),
      iconos (□N ×K), diámetros (⌀N) y paddings internos
   3) Barras estructurales B/N (#8C8C8C títulos / #C9C9C9 texto) conmutables con texto legible
   4) Pie técnico de 5 renglones (UNIDADES, LIENZO, TOKENS, TIPO, ROJO)
   ============================================================ */
(function () {
  'use strict';

  const RED = '#E0003C';
  const INK = '#111111';
  const MONO = "'Space Mono', 'DejaVu Sans Mono', monospace";

  const MOBILE_SHEET = { w: 594, h: 1084, fx: 102, fy: 88, fw: 390, fh: 844, rx: 28 };
  const PWA_SHEET = { w: 1640, h: 1140, fx: 100, fy: 96, fw: 1440, fh: 900, rx: 14 };

  const state = {
    showMeasures: true,
    showBars: true,
    rafId: 0
  };

  function esc(val) {
    return String(val == null ? '' : val).replace(/[&<>"']/g, ch => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[ch]);
  }

  function ensureSvg(containerId, svgId, width, height) {
    const host = document.getElementById(containerId);
    if (!host) return null;
    let svg = document.getElementById(svgId);
    if (!svg) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('id', svgId);
      svg.setAttribute('class', 'wire-sheet-svg');
      svg.setAttribute('aria-hidden', 'true');
      host.appendChild(svg);
    }
    svg.setAttribute('width', String(width));
    svg.setAttribute('height', String(height));
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    return svg;
  }

  /* ---------- Primitivas CAD / Redline ---------- */

  function hDimArrow(x1, x2, y, label, color, fontSize) {
    color = color || INK;
    fontSize = fontSize || 9.5;
    const span = x2 - x1;
    if (span < 12) return '';
    const mid = (x1 + x2) / 2;
    const aw = Math.min(4.8, span * 0.28);
    const ah = 2.2;
    const textW = Math.max(14, Math.round(String(label).length * (fontSize * 0.62) + 8));
    const boxH = fontSize + 4.5;
    return (
      '<line x1="' + x1.toFixed(1) + '" y1="' + y.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      '<path d="M' + (x1 + aw).toFixed(1) + ' ' + (y - ah).toFixed(1) + ' L' + x1.toFixed(1) + ' ' + y.toFixed(1) + ' L' + (x1 + aw).toFixed(1) + ' ' + (y + ah).toFixed(1) + '" fill="none" stroke="' + color + '" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M' + (x2 - aw).toFixed(1) + ' ' + (y - ah).toFixed(1) + ' L' + x2.toFixed(1) + ' ' + y.toFixed(1) + ' L' + (x2 - aw).toFixed(1) + ' ' + (y + ah).toFixed(1) + '" fill="none" stroke="' + color + '" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<line x1="' + x1.toFixed(1) + '" y1="' + (y - 4.5).toFixed(1) + '" x2="' + x1.toFixed(1) + '" y2="' + (y + 4.5).toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      '<line x1="' + x2.toFixed(1) + '" y1="' + (y - 4.5).toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + (y + 4.5).toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      '<rect x="' + (mid - textW / 2).toFixed(1) + '" y="' + (y - boxH / 2).toFixed(1) + '" width="' + textW.toFixed(1) + '" height="' + boxH.toFixed(1) + '" rx="1.5" fill="#FFFFFF"/>' +
      '<text x="' + mid.toFixed(1) + '" y="' + (y + fontSize * 0.34).toFixed(1) + '" font-family="' + MONO + '" font-size="' + fontSize + '" font-weight="bold" text-anchor="middle" fill="' + color + '">' + esc(label) + '</text>'
    );
  }

  function vDimArrow(x, y1, y2, label, color, fontSize, rotateLabel) {
    color = color || INK;
    fontSize = fontSize || 9.5;
    const span = y2 - y1;
    if (span < 8) return '';
    const mid = (y1 + y2) / 2;
    const ah = Math.min(4.8, span * 0.28);
    const aw = 2.2;
    const textLen = Math.max(14, Math.round(String(label).length * (fontSize * 0.62) + 7));
    const boxThick = fontSize + 4;

    let labelSvg = '';
    if (rotateLabel) {
      labelSvg =
        '<rect x="' + (x - boxThick / 2).toFixed(1) + '" y="' + (mid - textLen / 2).toFixed(1) + '" width="' + boxThick.toFixed(1) + '" height="' + textLen.toFixed(1) + '" rx="1.5" fill="#FFFFFF"/>' +
        '<text x="' + (x + fontSize * 0.33).toFixed(1) + '" y="' + mid.toFixed(1) + '" font-family="' + MONO + '" font-size="' + fontSize + '" font-weight="bold" text-anchor="middle" fill="' + color + '" transform="rotate(-90 ' + (x + fontSize * 0.33).toFixed(1) + ' ' + mid.toFixed(1) + ')">' + esc(label) + '</text>';
    } else {
      labelSvg =
        '<rect x="' + (x - textLen / 2).toFixed(1) + '" y="' + (mid - boxThick / 2).toFixed(1) + '" width="' + textLen.toFixed(1) + '" height="' + boxThick.toFixed(1) + '" rx="1.5" fill="#FFFFFF"/>' +
        '<text x="' + x.toFixed(1) + '" y="' + (mid + fontSize * 0.34).toFixed(1) + '" font-family="' + MONO + '" font-size="' + fontSize + '" font-weight="bold" text-anchor="middle" fill="' + color + '">' + esc(label) + '</text>';
    }

    return (
      '<line x1="' + x.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      '<path d="M' + (x - aw).toFixed(1) + ' ' + (y1 + ah).toFixed(1) + ' L' + x.toFixed(1) + ' ' + y1.toFixed(1) + ' L' + (x + aw).toFixed(1) + ' ' + (y1 + ah).toFixed(1) + '" fill="none" stroke="' + color + '" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M' + (x - aw).toFixed(1) + ' ' + (y2 - ah).toFixed(1) + ' L' + x.toFixed(1) + ' ' + y2.toFixed(1) + ' L' + (x + aw).toFixed(1) + ' ' + (y2 - ah).toFixed(1) + '" fill="none" stroke="' + color + '" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<line x1="' + (x - 4.5).toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + (x + 4.5).toFixed(1) + '" y2="' + y1.toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      '<line x1="' + (x - 4.5).toFixed(1) + '" y1="' + y2.toFixed(1) + '" x2="' + (x + 4.5).toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      labelSvg
    );
  }

  function createBadgePlacer(bounds) {
    const occupied = [];
    return function placeBadge(x, y, label, align, fontSize) {
      if (!label) return '';
      fontSize = fontSize || 8;
      const w = Math.max(19, Math.round(String(label).length * (fontSize * 0.62) + 6));
      const h = fontSize + 4.2;
      let bx = align === 'left' ? x : align === 'right' ? x - w : x - w / 2;
      let by = y - h / 2;

      if (bounds) {
        bx = Math.max(bounds.minX + 2, Math.min(bounds.maxX - w - 2, bx));
        by = Math.max(bounds.minY + 2, Math.min(bounds.maxY - h - 2, by));
      }

      for (let attempt = 0; attempt < 4; attempt++) {
        const hit = occupied.find(r => !(bx + w + 2 < r.x || bx > r.x + r.w + 2 || by + h + 1.5 < r.y || by > r.y + r.h + 1.5));
        if (!hit) break;
        by = hit.y - h - 2;
        if (bounds && by < bounds.minY + 2) {
          by = hit.y + hit.h + 2;
        }
      }

      if (bounds && (by < bounds.minY || by + h > bounds.maxY)) return '';
      occupied.push({ x: bx, y: by, w: w, h: h });

      return (
        '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="2" fill="#FFFFFF" stroke="' + RED + '" stroke-width="0.6"/>' +
        '<text x="' + (bx + w / 2).toFixed(1) + '" y="' + (by + h - 3.1).toFixed(1) + '" font-family="' + MONO + '" font-size="' + fontSize + '" font-weight="bold" text-anchor="middle" fill="' + RED + '">' + esc(label) + '</text>'
      );
    };
  }

  function relBox(el, surfaceRect, scale) {
    if (!el || el.hidden) return null;
    const cs = window.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return null;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return null;
    const x = (r.left - surfaceRect.left) / scale;
    const y = (r.top - surfaceRect.top) / scale;
    const w = r.width / scale;
    const h = r.height / scale;
    return {
      el: el,
      cs: cs,
      x: x,
      y: y,
      w: w,
      h: h,
      right: x + w,
      bottom: y + h,
      cx: x + w / 2,
      cy: y + h / 2,
      radius: Math.round(parseFloat(cs.borderTopLeftRadius) || 0)
    };
  }

  function insideClip(box, clip) {
    if (!box) return false;
    return box.bottom > clip.minY + 6 && box.y < clip.maxY - 6 && box.right > clip.minX + 6 && box.x < clip.maxX - 6;
  }

  /* ---------- Generador de Barras Estructurales B/N (Estilo Órbita Kids) ---------- */

  function buildSkeletonBars(rootEl, surfaceRect, scale, clip) {
    if (!rootEl) return '';
    const selector = [
      '.screen-title', '.screen-subtitle', '.section-title', '.mono-label',
      '.card-title', '.muted', '.app-logo', '.back-link',
      '.feature strong', '.feature small',
      '.field > span', '.field input', '.field select', '.field textarea',
      '.button', '.choice', '.filter-tab', '.status', '.notice',
      '.data-cell small', '.data-cell strong',
      '.stat strong', '.stat small',
      '.price-box span', '.price-box strong',
      '.timeline-item strong', '.timeline-item small',
      '.service-list li', '.switch-row span', '.form-note', '.inline-link',
      '.nav-item span:last-child',
      '.pwa-app-logo', '.pwa-app-link', '.pwa-app-user span',
      '.pwa-side-label', '.pwa-side-item span:last-child',
      '.pwa-eyebrow', '.pwa-page-title', '.pwa-display', '.pwa-auth-title',
      '.pwa-card-title', '.pwa-lead', '.pwa-muted',
      '.pwa-stat strong', '.pwa-stat small',
      '.pwa-data-cell small', '.pwa-data-cell strong',
      '.pwa-field > span', '.pwa-field input', '.pwa-field select', '.pwa-field textarea',
      '.pwa-button', '.pwa-choice', '.pwa-filter-tab', '.pwa-status', '.pwa-notice',
      '.pwa-feature strong', '.pwa-feature small',
      '.pwa-tr > span', '.pwa-checklist li', '.pwa-room-tags span', '.pwa-switch-row span'
    ].join(',');

    const nodes = rootEl.querySelectorAll(selector);
    const out = [];
    const seen = new Set();

    nodes.forEach(node => {
      if (seen.has(node)) return;
      if (node.querySelector('.button, .pwa-button, .status, .pwa-status')) return;
      seen.add(node);

      const b = relBox(node, surfaceRect, scale);
      if (!insideClip(b, clip)) return;

      const tag = node.tagName.toLowerCase();
      const cls = node.className || '';
      const isInput = tag === 'input' || tag === 'select' || tag === 'textarea';
      const isBtn = tag === 'button' || /\b(button|pwa-button|choice|pwa-choice|filter-tab|pwa-filter-tab|status|pwa-status)\b/.test(cls);
      const isHeading = /\b(screen-title|section-title|card-title|app-logo|pwa-page-title|pwa-display|pwa-auth-title|pwa-card-title|pwa-app-logo)\b/.test(cls) ||
        tag === 'strong' || tag === 'h1' || tag === 'h2' || tag === 'h3' || parseInt(b.cs.fontWeight, 10) >= 600;

      const fill = isHeading ? '#8C8C8C' : '#C9C9C9';
      const barH = isHeading ? Math.min(9.5, Math.max(5.4, Math.round(parseFloat(b.cs.fontSize) || 14) * 0.34)) : 4.8;
      const rx = (barH / 2).toFixed(2);

      if (isInput) {
        const iw = Math.min(b.w - 24, Math.max(36, b.w * 0.48));
        const ix = b.x + 11;
        const iy = b.cy - barH / 2;
        out.push('<rect x="' + ix.toFixed(1) + '" y="' + iy.toFixed(1) + '" width="' + iw.toFixed(1) + '" height="' + barH.toFixed(1) + '" rx="' + rx + '" fill="#C9C9C9"/>');
        return;
      }

      if (isBtn) {
        const textLen = (node.textContent || '').trim().length || 8;
        const bw = Math.min(b.w - 16, Math.max(22, Math.min(130, textLen * 5.2)));
        const bx = b.cx - bw / 2;
        const by = b.cy - barH / 2;
        out.push('<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + barH.toFixed(1) + '" rx="' + rx + '" fill="' + (/\b(primary|pwa-primary|selected|active)\b/.test(cls) ? '#7A7A7A' : '#9E9E9E') + '"/>');
        return;
      }

      const padL = parseFloat(b.cs.paddingLeft) || 0;
      const padR = parseFloat(b.cs.paddingRight) || 0;
      const padT = parseFloat(b.cs.paddingTop) || 0;
      const availW = Math.max(16, b.w - padL - padR);
      const textStr = (node.textContent || '').trim();
      if (!textStr) return;

      const fs = parseFloat(b.cs.fontSize) || 12;
      const lh = parseFloat(b.cs.lineHeight) || (fs * 1.35);
      const estTextW = textStr.length * (fs * 0.52);
      const lines = Math.max(1, Math.min(3, Math.round((b.h - padT) / Math.max(12, lh))));
      const alignCenter = b.cs.textAlign === 'center';

      for (let i = 0; i < lines; i++) {
        const factor = lines === 1 ? Math.min(0.92, Math.max(0.22, estTextW / availW)) : (i === lines - 1 ? 0.62 : 0.88);
        const lw = Math.max(18, Math.min(availW, availW * factor));
        const lx = alignCenter ? (b.x + padL + (availW - lw) / 2) : (b.x + padL);
        const ly = lines === 1
          ? (b.cy - barH / 2)
          : (b.y + padT + i * lh + (lh - barH) / 2);
        if (ly + barH <= clip.maxY - 2 && ly >= clip.minY + 2) {
          out.push('<rect x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" width="' + lw.toFixed(1) + '" height="' + barH.toFixed(1) + '" rx="' + rx + '" fill="' + fill + '"/>');
        }
      }
    });

    return out.join('');
  }

  /* ---------- Escaneo de Redlines Internos (Cajas, Tipografía, Iconos, Padding) ---------- */

  function buildInnerRedlines(rootEl, surfaceRect, scale, clip, isPwa) {
    if (!rootEl) return '';
    const placeBadge = createBadgePlacer(clip);
    const parts = [];

    // 1. Cajas, Contenedores, Controles e Imágenes (agrupando hermanos idénticos con ×N)
    const boxSelector = isPwa
      ? '.pwa-card, .pwa-stat, .pwa-feature, .pwa-image-placeholder, .pwa-field input, .pwa-field select, .pwa-field textarea, .pwa-button, .pwa-choice, .pwa-file-drop, .pwa-notice, .pwa-code-row input, .pwa-rating-cell, .pwa-side-item, .pwa-data-cell, .pwa-filter-tab'
      : '.card, .stat, .feature, .image-placeholder, .field input, .field select, .field textarea, .button, .choice, .file-drop, .notice, .price-box, .code-row input, .rating-cell, .data-cell';

    const rawBoxes = Array.from(rootEl.querySelectorAll(boxSelector))
      .map(el => relBox(el, surfaceRect, scale))
      .filter(b => insideClip(b, clip) && b.w >= 26 && b.h >= 22);

    // Agrupar elementos hermanos con mismo padre y mismas dimensiones (tolerancia 3px)
    const groups = new Map();
    rawBoxes.forEach(b => {
      const parent = b.el.parentElement;
      const wRound = Math.round(b.w);
      const hRound = Math.round(b.h);
      const tagCls = b.el.tagName + ':' + (b.el.className || '').replace(/\b(active|selected|current)\b/g, '').trim();
      const key = (parent ? parent.tagName + '.' + parent.className : 'root') + '|' + tagCls + '|' + Math.round(wRound / 3) + 'x' + Math.round(hRound / 3);
      if (!groups.has(key)) {
        groups.set(key, { items: [], w: wRound, h: hRound, r: b.radius });
      }
      groups.get(key).items.push(b);
    });

    groups.forEach(group => {
      const count = group.items.length;
      const target = group.items[0];
      const w = Math.round(target.w);
      const h = Math.round(target.h);
      const r = target.radius;
      const label = w + '×' + h + (r > 0 ? ' r' + r : '') + (count > 1 ? ' ×' + count : '');
      parts.push(placeBadge(target.right - 3, target.bottom - 7, label, 'right', isPwa ? 8.2 : 7.8));
    });

    // 2. Padding interno en rojo (#E0003C) dentro de la primera tarjeta principal
    const firstCard = rawBoxes.find(b => b.el.classList.contains('card') || b.el.classList.contains('pwa-card') || b.el.classList.contains('pwa-auth-card'));
    if (firstCard && firstCard.w >= 180 && firstCard.h >= 65) {
      const padL = Math.round(parseFloat(firstCard.cs.paddingLeft) || (isPwa ? 18 : 13));
      if (padL >= 10 && padL <= 48) {
        const py = Math.min(clip.maxY - 16, Math.max(clip.minY + 16, firstCard.y + 22));
        parts.push(hDimArrow(firstCard.x, firstCard.x + padL, py, String(padL), RED, 7.5));
      }
    }

    // 3. Cajas de iconos y avatares circulares (□N ×K y ⌀N)
    const circleSelector = '.avatar, .pwa-avatar, .pwa-avatar-big, .timeline-item .dot, .pwa-timeline-item .pwa-dot';
    const circles = Array.from(rootEl.querySelectorAll(circleSelector))
      .map(el => relBox(el, surfaceRect, scale))
      .filter(b => insideClip(b, clip) && b.w >= 10);

    const circleGroups = new Map();
    circles.forEach(b => {
      const d = Math.round(Math.max(b.w, b.h));
      const key = (b.el.parentElement ? b.el.parentElement.className : '') + '|d' + d;
      if (!circleGroups.has(key)) circleGroups.set(key, { items: [], d: d });
      circleGroups.get(key).items.push(b);
    });

    circleGroups.forEach(cg => {
      const b = cg.items[0];
      const rad = cg.d / 2;
      parts.push('<circle cx="' + b.cx.toFixed(1) + '" cy="' + b.cy.toFixed(1) + '" r="' + (rad + 1.5).toFixed(1) + '" fill="none" stroke="' + RED + '" stroke-width="0.9" stroke-dasharray="2.5 2"/>');
      parts.push(placeBadge(b.right + 4, b.cy, '⌀' + cg.d + (cg.items.length > 1 ? ' ×' + cg.items.length : ''), 'left', 7.8));
    });

    const iconSelector = '.nav-item .nav-icon, .pwa-side-icon, .switch, .pwa-switch';
    const icons = Array.from(rootEl.querySelectorAll(iconSelector))
      .map(el => relBox(el, surfaceRect, scale))
      .filter(b => insideClip(b, clip) && b.w >= 12);

    const iconGroups = new Map();
    icons.forEach(b => {
      const key = b.el.className + '|' + Math.round(b.w);
      if (!iconGroups.has(key)) iconGroups.set(key, []);
      iconGroups.get(key).push(b);
    });

    iconGroups.forEach(list => {
      const b = list[0];
      const sz = Math.round(Math.max(b.w, b.h));
      parts.push('<rect x="' + (b.x - 2).toFixed(1) + '" y="' + (b.y - 2).toFixed(1) + '" width="' + (b.w + 4).toFixed(1) + '" height="' + (b.h + 4).toFixed(1) + '" rx="2" fill="none" stroke="' + RED + '" stroke-width="0.9" stroke-dasharray="2.5 2"/>');
      const lbl = (b.el.classList.contains('switch') || b.el.classList.contains('pwa-switch'))
        ? Math.round(b.w) + '×' + Math.round(b.h) + ' r15' + (list.length > 1 ? ' ×' + list.length : '')
        : '□' + sz + (list.length > 1 ? ' ×' + list.length : '');
      parts.push(placeBadge(b.right + 3, b.y - 2, lbl, 'left', 7.6));
    });

    // 4. Etiquetas tipográficas (Aa fs/lh B) en encabezados, subtítulos y métricas clave
    const typoSelector = isPwa
      ? '.pwa-display, .pwa-page-title, .pwa-auth-title, .pwa-card-title, .pwa-lead, .pwa-eyebrow, .pwa-stat strong, .pwa-app-logo'
      : '.screen-title, .screen-subtitle, .section-title, .card-title, .mono-label, .stat strong, .price-box strong, .app-logo';

    const typoNodes = Array.from(rootEl.querySelectorAll(typoSelector));
    const seenTypoKinds = new Set();

    typoNodes.forEach(el => {
      const b = relBox(el, surfaceRect, scale);
      if (!insideClip(b, clip)) return;
      const fs = Math.round(parseFloat(b.cs.fontSize) || 12);
      const rawLh = parseFloat(b.cs.lineHeight);
      const lh = Math.round(Number.isFinite(rawLh) ? rawLh : fs * 1.25);
      const bold = (parseInt(b.cs.fontWeight, 10) >= 600 || b.cs.fontWeight === 'bold') ? ' B' : '';
      const spec = 'Aa' + fs + '/' + lh + bold;

      // Evitar repetir la misma especificación tipográfica más de 2 veces por pantalla
      const kindKey = el.className + '|' + spec;
      if (seenTypoKinds.has(kindKey)) return;
      seenTypoKinds.add(kindKey);

      parts.push(placeBadge(Math.min(clip.maxX - 42, b.x + Math.min(b.w + 8, 220)), b.y + 7, spec, 'left', isPwa ? 8 : 7.6));
    });

    return parts.join('');
  }

  /* ---------- Pie Técnico de 5 Renglones (UNIDADES, LIENZO, TOKENS, TIPO, ROJO) ---------- */

  function buildFooterLegend(x, startY, lineStep, fontSize, rows) {
    return rows.map((row, idx) => {
      const y = startY + idx * lineStep;
      const keyColor = row.isRed ? RED : INK;
      const valX = x + (row.key.length * (fontSize * 0.65)) + 14;
      return (
        '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" font-family="' + MONO + '" font-size="' + fontSize + '" font-weight="bold" text-anchor="start" fill="' + keyColor + '">' + esc(row.key) + '</text>' +
        '<text x="' + valX.toFixed(1) + '" y="' + y.toFixed(1) + '" font-family="' + MONO + '" font-size="' + fontSize + '" font-weight="normal" text-anchor="start" fill="#333333">' + esc(row.val) + '</text>'
      );
    }).join('');
  }

  /* ---------- Renderizado de Lámina Móvil (594 × 1084) ---------- */

  function renderMobileRedlines() {
    const mobileView = document.getElementById('mobileView');
    const phoneScreen = document.getElementById('phoneScreen');
    if (!mobileView || !phoneScreen || mobileView.hidden) return;

    const svg = ensureSvg('mobileView', 'wireMobileSvg', MOBILE_SHEET.w, MOBILE_SHEET.h);
    if (!svg) return;

    const sRect = mobileView.getBoundingClientRect();
    if (sRect.width < 10) return;
    const scale = (sRect.width / MOBILE_SHEET.w) || 1;

    const FX = MOBILE_SHEET.fx;
    const FY = MOBILE_SHEET.fy;
    const FW = MOBILE_SHEET.fw;
    const FH = MOBILE_SHEET.fh;
    const clip = { minX: FX, minY: FY, maxX: FX + FW, maxY: FY + FH };

    const headerEl = phoneScreen.querySelector('.app-header');
    const navEl = phoneScreen.querySelector('.bottom-nav');
    const scrollEl = phoneScreen.querySelector('.app-scroll');

    const safeH = 37;
    const headerBox = headerEl ? relBox(headerEl, sRect, scale) : null;
    const appBarH = headerBox ? Math.max(36, Math.min(64, Math.round(headerBox.bottom - (FY + safeH)))) : 0;
    const navH = navEl ? 61 : 0;
    const bodyTop = FY + safeH + appBarH;
    const bodyBottom = FY + FH - navH;
    const bodyH = Math.round(bodyBottom - bodyTop);

    // Bloques dinámicos izquierdos y gaps en rojo
    const leftArrows = [];
    if (scrollEl) {
      const children = Array.from(scrollEl.children)
        .filter(el => !el.classList.contains('app-header'))
        .map(el => relBox(el, sRect, scale))
        .filter(b => b && b.h >= 20 && b.y >= FY + safeH - 4 && b.bottom <= bodyBottom + 4);

      for (let i = 0; i < children.length; i++) {
        const cur = children[i];
        const y1 = Math.max(bodyTop, cur.y);
        const y2 = Math.min(bodyBottom, cur.bottom);
        if (y2 - y1 >= 18) {
          leftArrows.push(vDimArrow(FX - 24, y1, y2, String(Math.round(cur.h)), INK, 8.5, false));
        }
        if (i < children.length - 1) {
          const nxt = children[i + 1];
          const gap = Math.round(nxt.y - cur.bottom);
          if (gap >= 6 && gap <= 70 && cur.bottom >= bodyTop && nxt.y <= bodyBottom) {
            leftArrows.push(vDimArrow(FX - 52, cur.bottom, nxt.y, String(gap), RED, 8, false));
          }
        }
      }
    }

    // Cotas derechas de sección
    const rightArrows = [];
    rightArrows.push(vDimArrow(FX + FW + 22, FY, FY + safeH, 'SafeArea ' + safeH, INK, 8.2, true));
    if (appBarH > 0) {
      rightArrows.push(vDimArrow(FX + FW + 22, FY + safeH, bodyTop, 'AppBar ' + appBarH, INK, 8.2, true));
    }
    rightArrows.push(vDimArrow(FX + FW + 22, bodyTop, bodyBottom, 'cuerpo ' + bodyH, INK, 9, true));
    if (navH > 0) {
      rightArrows.push(vDimArrow(FX + FW + 22, bodyBottom, FY + FH, 'NavBar ' + navH, INK, 8.2, true));
    }
    rightArrows.push(vDimArrow(FX + FW + 50, FY, FY + FH, FH + ' lp', INK, 9.5, true));

    // Cotas superiores de ancho
    const topArrows =
      hDimArrow(FX, FX + FW, FY - 44, '390 lp (dp) · Flutter', INK, 9.5) +
      hDimArrow(FX, FX + 22, FY - 18, '22', INK, 8) +
      hDimArrow(FX + 22, FX + FW - 22, FY - 18, '346 (cuerpo)', INK, 9) +
      hDimArrow(FX + FW - 22, FX + FW, FY - 18, '22', INK, 8);

    const barsSvg = state.showBars ? buildSkeletonBars(phoneScreen, sRect, scale, clip) : '';
    const innerRedlines = state.showMeasures ? buildInnerRedlines(phoneScreen, sRect, scale, clip, false) : '';

    const footerRows = [
      { key: 'UNIDADES', val: 'Flutter · píxeles lógicos (lp = dp). Úsalos tal cual: SizedBox, EdgeInsets, BorderRadius.' },
      { key: 'LIENZO', val: '390×844 · SafeArea ' + safeH + (appBarH ? ' · AppBar ' + appBarH : '') + ' · cuerpo ' + bodyH + ' (padding 22, gap 12)' + (navH ? ' · NavBar ' + navH : '') },
      { key: 'TOKENS', val: 'tarjeta pad 13 · destacada 16 · radio 8/5/4 · botón/input h44 · icono 20' },
      { key: 'TIPO', val: 'Aa fs/lh = fontSize / alto de línea · B = w700' },
      { key: 'ROJO', val: 'medida · W×H rN = ancho×alto, radio · ⌀ diámetro · □ icono · ×N repetido', isRed: true }
    ];
    const footerSvg = state.showMeasures ? buildFooterLegend(18, FY + FH + 40, 18, 9.2, footerRows) : '';

    svg.innerHTML =
      '<defs><clipPath id="wireMobileClip"><rect x="' + FX + '" y="' + FY + '" width="' + FW + '" height="' + FH + '" rx="' + MOBILE_SHEET.rx + '"/></clipPath></defs>' +
      '<g clip-path="url(#wireMobileClip)" class="wire-bars-layer">' + barsSvg + '</g>' +
      '<rect x="' + FX + '" y="' + FY + '" width="' + FW + '" height="' + FH + '" rx="' + MOBILE_SHEET.rx + '" fill="none" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<rect x="' + (FX + (FW - 56) / 2) + '" y="' + (FY + 10) + '" width="56" height="5" rx="2.5" fill="#BDBDBD"/>' +
      '<rect x="' + (FX + (FW - 134) / 2) + '" y="' + (FY + FH - 11) + '" width="134" height="4" rx="2" fill="#111111"/>' +
      (state.showMeasures
        ? '<g class="wire-measures-layer">' +
            topArrows +
            rightArrows.join('') +
            leftArrows.join('') +
            '<g clip-path="url(#wireMobileClip)">' + innerRedlines + '</g>' +
            footerSvg +
          '</g>'
        : '');
  }

  /* ---------- Renderizado de Lámina Web / PWA (1640 × 1140) ---------- */

  function renderPwaRedlines() {
    const pwaView = document.getElementById('pwaView');
    const pwaScreen = document.getElementById('pwaScreen');
    if (!pwaView || !pwaScreen || pwaView.hidden) return;

    const svg = ensureSvg('pwaView', 'wirePwaSvg', PWA_SHEET.w, PWA_SHEET.h);
    if (!svg) return;

    const sRect = pwaView.getBoundingClientRect();
    if (sRect.width < 10) return;
    const scale = (sRect.width / PWA_SHEET.w) || 1;

    const FX = PWA_SHEET.fx;
    const FY = PWA_SHEET.fy;
    const FW = PWA_SHEET.fw;
    const FH = PWA_SHEET.fh;
    const clip = { minX: FX, minY: FY + 40, maxX: FX + FW, maxY: FY + FH };

    const sideEl = pwaScreen.querySelector('.pwa-app-side');
    const topEl = pwaScreen.querySelector('.pwa-app-top');
    const authArtEl = pwaScreen.querySelector('.pwa-auth-art');
    const mainEl = pwaScreen.querySelector('.pwa-app-main') || pwaScreen.querySelector('.pwa-auth-card') || pwaScreen.querySelector('.pwa-landing') || pwaScreen;

    const sideBox = sideEl ? relBox(sideEl, sRect, scale) : null;
    const topBox = topEl ? relBox(topEl, sRect, scale) : null;
    const authArtBox = authArtEl ? relBox(authArtEl, sRect, scale) : null;

    const browserH = 40;
    const headerH = topBox ? Math.round(topBox.h) : 0;
    const bodyTop = FY + browserH + headerH;
    const bodyH = FH - browserH - headerH;

    // Cotas superiores de ancho
    let topSubArrows = '';
    if (sideBox && sideBox.w > 40) {
      const sw = Math.round(sideBox.w);
      const mw = FW - sw;
      topSubArrows =
        hDimArrow(FX, FX + sw, FY - 20, sw + 'px · ' + +(sw / 16).toFixed(2) + 'rem', INK, 9.2) +
        hDimArrow(FX + sw, FX + FW, FY - 20, mw + 'px · ' + +(mw / 16).toFixed(2) + 'rem', INK, 9.2);
    } else if (authArtBox && authArtBox.w > 100) {
      const aw = Math.round(authArtBox.w);
      const cw = FW - aw;
      topSubArrows =
        hDimArrow(FX, FX + aw, FY - 20, aw + 'px · ' + +(aw / 16).toFixed(2) + 'rem (Arte)', INK, 9.2) +
        hDimArrow(FX + aw, FX + FW, FY - 20, cw + 'px · ' + +(cw / 16).toFixed(2) + 'rem (Formulario)', INK, 9.2);
    } else {
      topSubArrows =
        hDimArrow(FX, FX + 32, FY - 20, '32', INK, 8.5) +
        hDimArrow(FX + 32, FX + FW - 32, FY - 20, (FW - 64) + 'px · ' + +((FW - 64) / 16).toFixed(2) + 'rem', INK, 9.2) +
        hDimArrow(FX + FW - 32, FX + FW, FY - 20, '32', INK, 8.5);
    }

    const topArrows =
      hDimArrow(FX, FX + FW, FY - 46, '1440px = 90rem · React + Vite', INK, 10.2) +
      topSubArrows;

    // Cotas izquierdas de alto
    const leftArrows = [
      vDimArrow(FX - 24, FY, FY + browserH, String(browserH), INK, 9, true)
    ];
    if (headerH > 0) {
      leftArrows.push(vDimArrow(FX - 24, FY + browserH, bodyTop, String(headerH), INK, 9, true));
    }
    leftArrows.push(vDimArrow(FX - 24, bodyTop, FY + FH, bodyH + 'px · ' + +(bodyH / 16).toFixed(2) + 'rem', INK, 9.5, true));
    leftArrows.push(vDimArrow(FX - 52, FY, FY + FH, '900px · 56.25rem', INK, 10, true));

    // Cotas derechas dinámicas (altos de bloques en negro y gaps en rojo)
    const rightArrows = [];
    if (mainEl) {
      const blocks = Array.from(mainEl.children)
        .map(el => relBox(el, sRect, scale))
        .filter(b => b && b.h >= 24 && b.y >= bodyTop - 4 && b.bottom <= FY + FH + 4);

      for (let i = 0; i < blocks.length; i++) {
        const cur = blocks[i];
        const y1 = Math.max(bodyTop, cur.y);
        const y2 = Math.min(FY + FH, cur.bottom);
        if (y2 - y1 >= 20) {
          rightArrows.push(vDimArrow(FX + FW + 26, y1, y2, String(Math.round(cur.h)), INK, 9, true));
        }
        if (i < blocks.length - 1) {
          const nxt = blocks[i + 1];
          const gap = Math.round(nxt.y - cur.bottom);
          if (gap >= 6 && gap <= 80 && cur.bottom >= bodyTop && nxt.y <= FY + FH) {
            rightArrows.push(vDimArrow(FX + FW + 54, cur.bottom, nxt.y, String(gap), RED, 8.5, false));
          }
        }
      }
    }

    const barsSvg = state.showBars ? buildSkeletonBars(pwaScreen, sRect, scale, clip) : '';
    const innerRedlines = state.showMeasures ? buildInnerRedlines(pwaScreen, sRect, scale, clip, true) : '';

    const sideW = sideBox ? Math.round(sideBox.w) : 0;
    const mainW = FW - sideW;
    const footerRows = [
      { key: 'UNIDADES', val: 'React + Vite · px CSS; rem = px ÷ 16 (html { font-size: 100% } = 16px). 24px = 1.5rem · 48px = 3rem' },
      { key: 'LIENZO', val: '1440×900 · Browser 40' + (headerH ? ' · Header ' + headerH : '') + (sideW ? ' · Sidebar ' + sideW + ' · Main ' + mainW + ' (padding 20 → útil ' + (mainW - 40) + ')' : ' · Main ' + FW) + ' · gap entre bloques 16 · grid 12 col' },
      { key: 'TOKENS', val: 'tarjeta pad 18 (1.125rem) · destacada 22 (1.375rem) · radio 8/6/5 · botón/input h42 (2.625rem) · icono 20' },
      { key: 'TIPO', val: 'Aa fs/lh = font-size / line-height en px (÷16 = rem) · B = font-weight 700' },
      { key: 'ROJO', val: 'medida · W×H rN = ancho×alto, border-radius · ⌀ diámetro · □ icono · ×N repetido idéntico', isRed: true }
    ];
    const footerSvg = state.showMeasures ? buildFooterLegend(24, FY + FH + 34, 19, 10.5, footerRows) : '';

    svg.innerHTML =
      '<defs><clipPath id="wirePwaClip"><rect x="' + FX + '" y="' + FY + '" width="' + FW + '" height="' + FH + '" rx="' + PWA_SHEET.rx + '"/></clipPath></defs>' +
      '<g clip-path="url(#wirePwaClip)" class="wire-bars-layer">' + barsSvg + '</g>' +
      '<rect x="' + FX + '" y="' + FY + '" width="' + FW + '" height="' + FH + '" rx="' + PWA_SHEET.rx + '" fill="none" stroke="' + INK + '" stroke-width="2.5"/>' +
      (state.showMeasures
        ? '<g class="wire-measures-layer">' +
            topArrows +
            leftArrows.join('') +
            rightArrows.join('') +
            '<g clip-path="url(#wirePwaClip)">' + innerRedlines + '</g>' +
            footerSvg +
          '</g>'
        : '');
  }

  function renderAll() {
    if (!document.body.classList.contains('shell-section-wireframes')) return;
    document.body.classList.toggle('wire-bars-on', state.showBars);
    document.body.classList.toggle('wire-measures-on', state.showMeasures);
    renderMobileRedlines();
    renderPwaRedlines();
  }

  function scheduleRender() {
    if (state.rafId) cancelAnimationFrame(state.rafId);
    state.rafId = requestAnimationFrame(() => {
      state.rafId = 0;
      renderAll();
    });
    setTimeout(renderAll, 90);
    setTimeout(renderAll, 240);
  }

  function setMeasures(on) {
    state.showMeasures = Boolean(on);
    syncToolbarButtons();
    scheduleRender();
  }

  function setBars(on) {
    state.showBars = Boolean(on);
    syncToolbarButtons();
    scheduleRender();
  }

  function syncToolbarButtons() {
    document.querySelectorAll('[data-wire-measures]').forEach(btn => {
      const val = btn.getAttribute('data-wire-measures') === 'on';
      const active = val === state.showMeasures;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('[data-wire-bars]').forEach(btn => {
      const val = btn.getAttribute('data-wire-bars') === 'on';
      const active = val === state.showBars;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  function init() {
    document.body.classList.add('wire-bars-on', 'wire-measures-on');

    document.addEventListener('click', ev => {
      const mBtn = ev.target.closest('[data-wire-measures]');
      if (mBtn) {
        setMeasures(mBtn.getAttribute('data-wire-measures') === 'on');
        return;
      }
      const bBtn = ev.target.closest('[data-wire-bars]');
      if (bBtn) {
        setBars(bBtn.getAttribute('data-wire-bars') === 'on');
        return;
      }
      if (document.body.classList.contains('shell-section-wireframes')) {
        scheduleRender();
      }
    });

    const phoneScreen = document.getElementById('phoneScreen');
    const pwaScreen = document.getElementById('pwaScreen');
    const obsConfig = { childList: true, subtree: true };
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains('shell-section-wireframes')) {
        scheduleRender();
        const scrollEl = phoneScreen && phoneScreen.querySelector('.app-scroll');
        if (scrollEl && !scrollEl.__wireScrollBound) {
          scrollEl.__wireScrollBound = true;
          scrollEl.addEventListener('scroll', scheduleRender, { passive: true });
        }
      }
    });

    if (phoneScreen) observer.observe(phoneScreen, obsConfig);
    if (pwaScreen) {
      observer.observe(pwaScreen, obsConfig);
      pwaScreen.addEventListener('scroll', scheduleRender, { passive: true });
    }

    window.addEventListener('resize', scheduleRender);
    window.addEventListener('sicpes:navigate', scheduleRender);

    syncToolbarButtons();
    scheduleRender();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SicpesWireframeRedlines = {
    refresh: scheduleRender,
    setMeasures: setMeasures,
    setBars: setBars
  };
})();
