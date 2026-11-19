/* ============================================================
   SICPES · Wireframe Blueprint & Redline Engine (Alineado 1:1 con 4 · Prototipo)
   Mide directamente la geometría del Prototipo (390 × 844 en Móvil
   y 1440 × 900 en PWA) y genera dinámicamente:
   1) Cotas estructurales CAD (|<--->|) en negro (#111111) y rojo (#E0003C)
   2) Píldoras redline (#E0003C sobre #FFF) de cajas (W×H rN ×K), tipografía (Aa fs/lh B),
      iconos (□N ×K), diámetros (⌀N ×K), paddings internos y gaps
   3) Barras estructurales B/N (#8C8C8C títulos / #C9C9C9 texto) conmutables con texto legible
   ============================================================ */
(function () {
  'use strict';

  const RED = '#E0003C';
  const INK = '#111111';
  const MONO = "'Space Mono', 'DejaVu Sans Mono', monospace";

  const MOBILE_SHEET = { w: 390, h: 844, fx: 0, fy: 0, fw: 390, fh: 844, rx: 35 };
  const PWA_SHEET = { w: 1440, h: 900, fx: 0, fy: 0, fw: 1440, fh: 900, rx: 12 };

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
    fontSize = fontSize || 8.5;
    const span = x2 - x1;
    if (span < 10) return '';
    const mid = (x1 + x2) / 2;
    const aw = Math.min(4.5, span * 0.28);
    const ah = 2.1;
    const textW = Math.max(14, Math.round(String(label).length * (fontSize * 0.62) + 7));
    const boxH = fontSize + 4.2;
    return (
      '<line x1="' + x1.toFixed(1) + '" y1="' + y.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      '<path d="M' + (x1 + aw).toFixed(1) + ' ' + (y - ah).toFixed(1) + ' L' + x1.toFixed(1) + ' ' + y.toFixed(1) + ' L' + (x1 + aw).toFixed(1) + ' ' + (y + ah).toFixed(1) + '" fill="none" stroke="' + color + '" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M' + (x2 - aw).toFixed(1) + ' ' + (y - ah).toFixed(1) + ' L' + x2.toFixed(1) + ' ' + y.toFixed(1) + ' L' + (x2 - aw).toFixed(1) + ' ' + (y + ah).toFixed(1) + '" fill="none" stroke="' + color + '" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<line x1="' + x1.toFixed(1) + '" y1="' + (y - 4).toFixed(1) + '" x2="' + x1.toFixed(1) + '" y2="' + (y + 4).toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      '<line x1="' + x2.toFixed(1) + '" y1="' + (y - 4).toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + (y + 4).toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      '<rect x="' + (mid - textW / 2).toFixed(1) + '" y="' + (y - boxH / 2).toFixed(1) + '" width="' + textW.toFixed(1) + '" height="' + boxH.toFixed(1) + '" rx="1.5" fill="#FFFFFF" stroke="' + color + '" stroke-width="0.45"/>' +
      '<text x="' + mid.toFixed(1) + '" y="' + (y + fontSize * 0.34).toFixed(1) + '" font-family="' + MONO + '" font-size="' + fontSize + '" font-weight="bold" text-anchor="middle" fill="' + color + '">' + esc(label) + '</text>'
    );
  }

  function vDimArrow(x, y1, y2, label, color, fontSize, rotateLabel) {
    color = color || INK;
    fontSize = fontSize || 8.5;
    const span = y2 - y1;
    if (span < 6) return '';
    const mid = (y1 + y2) / 2;
    const ah = Math.min(4.5, span * 0.28);
    const aw = 2.1;
    const textLen = Math.max(14, Math.round(String(label).length * (fontSize * 0.62) + 7));
    const boxThick = fontSize + 4;

    let labelSvg = '';
    if (rotateLabel) {
      labelSvg =
        '<rect x="' + (x - boxThick / 2).toFixed(1) + '" y="' + (mid - textLen / 2).toFixed(1) + '" width="' + boxThick.toFixed(1) + '" height="' + textLen.toFixed(1) + '" rx="1.5" fill="#FFFFFF" stroke="' + color + '" stroke-width="0.45"/>' +
        '<text x="' + (x + fontSize * 0.33).toFixed(1) + '" y="' + mid.toFixed(1) + '" font-family="' + MONO + '" font-size="' + fontSize + '" font-weight="bold" text-anchor="middle" fill="' + color + '" transform="rotate(-90 ' + (x + fontSize * 0.33).toFixed(1) + ' ' + mid.toFixed(1) + ')">' + esc(label) + '</text>';
    } else {
      labelSvg =
        '<rect x="' + (x - textLen / 2).toFixed(1) + '" y="' + (mid - boxThick / 2).toFixed(1) + '" width="' + textLen.toFixed(1) + '" height="' + boxThick.toFixed(1) + '" rx="1.5" fill="#FFFFFF" stroke="' + color + '" stroke-width="0.45"/>' +
        '<text x="' + x.toFixed(1) + '" y="' + (mid + fontSize * 0.34).toFixed(1) + '" font-family="' + MONO + '" font-size="' + fontSize + '" font-weight="bold" text-anchor="middle" fill="' + color + '">' + esc(label) + '</text>';
    }

    return (
      '<line x1="' + x.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      '<path d="M' + (x - aw).toFixed(1) + ' ' + (y1 + ah).toFixed(1) + ' L' + x.toFixed(1) + ' ' + y1.toFixed(1) + ' L' + (x + aw).toFixed(1) + ' ' + (y1 + ah).toFixed(1) + '" fill="none" stroke="' + color + '" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M' + (x - aw).toFixed(1) + ' ' + (y2 - ah).toFixed(1) + ' L' + x.toFixed(1) + ' ' + y2.toFixed(1) + ' L' + (x + aw).toFixed(1) + ' ' + (y2 - ah).toFixed(1) + '" fill="none" stroke="' + color + '" stroke-width="0.9" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<line x1="' + (x - 4).toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + (x + 4).toFixed(1) + '" y2="' + y1.toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      '<line x1="' + (x - 4).toFixed(1) + '" y1="' + y2.toFixed(1) + '" x2="' + (x + 4).toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + color + '" stroke-width="0.9"/>' +
      labelSvg
    );
  }

  function createBadgePlacer(bounds) {
    const occupied = [];
    return function placeBadge(x, y, label, align, fontSize) {
      if (!label) return '';
      fontSize = fontSize || 7.8;
      const w = Math.max(19, Math.round(String(label).length * (fontSize * 0.62) + 6));
      const h = fontSize + 4.2;
      let bx = align === 'left' ? x : align === 'right' ? x - w : x - w / 2;
      let by = y - h / 2;

      if (bounds) {
        bx = Math.max(bounds.minX + 3, Math.min(bounds.maxX - w - 3, bx));
        by = Math.max(bounds.minY + 3, Math.min(bounds.maxY - h - 3, by));
      }

      for (let attempt = 0; attempt < 4; attempt++) {
        const hit = occupied.find(r => !(bx + w + 2 < r.x || bx > r.x + r.w + 2 || by + h + 1.5 < r.y || by > r.y + r.h + 1.5));
        if (!hit) break;
        by = hit.y - h - 2;
        if (bounds && by < bounds.minY + 3) {
          by = hit.y + hit.h + 2;
        }
      }

      if (bounds && (by < bounds.minY || by + h > bounds.maxY)) return '';
      occupied.push({ x: bx, y: by, w: w, h: h });

      return (
        '<rect x="' + bx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="2" fill="#FFFFFF" stroke="' + RED + '" stroke-width="0.65"/>' +
        '<text x="' + (bx + w / 2).toFixed(1) + '" y="' + (by + h - 3.1).toFixed(1) + '" font-family="' + MONO + '" font-size="' + fontSize + '" font-weight="bold" text-anchor="middle" fill="' + RED + '">' + esc(label) + '</text>'
      );
    };
  }

  function relBox(el, surfaceRect, scale) {
    if (!el || el.hidden) return null;
    const cs = window.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return null;
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
    return box.bottom > clip.minY + 4 && box.y < clip.maxY - 4 && box.right > clip.minX + 4 && box.x < clip.maxX - 4;
  }

  /* ---------- Generador de Barras Estructurales B/N (1:1 con nodos de texto e inputs de 4 · Prototipo) ---------- */

  function buildSkeletonBars(rootEl, surfaceRect, scale, clip) {
    if (!rootEl) return '';
    const out = [];

    // 1. Inputs, selects y textareas
    const inputs = rootEl.querySelectorAll('input:not([type="checkbox"]):not([type="file"]), select, textarea');
    inputs.forEach(inp => {
      const b = relBox(inp, surfaceRect, scale);
      if (!insideClip(b, clip)) return;
      if (inp.closest('.mk-code-row')) {
        const sz = Math.min(12, b.w * 0.35);
        out.push('<rect x="' + (b.cx - sz / 2).toFixed(1) + '" y="' + (b.cy - 3).toFixed(1) + '" width="' + sz.toFixed(1) + '" height="6" rx="3" fill="#8C8C8C"/>');
        return;
      }
      const iw = Math.min(b.w - 22, Math.max(28, b.w * 0.46));
      const ix = b.x + 11;
      const iy = inp.tagName === 'TEXTAREA' ? (b.y + 12) : (b.cy - 2.5);
      out.push('<rect x="' + ix.toFixed(1) + '" y="' + iy.toFixed(1) + '" width="' + iw.toFixed(1) + '" height="5" rx="2.5" fill="#C9C9C9"/>');
    });

    // 2. Nodos de texto reales medidos con Range.getClientRects() (posición exacta línea por línea)
    const range = document.createRange();
    const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT, null);
    let textNode;
    while ((textNode = walker.nextNode())) {
      const val = (textNode.nodeValue || '').trim();
      if (!val) continue;
      const parent = textNode.parentElement;
      if (!parent) continue;
      const pTag = parent.tagName.toLowerCase();
      if (pTag === 'script' || pTag === 'style' || pTag === 'svg' || pTag === 'option' || pTag === 'textarea' || pTag === 'input') continue;
      if (parent.closest('svg, .mk-qr')) continue;

      const cs = window.getComputedStyle(parent);
      if (cs.display === 'none' || cs.visibility === 'hidden') continue;

      const isHeading =
        pTag === 'h1' || pTag === 'h2' || pTag === 'h3' || pTag === 'strong' || pTag === 'b' ||
        parseInt(cs.fontWeight, 10) >= 600 ||
        parent.matches('.mk-display, .mk-page-title, .mk-auth-title, .mk-title, .mk-card-title, .mk-section-title, .mk-eyebrow');
      const isPrimaryBtn = Boolean(parent.closest('.mk-btn.mk-primary, .mk-choice.selected, .mk-filter-tab.active, .mk-side-item.active'));
      const fill = isPrimaryBtn ? '#6E6E6E' : isHeading ? '#8C8C8C' : '#C9C9C9';

      range.selectNodeContents(textNode);
      const rects = range.getClientRects();
      for (let i = 0; i < rects.length; i++) {
        const r = rects[i];
        const rx = (r.left - surfaceRect.left) / scale;
        const ry = (r.top - surfaceRect.top) / scale;
        const rw = r.width / scale;
        const rh = r.height / scale;
        if (rw < 4 || rh < 4) continue;
        if (ry + rh < clip.minY + 2 || ry > clip.maxY - 2 || rx + rw < clip.minX + 2 || rx > clip.maxX - 2) continue;

        const barH = isHeading ? Math.min(8.5, Math.max(5.2, rh * 0.42)) : Math.min(6, Math.max(4.4, rh * 0.36));
        const by = ry + (rh - barH) / 2;
        const bw = Math.max(8, Math.min(rw, clip.maxX - rx - 4));
        out.push('<rect x="' + rx.toFixed(1) + '" y="' + by.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + barH.toFixed(1) + '" rx="' + (barH / 2).toFixed(2) + '" fill="' + fill + '"/>');
      }
    }

    return out.join('');
  }

  /* ---------- Escaneo de Redlines Internos (Cajas, Tipografía, Iconos, Padding, Gaps) ---------- */

  function buildInnerRedlines(rootEl, surfaceRect, scale, clip, isPwa) {
    if (!rootEl) return '';
    const placeBadge = createBadgePlacer(clip);
    const parts = [];

    // 1. Etiquetas de dimensión en contenedores de imagen con cruz X
    const photoSelector = '.mk-photo-wrap, .mk-room-thumb, .mk-gallery-main, .mk-gallery-thumbs button, .mk-auth-art-visual, .mk-proof, .mk-room-option-thumb, .mk-profile-cover, .mk-dropzone, .mk-qr, .mk-splash-emblem';
    rootEl.querySelectorAll(photoSelector).forEach(el => {
      const b = relBox(el, surfaceRect, scale);
      if (!insideClip(b, clip) || b.w < 32 || b.h < 24) return;
      const lbl = '[ ' + Math.round(b.w) + '×' + Math.round(b.h) + ' ]';
      const tw = Math.min(b.w - 6, lbl.length * 5.2 + 8);
      if (tw >= 26) {
        parts.push(
          '<rect x="' + (b.cx - tw / 2).toFixed(1) + '" y="' + (b.cy - 7).toFixed(1) + '" width="' + tw.toFixed(1) + '" height="14" rx="2" fill="rgba(255,255,255,0.92)" stroke="#7A7A7A" stroke-width="0.6"/>' +
          '<text x="' + b.cx.toFixed(1) + '" y="' + (b.cy + 2.8).toFixed(1) + '" font-family="' + MONO + '" font-size="7.6" font-weight="bold" text-anchor="middle" fill="#111111">' + esc(lbl) + '</text>'
        );
      }
    });

    // 2. Cajas, Contenedores y Controles (agrupando hermanos idénticos con ×N)
    const boxSelector = [
      '.mk-card', '.mk-stat', '.mk-feature', '.mk-kpi', '.mk-fact',
      '.mk-auth-m-card', '.mk-auth-p-card', '.mk-loading-card', '.mk-floating-card',
      '.mk-status-hero', '.mk-list-row', '.mk-room-option',
      '.mk-btn', '.mk-choice', '.mk-filter-tab', '.mk-rating-cell',
      '.mk-side-item', '.mk-pwa-link', '.mk-navitem',
      '.mk-field input', '.mk-field select', '.mk-field textarea', '.mk-code-row input',
      '.mk-photo-wrap', '.mk-room-thumb', '.mk-gallery-main', '.mk-dropzone', '.mk-notice',
      '.mk-splash-emblem', '.mk-splash-badge', '.mk-skeleton-box', '.mk-skeleton-panel'
    ].join(',');

    const rawBoxes = Array.from(rootEl.querySelectorAll(boxSelector))
      .map(el => relBox(el, surfaceRect, scale))
      .filter(b => insideClip(b, clip) && b.w >= 26 && b.h >= 20);

    const groups = new Map();
    rawBoxes.forEach(b => {
      const parent = b.el.parentElement;
      const wRound = Math.round(b.w);
      const hRound = Math.round(b.h);
      const tagCls = b.el.tagName + ':' + (b.el.className || '').replace(/\b(active|selected|current)\b/g, '').trim();
      const key = (parent ? parent.tagName + '.' + parent.className : 'root') + '|' + tagCls + '|' + Math.round(wRound / 4) + 'x' + Math.round(hRound / 4);
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
      parts.push(placeBadge(target.right - 3, target.bottom - 7, label, 'right', isPwa ? 8.0 : 7.5));
    });

    // 3. Padding interno en rojo (#E0003C) dentro de la tarjeta principal
    const firstCard = rawBoxes.find(b => b.el.matches('.mk-card, .mk-auth-m-card, .mk-auth-p-card, .mk-loading-card'));
    if (firstCard && firstCard.w >= 160 && firstCard.h >= 60) {
      const padL = Math.round(parseFloat(firstCard.cs.paddingLeft) || 14);
      if (padL >= 10 && padL <= 48) {
        const py = Math.min(clip.maxY - 16, Math.max(clip.minY + 16, firstCard.y + 18));
        parts.push(hDimArrow(firstCard.x, firstCard.x + padL, py, String(padL), RED, 7.4));
      }
    }

    // 4. Avatares y círculos (⌀N ×K)
    const circleSelector = '.mk-avatar, .mk-status-hero-icon, .mk-stat-icon, .mk-list-avatar, .mk-timeline-dot, .mk-spinner, .mk-sk-circle';
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
      parts.push(placeBadge(b.right + 4, b.cy, '⌀' + cg.d + (cg.items.length > 1 ? ' ×' + cg.items.length : ''), 'left', 7.5));
    });

    // 5. Iconos (□N ×K)
    const iconSelector = '.mk-navitem .mk-icon, .mk-side-item .mk-icon, .mk-pwa-link .mk-icon';
    const icons = Array.from(rootEl.querySelectorAll(iconSelector))
      .map(el => relBox(el, surfaceRect, scale))
      .filter(b => insideClip(b, clip) && b.w >= 12);

    const iconGroups = new Map();
    icons.forEach(b => {
      const sz = Math.round(Math.max(b.w, b.h));
      const key = 'ico|' + sz;
      if (!iconGroups.has(key)) iconGroups.set(key, []);
      iconGroups.get(key).push(b);
    });

    iconGroups.forEach(list => {
      const b = list[0];
      const sz = Math.round(Math.max(b.w, b.h));
      parts.push('<rect x="' + (b.x - 2).toFixed(1) + '" y="' + (b.y - 2).toFixed(1) + '" width="' + (b.w + 4).toFixed(1) + '" height="' + (b.h + 4).toFixed(1) + '" rx="2" fill="none" stroke="' + RED + '" stroke-width="0.9" stroke-dasharray="2.5 2"/>');
      parts.push(placeBadge(b.right + 3, b.y - 2, '□' + sz + (list.length > 1 ? ' ×' + list.length : ''), 'left', 7.4));
    });

    // 6. Especificaciones tipográficas (Aa fs/lh B)
    const typoSelector = '.mk-display, .mk-page-title, .mk-auth-title, .mk-title, .mk-card-title, .mk-section-title, .mk-eyebrow, .mk-lead, .mk-stat strong, .mk-amount-block strong, .mk-splash-brand, .mk-splash-title, .mk-splash-motto, .mk-splash-ver';
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
      const kindKey = el.className + '|' + spec;
      if (seenTypoKinds.has(kindKey)) return;
      seenTypoKinds.add(kindKey);
      parts.push(placeBadge(Math.min(clip.maxX - 42, b.x + Math.min(b.w + 6, 180)), b.y + 6, spec, 'left', isPwa ? 7.8 : 7.4));
    });

    return parts.join('');
  }

  /* ---------- Renderizado de Lámina Móvil (390 × 844) ---------- */

  function renderMobileRedlines() {
    const mobileView = document.getElementById('mobileView');
    const phoneScreen = document.getElementById('phoneScreen');
    if (!mobileView || !phoneScreen || mobileView.hidden) return;

    const svg = ensureSvg('mobileView', 'wireMobileSvg', MOBILE_SHEET.w, MOBILE_SHEET.h);
    if (!svg) return;

    const sRect = mobileView.getBoundingClientRect();
    if (sRect.width < 10) return;
    const scale = (sRect.width / MOBILE_SHEET.w) || 1;

    const FW = MOBILE_SHEET.fw;
    const FH = MOBILE_SHEET.fh;
    const clip = { minX: 0, minY: 0, maxX: FW, maxY: FH };

    const statusEl = phoneScreen.querySelector('.mk-statusbar');
    const appbarEl = phoneScreen.querySelector('.mk-appbar, .mk-auth-m-top, .mk-public-top');
    const navEl = phoneScreen.querySelector('.mk-bottomnav, .mk-auth-m-foot');
    const scrollEl = phoneScreen.querySelector('.mk-scroll, .mk-auth-m-scroll, .mk-landing-scroll');

    const statusBox = statusEl ? relBox(statusEl, sRect, scale) : null;
    const appbarBox = appbarEl ? relBox(appbarEl, sRect, scale) : null;
    const navBox = navEl ? relBox(navEl, sRect, scale) : null;

    const statusH = statusBox ? Math.round(statusBox.h) : 28;
    const appBarH = appbarBox ? Math.round(appbarBox.h) : 0;
    const navH = navBox ? Math.round(navBox.h) : 0;
    const bodyTop = statusH + appBarH;
    const bodyBottom = FH - navH;
    const bodyH = Math.round(bodyBottom - bodyTop);

    const barsSvg = state.showBars ? buildSkeletonBars(phoneScreen, sRect, scale, clip) : '';
    const innerRedlines = state.showMeasures ? buildInnerRedlines(phoneScreen, sRect, scale, clip, false) : '';

    // Cotas estructurales integradas en los bordes del lienzo 390 × 844
    let structuralArrows = '';
    if (state.showMeasures) {
      structuralArrows += hDimArrow(14, FW - 14, 14, '390 lp (dp) · Flutter 390×844', INK, 8.2);
      if (appBarH > 0) {
        structuralArrows += vDimArrow(FW - 11, statusH, bodyTop, String(appBarH), INK, 7.6, true);
      }
      structuralArrows += vDimArrow(FW - 11, bodyTop, bodyBottom, 'cuerpo ' + bodyH, INK, 8.2, true);
      if (navH > 0) {
        structuralArrows += vDimArrow(FW - 11, bodyBottom, FH, String(navH), INK, 7.6, true);
      }

      if (scrollEl) {
        const children = Array.from(scrollEl.children)
          .map(el => relBox(el, sRect, scale))
          .filter(b => b && b.h >= 18 && b.y >= bodyTop - 4 && b.bottom <= bodyBottom + 4);
        for (let i = 0; i < children.length - 1; i++) {
          const cur = children[i];
          const nxt = children[i + 1];
          const gap = Math.round(nxt.y - cur.bottom);
          if (gap >= 5 && gap <= 50) {
            structuralArrows += vDimArrow(14, cur.bottom, nxt.y, String(gap), RED, 7.4, false);
          }
        }
      }
    }

    svg.innerHTML =
      '<defs><clipPath id="wireMobileClip"><rect x="0" y="0" width="' + FW + '" height="' + FH + '" rx="' + MOBILE_SHEET.rx + '"/></clipPath></defs>' +
      '<g clip-path="url(#wireMobileClip)" class="wire-bars-layer">' + barsSvg + '</g>' +
      (state.showMeasures
        ? '<g clip-path="url(#wireMobileClip)" class="wire-measures-layer">' +
            innerRedlines +
            structuralArrows +
          '</g>'
        : '');
  }

  /* ---------- Renderizado de Lámina Web / PWA (1440 × 900) ---------- */

  function renderPwaRedlines() {
    const pwaView = document.getElementById('pwaView');
    const pwaScreen = document.getElementById('pwaScreen');
    if (!pwaView || !pwaScreen || pwaView.hidden) return;

    const svg = ensureSvg('pwaView', 'wirePwaSvg', PWA_SHEET.w, PWA_SHEET.h);
    if (!svg) return;

    const sRect = pwaView.getBoundingClientRect();
    if (sRect.width < 10) return;
    const scale = (sRect.width / PWA_SHEET.w) || 1;

    const FW = PWA_SHEET.fw;
    const FH = PWA_SHEET.fh;
    const clip = { minX: 0, minY: 0, maxX: FW, maxY: FH };

    const browserEl = pwaScreen.querySelector('.mk-browser');
    const topEl = pwaScreen.querySelector('.mk-pwa-top, .mk-public-top');
    const sideEl = pwaScreen.querySelector('.mk-pwa-side');
    const authArtEl = pwaScreen.querySelector('.mk-auth-art');
    const mainEl = pwaScreen.querySelector('.mk-pwa-main, .mk-auth-p-card, .mk-landing');

    const browserBox = browserEl ? relBox(browserEl, sRect, scale) : null;
    const topBox = topEl ? relBox(topEl, sRect, scale) : null;
    const sideBox = sideEl ? relBox(sideEl, sRect, scale) : null;
    const authArtBox = authArtEl ? relBox(authArtEl, sRect, scale) : null;

    const browserH = browserBox ? Math.round(browserBox.h) : 38;
    const headerH = topBox ? Math.round(topBox.h) : 0;
    const bodyTop = browserH + headerH;
    const bodyH = FH - bodyTop;

    const barsSvg = state.showBars ? buildSkeletonBars(pwaScreen, sRect, scale, clip) : '';
    const innerRedlines = state.showMeasures ? buildInnerRedlines(pwaScreen, sRect, scale, clip, true) : '';

    let structuralArrows = '';
    if (state.showMeasures) {
      structuralArrows += hDimArrow(140, FW - 140, 19, '1440px = 90rem · React + Vite (1440×900)', INK, 9);
      if (sideBox && sideBox.w > 40) {
        const sw = Math.round(sideBox.w);
        const mw = FW - sw;
        structuralArrows +=
          hDimArrow(4, sw - 4, FH - 14, sw + 'px · ' + +(sw / 16).toFixed(2) + 'rem (Sidebar)', INK, 8.4) +
          hDimArrow(sw + 4, FW - 4, FH - 14, mw + 'px · ' + +(mw / 16).toFixed(2) + 'rem (Main)', INK, 8.4);
      } else if (authArtBox && authArtBox.w > 100) {
        const aw = Math.round(authArtBox.w);
        const cw = FW - aw;
        structuralArrows +=
          hDimArrow(4, aw - 4, FH - 14, aw + 'px (42% Panel Arte)', INK, 8.4) +
          hDimArrow(aw + 4, FW - 4, FH - 14, cw + 'px (58% Panel Auth)', INK, 8.4);
      }

      if (headerH > 0) {
        structuralArrows += vDimArrow(FW - 14, browserH, bodyTop, String(headerH) + 'px', INK, 8, true);
      }
      structuralArrows += vDimArrow(FW - 14, bodyTop, FH, bodyH + 'px · ' + +(bodyH / 16).toFixed(2) + 'rem', INK, 8.5, true);

      if (mainEl) {
        const blocks = Array.from(mainEl.children)
          .map(el => relBox(el, sRect, scale))
          .filter(b => b && b.h >= 20 && b.y >= bodyTop - 4 && b.bottom <= FH + 4);
        for (let i = 0; i < blocks.length - 1; i++) {
          const cur = blocks[i];
          const nxt = blocks[i + 1];
          const gap = Math.round(nxt.y - cur.bottom);
          if (gap >= 5 && gap <= 60) {
            structuralArrows += vDimArrow(FW - 34, cur.bottom, nxt.y, String(gap), RED, 8, false);
          }
        }
      }
    }

    svg.innerHTML =
      '<defs><clipPath id="wirePwaClip"><rect x="0" y="0" width="' + FW + '" height="' + FH + '" rx="' + PWA_SHEET.rx + '"/></clipPath></defs>' +
      '<g clip-path="url(#wirePwaClip)" class="wire-bars-layer">' + barsSvg + '</g>' +
      (state.showMeasures
        ? '<g clip-path="url(#wirePwaClip)" class="wire-measures-layer">' +
            innerRedlines +
            structuralArrows +
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
    setTimeout(renderAll, 70);
    setTimeout(renderAll, 200);
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
        const scrollEl = phoneScreen && phoneScreen.querySelector('.mk-scroll, .mk-auth-m-scroll, .mk-landing-scroll');
        if (scrollEl && !scrollEl.__wireScrollBound) {
          scrollEl.__wireScrollBound = true;
          scrollEl.addEventListener('scroll', scheduleRender, { passive: true });
        }
        const pwaMain = pwaScreen && pwaScreen.querySelector('.mk-pwa-main');
        if (pwaMain && !pwaMain.__wireScrollBound) {
          pwaMain.__wireScrollBound = true;
          pwaMain.addEventListener('scroll', scheduleRender, { passive: true });
        }
      }
    });

    if (phoneScreen) observer.observe(phoneScreen, obsConfig);
    if (pwaScreen) observer.observe(pwaScreen, obsConfig);

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
