/* Datos de ejemplo (equivalentes al prototipo móvil) para la versión PWA de escritorio. */
const PWA_MOCK = {
  student: { name: 'Luis Humberto', email: 'luis.humberto@email.com', room: '204', floor: 'Segundo piso', type: 'Individual', amount: 2500, due: '01/12/2025', notices: ['Tu comprobante de pago está en revisión.', 'El acceso principal tendrá mantenimiento el sábado.'] },
  reservations: [
    { name: 'Elena Pérez', type: 'Compartida', room: '105-A', amount: 1800, status: 'Pendiente' },
    { name: 'Edgar Cabrera', type: 'Individual', room: '302', amount: 2500, status: 'Aceptada' },
    { name: 'Luis Humberto', type: 'Individual', room: '204', amount: 2500, status: 'Pendiente' },
    { name: 'Mariana Torres', type: 'Compartida', room: '101-B', amount: 1800, status: 'Rechazada' }
  ],
  payments: [
    { name: 'Elena Pérez', room: '105-A', amount: 1800, date: '01/11/2025', status: 'Pendiente' },
    { name: 'Luis Humberto', room: '204', amount: 2500, date: '01/11/2025', status: 'Pendiente' },
    { name: 'Edgar Cabrera', room: '302', amount: 2500, date: '01/11/2025', status: 'En revisión' }
  ],
  floors: [{ name: 'Planta baja', rooms: ['PB-01', 'PB-02', 'PB-03'] }, { name: 'Primer piso', rooms: ['101', '102', '103', '105-A'] }, { name: 'Segundo piso', rooms: ['201', '202', '204'] }],
  prices: { Individual: 2500, Compartida: 1800 },
  rooms: [
    { id: '204', type: 'Individual', floor: 'Segundo piso', amount: 2500, available: true, services: ['Baño propio', 'Internet de alta velocidad', 'Agua y luz', 'Mobiliario'] },
    { id: '105-A', type: 'Compartida', floor: 'Primer piso', amount: 1800, available: true, services: ['Baño compartido', 'Internet de alta velocidad', 'Agua y luz', 'Mobiliario'] },
    { id: '302', type: 'Individual', floor: 'Tercer piso', amount: 2500, available: false, services: ['Baño propio', 'Internet de alta velocidad', 'Agua y luz', 'Mobiliario'] }
  ],
  debts: [
    { name: 'Luis Humberto', room: '204', amount: 2500, months: 1, status: 'Pendiente' },
    { name: 'Elena Pérez', room: '105-A', amount: 1800, months: 2, status: 'Vencido' },
    { name: 'Edgar Cabrera', room: '302', amount: 2500, months: 1, status: 'Pendiente' }
  ]
};
const PWA_RATING_LABELS = { 1: 'Muy insatisfecho', 2: 'Insatisfecho', 3: 'Neutral', 4: 'Satisfecho', 5: 'Muy satisfecho' };

/* Catálogo de pantallas, códigos, roles y rutas visibles en la barra de direcciones. */
const PWA_SCREENS = {
  splash: { role: 'shared', title: 'Splash Screen', label: 'SPLASH SCREEN', route: '/splash' },
  landing: { role: 'student', title: 'Landing', label: 'LANDING', route: '/' },
  studentLogin: { role: 'student', title: 'Iniciar sesión', label: 'INICIAR SESIÓN', route: '/login' },
  forgotPassword: { role: 'shared', title: 'Recuperar contraseña', label: 'RECUPERAR CONTRASEÑA', route: '/recuperar' },
  lockAccount: { role: 'shared', title: 'Cuenta bloqueada', label: 'CUENTA BLOQUEADA', route: '/bloqueo' },
  unlockAccount: { role: 'shared', title: 'Código de desbloqueo', label: 'DESBLOQUEAR CUENTA', route: '/desbloquear' },
  register: { role: 'student', title: 'Crear cuenta', label: 'CREAR CUENTA', route: '/registro' },
  verifyEmail: { role: 'student', title: 'Verificar correo', label: 'VERIFICAR CORREO', route: '/verificar-correo' },
  loading: { role: 'shared', title: 'Sincronizando', label: 'SINCRONIZANDO', route: '/cargando' },
  home: { role: 'student', title: 'Inicio', label: 'INICIO', route: '/panel' },
  reserve: { role: 'student', title: 'Reservar habitación', label: 'RESERVAR HABITACIÓN', route: '/reservar' },
  roomDetail: { role: 'student', title: 'Detalle de habitación', label: 'DETALLE DE HABITACIÓN', route: '/habitacion' },
  requestStatus: { role: 'student', title: 'Estado de mi petición', label: 'ESTADO DE MI PETICIÓN', route: '/peticion' },
  payments: { role: 'student', title: 'Gestión de Pagos', label: 'GESTIÓN DE PAGOS', route: '/pagos' },
  paymentDetail: { role: 'student', title: 'Detalle de pago', label: 'DETALLE DE PAGO', route: '/pagos/detalle' },
  rateService: { role: 'student', title: 'Evaluar el servicio', label: 'EVALUAR EL SERVICIO', route: '/evaluar' },
  rateConfirm: { role: 'student', title: 'Evaluación enviada', label: 'EVALUACIÓN ENVIADA', route: '/evaluar/gracias' },
  profile: { role: 'student', title: 'Cuenta / Perfil', label: 'CUENTA / PERFIL', route: '/cuenta' },
  aboutSoftware: { role: 'shared', title: 'Acerca del software', label: 'ACERCA DEL SOFTWARE', route: '/acerca-software' },
  aboutTeam: { role: 'shared', title: 'Acerca del equipo', label: 'ACERCA DEL EQUIPO', route: '/acerca-equipo' },
  adminLogin: { role: 'admin', title: 'Acceso administrador', label: 'LOGIN ADMIN', route: '/admin' },
  reservations: { role: 'admin', title: 'Reservaciones', label: 'RESERVACIONES', route: '/admin/reservaciones' },
  assignRoom: { role: 'admin', title: 'Asignar habitación', label: 'ASIGNAR HABITACIÓN', route: '/admin/asignar' },
  pendingPayments: { role: 'admin', title: 'Pagos pendientes', label: 'PAGOS PENDIENTES', route: '/admin/pagos' },
  validatePayment: { role: 'admin', title: 'Validar pago', label: 'VALIDAR PAGO', route: '/admin/validar' },
  debts: { role: 'admin', title: 'Adeudos', label: 'ADEUDOS', route: '/admin/adeudos' },
  floors: { role: 'admin', title: 'Pisos', label: 'PISOS', route: '/admin/pisos' },
  settings: { role: 'admin', title: 'Configuración global', label: 'CONFIGURACIÓN', route: '/admin/configuracion' }
};
const PWA_SHARED = ['splash','loading','forgotPassword','lockAccount','unlockAccount','aboutSoftware','aboutTeam'];
const PWA_CODES = { splash:'C1', landing:'E1', studentLogin:'E2', forgotPassword:'E3', lockAccount:'C2', unlockAccount:'C3', register:'E4', verifyEmail:'E5', loading:'E6', home:'E7', reserve:'E8', roomDetail:'E9', requestStatus:'E10', payments:'E11', paymentDetail:'E12', rateService:'E13', rateConfirm:'E14', profile:'E15', aboutSoftware:'C4', aboutTeam:'C5', adminLogin:'A1', reservations:'A2', assignRoom:'A3', pendingPayments:'A4', validatePayment:'A5', debts:'A6', floors:'A7', settings:'A8' };
const PWA_STUDENT = ['splash','landing','studentLogin','forgotPassword','lockAccount','unlockAccount','register','verifyEmail','loading','home','reserve','roomDetail','requestStatus','payments','paymentDetail','rateService','rateConfirm','profile','aboutSoftware','aboutTeam'];
const PWA_ADMIN = ['splash','adminLogin','forgotPassword','lockAccount','unlockAccount','loading','reservations','assignRoom','pendingPayments','validatePayment','debts','floors','settings','aboutSoftware','aboutTeam'];
const PWA_ROOTS = new Set(['splash','landing','home','reserve','payments','profile','reservations','pendingPayments','floors','settings']);
/* Acciones disponibles por pantalla: [destino, texto visible]. */
const PWA_ACTIONS = {
  splash:[['landing','Iniciar como Estudiante'],['adminLogin','Iniciar como Administrador'],['aboutSoftware','Acerca del software']],
  landing:[['studentLogin','Iniciar sesión'],['reserve','Explorar habitaciones'],['roomDetail','Habitación destacada'],['aboutSoftware','Acerca del software'],['aboutTeam','Acerca del equipo']],
  studentLogin:[['loading','Entrar al panel'],['forgotPassword','¿Olvidaste tu contraseña?'],['lockAccount','3 intentos fallidos → Bloqueo'],['register','Crear una cuenta nueva']],
  forgotPassword:[['studentLogin','Enviar enlace (Estudiante)'],['adminLogin','Enviar enlace (Administrador)'],['unlockAccount','Tengo código de verificación']],
  lockAccount:[['unlockAccount','Solicitar código de desbloqueo'],['forgotPassword','Recuperar contraseña por correo']],
  unlockAccount:[['loading','Validar código y entrar'],['studentLogin','Volver a Login Estudiante'],['adminLogin','Volver a Login Admin']],

  register:[['verifyEmail','Registrarse'],['studentLogin','¿Ya tienes cuenta? Iniciar sesión']],
  verifyEmail:[['loading','Verificar código'],['register','Reenviar código']],
  loading:[['home','Terminar carga (estudiante)'],['reservations','Terminar carga (administrador)']],
  home:[['reserve','Tarjeta Reservar'],['requestStatus','Tarjeta Estado de mi petición'],['payments','Tarjeta Próximo pago'],['roomDetail','Habitación destacada'],['rateService','Evaluar el servicio'],['profile','Barra lateral: Cuenta']],
  reserve:[['roomDetail','Ver detalle de habitación'],['requestStatus','Confirmar reservación'],['payments','Barra lateral: Pagos'],['profile','Barra lateral: Cuenta']],
  roomDetail:[['requestStatus','Solicitar esta habitación'],['reserve','Volver al catálogo']],
  requestStatus:[['home','Volver al inicio'],['reserve','Explorar más habitaciones']],
  payments:[['paymentDetail','Detalle de pago'],['home','Barra lateral: Inicio'],['reserve','Barra lateral: Reservar'],['profile','Barra lateral: Cuenta']],
  paymentDetail:[['payments','Volver a pagos']],
  rateService:[['rateConfirm','Enviar evaluación'],['home','Barra lateral: Inicio'],['profile','Barra lateral: Cuenta']],
  rateConfirm:[['home','Volver a Inicio']],
  profile:[['aboutSoftware','Acerca del software'],['aboutTeam','Acerca del equipo / empresa'],['rateService','Evaluar el servicio'],['studentLogin','Cerrar sesión'],['home','Barra lateral: Inicio'],['reserve','Barra lateral: Reservar'],['payments','Barra lateral: Pagos']],
  aboutSoftware:[['aboutTeam','Ver equipo desarrollador'],['profile','Volver a Cuenta (Estudiante)'],['settings','Volver a Configuración (Admin)'],['splash','Pantalla inicial (Splash)']],
  aboutTeam:[['aboutSoftware','Acerca del software'],['profile','Volver a Cuenta (Estudiante)'],['settings','Volver a Configuración (Admin)']],
  adminLogin:[['loading','Entrar al panel administrativo'],['forgotPassword','¿Olvidaste tu contraseña?'],['lockAccount','3 intentos fallidos → Bloqueo']],

  reservations:[['assignRoom','Seleccionar solicitud'],['pendingPayments','Panel superior: Pagos'],['floors','Panel superior: Pisos'],['settings','Panel superior: Configuración']],
  assignRoom:[['reservations','Asignar / Rechazar']],
  pendingPayments:[['validatePayment','Seleccionar pago'],['debts','Ver adeudos'],['reservations','Panel superior: Reservaciones'],['floors','Panel superior: Pisos'],['settings','Panel superior: Configuración']],
  validatePayment:[['pendingPayments','Aprobar / Rechazar']],
  debts:[['pendingPayments','Volver a pagos pendientes']],
  floors:[['reservations','Panel superior: Reservaciones'],['pendingPayments','Panel superior: Pagos'],['settings','Panel superior: Configuración']],
  settings:[['aboutSoftware','Acerca del software'],['aboutTeam','Acerca del equipo / empresa'],['adminLogin','Cerrar sesión'],['reservations','Panel superior: Reservaciones'],['pendingPayments','Panel superior: Pagos'],['floors','Panel superior: Pisos']]
};

