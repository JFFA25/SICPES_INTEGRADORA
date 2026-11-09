/**
 * app.js - Controlador Interactivo de la Matriz RACI
 * SICPES - Proyecto Integrador UTHH
 * Desarrollado con el Agente de Arquitectura Archify
 */

document.addEventListener("DOMContentLoaded", () => {
  // Estado de la aplicación
  const state = {
    selectedPhase: "ALL",
    selectedRole: "ALL",
    selectedRaciType: "ALL",
    searchQuery: "",
    theme: localStorage.getItem("sicpes-theme") || "light"
  };

  // Inicializar tema
  applyTheme(state.theme);

  // Renderizar componentes
  renderMetrics();
  renderLegend();
  renderPhaseTabs();
  renderRolePills();
  renderTable();
  renderWorkloadBalance();
  setupEventListeners();

  // ----------------------------------------------------
  // GESTIÓN DE TEMA DARK / LIGHT
  // ----------------------------------------------------
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    state.theme = theme;
    localStorage.setItem("sicpes-theme", theme);
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.innerHTML = theme === "dark" ? "☀️ Modo Claro" : "🌙 Modo Oscuro";
    }
  }

  // ----------------------------------------------------
  // RENDER: MÉTRICAS GENERALES
  // ----------------------------------------------------
  function renderMetrics() {
    const totalTasks = RACI_DATA.tasks.length;
    const totalPhases = RACI_DATA.phases.length;
    const totalRoles = RACI_DATA.roles.length;

    // Conteo de Accountables para verificar Golden Rule
    let compliantTasks = 0;
    RACI_DATA.tasks.forEach(t => {
      let aCount = 0;
      Object.values(t.raci).forEach(v => {
        if (v.type === "A") aCount++;
      });
      if (aCount === 1) compliantTasks++;
    });

    const healthScore = Math.round((compliantTasks / totalTasks) * 100);

    const metricsContainer = document.getElementById("metricsGrid");
    if (!metricsContainer) return;

    metricsContainer.innerHTML = `
      <div class="metric-card">
        <div class="metric-title">Actividades Totales</div>
        <div class="metric-value">${totalTasks}</div>
        <div class="metric-desc">Cubriendo las 6 fases del ciclo de vida</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Salud de la Matriz (Regla de Oro)</div>
        <div class="metric-value" style="color: #2F8A5C;">${healthScore}%</div>
        <div class="metric-desc">Exactamente 1 Accountable por actividad</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Fases del SDLC</div>
        <div class="metric-value">${totalPhases}</div>
        <div class="metric-desc">Desde análisis hasta mejora continua</div>
      </div>
      <div class="metric-card">
        <div class="metric-title">Roles Modelados</div>
        <div class="metric-value">${totalRoles}</div>
        <div class="metric-desc">4 Desarrolladores + 3 Stakeholders</div>
      </div>
    `;
  }

  // ----------------------------------------------------
  // RENDER: LEYENDA INTERACTIVA RACI
  // ----------------------------------------------------
  function renderLegend() {
    const legendContainer = document.getElementById("legendGrid");
    if (!legendContainer) return;

    legendContainer.innerHTML = Object.entries(RACI_DATA.definitions).map(([key, def]) => {
      return `
        <div class="legend-card" data-raci-type="${key}" tabindex="0" role="button" aria-label="Filtrar por ${def.name}">
          <span class="raci-badge ${def.badgeClass}">${def.code}</span>
          <div class="legend-content">
            <h4>${def.name}</h4>
            <p>${def.summary}</p>
          </div>
        </div>
      `;
    }).join("");
  }

  // ----------------------------------------------------
  // RENDER: PESTAÑAS DE FASES
  // ----------------------------------------------------
  function renderPhaseTabs() {
    const tabsContainer = document.getElementById("phaseTabs");
    if (!tabsContainer) return;

    const allBtn = `<button class="tab-btn active" data-phase="ALL">Todas las Fases (${RACI_DATA.tasks.length})</button>`;
    const phaseBtns = RACI_DATA.phases.map(p => {
      const count = RACI_DATA.tasks.filter(t => t.phaseId === p.id).length;
      return `<button class="tab-btn" data-phase="${p.id}">${p.code}: ${p.name} (${count})</button>`;
    }).join("");

    tabsContainer.innerHTML = allBtn + phaseBtns;
  }

  // ----------------------------------------------------
  // RENDER: PÍLDORAS DE FILTRADO POR ROL
  // ----------------------------------------------------
  function renderRolePills() {
    const pillsContainer = document.getElementById("rolePills");
    if (!pillsContainer) return;

    const allPill = `<button class="role-pill active" data-role="ALL">Todos los Roles</button>`;
    const rolePills = RACI_DATA.roles.map(r => {
      const avatarHtml = r.avatar ? `<img src="${r.avatar}" alt="${r.code}">` : `<span>👤</span>`;
      return `<button class="role-pill" data-role="${r.id}">${avatarHtml} ${r.code} · ${r.name.split(" ")[0]}</button>`;
    }).join("");

    pillsContainer.innerHTML = allPill + rolePills;
  }

  // ----------------------------------------------------
  // RENDER: TABLA DE LA MATRIZ RACI
  // ----------------------------------------------------
  function renderTable() {
    const theadContainer = document.getElementById("tableHeaderRow");
    const tbodyContainer = document.getElementById("tableBody");
    if (!theadContainer || !tbodyContainer) return;

    // Encabezado con roles dinámicos
    const roleHeaders = RACI_DATA.roles.map(r => {
      return `
        <th class="role-header" title="${r.title} - ${r.name}">
          <span class="role-code">${r.code}</span>
          <span class="role-sub">${r.name.split(" ")[0]}</span>
        </th>
      `;
    }).join("");

    theadContainer.innerHTML = `
      <th style="width: 80px;">Código</th>
      <th style="min-width: 280px;">Actividad / Entregable</th>
      ${roleHeaders}
    `;

    // Filtrar tareas según estado actual
    const filteredTasks = RACI_DATA.tasks.filter(t => {
      // Filtro por fase
      if (state.selectedPhase !== "ALL" && t.phaseId !== state.selectedPhase) {
        return false;
      }

      // Filtro por rol (solo mostrar si tiene la asignación seleccionada o cualquier asignación)
      if (state.selectedRole !== "ALL") {
        const assignment = t.raci[state.selectedRole];
        if (!assignment) return false;
        if (state.selectedRaciType !== "ALL" && assignment.type !== state.selectedRaciType) {
          return false;
        }
      } else if (state.selectedRaciType !== "ALL") {
        // Si hay filtro de tipo RACI global
        const hasType = Object.values(t.raci).some(v => v.type === state.selectedRaciType);
        if (!hasType) return false;
      }

      // Filtro por búsqueda
      if (state.searchQuery.trim() !== "") {
        const query = state.searchQuery.toLowerCase();
        const matchCode = t.code.toLowerCase().includes(query);
        const matchName = t.name.toLowerCase().includes(query);
        const matchDesc = t.description.toLowerCase().includes(query);
        const matchDeliv = t.deliverable.toLowerCase().includes(query);
        if (!matchCode && !matchName && !matchDesc && !matchDeliv) {
          return false;
        }
      }

      return true;
    });

    if (filteredTasks.length === 0) {
      tbodyContainer.innerHTML = `
        <tr>
          <td colspan="${RACI_DATA.roles.length + 2}" style="text-align: center; padding: 40px; color: var(--text-muted);">
            No se encontraron actividades con los filtros seleccionados.
          </td>
        </tr>
      `;
      return;
    }

    // Agrupar por fase para mostrar separadores limpios
    let currentPhaseId = "";
    let htmlRows = "";

    filteredTasks.forEach(task => {
      if (task.phaseId !== currentPhaseId) {
        currentPhaseId = task.phaseId;
        const phaseObj = RACI_DATA.phases.find(p => p.id === currentPhaseId);
        htmlRows += `
          <tr class="phase-group-header">
            <td colspan="${RACI_DATA.roles.length + 2}">
              ${phaseObj.code} · ${phaseObj.name.toUpperCase()} &mdash; <span style="font-weight: 400; font-size: 0.78rem; text-transform: none;">${phaseObj.description}</span>
            </td>
          </tr>
        `;
      }

      const roleCells = RACI_DATA.roles.map(role => {
        const assignment = task.raci[role.id];
        if (!assignment) {
          return `<td class="cell-raci empty-cell">-</td>`;
        }

        const def = RACI_DATA.definitions[assignment.type];
        const isDimmed = (state.selectedRaciType !== "ALL" && assignment.type !== state.selectedRaciType) ||
                         (state.selectedRole !== "ALL" && role.id !== state.selectedRole);

        const dimStyle = isDimmed ? "opacity: 0.25;" : "";

        return `
          <td class="cell-raci" data-task-id="${task.id}" data-role-id="${role.id}" style="${dimStyle}" title="Clic para ver detalle de ${role.code} en ${task.code}">
            <span class="raci-badge ${def.badgeClass}">${assignment.type}</span>
          </td>
        `;
      }).join("");

      htmlRows += `
        <tr class="task-row" id="row-${task.id}">
          <td class="task-code-col">${task.code}</td>
          <td class="task-name-col">
            <h4>${task.name}</h4>
            <p>${task.description}</p>
            <span class="deliverable">📦 ${task.deliverable}</span>
          </td>
          ${roleCells}
        </tr>
      `;
    });

    tbodyContainer.innerHTML = htmlRows;
  }

  // ----------------------------------------------------
  // RENDER: BALANCE DE CARGAS DE TRABAJO (ANÁLISIS RACI)
  // ----------------------------------------------------
  function renderWorkloadBalance() {
    const balanceGrid = document.getElementById("balanceGrid");
    if (!balanceGrid) return;

    // Calcular estadísticas por rol
    const stats = {};
    RACI_DATA.roles.forEach(r => {
      stats[r.id] = { R: 0, A: 0, C: 0, I: 0, total: 0 };
    });

    RACI_DATA.tasks.forEach(t => {
      Object.entries(t.raci).forEach(([roleId, ass]) => {
        if (stats[roleId]) {
          stats[roleId][ass.type]++;
          stats[roleId].total++;
        }
      });
    });

    const maxTasks = RACI_DATA.tasks.length;

    balanceGrid.innerHTML = RACI_DATA.roles.map(r => {
      const s = stats[r.id];
      const rPct = ((s.R / maxTasks) * 100).toFixed(0);
      const aPct = ((s.A / maxTasks) * 100).toFixed(0);
      const cPct = ((s.C / maxTasks) * 100).toFixed(0);
      const iPct = ((s.I / maxTasks) * 100).toFixed(0);

      const avatarHtml = r.avatar
        ? `<img src="${r.avatar}" alt="${r.name}">`
        : `<div style="width:42px;height:42px;border-radius:50%;background:var(--accent-soft);display:flex;align-items:center;justify-content:center;font-weight:700;color:var(--primary);">${r.code}</div>`;

      return `
        <div class="balance-card">
          <div class="balance-card-header">
            ${avatarHtml}
            <div>
              <h4>${r.name}</h4>
              <span>${r.code} · ${r.title}</span>
            </div>
          </div>
          <div class="stat-bars">
            <div class="stat-bar-row" title="Responsible (Ejecutor): ${s.R} tareas">
              <span class="stat-label" style="color: var(--color-r);">R</span>
              <div class="stat-track">
                <div class="stat-fill fill-r" style="width: ${rPct}%;"></div>
              </div>
              <span class="stat-num">${s.R}</span>
            </div>
            <div class="stat-bar-row" title="Accountable (Aprobador final): ${s.A} tareas">
              <span class="stat-label" style="color: var(--color-a);">A</span>
              <div class="stat-track">
                <div class="stat-fill fill-a" style="width: ${aPct}%;"></div>
              </div>
              <span class="stat-num">${s.A}</span>
            </div>
            <div class="stat-bar-row" title="Consulted (Consultado): ${s.C} tareas">
              <span class="stat-label" style="color: var(--color-c);">C</span>
              <div class="stat-track">
                <div class="stat-fill fill-c" style="width: ${cPct}%;"></div>
              </div>
              <span class="stat-num">${s.C}</span>
            </div>
            <div class="stat-bar-row" title="Informed (Informado): ${s.I} tareas">
              <span class="stat-label" style="color: var(--color-i);">I</span>
              <div class="stat-track">
                <div class="stat-fill fill-i" style="width: ${iPct}%;"></div>
              </div>
              <span class="stat-num">${s.I}</span>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // ----------------------------------------------------
  // MODAL DE DETALLE DE ASIGNACIÓN
  // ----------------------------------------------------
  function openCellDetailModal(taskId, roleId) {
    const task = RACI_DATA.tasks.find(t => t.id === taskId);
    const role = RACI_DATA.roles.find(r => r.id === roleId);
    if (!task || !role) return;

    const assignment = task.raci[roleId];
    if (!assignment) return;

    const def = RACI_DATA.definitions[assignment.type];
    const phase = RACI_DATA.phases.find(p => p.id === task.phaseId);

    const modalBackdrop = document.getElementById("cellModalBackdrop");
    const modalContent = document.getElementById("cellModalContent");
    if (!modalBackdrop || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-header">
        <div class="badge-tag">
          <span class="raci-badge ${def.badgeClass}" style="width: 26px; height: 26px; font-size: 0.85rem;">${assignment.type}</span>
          <span style="font-weight: 700; color: ${def.color}; font-size: 0.88rem;">${def.name}</span>
        </div>
        <h3>${task.code}: ${task.name}</h3>
        <span style="font-size: 0.78rem; color: var(--text-muted);">${phase.code} · ${phase.name}</span>
      </div>

      <div class="modal-body">
        <div class="modal-field">
          <label>Rol Evaluado</label>
          <p><strong>${role.name}</strong> (${role.code}) &mdash; <em>${role.title}</em></p>
        </div>

        <div class="modal-field">
          <label>Justificación y Tareas Asignadas</label>
          <div class="modal-note-box">
            <p>${assignment.note}</p>
          </div>
        </div>

        <div class="modal-field">
          <label>Entregable Vinculado</label>
          <p>📦 ${task.deliverable}</p>
        </div>

        <div class="modal-field">
          <label>Alcance de la Actividad</label>
          <p>${task.description}</p>
        </div>

        <div class="modal-field">
          <label>Criterio de Gobernanza RACI</label>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">
            ${def.summary}
          </p>
        </div>
      </div>
    `;

    modalBackdrop.classList.add("open");
  }

  function closeCellDetailModal() {
    const modalBackdrop = document.getElementById("cellModalBackdrop");
    if (modalBackdrop) modalBackdrop.classList.remove("open");
  }

  // ----------------------------------------------------
  // EVENT LISTENERS
  // ----------------------------------------------------
  function setupEventListeners() {
    // Toggle Tema
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        applyTheme(state.theme === "dark" ? "light" : "dark");
      });
    }

    // Buscador interactivo
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        renderTable();
      });
    }

    // Pestañas de fases
    const phaseTabs = document.getElementById("phaseTabs");
    if (phaseTabs) {
      phaseTabs.addEventListener("click", (e) => {
        const btn = e.target.closest(".tab-btn");
        if (!btn) return;
        phaseTabs.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        state.selectedPhase = btn.getAttribute("data-phase");
        renderTable();
      });
    }

    // Filtros por rol
    const rolePills = document.getElementById("rolePills");
    if (rolePills) {
      rolePills.addEventListener("click", (e) => {
        const pill = e.target.closest(".role-pill");
        if (!pill) return;
        rolePills.querySelectorAll(".role-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        state.selectedRole = pill.getAttribute("data-role");
        renderTable();
      });
    }

    // Filtro por leyenda RACI (clic en R, A, C o I)
    const legendGrid = document.getElementById("legendGrid");
    if (legendGrid) {
      legendGrid.addEventListener("click", (e) => {
        const card = e.target.closest(".legend-card");
        if (!card) return;
        const raciType = card.getAttribute("data-raci-type");

        if (state.selectedRaciType === raciType) {
          state.selectedRaciType = "ALL";
          card.classList.remove("active");
        } else {
          legendGrid.querySelectorAll(".legend-card").forEach(c => c.classList.remove("active"));
          card.classList.add("active");
          state.selectedRaciType = raciType;
        }
        renderTable();
      });
    }

    // Clic en celdas de la tabla para abrir modal
    const tableBody = document.getElementById("tableBody");
    if (tableBody) {
      tableBody.addEventListener("click", (e) => {
        const cell = e.target.closest(".cell-raci");
        if (!cell) return;
        const taskId = cell.getAttribute("data-task-id");
        const roleId = cell.getAttribute("data-role-id");
        if (taskId && roleId) {
          openCellDetailModal(taskId, roleId);
        }
      });
    }

    // Cerrar modal
    const closeBtn = document.getElementById("modalCloseBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeCellDetailModal);
    }

    const modalBackdrop = document.getElementById("cellModalBackdrop");
    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) closeCellDetailModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeCellDetailModal();
    });

    // Botón de imprimir / PDF
    const printBtn = document.getElementById("printBtn");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }
});