const pwaState = { screen: 'landing', role: 'student', history: [], type: 'Individual', filter: 'Todas', paymentFilter: 'Todos', debtFilter: 'Todos', rating: 0, zones: false, loadingTimer: null, toastTimer: null, mapScrollY: 0 };

const pwaScreenEl = document.querySelector('#pwaScreen');
const pwaToastEl = document.querySelector('#pwaToast');

function pwaMoney(value) { return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value); }
function pwaEsc(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function pwaToast(message) { pwaToastEl.textContent = message; pwaToastEl.classList.add('show'); clearTimeout(pwaState.toastTimer); pwaState.toastTimer = setTimeout(() => pwaToastEl.classList.remove('show'), 2400); }

function pwaGo(screen, options = {}) {
  if (!PWA_SCREENS[screen]) return;
  if (pwaState.screen !== screen && !options.replace) pwaState.history.push(pwaState.screen);
  pwaState.screen = screen;
  const role = PWA_SCREENS[screen].role;
  if (role === 'student' || role === 'admin') pwaState.role = role;
  pwaRender();
}
function pwaBack() { const previous = pwaState.history.pop(); if (previous) { pwaState.screen = previous; pwaRender(); } else pwaToast('No hay una pantalla anterior.'); }
function pwaSetRole(role) { pwaState.role = role; pwaState.history = []; pwaGo(role === 'student' ? 'landing' : 'adminLogin', { replace: true }); }

/* --- Piezas compartidas de la interfaz web --- */
function pwaField(label, placeholder, type = 'text', value = '') {
  return `<label class="pwa-field"><span>${label}</span><input type="${type}" placeholder="${placeholder}" value="${pwaEsc(value)}"></label>`;
}
function pwaTopnav(role) {
  const links = role === 'student'
    ? [['home','Inicio'],['reserve','Reservar'],['payments','Pagos'],['profile','Cuenta']]
    : [['reservations','Reservaciones'],['pendingPayments','Pagos'],['floors','Pisos'],['settings','Configuración']];
  return `<header class="pwa-app-top"><span class="pwa-app-logo"><img class="pwa-app-logo-img" src="../images/SICPES_Producto.png" alt=""> SICPES <span>/ RESIDENCIAL</span></span><nav class="pwa-app-links">${links.map(([id,label]) => `<button class="pwa-app-link" data-pwa-go="${id}">${label}</button>`).join('')}</nav><div class="pwa-app-user"><span class="pwa-avatar"></span>${role === 'student' ? pwaEsc(PWA_MOCK.student.name) : 'Admin SICPES'}</div></header>`;
}
function pwaSidebar(role, active) {
  const items = role === 'student'
    ? [['home','⌂','Inicio'],['reserve','＋','Reservar'],['payments','$','Pagos'],['profile','◎','Cuenta']]
    : [['reservations','▤','Reservaciones'],['pendingPayments','$','Pagos'],['floors','▥','Pisos'],['settings','⚙','Configuración']];
  return `<aside class="pwa-app-side"><span class="pwa-side-label">${role === 'student' ? 'RESIDENTE' : 'ADMINISTRACIÓN'}</span>${items.map(([id,icon,label]) => `<button class="pwa-side-item ${active===id?'active':''}" data-pwa-go="${id}"><span class="pwa-side-icon">${icon}</span>${label}</button>`).join('')}</aside>`;
}
function pwaShell(role, active, content) {
  return `${pwaTopnav(role)}<div class="pwa-app-body">${pwaSidebar(role,active)}<div class="pwa-app-main">${content}</div></div>`;
}
function pwaAuthShell(content) {
  return `<div class="pwa-auth">${content}</div>`;
}
function pwaTable(headers, rows) {
  return `<div class="pwa-table"><div class="pwa-tr pwa-thead">${headers.map(h => `<span>${h}</span>`).join('')}</div>${rows.map(cells => `<div class="pwa-tr">${cells.map(c => `<span>${c}</span>`).join('')}</div>`).join('')}</div>`;
}
function pwaStatus(status) {
  const cls = status === 'Aceptada' ? 'ok' : status === 'Rechazada' ? 'no' : status === 'En revisión' ? 'rev' : 'pend';
  return `<span class="pwa-status pwa-${cls}">${pwaEsc(status.toUpperCase())}</span>`;
}

/* --- Pantallas · Rol estudiante --- */
function pwaSplash() {
  return `<div class="pwa-loading"><img class="pwa-logo-img" src="../images/SICPES_Producto.png" alt="SICPES"><span class="pwa-eyebrow">SICPES · VERSIÓN 2.4.0 · PWA REACT / VITE &amp; FLUTTER</span><h2 class="pwa-card-title">Sistema Integral de Control de Pensión de Estudiantes</h2><p class="pwa-lead" style="max-width:560px;text-align:center">Conectando estudiantes con hogares seguros y digitalizando la gestión de pensiones residenciales.</p><div class="pwa-cta-row" style="justify-content:center;margin-top:12px"><button class="pwa-button pwa-primary" data-pwa-go="landing">Portal del Residente →</button><button class="pwa-button pwa-secondary" data-pwa-go="adminLogin">Panel Administrativo</button><button class="pwa-button pwa-secondary" data-pwa-go="aboutSoftware">Acerca del software</button><button class="pwa-button pwa-secondary" data-pwa-go="aboutTeam">Acerca del equipo</button></div></div>`;
}
function pwaLanding() {
  return `${pwaTopnav('student')}<div class="pwa-landing"><div class="pwa-landing-copy"><span class="pwa-eyebrow">VIVIENDA UNIVERSITARIA · 2025</span><h1 class="pwa-display">Encuentra tu espacio ideal para vivir y estudiar</h1><p class="pwa-lead">Una residencia segura, cómoda y cerca de tu campus. Gestiona reservaciones y pagos desde un solo panel web.</p><div class="pwa-cta-row"><button class="pwa-button pwa-primary" data-pwa-go="roomDetail">Explorar habitaciones →</button><button class="pwa-button pwa-secondary" data-pwa-go="studentLogin">Iniciar sesión</button></div><div class="pwa-feature-row"><article class="pwa-feature" data-pwa-go="aboutSoftware"><strong>Acerca de SICPES</strong><small>FICHA TÉCNICA</small></article><article class="pwa-feature" data-pwa-go="aboutTeam"><strong>Equipo / Empresa</strong><small>CRÉDITOS UTHH</small></article><article class="pwa-feature" data-pwa-go="reserve"><strong>Pagos en línea</strong><small>SIN TRÁMITES</small></article></div></div><div class="pwa-landing-art"><div class="pwa-image-placeholder">[ IMAGEN PRINCIPAL ]</div><div class="pwa-art-note">Vista previa del panel de residente</div></div></div>`;
}
function pwaStudentLogin() {
  return pwaAuthShell(`<div class="pwa-auth-art"><span class="pwa-eyebrow">PORTAL DEL RESIDENTE</span><h2 class="pwa-auth-title">Gestiona tu residencia desde el navegador</h2><p class="pwa-lead">Consulta tu habitación, tus pagos y avisos en un panel pensado para escritorio.</p><div class="pwa-image-placeholder pwa-tall">[ IMAGEN ]</div></div><div class="pwa-auth-card"><span class="pwa-eyebrow">INICIAR SESIÓN</span><h2 class="pwa-card-title">Qué gusto verte de nuevo.</h2>${pwaField('CORREO ELECTRÓNICO','nombre@correo.com','email')}${pwaField('CONTRASEÑA','••••••••','password')}<button class="pwa-button pwa-primary pwa-block" data-pwa-action="student-login">Entrar</button><button class="pwa-button pwa-secondary pwa-block" style="margin-top:8px" data-pwa-go="lockAccount">Simular bloqueo (3 intentos fallidos)</button><div class="pwa-divider">O CONTINÚA CON</div><div class="pwa-social"><button data-pwa-action="social">Google</button><button data-pwa-action="social">Facebook</button><button data-pwa-action="social">LinkedIn</button></div><p class="pwa-inline-link"><button data-pwa-go="forgotPassword">¿Olvidaste tu contraseña?</button></p><p class="pwa-inline-link">¿No tienes cuenta? <button data-pwa-go="register">Regístrate</button></p></div>`);
}
function pwaRegister() {
  return pwaAuthShell(`<div class="pwa-auth-art"><span class="pwa-eyebrow">NUEVO RESIDENTE</span><h2 class="pwa-auth-title">Crea tu cuenta en minutos</h2><p class="pwa-lead">Registra tus datos una sola vez y administra tu estancia desde la web.</p><ul class="pwa-checklist"><li>Reserva tu habitación</li><li>Sube comprobantes de pago</li><li>Recibe avisos del residencial</li></ul></div><div class="pwa-auth-card"><span class="pwa-eyebrow">CREAR CUENTA</span><h2 class="pwa-card-title">Datos del residente</h2><div class="pwa-form-grid">${pwaField('NOMBRE COMPLETO','Nombre y apellidos')}${pwaField('CORREO ELECTRÓNICO','nombre@correo.com','email')}${pwaField('CONTRASEÑA','Mínimo 8 caracteres','password')}${pwaField('CONFIRMAR CONTRASEÑA','Repite tu contraseña','password')}</div><label class="pwa-checkline"><input type="checkbox"> Acepto los términos y condiciones y el aviso de privacidad.</label><button class="pwa-button pwa-primary pwa-block" data-pwa-action="register">Registrarse</button><p class="pwa-inline-link">¿Ya tienes cuenta? <button data-pwa-go="studentLogin">Iniciar sesión</button></p></div>`);
}
function pwaLoading() {
  return `<div class="pwa-loading"><img class="pwa-logo-img" src="../images/SICPES_Producto.png" alt="SICPES"><h2 class="pwa-card-title">Preparando tu espacio</h2><p class="pwa-lead">Sincronizando registros residenciales…</p><div class="pwa-progress"><div class="pwa-progress-fill" id="pwaProgressFill"></div></div><div class="pwa-progress-caption"><span id="pwaProgressText">Conectando con SICPES</span><span id="pwaProgressPercent">0%</span></div></div>`;
}
function pwaHome() {
  const s = PWA_MOCK.student;
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">PANEL DEL RESIDENTE</span><h2 class="pwa-page-title">Bienvenido, ${pwaEsc(s.name)}</h2><p class="pwa-lead">Resumen de tu residencia y próximos movimientos.</p></div></div><div class="pwa-stat-grid">${[['Habitación', s.room],['Piso', s.floor],['Tipo', s.type],['Próximo pago', pwaMoney(900)]].map(([l,v]) => `<div class="pwa-stat"><small>${l}</small><strong>${v}</strong></div>`).join('')}</div><div class="pwa-dash-grid"><article class="pwa-card"><div class="pwa-card-head"><span class="pwa-card-title">Tu reservación</span>${pwaStatus('Pendiente')}</div><div class="pwa-data-grid"><div class="pwa-data-cell"><small>Residencia</small><strong>SICPES</strong></div><div class="pwa-data-cell"><small>Ingreso</small><strong>01/09/2025</strong></div></div><button class="pwa-button pwa-secondary pwa-block" data-pwa-go="requestStatus">Ver estado de mi petición</button></article><article class="pwa-card"><div class="pwa-card-head"><span class="pwa-card-title">${pwaMoney(900)}</span>${pwaStatus('Pendiente')}</div><p class="pwa-muted">Vence el ${s.due} · Cuota de mantenimiento</p><button class="pwa-button pwa-primary pwa-block" data-pwa-go="payments">Ir a pagos</button></article></div><article class="pwa-card"><h3 class="pwa-card-title">Avisos</h3>${s.notices.map(n => `<div class="pwa-notice" data-pwa-go="payments">${pwaEsc(n)}</div>`).join('')}</article><div class="pwa-dash-grid"><article class="pwa-card"><div class="pwa-card-head"><span class="pwa-card-title">Habitación ${PWA_MOCK.rooms[0].id}</span>${pwaStatus('Pendiente')}</div><p class="pwa-muted">${PWA_MOCK.rooms[0].type} · ${pwaMoney(PWA_MOCK.rooms[0].amount)}</p><button class="pwa-button pwa-secondary pwa-block" data-pwa-go="roomDetail">Ver habitación</button></article><article class="pwa-card"><div class="pwa-card-head"><span class="pwa-card-title">Evaluación del servicio</span><button class="pwa-button pwa-secondary" data-pwa-go="rateService">Evaluar</button></div><p class="pwa-muted">Comparte tu experiencia en SICPES (HU-SIC-05).</p></article></div>`;
  return pwaShell('student','home',content);
}
function pwaReserve() {
  const type = pwaState.type, amount = PWA_MOCK.prices[type];
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">REGISTRO DE ESTUDIANTES</span><h2 class="pwa-page-title">Reserva tu habitación</h2><p class="pwa-lead">Elige el espacio que mejor se adapte a ti.</p></div></div><div class="pwa-form-layout"><div class="pwa-card">${pwaField('FECHA DE INGRESO','','date','2025-12-01')}<div class="pwa-field"><span>TIPO DE HABITACIÓN</span><div class="pwa-choice-row"><button class="pwa-choice ${type==='Individual'?'selected':''}" data-pwa-type="Individual">Individual</button><button class="pwa-choice ${type==='Compartida'?'selected':''}" data-pwa-type="Compartida">Compartida</button></div></div><div class="pwa-form-grid"><label class="pwa-field"><span>PISO</span><select><option>Segundo piso</option><option>Primer piso</option><option>Planta baja</option></select></label><label class="pwa-field"><span>HABITACIÓN</span><select><option>204 · Disponible</option><option>202 · Disponible</option><option>201 · Disponible</option></select></label></div><div class="pwa-cta-row"><button class="pwa-button pwa-secondary" data-pwa-go="roomDetail">Ver detalle de habitación</button><button class="pwa-button pwa-primary" data-pwa-action="reserve">Reservar</button></div></div><aside class="pwa-card pwa-summary"><span class="pwa-eyebrow">RESUMEN</span><h3 class="pwa-card-title">Habitación ${type}</h3><div class="pwa-data-grid"><div class="pwa-data-cell"><small>Monto mensual</small><strong>${pwaMoney(amount)}</strong></div><div class="pwa-data-cell"><small>Depósito</small><strong>${pwaMoney(amount)}</strong></div></div><p class="pwa-muted">La asignación final se confirma al terminar el registro.</p></aside></div>`;
  return pwaShell('student','reserve',content);
}
function pwaPayments() {
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">ESTADO DE CUENTA</span><h2 class="pwa-page-title">Gestión de Pagos</h2><p class="pwa-lead">Consulta tus cuotas y comprobantes.</p></div><button class="pwa-button pwa-primary" data-pwa-action="request-payment">Solicitar pago</button></div><div class="pwa-dash-grid"><article class="pwa-card"><div class="pwa-card-head"><span class="pwa-card-title">${pwaMoney(900)}</span>${pwaStatus('Pendiente')}</div><div class="pwa-data-grid"><div class="pwa-data-cell"><small>Concepto</small><strong>Mantenimiento</strong></div><div class="pwa-data-cell"><small>Vencimiento</small><strong>01/12/2025</strong></div></div></article><article class="pwa-card"><h3 class="pwa-card-title">Cargar comprobante</h3><label class="pwa-file-drop">＋ &nbsp; Selecciona un archivo o arrástralo aquí<input id="pwaReceiptFile" type="file" accept="image/*,.pdf"></label></article></div><article class="pwa-card"><h3 class="pwa-card-title">Historial de pagos</h3><div class="pwa-list-row" data-pwa-go="paymentDetail"><div><strong>${pwaMoney(2500)}</strong><span class="pwa-muted"> · Noviembre 2025 · 01/11/2025</span></div>${pwaStatus('En revisión')}</div><button class="pwa-button pwa-secondary pwa-block" data-pwa-go="paymentDetail">Ver comprobante</button></article>`;
  return pwaShell('student','payments',content);
}
function pwaProfile() {
  const s = PWA_MOCK.student;
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">MI CUENTA</span><h2 class="pwa-page-title">Cuenta / Perfil</h2><p class="pwa-lead">Datos de tu cuenta de residente.</p></div></div><div class="pwa-profile-grid"><aside class="pwa-card pwa-profile-card"><div class="pwa-avatar-big">[ FOTO ]</div><strong>${pwaEsc(s.name)}</strong><span class="pwa-muted">Estudiante</span><button class="pwa-button pwa-secondary pwa-block" data-pwa-action="logout">Cerrar sesión</button></aside><div class="pwa-card"><h3 class="pwa-card-title">Información personal</h3><div class="pwa-data-grid"><div class="pwa-data-cell"><small>Nombre completo</small><strong>${pwaEsc(s.name)}</strong></div><div class="pwa-data-cell"><small>Correo</small><strong>${pwaEsc(s.email)}</strong></div><div class="pwa-data-cell"><small>Habitación</small><strong>${s.room}</strong></div><div class="pwa-data-cell"><small>Piso</small><strong>${s.floor}</strong></div></div><div class="pwa-cta-row"><button class="pwa-button pwa-secondary" data-pwa-go="rateService">Evaluar el servicio</button><button class="pwa-button pwa-secondary" data-pwa-go="aboutSoftware">Acerca del software</button><button class="pwa-button pwa-secondary" data-pwa-go="aboutTeam">Acerca del equipo</button></div></div></div>`;
  return pwaShell('student','profile',content);
}

/* --- Pantallas · Rol administrador --- */
function pwaAdminLogin() {
  return pwaAuthShell(`<div class="pwa-auth-art pwa-admin-art"><span class="pwa-eyebrow">SICPES · ACCESO RESTRINGIDO</span><h2 class="pwa-auth-title">Panel administrativo</h2><p class="pwa-lead">Gestiona reservaciones, cobros e inventario desde un escritorio.</p><div class="pwa-image-placeholder pwa-tall">[ IMAGEN ]</div></div><div class="pwa-auth-card"><span class="pwa-eyebrow">INICIAR SESIÓN</span><h2 class="pwa-card-title">Acceso administrador</h2>${pwaField('CORREO ADMINISTRADOR','admin@sicpes.mx','email')}${pwaField('CONTRASEÑA','••••••••','password')}<button class="pwa-button pwa-primary pwa-block" data-pwa-action="admin-login">Entrar</button><button class="pwa-button pwa-secondary pwa-block" style="margin-top:8px" data-pwa-go="lockAccount">Simular bloqueo (3 intentos fallidos)</button><p class="pwa-inline-link"><button data-pwa-go="forgotPassword">¿Olvidaste tu contraseña?</button></p><p class="pwa-form-note">Acceso exclusivo para personal autorizado.</p></div>`);
}
function pwaFilterTabs(values, active, key) {
  return `<div class="pwa-tabs">${values.map(v => `<button class="pwa-filter-tab ${v===active?'active':''}" data-pwa-filter="${pwaEsc(v)}" data-pwa-filter-key="${key}">${pwaEsc(v)}</button>`).join('')}</div>`;
}
function pwaReservations() {
  const filtered = pwaState.filter === 'Todas' ? PWA_MOCK.reservations : PWA_MOCK.reservations.filter(r => r.status === pwaState.filter);
  const stats = [['Total', PWA_MOCK.reservations.length],['Pendientes', PWA_MOCK.reservations.filter(x => x.status==='Pendiente').length],['Aceptadas', PWA_MOCK.reservations.filter(x => x.status==='Aceptada').length],['Rechazadas', PWA_MOCK.reservations.filter(x => x.status==='Rechazada').length]];
  const rows = filtered.map(r => [pwaEsc(r.name), `${r.type} · Hab. ${r.room}`, pwaMoney(r.amount), pwaStatus(r.status), `<button class="pwa-button pwa-secondary" data-pwa-go="assignRoom">Asignar →</button>`]);
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">PANEL ADMINISTRATIVO SICPES</span><h2 class="pwa-page-title">Reservaciones</h2><p class="pwa-lead">Revisa y administra las solicitudes de los estudiantes.</p></div></div><div class="pwa-stat-grid">${stats.map(([l,v]) => `<div class="pwa-stat"><strong>${v}</strong><small>${l}</small></div>`).join('')}</div>${pwaFilterTabs(['Todas','Pendiente','Aceptada','Rechazada'], pwaState.filter, 'reservation')}<article class="pwa-card">${pwaTable(['Solicitante','Detalle','Monto mensual','Estado','Acción'], rows)}</article>`;
  return pwaShell('admin','reservations',content);
}
function pwaPendingPayments() {
  const filtered = pwaState.paymentFilter === 'Todos' ? PWA_MOCK.payments : PWA_MOCK.payments.filter(p => p.status === pwaState.paymentFilter);
  const stats = [['Total', PWA_MOCK.payments.length],['Pendientes', PWA_MOCK.payments.filter(p => p.status==='Pendiente').length],['En revisión', 1],['Por cobrar', pwaMoney(6300)]];
  const rows = filtered.map(p => [pwaEsc(p.name), `Habitación ${p.room}`, p.date, pwaMoney(p.amount), pwaStatus(p.status), `<button class="pwa-button pwa-secondary" data-pwa-go="validatePayment">Validar</button>`]);
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">CONTROL DE COBROS</span><h2 class="pwa-page-title">Pagos pendientes</h2><p class="pwa-lead">Da seguimiento a las cuotas por cobrar.</p></div><button class="pwa-button pwa-secondary" data-pwa-go="debts">Ver adeudos →</button></div><div class="pwa-stat-grid">${stats.map(([l,v]) => `<div class="pwa-stat"><strong>${v}</strong><small>${l}</small></div>`).join('')}</div>${pwaFilterTabs(['Todos','Pendiente','En revisión'], pwaState.paymentFilter, 'payment')}<article class="pwa-card">${pwaTable(['Residente','Habitación','Fecha','Cuota mensual','Estado','Acción'], rows)}</article>`;
  return pwaShell('admin','pendingPayments',content);
}
function pwaFloors() {
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">INVENTARIO RESIDENCIAL</span><h2 class="pwa-page-title">Pisos y habitaciones</h2><p class="pwa-lead">Administra los espacios disponibles.</p></div></div><div class="pwa-form-layout"><article class="pwa-card"><h3 class="pwa-card-title">Agregar piso</h3>${pwaField('NOMBRE DEL PISO','Ej. Tercer piso')}<label class="pwa-field"><span>HABITACIONES (SEPARADAS POR COMAS)</span><textarea id="pwaRoomInput" rows="2" placeholder="301, 302, 303"></textarea></label><button class="pwa-button pwa-primary pwa-block" data-pwa-action="add-floor">Agregar habitaciones</button></article><div class="pwa-floor-grid">${PWA_MOCK.floors.map((f,i) => `<article class="pwa-card pwa-floor-card"><div class="pwa-card-head"><strong class="pwa-card-title">${pwaEsc(f.name)}</strong><button class="pwa-back-link" data-pwa-remove-floor="${i}">Eliminar</button></div><p class="pwa-muted">${f.rooms.length} habitaciones</p><div class="pwa-room-tags">${f.rooms.map(r => `<span>${pwaEsc(r)}</span>`).join('')}</div></article>`).join('')}</div></div>`;
  return pwaShell('admin','floors',content);
}
function pwaSettings() {
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">PREFERENCIAS DEL SISTEMA</span><h2 class="pwa-page-title">Configuración global</h2><p class="pwa-lead">Precios y datos administrativos.</p></div><div class="pwa-cta-row"><button class="pwa-button pwa-secondary" data-pwa-go="aboutSoftware">Acerca del software</button><button class="pwa-button pwa-secondary" data-pwa-go="aboutTeam">Acerca del equipo</button></div></div><div class="pwa-form-layout"><article class="pwa-card"><h3 class="pwa-card-title">Precios mensuales</h3><div class="pwa-form-grid">${pwaField('HABITACIÓN INDIVIDUAL (MXN)','$2,500','number',PWA_MOCK.prices.Individual)}${pwaField('HABITACIÓN COMPARTIDA (MXN)','$1,800','number',PWA_MOCK.prices.Compartida)}${pwaField('CORREO DEL ADMINISTRADOR','admin@sicpes.mx','email','admin@sicpes.mx')}</div><button class="pwa-button pwa-primary" data-pwa-action="save-settings">Guardar cambios</button></article><article class="pwa-card"><h3 class="pwa-card-title">Notificaciones del sistema</h3>${[['Nuevas reservaciones',true],['Pagos pendientes',true],['Avisos a residentes',false]].map(([label,on]) => `<label class="pwa-switch-row">${label}<input class="pwa-switch" type="checkbox" ${on?'checked':''}></label>`).join('')}</article></div>`;
  return pwaShell('admin','settings',content);
}

/* --- Pantallas · Nuevas (Práctica 07) --- */
function pwaVerifyEmail() {
  return pwaAuthShell(`<div class="pwa-auth-art"><span class="pwa-eyebrow">CONFIRMA TU CUENTA</span><h2 class="pwa-auth-title">Verifica tu correo</h2><p class="pwa-lead">Enviamos un código de 6 dígitos a ${pwaEsc(PWA_MOCK.student.email)}. Ingrésalo para activar tu cuenta.</p></div><div class="pwa-auth-card"><span class="pwa-eyebrow">CÓDIGO DE VERIFICACIÓN</span><h2 class="pwa-card-title">Ingresa el código</h2><div class="pwa-code-row" role="group" aria-label="Código de verificación de 6 dígitos">${Array.from({length:6}).map((_,i)=>`<input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito ${i+1}" value="${i===0?'2':i===1?'0':i===2?'4':''}">`).join('')}</div><button class="pwa-button pwa-primary pwa-block" data-pwa-action="verify-email">Verificar código</button><p class="pwa-inline-link">¿No recibiste el código? <button data-pwa-action="resend-code">Reenviar código</button></p></div>`);
}
function pwaForgotPassword() {
  return pwaAuthShell(`<div class="pwa-auth-art"><span class="pwa-eyebrow">RECUPERAR ACCESO · PANTALLA COMÚN</span><h2 class="pwa-auth-title">Recupera tu contraseña</h2><p class="pwa-lead">Te enviaremos un enlace o código a tu correo registrado (residente o administrador) para restablecer el acceso.</p></div><div class="pwa-auth-card"><span class="pwa-eyebrow">RECUPERAR</span><h2 class="pwa-card-title">Recuperar contraseña</h2>${pwaField('CORREO ELECTRÓNICO','usuario@sicpes.mx','email')}<button class="pwa-button pwa-primary pwa-block" data-pwa-action="forgot-send">Enviar enlace de recuperación</button><button class="pwa-button pwa-secondary pwa-block" style="margin-top:8px" data-pwa-go="unlockAccount">Ya tengo un código de desbloqueo</button><p class="pwa-inline-link">¿Recordaste tu contraseña? <button data-pwa-go="${pwaState.role==='admin'?'adminLogin':'studentLogin'}">Iniciar sesión</button></p></div>`);
}
function pwaLockAccount() {
  return pwaAuthShell(`<div class="pwa-auth-art"><span class="pwa-eyebrow">SEGURIDAD · PANTALLA COMÚN</span><h2 class="pwa-auth-title">Protección contra accesos no autorizados</h2><p class="pwa-lead">SICPES bloquea temporalmente la sesión tras 3 intentos fallidos consecutivos en cualquiera de los roles.</p><div class="pwa-image-placeholder">[ ALERTA DE SEGURIDAD ]</div></div><div class="pwa-auth-card"><span class="pwa-eyebrow">CUENTA BLOQUEADA</span><h2 class="pwa-card-title">Acceso restringido por 15:00 min</h2><p class="pwa-muted">Se registraron 3 intentos fallidos de inicio de sesión. Solicita un código de verificación de 6 dígitos para desbloquear tu cuenta inmediatamente.</p><button class="pwa-button pwa-primary pwa-block" data-pwa-go="unlockAccount">Solicitar código de desbloqueo →</button><button class="pwa-button pwa-secondary pwa-block" style="margin-top:8px" data-pwa-go="forgotPassword">Recuperar contraseña por correo</button></div>`);
}
function pwaUnlockAccount() {
  return pwaAuthShell(`<div class="pwa-auth-art"><span class="pwa-eyebrow">VERIFICACIÓN · PANTALLA COMÚN</span><h2 class="pwa-auth-title">Desbloquea tu cuenta con código</h2><p class="pwa-lead">Ingresa los 6 dígitos enviados a tu correo electrónico para reactivar tu sesión.</p></div><div class="pwa-auth-card"><span class="pwa-eyebrow">CÓDIGO DE DESBLOQUEO</span><h2 class="pwa-card-title">Ingresa el código de 6 dígitos</h2><div class="pwa-code-row" role="group" aria-label="Código de desbloqueo de 6 dígitos">${Array.from({length:6}).map((_,i)=>`<input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito ${i+1}" value="${['8','4','1','9','0','2'][i]||''}">`).join('')}</div><button class="pwa-button pwa-primary pwa-block" data-pwa-action="unlock-code">Validar y desbloquear cuenta</button><p class="pwa-inline-link">¿No llegó el código? <button data-pwa-action="resend-code">Reenviar código</button> · <button data-pwa-go="${pwaState.role==='admin'?'adminLogin':'studentLogin'}">Volver al login</button></p></div>`);
}
function pwaAboutSoftware() {
  const role = pwaState.role === 'admin' ? 'admin' : 'student';
  const active = role === 'admin' ? 'settings' : 'profile';
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">INFORMACIÓN DEL SISTEMA · PANTALLA COMÚN</span><h2 class="pwa-page-title">Acerca del software · SICPES</h2><p class="pwa-lead">Sistema Integral de Control de Pensión de Estudiantes · Versión 2.4.0 (2026).</p></div><div class="pwa-cta-row"><button class="pwa-button pwa-primary" data-pwa-go="aboutTeam">Ver equipo desarrollador →</button><button class="pwa-button pwa-secondary" data-pwa-go="${active}">Volver</button></div></div><div class="pwa-stat-grid"><div class="pwa-stat"><small>Aplicación Web</small><strong>PWA React / Vite</strong></div><div class="pwa-stat"><small>Aplicación Móvil</small><strong>Flutter / Dart</strong></div><div class="pwa-stat"><small>Backend</small><strong>Node.js + FastAPI</strong></div><div class="pwa-stat"><small>Base de Datos</small><strong>MySQL TiDB + Mongo</strong></div></div><div class="pwa-dash-grid"><article class="pwa-card"><h3 class="pwa-card-title">Propósito del sistema</h3><p class="pwa-muted">Conectando estudiantes con hogares seguros, digitalizando la gestión de pensiones residenciales, control de pagos, asignación de habitaciones y seguimiento de solicitudes.</p></article><article class="pwa-card"><h3 class="pwa-card-title">APIs y servicios integrados</h3><ul class="pwa-checklist"><li>Google Maps Embed &amp; Geolocation API</li><li>Mailtrap API &amp; Twilio API (notificaciones y códigos)</li><li>PDFmonkey API (recibos y reportes)</li></ul></article></div>`;
  return pwaShell(role, active, content);
}
function pwaAboutTeam() {
  const role = pwaState.role === 'admin' ? 'admin' : 'student';
  const active = role === 'admin' ? 'settings' : 'profile';
  const rows = [
    ['Jose Francisco Flores Amador', 'Líder de Proyecto / Fullstack / Documentación', '@JFFA25'],
    ['Edgar Cabrera Velázquez', 'Backend / Lógica del sistema y APIs', '@Edgar-Cbr'],
    ['Edwin Hernández Campos', 'Base de datos / Estructura relacional y NoSQL', '@Edwinhdzcm'],
    ['Giovany Raul Pazos Cruz', 'Frontend / Interfaz PWA React y Móvil Flutter', '@giova0412']
  ];
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">CRÉDITOS INSTITUCIONALES · PANTALLA COMÚN</span><h2 class="pwa-page-title">Acerca del equipo / empresa</h2><p class="pwa-lead">Equipo desarrollador del Proyecto Integrador SICPES · Universidad Tecnológica de la Huasteca Hidalguense (UTHH).</p></div><div class="pwa-cta-row"><button class="pwa-button pwa-secondary" data-pwa-go="aboutSoftware">← Acerca del software</button><button class="pwa-button pwa-primary" data-pwa-go="${active}">Volver</button></div></div><article class="pwa-card">${pwaTable(['Integrante', 'Rol y responsabilidad en el proyecto', 'GitHub'], rows)}</article>`;
  return pwaShell(role, active, content);
}
function pwaRoomDetail() {
  const room = PWA_MOCK.rooms[0];
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">HABITACIÓN DISPONIBLE</span><h2 class="pwa-page-title">Habitación ${pwaEsc(room.id)}</h2><p class="pwa-lead">${pwaEsc(room.type)} · ${pwaEsc(room.floor)}</p></div><button class="pwa-button pwa-primary" data-pwa-action="room-request">Solicitar esta habitación</button></div><div class="pwa-form-layout"><article class="pwa-card"><div class="pwa-image-placeholder pwa-tall">[ FOTO DE LA HABITACIÓN ]</div></article><aside class="pwa-card pwa-summary"><span class="pwa-eyebrow">DETALLE</span><div class="pwa-data-grid"><div class="pwa-data-cell"><small>Tipo</small><strong>${pwaEsc(room.type)}</strong></div><div class="pwa-data-cell"><small>Piso</small><strong>${pwaEsc(room.floor)}</strong></div><div class="pwa-data-cell"><small>Precio mensual</small><strong>${pwaMoney(room.amount)}</strong></div><div class="pwa-data-cell"><small>Disponibilidad</small><strong>${room.available?'Disponible':'Ocupada'}</strong></div></div><h3 class="pwa-card-title" style="margin-top:14px">Servicios incluidos</h3><ul class="pwa-checklist">${room.services.map(s=>`<li>${pwaEsc(s)}</li>`).join('')}</ul></aside></div>`;
  return pwaShell('student','reserve',content);
}
function pwaRequestStatus() {
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">SEGUIMIENTO DE RESERVA</span><h2 class="pwa-page-title">Estado de mi petición</h2><p class="pwa-lead">${pwaEsc(PWA_MOCK.student.type)} · Habitación ${pwaEsc(PWA_MOCK.student.room)}</p></div><button class="pwa-button pwa-secondary" data-pwa-go="home">Volver al inicio</button></div><div class="pwa-form-layout"><article class="pwa-card"><div class="pwa-timeline"><div class="pwa-timeline-item pwa-done"><span class="pwa-dot"></span><strong>Pendiente</strong><small>Solicitud enviada · 28/11/2025</small></div><div class="pwa-timeline-item pwa-current"><span class="pwa-dot"></span><strong>En revisión</strong><small>El administrador está validando tu solicitud.</small></div><div class="pwa-timeline-item"><span class="pwa-dot"></span><strong>Aceptada / Rechazada</strong><small>Pendiente de resolución.</small></div></div></article><aside class="pwa-card pwa-summary"><span class="pwa-eyebrow">HABITACIÓN ASIGNADA</span><h3 class="pwa-card-title">Por confirmar</h3><p class="pwa-muted">Se asignará una habitación cuando tu solicitud sea aceptada.</p></aside></div>`;
  return pwaShell('student','home',content);
}
function pwaPaymentDetail() {
  const p = PWA_MOCK.payments[1];
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">COMPROBANTE DE PAGO</span><h2 class="pwa-page-title">Detalle de pago</h2><p class="pwa-lead">Consulta el estado y sube tu comprobante.</p></div><button class="pwa-button pwa-secondary" data-pwa-go="payments">Volver a pagos</button></div><div class="pwa-dash-grid"><article class="pwa-card"><div class="pwa-card-head"><span class="pwa-card-title">${pwaMoney(p.amount)}</span>${pwaStatus(p.status)}</div><div class="pwa-data-grid"><div class="pwa-data-cell"><small>Mes</small><strong>Noviembre 2025</strong></div><div class="pwa-data-cell"><small>Habitación</small><strong>${pwaEsc(p.room)}</strong></div><div class="pwa-data-cell"><small>Concepto</small><strong>Renta mensual</strong></div><div class="pwa-data-cell"><small>Registro</small><strong>${pwaEsc(p.date)}</strong></div></div></article><article class="pwa-card"><h3 class="pwa-card-title">Subir comprobante</h3><label class="pwa-file-drop">＋ &nbsp; Selecciona tu comprobante<input id="pwaPaymentDetailFile" type="file" accept="image/*,.pdf"></label></article></div><article class="pwa-card"><h3 class="pwa-card-title">Historial</h3>${pwaTable(['Mes','Monto','Fecha','Estado'],[['Octubre 2025',pwaMoney(2500),'01/10/2025',pwaStatus('Aceptada')]])}</article>`;
  return pwaShell('student','payments',content);
}
function pwaRateService() {
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">HU-SIC-05 · SATISFACCIÓN</span><h2 class="pwa-page-title">Evaluar el servicio</h2><p class="pwa-lead">¿Qué tan satisfecho estás con tu estancia en SICPES?</p></div></div><div class="pwa-form-layout"><article class="pwa-card"><span class="pwa-eyebrow">CALIFICACIÓN</span><div class="pwa-rating-scale" role="group" aria-label="Calificación de 1 a 5">${[1,2,3,4,5].map(n=>`<button class="pwa-rating-cell ${pwaState.rating===n?'selected':''}" data-pwa-rate="${n}" aria-label="${n} · ${PWA_RATING_LABELS[n]}">${n}</button>`).join('')}</div><div class="pwa-rating-labels"><span>1 · Muy insatisfecho</span><span>5 · Muy satisfecho</span></div><p class="pwa-rating-value" id="pwaRateValue">${pwaState.rating?`Seleccionaste: ${pwaState.rating} · ${PWA_RATING_LABELS[pwaState.rating]}`:'Selecciona una calificación'}</p><label class="pwa-field"><span>COMENTARIO (OPCIONAL)</span><textarea id="pwaRateComment" rows="5" maxlength="500" placeholder="Cuéntanos tu experiencia…"></textarea></label><div class="pwa-counter" id="pwaRateCount">0 / 500</div><button class="pwa-button pwa-primary pwa-block" data-pwa-action="send-rating" ${pwaState.rating?'':'disabled'}>Enviar evaluación</button></article><aside class="pwa-card pwa-summary"><span class="pwa-eyebrow">TU OPINIÓN IMPORTA</span><h3 class="pwa-card-title">Ayúdanos a mejorar</h3><p class="pwa-muted">Tu evaluación se registra de forma anónima para el equipo de SICPES.</p></aside></div>`;
  return pwaShell('student','profile',content);
}
function pwaRateConfirm() {
  const content = `<div class="pwa-loading"><div class="pwa-image-placeholder pwa-logo-box">GRACIAS</div><h2 class="pwa-card-title">¡Gracias por tu opinión!</h2><p class="pwa-lead">Tu evaluación se registró correctamente. Gracias por compartir tu opinión.</p><button class="pwa-button pwa-primary" data-pwa-go="home">Volver a Inicio</button></div>`;
  return pwaShell('student','home',content);
}
function pwaAssignRoom() {
  const r = PWA_MOCK.reservations[0];
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">GESTIÓN DE RESERVACIONES</span><h2 class="pwa-page-title">Asignar habitación</h2><p class="pwa-lead">Revisa la solicitud y asigna un espacio.</p></div><button class="pwa-button pwa-secondary" data-pwa-go="reservations">Volver a reservaciones</button></div><div class="pwa-form-layout"><article class="pwa-card"><div class="pwa-card-head"><div><h3 class="pwa-card-title">${pwaEsc(r.name)}</h3><span class="pwa-muted">${pwaEsc(r.type)} · Solicitó Hab. ${pwaEsc(r.room)}</span></div>${pwaStatus(r.status)}</div><div class="pwa-data-grid"><div class="pwa-data-cell"><small>Monto mensual</small><strong>${pwaMoney(r.amount)}</strong></div><div class="pwa-data-cell"><small>Fecha</small><strong>01/12/2025</strong></div></div></article><aside class="pwa-card pwa-summary"><span class="pwa-eyebrow">ASIGNACIÓN</span><label class="pwa-field"><span>HABITACIÓN DISPONIBLE</span><select>${PWA_MOCK.rooms.filter(x=>x.available).map(x=>`<option>${pwaEsc(x.id)} · ${pwaEsc(x.type)} · ${pwaMoney(x.amount)}</option>`).join('')}</select></label><div class="pwa-cta-row"><button class="pwa-button pwa-primary" data-pwa-action="assign-room">Asignar</button><button class="pwa-button pwa-secondary" data-pwa-action="reject-room">Rechazar</button></div></aside></div>`;
  return pwaShell('admin','reservations',content);
}
function pwaValidatePayment() {
  const p = PWA_MOCK.payments[2];
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">CONTROL DE COBROS</span><h2 class="pwa-page-title">Validar pago</h2><p class="pwa-lead">Revisa el comprobante antes de aprobar.</p></div><button class="pwa-button pwa-secondary" data-pwa-go="pendingPayments">Volver a pagos</button></div><div class="pwa-form-layout"><article class="pwa-card"><div class="pwa-card-head"><div><h3 class="pwa-card-title">${pwaEsc(p.name)}</h3><span class="pwa-muted">Habitación ${pwaEsc(p.room)}</span></div>${pwaStatus(p.status)}</div><div class="pwa-data-grid"><div class="pwa-data-cell"><small>Monto</small><strong>${pwaMoney(p.amount)}</strong></div><div class="pwa-data-cell"><small>Registro</small><strong>${pwaEsc(p.date)}</strong></div></div><div class="pwa-image-placeholder pwa-tall" style="margin-top:14px">[ COMPROBANTE ]</div></article><aside class="pwa-card pwa-summary"><span class="pwa-eyebrow">RESOLUCIÓN</span><label class="pwa-field"><span>MOTIVO DE RECHAZO (OPCIONAL)</span><textarea rows="3" placeholder="Ej. El monto no coincide…"></textarea></label><div class="pwa-cta-row"><button class="pwa-button pwa-primary" data-pwa-action="approve-payment">Aprobar</button><button class="pwa-button pwa-secondary" data-pwa-action="reject-payment">Rechazar</button></div></aside></div>`;
  return pwaShell('admin','pendingPayments',content);
}
function pwaDebts() {
  const filtered = pwaState.debtFilter==='Todos'?PWA_MOCK.debts:PWA_MOCK.debts.filter(d=>pwaState.debtFilter==='1 mes'?d.months===1:d.months>=2);
  const total = PWA_MOCK.debts.reduce((sum,d)=>sum+d.amount*d.months,0);
  const content = `<div class="pwa-page-head"><div><span class="pwa-eyebrow">SEGUIMIENTO DE ADEUDOS</span><h2 class="pwa-page-title">Adeudos</h2><p class="pwa-lead">Estudiantes con pagos vencidos.</p></div><button class="pwa-button pwa-secondary" data-pwa-go="pendingPayments">Volver a pagos</button></div><div class="pwa-stat-grid"><div class="pwa-stat"><strong>${PWA_MOCK.debts.length}</strong><small>Con adeudo</small></div><div class="pwa-stat"><strong>${pwaMoney(total)}</strong><small>Total</small></div></div>${pwaFilterTabs(['Todos','1 mes','2+ meses'], pwaState.debtFilter, 'debt')}<div class="pwa-card"><div class="pwa-debt-list">${filtered.map(d=>`<div class="pwa-debt-row"><div><strong>${pwaEsc(d.name)}</strong><span class="pwa-muted">Habitación ${pwaEsc(d.room)} · ${d.months} ${d.months===1?'mes vencido':'meses vencidos'}</span></div><div class="pwa-debt-side"><strong>${pwaMoney(d.amount)}</strong><button class="pwa-button pwa-secondary" data-pwa-action="send-reminder">Enviar recordatorio</button></div></div>`).join('')}</div></div>`;
  return pwaShell('admin','pendingPayments',content);
}

const PWA_RENDERERS = { splash:pwaSplash, landing:pwaLanding, studentLogin:pwaStudentLogin, forgotPassword:pwaForgotPassword, lockAccount:pwaLockAccount, unlockAccount:pwaUnlockAccount, register:pwaRegister, verifyEmail:pwaVerifyEmail, loading:pwaLoading, home:pwaHome, reserve:pwaReserve, roomDetail:pwaRoomDetail, requestStatus:pwaRequestStatus, payments:pwaPayments, paymentDetail:pwaPaymentDetail, rateService:pwaRateService, rateConfirm:pwaRateConfirm, profile:pwaProfile, aboutSoftware:pwaAboutSoftware, aboutTeam:pwaAboutTeam, adminLogin:pwaAdminLogin, reservations:pwaReservations, assignRoom:pwaAssignRoom, pendingPayments:pwaPendingPayments, validatePayment:pwaValidatePayment, debts:pwaDebts, floors:pwaFloors, settings:pwaSettings };

function pwaRender() {
  if (pwaState.screen !== 'loading') clearInterval(pwaState.loadingTimer);
  pwaScreenEl.classList.add('leaving');
  setTimeout(() => {
    pwaScreenEl.innerHTML = PWA_RENDERERS[pwaState.screen]();
    pwaScreenEl.classList.remove('leaving');
    pwaScreenEl.classList.remove('screen-in'); void pwaScreenEl.offsetWidth; pwaScreenEl.classList.add('screen-in');
    const comment = pwaScreenEl.querySelector('#pwaRateComment');
    if (comment) comment.addEventListener('input', () => { const count = pwaScreenEl.querySelector('#pwaRateCount'); if (count) count.textContent = `${comment.value.length} / 500`; });
    document.querySelector('#pwaScreenLabel').textContent = PWA_SCREENS[pwaState.screen].label;
    document.querySelector('#pwaRoute').textContent = PWA_SCREENS[pwaState.screen].route;
    document.querySelector('#pwaRoleCaption').textContent = pwaState.role === 'student' ? 'ESTUDIANTE' : 'ADMINISTRADOR';
    document.querySelectorAll('.pwa-role-tab').forEach(b => b.classList.toggle('active', b.dataset.pwaRole === pwaState.role));
    document.querySelector('#pwaBack').hidden = PWA_ROOTS.has(pwaState.screen);
    pwaRenderPanel();
    if (pwaState.screen === 'loading') pwaRunLoading();
    if(!window.SicpesShell||window.SicpesShell.getState().platform==='pwa'){window.dispatchEvent(new CustomEvent('sicpes:screen',{detail:{section:'wireframes',platform:'pwa',screen:pwaState.screen,role:pwaState.role}}));}
  }, 110);
}
function pwaRenderPanel() {
  const screens = pwaState.role === 'student' ? PWA_STUDENT : PWA_ADMIN;
  const list = document.querySelector('#pwaScreenList');
  list.innerHTML = screens.map(id => `<button class="pwa-screen-link ${id===pwaState.screen?'active':''}" type="button" data-pwa-go="${id}"><span>${PWA_CODES[id]}</span><span>${PWA_SCREENS[id].title}</span></button>`).join('');
  if (pwaState.role === 'admin' && pwaState.screen === 'loading') list.insertAdjacentHTML('beforeend', `<button class="pwa-screen-link active" type="button" data-pwa-go="loading"><span>${PWA_CODES.loading}</span><span>Carga compartida</span></button>`);
  const options = PWA_ACTIONS[pwaState.screen] || [];
  document.querySelector('#pwaDestinations').innerHTML = options.length ? options.map(([id,action]) => `<button class="pwa-destination-link" type="button" data-pwa-go="${id}"><span>${pwaEsc(action)}</span><b>→ ${PWA_CODES[id]} · ${pwaEsc(PWA_SCREENS[id].title)}</b></button>`).join('') : '<p class="pwa-no-destinations">Esta pantalla no tiene destinos directos.</p>';
  document.querySelector('#pwaScreenCount').textContent = `${screens.length} pantallas · ${pwaState.role === 'student' ? 'Rol Estudiante' : 'Rol Administrador'}`;
}
function pwaRunLoading() {
  clearInterval(pwaState.loadingTimer);
  let progress = 0;
  pwaState.loadingTimer = setInterval(() => {
    progress = Math.min(progress + 8, 100);
    const fill = document.querySelector('#pwaProgressFill');
    if (!fill) { clearInterval(pwaState.loadingTimer); return; }
    fill.style.width = `${progress}%`;
    document.querySelector('#pwaProgressPercent').textContent = `${progress}%`;
    if (progress === 100) { clearInterval(pwaState.loadingTimer); setTimeout(() => pwaGo(pwaState.role === 'admin' ? 'reservations' : 'home', { replace: true }), 450); }
  }, 100);
}

/* --- Mapa de navegación de la PWA (layout por carriles, igual que el móvil) --- */
const PWA_NS = 'http://www.w3.org/2000/svg';
/* Mapa de navegación (PWA): posiciones derivadas de carriles (filas × columnas)
   y conexiones declaradas con su tipo de ruteo ortogonal. */
const PWA_DG={TW:120,TH:96,GX:110,GY:72,LX:150,TOPY:56,LANEGAP:110,CORRIDORPITCH:36,PAD:40,LABEL_FS:10};
const PWA_MAP={
  shared:{
    title:'PANTALLAS EN COMÚN · ESTUDIANTE Y ADMINISTRADOR · WEB',
    note:'7 pantallas compartidas por ambos roles en la PWA: C1 Splash Screen, E6 Pantalla de carga, E3 Recuperar contraseña, C2 Cuenta bloqueada, C3 Código de desbloqueo, C4 Acerca del software y C5 Acerca del equipo.',
    marker:'pwaArrowShared',
    lanes:[
      {label:'INICIO Y ACERCA DE',rows:[['splash','loading','aboutSoftware','aboutTeam']]},
      {label:'SEGURIDAD CUENTA',rows:[['forgotPassword','lockAccount','unlockAccount']]}
    ],
    links:[
      {from:'splash',to:'loading',kind:'h',label:'Autenticar'},
      {from:'loading',to:'aboutSoftware',kind:'h',label:'Info sistema'},
      {from:'aboutSoftware',to:'aboutTeam',kind:'h',label:'Ver equipo'},
      {from:'aboutTeam',to:'aboutSoftware',kind:'hr',label:'Software'},
      {from:'forgotPassword',to:'lockAccount',kind:'h',label:'Intentos'},
      {from:'lockAccount',to:'unlockAccount',kind:'h',label:'Código 6 díg.'},
      {from:'lockAccount',to:'forgotPassword',kind:'hr',label:'Recuperar'},
      {from:'unlockAccount',to:'loading',kind:'cross',label:'Desbloquear'}
    ]
  },
  student:{
    title:'ROL ESTUDIANTE · WEB',marker:'pwaArrowStudent',
    lanes:[
      {label:'ACCESO',rows:[
        ['splash','landing','studentLogin','loading'],
        ['forgotPassword','lockAccount','unlockAccount','register','verifyEmail']
      ]},
      {label:'RESERVACIÓN',rows:[
        ['home','reserve',null,'requestStatus'],
        [null,null,'roomDetail',null]
      ]},
      {label:'PAGOS Y CUENTA',rows:[
        ['payments','paymentDetail','profile','rateService','rateConfirm'],
        [null,null,'aboutSoftware','aboutTeam',null]
      ]}
    ],
    links:[
      {from:'splash',to:'landing',kind:'h',label:'Iniciar web'},
      {from:'landing',to:'studentLogin',kind:'h',label:'Iniciar sesión'},
      {from:'studentLogin',to:'lockAccount',kind:'ct',label:'3 intentos'},
      {from:'lockAccount',to:'unlockAccount',kind:'h',label:'Código'},
      {from:'unlockAccount',to:'loading',kind:'ct',label:'Desbloquear'},
      {from:'studentLogin',to:'loading',kind:'h',label:'Entrar'},
      {from:'studentLogin',to:'register',kind:'v',label:'Regístrate',off:18},
      {from:'register',to:'verifyEmail',kind:'h',label:'Registrarse'},
      {from:'verifyEmail',to:'loading',kind:'ct',label:'Verificar'},
      {from:'studentLogin',to:'forgotPassword',kind:'ct',label:'¿Olvidaste?'},
      {from:'loading',to:'home',kind:'cross',label:'Terminar carga'},
      {from:'home',to:'reserve',kind:'h',label:'Reservar'},
      {from:'reserve',to:'requestStatus',kind:'h',label:'Confirmar'},
      {from:'reserve',to:'roomDetail',kind:'ct',label:'Ver detalle'},
      {from:'home',to:'payments',kind:'cross',label:'Pagos'},
      {from:'home',to:'profile',kind:'cross',label:'Cuenta'},
      {from:'payments',to:'paymentDetail',kind:'h',label:'Ver detalle'},
      {from:'paymentDetail',to:'payments',kind:'hr',label:'Volver'},
      {from:'profile',to:'rateService',kind:'h',label:'Evaluar'},
      {from:'profile',to:'aboutSoftware',kind:'v',label:'Acerca de'},
      {from:'aboutSoftware',to:'aboutTeam',kind:'h',label:'Equipo'},
      {from:'rateService',to:'rateConfirm',kind:'h',label:'Enviar'},
      {from:'requestStatus',to:'home',kind:'corridor',corridor:0,label:'Ir a Inicio'},
      {from:'rateConfirm',to:'home',kind:'corridor',corridor:0,label:'Ir a Inicio'},
      {from:'profile',to:'studentLogin',kind:'corridor',corridor:1,label:'Cerrar sesión'}
    ]
  },
  admin:{
    title:'ROL ADMINISTRADOR · WEB',note:'Comparte C1, E6, E3, C2, C3, C4 y C5 con el rol Estudiante',marker:'pwaArrowAdmin',
    lanes:[
      {label:'ACCESO',rows:[['splash','adminLogin','loading','reservations','assignRoom'],[null,'forgotPassword','lockAccount','unlockAccount',null]]},
      {label:'PAGOS',rows:[['pendingPayments','validatePayment','debts']]},
      {label:'INVENTARIO',rows:[['floors','settings','aboutSoftware','aboutTeam']]}
    ],
    links:[
      {from:'splash',to:'adminLogin',kind:'h',label:'Acceso admin'},
      {from:'adminLogin',to:'loading',kind:'h',label:'Entrar'},
      {from:'adminLogin',to:'forgotPassword',kind:'v',label:'¿Olvidaste?'},
      {from:'adminLogin',to:'lockAccount',kind:'ct',label:'3 intentos'},
      {from:'lockAccount',to:'unlockAccount',kind:'h',label:'Código'},
      {from:'unlockAccount',to:'loading',kind:'ct',label:'Desbloquear'},
      {from:'loading',to:'reservations',kind:'h',label:'Cargar'},
      {from:'reservations',to:'assignRoom',kind:'h',label:'Seleccionar'},
      {from:'assignRoom',to:'reservations',kind:'hr',label:'Confirmar'},
      {from:'reservations',to:'pendingPayments',kind:'cross',label:'Pagos'},
      {from:'pendingPayments',to:'validatePayment',kind:'h',label:'Ver'},
      {from:'validatePayment',to:'pendingPayments',kind:'hr',label:'Aprobar'},
      {from:'pendingPayments',to:'debts',kind:'h',label:'Adeudos'},
      {from:'debts',to:'pendingPayments',kind:'hr',label:'Volver'},
      {from:'reservations',to:'floors',kind:'side',label:'Pisos'},
      {from:'floors',to:'settings',kind:'h',label:'Configurar'},
      {from:'settings',to:'aboutSoftware',kind:'h',label:'Acerca de'},
      {from:'aboutSoftware',to:'aboutTeam',kind:'h',label:'Equipo'},
      {from:'settings',to:'adminLogin',kind:'corridor',corridor:0,label:'Cerrar sesión'}
    ]
  }
};
function pwaOpenMap() {
  const view = document.querySelector('#pwaMapView');
  if (!view.hidden) return;
  pwaState.mapScrollY = window.scrollY;
  view.hidden = false;
  pwaBuildMap();
}
function pwaCloseMap() {
  const view = document.querySelector('#pwaMapView');
  if (view.hidden) return;
  view.hidden = true;
  window.scrollTo(0, pwaState.mapScrollY);
}
function pwaLabelW(text){return String(text).length*6.4+14;}
function pwaWrap(title){
  const words=String(title).split(' ');
  if(words.length<2)return [title];
  let a='',b='';
  const half=title.length/2+1;
  words.forEach(w=>{const cand=a?a+' '+w:w;if(!b&&cand.length<=half)a=cand;else b=b?b+' '+w:w;});
  return b?[a,b]:[a];
}
function pwaLayout(flow){
  const G=PWA_DG,cards={},lanes=[];
  let y=G.TOPY;
  flow.lanes.forEach((lane,li)=>{
    const rows=lane.rows;
    const h=rows.length*G.TH+(rows.length-1)*G.GY;
    lanes.push({label:lane.label,top:y,height:h,center:y+h/2});
    rows.forEach((row,ti)=>row.forEach((id,ci)=>{
      if(!id)return;
      const x=G.LX+ci*(G.TW+G.GX),cy=y+ti*(G.TH+G.GY);
      cards[id]={id,x,y:cy,cx:x+G.TW/2,cy:cy+G.TH/2,left:x,right:x+G.TW,top:cy,bottom:cy+G.TH,lane:li,row:ti,col:ci,laneTop:y,laneBottom:y+h};
    }));
    y+=h+G.LANEGAP;
  });
  const contentBottom=y-G.LANEGAP;
  let maxRight=0;Object.values(cards).forEach(c=>{maxRight=Math.max(maxRight,c.right)});
  const sideX=maxRight+56;
  const gap={},paths=[],labels=[],bx=[maxRight],by=[];
  const seg=(arr,x,yy)=>{arr.push([x,yy]);bx.push(x);by.push(yy);};
  const segHitsBox=(x1,y1,x2,y2,skip1,skip2)=>Object.values(cards).some(c=>{
    if(c===skip1||c===skip2)return false;
    const minx=Math.min(x1,x2),maxx=Math.max(x1,x2);
    return Math.abs(y1-y2)<0.5
      ? (y1>c.top+3&&y1<c.bottom-3&&minx<c.right-3&&maxx>c.x+3)
      : (x1>c.x+3&&x1<c.right-3&&Math.min(y1,y2)<c.bottom-3&&Math.max(y1,y2)>c.top+3);
  });
  flow.links.forEach(link=>{
    const A=cards[link.from],B=cards[link.to];if(!A||!B)return;
    const k=link.kind,P=[];
    const s=(x,yy)=>seg(P,x,yy);
    if(k==='h'){
      if(segHitsBox(A.right,A.cy,B.left,A.cy,A,B)){const ym=A.laneBottom+22;s(A.cx,A.bottom);s(A.cx,ym);s(B.cx,ym);s(B.cx,B.bottom);labels.push({x:(A.cx+B.cx)/2,y:ym-7,text:link.label,anchor:'middle'});}
      else{s(A.right,A.cy);s(B.left,B.cy);labels.push({x:(A.right+B.left)/2,y:A.cy-9,text:link.label,anchor:'middle'});}
    }
    else if(k==='hr'){
      if(segHitsBox(A.left,A.cy+14,B.right,A.cy+14,A,B)){const ym=A.laneBottom+34;s(A.cx,A.bottom);s(A.cx,ym);s(B.cx,ym);s(B.cx,B.bottom);labels.push({x:(A.cx+B.cx)/2,y:ym+15,text:link.label,anchor:'middle'});}
      else{s(A.left,A.cy+6);s(B.right,A.cy+6);labels.push({x:(A.left+B.right)/2,y:A.cy+20,text:link.label,anchor:'middle'});}
    }
    else if(k==='v'){const x=A.cx+(link.off||0);s(x,A.bottom);s(x,B.top);labels.push({x:x+7,y:(A.bottom+B.top)/2,text:link.label,anchor:'start'});}
    else if(k==='ct'){
      const aDown=B.row>A.row,upper=aDown?A:B,lower=aDown?B:A;
      const key='t'+A.lane+'_'+Math.min(A.row,B.row)+'_'+Math.min(A.col,B.col);
      gap[key]=(gap[key]||0)+1;
      const chY=(upper.bottom+lower.top)/2+(gap[key]-1)*12;
      if(aDown){s(A.cx,A.bottom);s(A.cx,chY);s(B.cx,chY);s(B.cx,B.top);}
      else{s(A.cx,A.top);s(A.cx,chY);s(B.cx,chY);s(B.cx,B.bottom);}
      labels.push({x:(A.cx+B.cx)/2,y:chY-7,text:link.label,anchor:'middle'});
    }
    else if(k==='cross'){
      const aDown=B.lane>A.lane,upper=aDown?A:B,lower=aDown?B:A;
      const key='l'+Math.min(A.lane,B.lane)+'_'+Math.min(A.cx,B.cx);
      gap[key]=(gap[key]||0)+1;
      const chY=(upper.laneBottom+lower.laneTop)/2+(gap[key]-1)*20;
      if(aDown){s(A.cx,A.bottom);s(A.cx,chY);s(B.cx,chY);s(B.cx,B.top);}
      else{s(A.cx,A.top);s(A.cx,chY);s(B.cx,chY);s(B.cx,B.bottom);}
      labels.push({x:(A.cx+B.cx)/2,y:chY-7,text:link.label,anchor:'middle'});
    }
    else if(k==='side'){
      const yA=A.laneBottom+22,yB=B.laneTop-22;
      s(A.cx,A.bottom);s(A.cx,yA);s(sideX,yA);s(sideX,yB);s(B.cx,yB);s(B.cx,B.top);
      labels.push({x:sideX+8,y:(yA+yB)/2,text:link.label,anchor:'start'});
    }
    else if(k==='corridor'){
      const corrY=contentBottom+PWA_DG.CORRIDORPITCH*((link.corridor||0)+1);
      const xA=A.right+55,xB=B.left-55;
      s(A.cx,A.bottom);s(A.cx,A.bottom+16);s(xA,A.bottom+16);s(xA,corrY);s(xB,corrY);s(xB,B.cy);s(B.left,B.cy);
      labels.push({x:(xA+xB)/2,y:corrY+15,text:link.label,anchor:'middle'});
    }
    if(P.length)paths.push({d:P.map((p,i)=>(i?'L':'M')+Math.round(p[0])+','+Math.round(p[1])).join(' ')});
  });
  labels.forEach(l=>{const w=pwaLabelW(l.text);const x0=l.anchor==='middle'?l.x-w/2:l.anchor==='start'?l.x-6:l.x-w+6;bx.push(x0,x0+w);by.push(l.y-13,l.y+3);});
  const width=Math.ceil(Math.max(...bx,PWA_DG.LX+PWA_DG.TW))+PWA_DG.PAD;
  const height=Math.ceil(Math.max(...by,contentBottom))+PWA_DG.PAD;
  Object.values(cards).forEach(c=>{c.lines=pwaWrap(PWA_SCREENS[c.id].title);c.badge=PWA_SHARED.includes(c.id)?'COMÚN':'';});
  return {cards,lanes,paths,labels,viewBox:`0 0 ${width} ${height}`,width,height};
}
function pwaThumb(c){
  const current=pwaState.screen===c.id,code=PWA_CODES[c.id],x=c.x,y=c.y,lines=c.lines,badge=c.badge;
  const title=lines.map((line,i)=>`<text x="${x+8}" y="${y+32+i*14}" font-family="Space Grotesk, Arial, sans-serif" font-size="12" font-weight="700" fill="#111">${pwaEsc(line)}</text>`).join('');
  const bars=[104,78,92].map((w,i)=>`<rect x="${x+8}" y="${y+56+i*7}" width="${w}" height="3" rx="1.5" fill="#dcdcdc"/>`).join('');
  const tag=badge?`<rect x="${x+58}" y="${y+5}" width="56" height="14" rx="7" fill="#f3f3f3" stroke="#ddd" stroke-width="1"/><text x="${x+86}" y="${y+15}" text-anchor="middle" font-family="Space Mono, monospace" font-size="7" font-weight="700" fill="#666">${badge}</text>`:'';
  return `<g class="pwa-thumb${current?' current':''}" data-pwa-go="${c.id}" role="button" tabindex="0" aria-label="${pwaEsc(`${code} · ${PWA_SCREENS[c.id].title}`)}"><rect class="pwa-thumb-box" x="${x}" y="${y}" width="120" height="96" rx="6" fill="${current?'#f5fff7':'#fff'}" stroke="${current?'#16a34a':'#ccc'}" stroke-width="${current?2:1}"/><text x="${x+8}" y="${y+15}" font-family="Space Mono, monospace" font-size="10" font-weight="700" fill="#666">${code}</text>${tag}${title}${bars}<rect x="${x+8}" y="${y+80}" width="48" height="8" rx="2" fill="${current?'#16a34a':'#d0d0d0'}"/></g>`;
}
function pwaLaneLabel(lane,width){
  const x=18,c=lane.center;
  return `<line x1="16" y1="${Math.round(lane.top-22)}" x2="${width-16}" y2="${Math.round(lane.top-22)}" stroke="#ececec" stroke-width="1"/><rect x="${x}" y="${c-11}" width="4" height="22" rx="2" fill="#16a34a"/><text x="${x+12}" y="${c+4}" font-family="Space Mono, monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#666">${pwaEsc(lane.label)}</text>`;
}
function pwaPaths(g){
  const paths=g.paths.map(p=>`<path d="${p.d}" fill="none" stroke="#555" stroke-width="1.5" marker-end="url(#${g.marker})"/>`).join('');
  const texts=g.labels.map(l=>{const w=pwaLabelW(l.text);const x0=l.anchor==='middle'?l.x-w/2:l.anchor==='start'?l.x-6:l.x-w+6;return `<g><rect x="${Math.round(x0)}" y="${l.y-13}" width="${Math.round(w)}" height="17" rx="4" fill="#fff"/><text x="${l.x}" y="${l.y}" text-anchor="${l.anchor}" font-family="Space Mono, monospace" font-size="${PWA_DG.LABEL_FS}" fill="#444">${pwaEsc(l.text)}</text></g>`;}).join('');
  return paths+texts;
}
function pwaMapCard(flow){
  const g=pwaLayout(flow);g.marker=flow.marker;
  const note=flow.note?`<p class="pwa-role-note">${pwaEsc(flow.note)}</p>`:'';
  const lanes=g.lanes.map(l=>pwaLaneLabel(l,g.width)).join('');
  const thumbs=Object.values(g.cards).map(pwaThumb).join('');
  return `<section class="pwa-map-card"><h3 class="pwa-map-role">${pwaEsc(flow.title)}</h3>${note}<svg class="pwa-map-svg" xmlns="${PWA_NS}" viewBox="${g.viewBox}" role="img" aria-label="${pwaEsc(`Mapa de navegación · ${flow.title}`)}"><defs><marker id="${flow.marker}" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#555"/></marker></defs>${lanes}${thumbs}${pwaPaths(g)}</svg></section>`;
}
function pwaBuildMap() {
  document.querySelector('#pwaMapCanvas').innerHTML=pwaMapCard(PWA_MAP.shared)+pwaMapCard(PWA_MAP.student)+pwaMapCard(PWA_MAP.admin);
}
function pwaSetView(view) {
  const isPwa = view === 'pwa';
  const isPencil = view === 'pencil';
  document.body.classList.toggle('pwa-mode', isPwa);
  document.querySelectorAll('.pwa-view-tab').forEach(b => b.classList.toggle('active', b.dataset.view === view));
  const mobileView = document.querySelector('#mobileView');
  const pwaView = document.querySelector('#pwaView');
  const pencilView = document.querySelector('#pencilView');
  if (mobileView) mobileView.hidden = isPwa || isPencil;
  if (pwaView) pwaView.hidden = !isPwa;
  if (pencilView) pencilView.hidden = !isPencil;
  document.querySelectorAll('[data-view-for="mobile"]').forEach(el => { el.hidden = isPwa || isPencil; });
  document.querySelectorAll('[data-view-for="pwa"]').forEach(el => { el.hidden = !isPwa; });
  if (isPwa) {
    const diagram = document.querySelector('#diagramView');
    if (diagram) diagram.hidden = true;
    const pwaMap = document.querySelector('#pwaMapView');
    if (pwaMap) pwaMap.hidden = true;
    pwaRender();
  } else if (isPencil) {
    const diagram = document.querySelector('#diagramView');
    if (diagram) diagram.hidden = true;
    const pwaMap = document.querySelector('#pwaMapView');
    if (pwaMap) pwaMap.hidden = true;
  } else {
    const pwaMap = document.querySelector('#pwaMapView');
    if (pwaMap) pwaMap.hidden = true;
  }
}

window.SicpesWireframePwa = {
  showScreen: function (id, role) {
    if (!PWA_SCREENS[id]) return;
    if (role === 'student' || role === 'admin') pwaState.role = role;
    else if (PWA_SCREENS[id].role === 'student' || PWA_SCREENS[id].role === 'admin') pwaState.role = PWA_SCREENS[id].role;
    pwaState.screen = id;
    pwaState.history = [];
    pwaRender();
  },
  getScreen: function () { return pwaState.screen; },
  getRole: function () { return pwaState.role; }
};

/* Un solo controlador delega los clics de las pantallas dinámicas. */
document.addEventListener('click', e => {
  const target = e.target.closest('button,a,article,.pwa-feature,.pwa-notice,.pwa-file-drop,.pwa-thumb');
  if (!target) return;
  if (target.dataset.view) { pwaSetView(target.dataset.view); return; }
  if (target.hasAttribute('data-pwa-close-map')) { pwaCloseMap(); return; }
  if (target.dataset.pwaRole) { pwaSetRole(target.dataset.pwaRole); return; }
  if (target.dataset.pwaGo) { if (!document.querySelector('#pwaMapView').hidden) pwaCloseMap(); pwaGo(target.dataset.pwaGo); return; }
  if (target.dataset.pwaAction === 'back') { pwaBack(); return; }
  if (target.dataset.pwaType) { pwaState.type = target.dataset.pwaType; pwaRender(); return; }
  if (target.dataset.pwaRate) { pwaState.rating = Number(target.dataset.pwaRate); pwaScreenEl.querySelectorAll('.pwa-rating-cell').forEach(c => c.classList.toggle('selected', Number(c.dataset.pwaRate) === pwaState.rating)); const rv = pwaScreenEl.querySelector('#pwaRateValue'); if (rv) rv.textContent = `Seleccionaste: ${pwaState.rating} · ${PWA_RATING_LABELS[pwaState.rating]}`; const sb = pwaScreenEl.querySelector('[data-pwa-action="send-rating"]'); if (sb) sb.disabled = false; return; }
  if (target.dataset.pwaFilter) { const key = target.dataset.pwaFilterKey; if (key === 'reservation') pwaState.filter = target.dataset.pwaFilter; else if (key === 'debt') pwaState.debtFilter = target.dataset.pwaFilter; else pwaState.paymentFilter = target.dataset.pwaFilter; pwaRender(); return; }
  if (target.dataset.pwaAction === 'student-login') { pwaState.role = 'student'; pwaGo('loading'); return; }
  if (target.dataset.pwaAction === 'admin-login') { pwaState.role = 'admin'; pwaGo('loading'); return; }
  if (target.dataset.pwaAction === 'register') { const checked = pwaScreenEl.querySelector('input[type=checkbox]')?.checked; if (!checked) { pwaToast('Acepta los términos para continuar.'); return; } pwaState.role = 'student'; pwaGo('verifyEmail'); return; }
  if (target.dataset.pwaAction === 'reserve') { pwaToast('¡Reservación confirmada!'); setTimeout(() => pwaGo('requestStatus'), 700); return; }
  if (target.dataset.pwaAction === 'verify-email') { pwaToast('Código verificado.'); setTimeout(() => pwaGo('home'), 600); return; }
  if (target.dataset.pwaAction === 'resend-code') { pwaToast('Código reenviado a tu correo.'); return; }
  if (target.dataset.pwaAction === 'forgot-send') { pwaToast('Enlace de recuperación enviado.'); pwaGo(pwaState.role === 'admin' ? 'adminLogin' : 'studentLogin'); return; }
  if (target.dataset.pwaAction === 'unlock-code') { pwaToast('Código verificado. Cuenta desbloqueada.'); pwaGo('loading'); return; }
  if (target.dataset.pwaAction === 'room-request') { pwaToast('Solicitud enviada.'); setTimeout(() => pwaGo('requestStatus'), 600); return; }
  if (target.dataset.pwaAction === 'send-rating') { pwaGo('rateConfirm'); return; }
  if (target.dataset.pwaAction === 'assign-room') { pwaToast('Habitación asignada.'); return; }
  if (target.dataset.pwaAction === 'reject-room') { pwaToast('Solicitud rechazada.'); return; }
  if (target.dataset.pwaAction === 'approve-payment') { pwaToast('Pago aprobado.'); return; }
  if (target.dataset.pwaAction === 'reject-payment') { pwaToast('Pago rechazado.'); return; }
  if (target.dataset.pwaAction === 'send-reminder') { pwaToast('Recordatorio enviado.'); return; }
  if (target.dataset.pwaAction === 'request-payment') { pwaToast('Solicitud de pago enviada.'); return; }
  if (target.dataset.pwaAction === 'logout') { pwaState.history = []; pwaSetRole('student'); pwaGo('studentLogin', { replace: true }); return; }
  if (target.dataset.pwaAction === 'social') { pwaToast(`Continuar con ${target.textContent} (demo)`); return; }
  if (target.dataset.pwaAction === 'add-floor') { const fields = pwaScreenEl.querySelectorAll('.pwa-card input'); const name = fields[0]?.value.trim(); const rooms = pwaScreenEl.querySelector('#pwaRoomInput')?.value.split(',').map(x => x.trim()).filter(Boolean) || []; if (!name || !rooms.length) { pwaToast('Agrega el nombre del piso y al menos una habitación.'); return; } PWA_MOCK.floors.unshift({ name, rooms }); pwaToast('Piso agregado.'); pwaRender(); return; }
  if (target.dataset.pwaRemoveFloor !== undefined) { PWA_MOCK.floors.splice(Number(target.dataset.pwaRemoveFloor), 1); pwaToast('Piso eliminado.'); pwaRender(); return; }
  if (target.dataset.pwaAction === 'save-settings') { const inputs = pwaScreenEl.querySelectorAll('input[type=number]'); PWA_MOCK.prices.Individual = Number(inputs[0].value) || PWA_MOCK.prices.Individual; PWA_MOCK.prices.Compartida = Number(inputs[1].value) || PWA_MOCK.prices.Compartida; pwaToast('Cambios guardados.'); return; }
});
document.addEventListener('change', e => { if ((e.target.id === 'pwaReceiptFile' || e.target.id === 'pwaPaymentDetailFile') && e.target.files.length) pwaToast(`Archivo listo: ${e.target.files[0].name}`); });
document.querySelector('#pwaBack').addEventListener('click', pwaBack);
document.querySelector('#pwaMap').addEventListener('click', pwaOpenMap);
document.querySelector('#pwaZones').addEventListener('click', () => { pwaState.zones = !pwaState.zones; document.body.classList.toggle('pwa-zones-on', pwaState.zones); document.querySelector('#pwaZones').textContent = pwaState.zones ? 'Ocultar zonas clicables' : 'Mostrar zonas clicables'; });
window.addEventListener('keydown', e => { if (e.key === 'Escape') pwaCloseMap(); });
window.addEventListener('resize', () => {});

pwaRender();
