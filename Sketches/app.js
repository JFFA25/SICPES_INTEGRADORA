/* Datos editables del prototipo: nombres, montos y registros de ejemplo. */
const MOCK = {
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
/* Etiquetas de la escala de satisfacción (HU-SIC-05). */
const RATING_LABELS = { 1: 'Muy insatisfecho', 2: 'Insatisfecho', 3: 'Neutral', 4: 'Satisfecho', 5: 'Muy satisfecho' };

/* Definición de pantallas, roles y etiquetas del mapa. */
const SCREENS = {
  landing: { role: 'student', title: 'Landing', label: 'LANDING' },
  studentLogin: { role: 'student', title: 'Iniciar sesión', label: 'INICIAR SESIÓN' },
  forgotPassword: { role: 'student', title: 'Recuperar contraseña', label: 'RECUPERAR CONTRASEÑA' },
  register: { role: 'student', title: 'Crear cuenta', label: 'CREAR CUENTA' },
  verifyEmail: { role: 'student', title: 'Verificar correo', label: 'VERIFICAR CORREO' },
  loading: { role: 'shared', title: 'Sincronizando', label: 'CARGA' },
  home: { role: 'student', title: 'Inicio', label: 'INICIO' },
  reserve: { role: 'student', title: 'Reservar habitación', label: 'RESERVAR HABITACIÓN' },
  roomDetail: { role: 'student', title: 'Detalle de habitación', label: 'DETALLE DE HABITACIÓN' },
  requestStatus: { role: 'student', title: 'Estado de mi petición', label: 'ESTADO DE MI PETICIÓN' },
  payments: { role: 'student', title: 'Gestión de Pagos', label: 'GESTIÓN DE PAGOS' },
  paymentDetail: { role: 'student', title: 'Detalle de pago', label: 'DETALLE DE PAGO' },
  rateService: { role: 'student', title: 'Evaluar el servicio', label: 'EVALUAR EL SERVICIO' },
  rateConfirm: { role: 'student', title: 'Evaluación enviada', label: 'EVALUACIÓN ENVIADA' },
  profile: { role: 'student', title: 'Cuenta / Perfil', label: 'CUENTA / PERFIL' },
  adminLogin: { role: 'admin', title: 'Acceso administrador', label: 'LOGIN ADMIN' },
  reservations: { role: 'admin', title: 'Reservaciones', label: 'RESERVACIONES' },
  assignRoom: { role: 'admin', title: 'Asignar habitación', label: 'ASIGNAR HABITACIÓN' },
  pendingPayments: { role: 'admin', title: 'Pagos pendientes', label: 'PAGOS PENDIENTES' },
  validatePayment: { role: 'admin', title: 'Validar pago', label: 'VALIDAR PAGO' },
  debts: { role: 'admin', title: 'Adeudos', label: 'ADEUDOS' },
  floors: { role: 'admin', title: 'Pisos', label: 'PISOS' },
  settings: { role: 'admin', title: 'Configuración global', label: 'CONFIGURACIÓN' }
};
/* 15 pantallas de estudiante; la carga compartida (E6) se dibuja una sola vez en esta fila. */
const studentFlow = ['landing', 'studentLogin', 'forgotPassword', 'register', 'verifyEmail', 'loading', 'home', 'reserve', 'roomDetail', 'requestStatus', 'payments', 'paymentDetail', 'rateService', 'rateConfirm', 'profile'];
const adminFlow = ['adminLogin', 'reservations', 'assignRoom', 'pendingPayments', 'validatePayment', 'debts', 'floors', 'settings'];
/* Códigos para identificar rápidamente cada pantalla en la lista y el diagrama. */
const SCREEN_CODES = { landing:'E1', studentLogin:'E2', forgotPassword:'E3', register:'E4', verifyEmail:'E5', loading:'E6', home:'E7', reserve:'E8', roomDetail:'E9', requestStatus:'E10', payments:'E11', paymentDetail:'E12', rateService:'E13', rateConfirm:'E14', profile:'E15', adminLogin:'A1', reservations:'A2', assignRoom:'A3', pendingPayments:'A4', validatePayment:'A5', debts:'A6', floors:'A7', settings:'A8' };
const STUDENT_SCREENS = studentFlow;
const ADMIN_SCREENS = ['adminLogin','reservations','assignRoom','pendingPayments','validatePayment','debts','floors','settings'];
const ROOT_SCREENS = new Set(['home','reserve','payments','profile','reservations','pendingPayments','floors','settings']);
/* Rutas visibles para el panel lateral: destino y acción que lleva a él. */
const SCREEN_ACTIONS = {
  landing:[['studentLogin','Iniciar sesión'],['roomDetail','Explorar habitaciones']],
  studentLogin:[['loading','Entrar'],['forgotPassword','¿Olvidaste tu contraseña?'],['register','¿No tienes cuenta? Regístrate']],
  forgotPassword:[['studentLogin','Enviar enlace de recuperación']],
  register:[['verifyEmail','Registrarse'],['studentLogin','¿Ya tienes cuenta? Iniciar sesión']],
  verifyEmail:[['loading','Verificar código'],['register','Reenviar código']],
  loading:[['home','Terminar carga (estudiante)'],['reservations','Terminar carga (administrador)']],
  home:[['reserve','Tarjeta Reservar habitación'],['requestStatus','Tarjeta Estado de mi petición'],['payments','Tarjeta Próximo pago'],['roomDetail','Habitación destacada'],['rateService','Evaluar el servicio'],['profile','Cuenta en la barra inferior']],
  reserve:[['roomDetail','Ver detalle de habitación'],['requestStatus','Reservar · Confirmar'],['home','Inicio en la barra inferior'],['payments','Pagos en la barra inferior'],['profile','Cuenta en la barra inferior']],
  roomDetail:[['reserve','Solicitar esta habitación']],
  requestStatus:[['home','Volver al inicio']],
  payments:[['paymentDetail','Historial de pagos'],['home','Inicio en la barra inferior'],['reserve','Peticiones en la barra inferior'],['profile','Cuenta en la barra inferior']],
  paymentDetail:[['payments','Volver a pagos']],
  rateService:[['rateConfirm','Enviar evaluación'],['home','Inicio en la barra inferior'],['profile','Ir a Cuenta / Perfil']],
  rateConfirm:[['home','Volver a Inicio']],
  profile:[['studentLogin','Cerrar sesión'],['rateService','Evaluar el servicio'],['home','Inicio en la barra inferior'],['reserve','Peticiones en la barra inferior'],['payments','Pagos en la barra inferior']],
  adminLogin:[['loading','Entrar']],
  reservations:[['assignRoom','Seleccionar solicitud'],['pendingPayments','Pagos en la barra inferior'],['floors','Pisos en la barra inferior'],['settings','Configuración en la barra inferior']],
  assignRoom:[['reservations','Asignar / Rechazar']],
  pendingPayments:[['validatePayment','Seleccionar pago'],['debts','Ver adeudos'],['reservations','Reservaciones en la barra inferior'],['floors','Pisos en la barra inferior'],['settings','Configuración en la barra inferior']],
  validatePayment:[['pendingPayments','Aprobar / Rechazar']],
  debts:[['pendingPayments','Volver a pagos pendientes']],
  floors:[['reservations','Reservaciones en la barra inferior'],['pendingPayments','Pagos en la barra inferior'],['settings','Configuración en la barra inferior']],
  settings:[['reservations','Reservaciones en la barra inferior'],['pendingPayments','Pagos en la barra inferior'],['floors','Pisos en la barra inferior']]
};
const state = { screen: 'landing', role: 'student', history: [], type: 'Individual', filter: 'Todas', paymentFilter: 'Todos', debtFilter: 'Todos', rating: 0, zones: false, loadingTimer: null, toastTimer: null };
const phone = document.querySelector('#phoneScreen');
const toastEl = document.querySelector('#toast');

function money(value) { return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value); }
function esc(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function toast(message) { toastEl.textContent = message; toastEl.classList.add('show'); clearTimeout(state.toastTimer); state.toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400); }
function go(screen, options = {}) {
  if (!SCREENS[screen]) return;
  if (state.screen !== screen && !options.replace) state.history.push(state.screen);
  state.screen = screen;
  const role = SCREENS[screen].role;
  if (role === 'student' || role === 'admin') state.role = role;
  render();
}
function back() { const previous = state.history.pop(); if (previous) { state.screen = previous; render(); } else toast('No hay una pantalla anterior.'); }
function setRole(role) { state.role = role; state.history = []; go(role === 'student' ? 'landing' : 'adminLogin', { replace: true }); }
function header(backControl = !ROOT_SCREENS.has(state.screen)) { return `<header class="app-header"><span class="app-logo"><img class="app-logo-img" src="../images/SICPES_Producto.png" alt=""> SICPES <span>/ RESIDENCIAL</span></span>${backControl ? '<button class="back-link clickable" data-action="back">← ATRÁS</button>' : '<span class="mono-label">DEMO</span>'}</header>`; }
function field(label, placeholder, type='text', value='') { return `<label class="field"><span>${label}</span><input type="${type}" placeholder="${placeholder}" value="${esc(value)}"></label>`; }
function nav(role, active) {
  const items = role === 'student' ? [['home','⌂','Inicio'],['reserve','＋','Peticiones'],['payments','$','Pagos'],['profile','◎','Cuenta']] : [['reservations','▤','Reservaciones'],['pendingPayments','$','Pagos'],['floors','▥','Pisos'],['settings','⚙','Configuración']];
  return `<nav class="bottom-nav" aria-label="Navegación inferior">${items.map(([id,icon,label]) => `<button class="nav-item clickable ${active===id?'active':''}" data-go="${id}"><span class="nav-icon">${icon}</span>${label}</button>`).join('')}</nav>`;
}
function appShell(content, role, active) { return `<div class="app-scroll">${content}</div>${nav(role,active)}`; }
function screenLanding() { return `<div class="app-scroll">${header(false)}<span class="mono-label">VIVIENDA UNIVERSITARIA · 2025</span><h1 class="screen-title">Encuentra tu espacio ideal para vivir y estudiar</h1><p class="screen-subtitle">Una residencia segura, cómoda y cerca de tu campus.</p><div class="image-placeholder tall">[ IMAGEN ]</div><button class="button primary clickable" data-go="reserve">Explorar habitaciones →</button><button class="button secondary clickable" data-go="studentLogin">Iniciar sesión</button><div class="feature-grid"><article class="feature clickable" data-go="studentLogin"><strong>Residencias verificadas</strong><small>ESPACIOS SEGUROS</small></article><article class="feature clickable" data-go="studentLogin"><strong>Gestión centralizada</strong><small>TODO EN UN LUGAR</small></article></div></div>`; }
function screenStudentLogin() { return `<div class="app-scroll">${header()}<span class="mono-label">PORTAL DEL RESIDENTE</span><h1 class="screen-title">Qué gusto verte<br>de nuevo.</h1><p class="screen-subtitle">Ingresa a tu cuenta para continuar.</p>${field('CORREO ELECTRÓNICO','nombre@correo.com','email')}${field('CONTRASEÑA','••••••••','password')}<button class="button primary clickable" data-action="student-login">Entrar</button><div class="divider">O CONTINÚA CON</div><div class="social-row"><button data-action="social">Google</button><button data-action="social">Facebook</button><button data-action="social">LinkedIn</button></div><p class="inline-link"><button class="clickable" data-go="forgotPassword">¿Olvidaste tu contraseña?</button></p><p class="inline-link">¿No tienes cuenta? <button class="clickable" data-go="register">Regístrate</button></p></div>`; }
function screenRegister() { return `<div class="app-scroll">${header()}<span class="mono-label">NUEVO RESIDENTE</span><h1 class="screen-title">Crear cuenta</h1><p class="screen-subtitle">Registra tus datos para comenzar.</p>${field('NOMBRE COMPLETO','Nombre y apellidos')}${field('CORREO ELECTRÓNICO','nombre@correo.com','email')}${field('CONTRASEÑA','Mínimo 8 caracteres','password')}${field('CONFIRMAR CONTRASEÑA','Repite tu contraseña','password')}<label class="checkline"><input type="checkbox"> Acepto los términos y condiciones y el aviso de privacidad.</label><button class="button primary clickable" data-action="register">Registrarse</button><p class="inline-link">¿Ya tienes cuenta? <button class="clickable" data-go="studentLogin">Iniciar sesión</button></p></div>`; }
function screenLoading() { return `<div class="app-scroll">${header(false)}<div style="height:115px"></div><img class="app-loading-logo" src="../images/SICPES_Producto.png" alt="SICPES"><h1 class="screen-title" style="text-align:center">Preparando tu espacio</h1><p class="screen-subtitle" style="text-align:center">Sincronizando registros residenciales…</p><div class="progress-track"><div class="progress-fill" id="progressFill"></div></div><div class="progress-caption"><span id="progressText">Conectando con SICPES</span><span id="progressPercent">0%</span></div></div>`; }
function screenHome() { return appShell(`${header(false)}<span class="mono-label">PANEL DEL RESIDENTE</span><h1 class="screen-title">Bienvenido,<br>${esc(MOCK.student.name)}</h1><p class="screen-subtitle">Aquí tienes el resumen de tu residencia.</p><h2 class="section-title">Tu reservación</h2><article class="card clickable" data-go="requestStatus"><div class="card-head"><span class="card-title">Residencia SICPES</span><span class="status">EN REVISIÓN</span></div><div class="data-grid"><div class="data-cell"><small>Piso</small><strong>${esc(MOCK.student.floor)}</strong></div><div class="data-cell"><small>Tipo</small><strong>${esc(MOCK.student.type)}</strong></div><div class="data-cell"><small>Habitación</small><strong>${esc(MOCK.student.room)}</strong></div><div class="data-cell"><small>Ingreso</small><strong>01/09/2025</strong></div></div></article><h2 class="section-title">Próximo pago</h2><article class="card clickable" data-go="payments"><div class="card-head"><span class="card-title">${money(900)}</span><span class="status">PENDIENTE</span></div><p class="muted">Vence el ${esc(MOCK.student.due)} · Cuota de mantenimiento</p></article><h2 class="section-title">Habitación destacada</h2><article class="card clickable" data-go="roomDetail"><div class="card-head"><span class="card-title">Habitación ${esc(MOCK.rooms[0].id)}</span><span class="status">DISPONIBLE</span></div><div class="data-grid"><div class="data-cell"><small>Tipo</small><strong>${esc(MOCK.rooms[0].type)}</strong></div><div class="data-cell"><small>Precio</small><strong>${money(MOCK.rooms[0].amount)}</strong></div></div></article><button class="button clickable" data-go="reserve">Reservar habitación</button><h2 class="section-title">Avisos</h2>${MOCK.student.notices.map(n=>`<div class="notice clickable" data-go="payments">${esc(n)}</div>`).join('')}<button class="button clickable" data-go="rateService">Evaluar el servicio</button>`, 'student','home'); }
function screenReserve() { const type=state.type, amount=MOCK.prices[type]; return appShell(`${header()}<span class="mono-label">REGISTRO DE ESTUDIANTES</span><h1 class="screen-title">Reserva tu habitación</h1><p class="screen-subtitle">Elige el espacio que mejor se adapte a ti.</p>${field('FECHA DE INGRESO','','date','2025-12-01')}<div class="field"><span>TIPO DE HABITACIÓN</span><div class="choice-row"><button class="choice ${type==='Individual'?'selected':''}" data-type="Individual">Individual</button><button class="choice ${type==='Compartida'?'selected':''}" data-type="Compartida">Compartida</button></div></div><label class="field"><span>PISO</span><select><option>Segundo piso</option><option>Primer piso</option><option>Planta baja</option></select></label><label class="field"><span>HABITACIÓN</span><select><option>204 · Disponible</option><option>202 · Disponible</option><option>201 · Disponible</option></select></label><button class="button clickable" data-go="roomDetail" style="margin-bottom:12px">Ver detalle de la habitación</button><div class="price-box"><span class="mono-label">MONTO MENSUAL</span><strong id="reserveAmount">${money(amount)}</strong></div><button class="button primary clickable" data-action="reserve">Reservar</button>`, 'student','reserve'); }
function screenPayments() { return appShell(`${header()}<span class="mono-label">ESTADO DE CUENTA</span><h1 class="screen-title">Gestión de Pagos</h1><p class="screen-subtitle">Consulta tus cuotas y comprobantes.</p><h2 class="section-title">Tu próximo pago</h2><article class="card"><div class="card-head"><span class="card-title">${money(900)}</span><span class="status">PENDIENTE</span></div><div class="data-grid"><div class="data-cell"><small>Concepto</small><strong>Mantenimiento</strong></div><div class="data-cell"><small>Vencimiento</small><strong>01/12/2025</strong></div></div><button class="button primary clickable" style="margin-top:14px" data-action="request-payment">Solicitar pago</button></article><h2 class="section-title">Cargar comprobante</h2><label class="file-drop clickable">＋ &nbsp; Selecciona un archivo<input id="receiptFile" type="file" accept="image/*,.pdf"></label><h2 class="section-title">Historial de pagos</h2><article class="card admin-card clickable" data-go="paymentDetail"><div class="card-head"><span class="card-title">${money(2500)}</span><span class="status">EN REVISIÓN</span></div><p class="muted">Noviembre 2025 · 01/11/2025 · Toca para ver el detalle</p></article>`, 'student','payments'); }
function screenProfile() { return appShell(`${header()}<span class="mono-label">MI CUENTA</span><h1 class="screen-title">Cuenta / Perfil</h1><div class="image-placeholder" style="height:100px;width:100px;border-radius:50%;margin:20px auto">[ FOTO ]</div><article class="card"><div class="data-cell"><small>Nombre completo</small><strong>${esc(MOCK.student.name)}</strong></div><hr style="border:0;border-top:1px solid #eee;margin:12px 0"><div class="data-cell"><small>Correo</small><strong>${esc(MOCK.student.email)}</strong></div><hr style="border:0;border-top:1px solid #eee;margin:12px 0"><div class="data-grid"><div class="data-cell"><small>Rol</small><strong>Estudiante</strong></div><div class="data-cell"><small>Habitación</small><strong>204</strong></div></div></article><button class="button clickable" data-go="rateService">Evaluar el servicio</button><button class="button clickable" data-action="logout">Cerrar sesión</button>`, 'student','profile'); }
function screenVerifyEmail() { return `<div class="app-scroll">${header()}<span class="mono-label">CONFIRMA TU CUENTA</span><h1 class="screen-title">Verifica tu correo</h1><p class="screen-subtitle">Enviamos un código de 6 dígitos a <strong>${esc(MOCK.student.email)}</strong>. Ingrésalo para activar tu cuenta.</p><div class="code-row" role="group" aria-label="Código de verificación de 6 dígitos">${Array.from({length:6}).map((_,i)=>`<input type="text" inputmode="numeric" maxlength="1" aria-label="Dígito ${i+1}" value="${['2','0','4'][i]||''}">`).join('')}</div><button class="button primary clickable" data-action="verify-email">Verificar código</button><p class="inline-link">¿No recibiste el código? <button class="clickable" data-action="resend-code">Reenviar código</button></p></div>`; }
function screenForgotPassword() { return `<div class="app-scroll">${header()}<span class="mono-label">RECUPERAR ACCESO</span><h1 class="screen-title">Recuperar contraseña</h1><p class="screen-subtitle">Escribe tu correo y te enviaremos un enlace para restablecer tu contraseña.</p>${field('CORREO ELECTRÓNICO','nombre@correo.com','email')}<button class="button primary clickable" data-action="forgot-send">Enviar enlace</button><p class="inline-link">¿Recordaste tu contraseña? <button class="clickable" data-go="studentLogin">Iniciar sesión</button></p></div>`; }
function screenRoomDetail() { const room = MOCK.rooms[0]; return appShell(`${header()}<span class="mono-label">HABITACIÓN DISPONIBLE</span><h1 class="screen-title">Habitación ${esc(room.id)}</h1><p class="screen-subtitle">${esc(room.type)} · ${esc(room.floor)}</p><div class="image-placeholder tall">[ FOTO DE LA HABITACIÓN ]</div><article class="card"><div class="data-grid"><div class="data-cell"><small>Tipo</small><strong>${esc(room.type)}</strong></div><div class="data-cell"><small>Piso</small><strong>${esc(room.floor)}</strong></div><div class="data-cell"><small>Precio mensual</small><strong>${money(room.amount)}</strong></div><div class="data-cell"><small>Disponibilidad</small><strong>${room.available?'Disponible':'Ocupada'}</strong></div></div></article><h2 class="section-title">Servicios incluidos</h2><ul class="service-list">${room.services.map(s=>`<li>${esc(s)}</li>`).join('')}</ul><button class="button primary clickable" data-action="room-request">Solicitar esta habitación</button>`, 'student','reserve'); }
function screenRequestStatus() { return appShell(`${header()}<span class="mono-label">SEGUIMIENTO DE RESERVA</span><h1 class="screen-title">Estado de mi petición</h1><p class="screen-subtitle">${esc(MOCK.student.type)} · Habitación ${esc(MOCK.student.room)}</p><div class="timeline"><div class="timeline-item done"><span class="dot"></span><strong>Pendiente</strong><small>Solicitud enviada · 28/11/2025</small></div><div class="timeline-item current"><span class="dot"></span><strong>En revisión</strong><small>El administrador está validando tu solicitud.</small></div><div class="timeline-item"><span class="dot"></span><strong>Aceptada / Rechazada</strong><small>Pendiente de resolución.</small></div></div><article class="card"><div class="card-head"><span class="card-title">Habitación asignada</span><span class="status">POR CONFIRMAR</span></div><p class="muted">Se asignará una habitación cuando tu solicitud sea aceptada.</p></article><button class="button clickable" data-go="home">Volver al inicio</button>`, 'student','home'); }
function screenPaymentDetail() { const p = MOCK.payments[1]; return appShell(`${header()}<span class="mono-label">COMPROBANTE DE PAGO</span><h1 class="screen-title">Detalle de pago</h1><p class="screen-subtitle">Consulta el estado y sube tu comprobante.</p><article class="card"><div class="card-head"><span class="card-title">${money(p.amount)}</span><span class="status">${esc(p.status.toUpperCase())}</span></div><div class="data-grid"><div class="data-cell"><small>Mes</small><strong>Noviembre 2025</strong></div><div class="data-cell"><small>Habitación</small><strong>${esc(p.room)}</strong></div><div class="data-cell"><small>Concepto</small><strong>Renta mensual</strong></div><div class="data-cell"><small>Registro</small><strong>${esc(p.date)}</strong></div></div></article><h2 class="section-title">Subir comprobante</h2><label class="file-drop clickable">＋ &nbsp; Selecciona tu comprobante<input id="paymentDetailFile" type="file" accept="image/*,.pdf"></label><h2 class="section-title">Historial</h2><article class="card"><div class="card-head"><span class="card-title">${money(2500)}</span><span class="status">PAGADO</span></div><p class="muted">Octubre 2025 · 01/10/2025</p></article><button class="button clickable" style="margin-top:8px" data-go="payments">Volver a pagos</button>`, 'student','payments'); }
function screenRateService() { return appShell(`${header()}<span class="mono-label">HU-SIC-05 · SATISFACCIÓN</span><h1 class="screen-title">Evaluar el servicio</h1><p class="screen-subtitle">¿Qué tan satisfecho estás con tu estancia en SICPES?</p><div class="rating-scale" role="group" aria-label="Calificación de 1 a 5">${[1,2,3,4,5].map(n=>`<button class="rating-cell clickable ${state.rating===n?'selected':''}" data-rate="${n}" aria-label="${n} · ${RATING_LABELS[n]}">${n}</button>`).join('')}</div><div class="rating-labels"><span>1 · Muy insatisfecho</span><span>5 · Muy satisfecho</span></div><p class="rating-value" id="rateValue">${state.rating?`Seleccionaste: ${state.rating} · ${RATING_LABELS[state.rating]}`:'Selecciona una calificación'}</p><label class="field"><span>COMENTARIO (OPCIONAL)</span><textarea id="rateComment" rows="4" maxlength="500" placeholder="Cuéntanos tu experiencia…"></textarea></label><div class="counter" id="rateCount">0 / 500</div><button class="button primary clickable" id="sendRating" data-action="send-rating" ${state.rating?'':'disabled'}>Enviar evaluación</button>`, 'student','profile'); }
function screenRateConfirm() { return appShell(`${header(false)}<div style="height:56px"></div><div class="image-placeholder" style="height:96px">GRACIAS</div><h1 class="screen-title" style="text-align:center">¡Gracias por tu opinión!</h1><p class="screen-subtitle" style="text-align:center">Tu evaluación se registró correctamente. Gracias por compartir tu opinión.</p><button class="button primary clickable" data-go="home">Volver a Inicio</button>`, 'student','home'); }
function screenAssignRoom() { const r = MOCK.reservations[0]; return appShell(`${header()}<span class="mono-label">GESTIÓN DE RESERVACIONES</span><h1 class="screen-title">Asignar habitación</h1><p class="screen-subtitle">Revisa la solicitud y asigna un espacio.</p><article class="card"><div class="card-head"><div><h3>${esc(r.name)}</h3><span class="muted">${esc(r.type)} · Solicitó Hab. ${esc(r.room)}</span></div><span class="status">${esc(r.status.toUpperCase())}</span></div><div class="data-grid"><div class="data-cell"><small>Monto mensual</small><strong>${money(r.amount)}</strong></div><div class="data-cell"><small>Fecha</small><strong>01/12/2025</strong></div></div></article><label class="field"><span>HABITACIÓN DISPONIBLE</span><select>${MOCK.rooms.filter(x=>x.available).map(x=>`<option>${esc(x.id)} · ${esc(x.type)} · ${money(x.amount)}</option>`).join('')}</select></label><div class="button-row"><button class="button primary clickable" data-action="assign-room">Asignar</button><button class="button clickable" data-action="reject-room">Rechazar</button></div>`, 'admin','reservations'); }
function screenValidatePayment() { const p = MOCK.payments[2]; return appShell(`${header()}<span class="mono-label">CONTROL DE COBROS</span><h1 class="screen-title">Validar pago</h1><p class="screen-subtitle">Revisa el comprobante antes de aprobar.</p><article class="card"><div class="card-head"><div><h3>${esc(p.name)}</h3><span class="muted">Habitación ${esc(p.room)} · ${esc(p.date)}</span></div><span class="status">${esc(p.status.toUpperCase())}</span></div><div class="data-grid"><div class="data-cell"><small>Monto</small><strong>${money(p.amount)}</strong></div><div class="data-cell"><small>Mes</small><strong>Noviembre 2025</strong></div></div></article><div class="image-placeholder">[ COMPROBANTE ]</div><label class="field"><span>MOTIVO DE RECHAZO (OPCIONAL)</span><textarea rows="2" placeholder="Ej. El monto no coincide…"></textarea></label><div class="button-row"><button class="button primary clickable" data-action="approve-payment">Aprobar</button><button class="button clickable" data-action="reject-payment">Rechazar</button></div>`, 'admin','pendingPayments'); }
function screenDebts() { const filtered = state.debtFilter==='Todos'?MOCK.debts:MOCK.debts.filter(d=>state.debtFilter==='1 mes'?d.months===1:d.months>=2); const total = MOCK.debts.reduce((sum,d)=>sum+d.amount*d.months,0); return appShell(`${header()}<span class="mono-label">SEGUIMIENTO DE ADEUDOS</span><h1 class="screen-title">Adeudos</h1><p class="screen-subtitle">Estudiantes con pagos vencidos.</p><div class="stats"><div class="stat"><strong>${MOCK.debts.length}</strong><small>Con adeudo</small></div><div class="stat"><strong>${money(total)}</strong><small>Total</small></div></div>${filterTabs(['Todos','1 mes','2+ meses'],state.debtFilter,'debt')}${filtered.map(d=>`<article class="card admin-card"><div class="card-head"><div><h3>${esc(d.name)}</h3><span class="muted">Habitación ${esc(d.room)} · ${d.months} ${d.months===1?'mes vencido':'meses vencidos'}</span></div><span class="status">${esc(d.status.toUpperCase())}</span></div><div class="card-head" style="margin-top:12px"><span class="muted">Adeudo</span><strong style="font-size:12px">${money(d.amount)}</strong></div><button class="button clickable" style="margin-top:10px" data-action="send-reminder">Enviar recordatorio</button></article>`).join('')}`, 'admin','pendingPayments'); }
function filterTabs(values, active, key) { return `<div class="tabs">${values.map(v=>`<button class="filter-tab ${v===active?'active':''}" data-filter="${esc(v)}" data-filter-key="${key}">${esc(v)}</button>`).join('')}</div>`; }
function screenReservations() { const filtered=state.filter==='Todas'?MOCK.reservations:MOCK.reservations.filter(r=>r.status===state.filter); return appShell(`${header(false)}<span class="mono-label">PANEL ADMINISTRATIVO SICPES</span><h1 class="screen-title">Reservaciones</h1><div class="stats">${[['Total',MOCK.reservations.length],['Pendientes',MOCK.reservations.filter(x=>x.status==='Pendiente').length],['Aceptadas',MOCK.reservations.filter(x=>x.status==='Aceptada').length],['Rechazadas',MOCK.reservations.filter(x=>x.status==='Rechazada').length]].map(([a,b])=>`<div class="stat"><strong>${b}</strong><small>${a}</small></div>`).join('')}</div>${filterTabs(['Todas','Pendiente','Aceptada','Rechazada'],state.filter,'reservation')}${filtered.map(r=>`<article class="card admin-card clickable" data-action="reservation-card"><div class="card-head"><div><h3>${esc(r.name)}</h3><span class="muted">${r.type} · Hab. ${r.room}</span></div><span class="status">${r.status.toUpperCase()}</span></div><div class="card-head" style="margin-top:12px"><span class="muted">Monto mensual</span><strong style="font-size:12px">${money(r.amount)}</strong></div></article>`).join('')}`, 'admin','reservations'); }
function screenPendingPayments() { const filtered=state.paymentFilter==='Todos'?MOCK.payments:MOCK.payments.filter(p=>p.status===state.paymentFilter); return appShell(`${header(false)}<span class="mono-label">CONTROL DE COBROS</span><h1 class="screen-title">Pagos pendientes</h1><div class="stats"><div class="stat"><strong>${MOCK.payments.length}</strong><small>Total</small></div><div class="stat"><strong>${MOCK.payments.filter(p=>p.status==='Pendiente').length}</strong><small>Pendientes</small></div><div class="stat"><strong>1</strong><small>En revisión</small></div><div class="stat"><strong>${money(6300)}</strong><small>Por cobrar</small></div></div><button class="button clickable" data-go="debts" style="margin-bottom:10px">Ver adeudos →</button>${filterTabs(['Todos','Pendiente','En revisión'],'Todos'===state.paymentFilter?'Todos':state.paymentFilter,'payment')}${filtered.map(p=>`<article class="card admin-card clickable" data-action="payment-card"><div class="card-head"><div><h3>${esc(p.name)}</h3><span class="muted">Habitación ${p.room} · ${p.date}</span></div><span class="status">${p.status.toUpperCase()}</span></div><div class="card-head" style="margin-top:12px"><span class="muted">Cuota mensual</span><strong style="font-size:12px">${money(p.amount)}</strong></div></article>`).join('')}`, 'admin','pendingPayments'); }
function screenFloors() { return appShell(`${header()}<span class="mono-label">INVENTARIO RESIDENCIAL</span><h1 class="screen-title">Pisos y habitaciones</h1><p class="screen-subtitle">Administra los espacios disponibles.</p><article class="card"><h2 class="section-title" style="margin-top:0">Agregar piso</h2>${field('NOMBRE DEL PISO','Ej. Tercer piso')}<label class="field"><span>HABITACIONES (SEPARADAS POR COMAS)</span><textarea id="roomInput" rows="2" placeholder="301, 302, 303"></textarea></label><button class="button primary clickable" data-action="add-floor">Agregar habitaciones</button></article><h2 class="section-title">Pisos existentes</h2>${MOCK.floors.map((f,i)=>`<article class="card"><div class="card-head"><strong class="card-title">${esc(f.name)}</strong><button class="back-link clickable" data-remove-floor="${i}" aria-label="Eliminar ${esc(f.name)}">Eliminar</button></div><p class="muted">${f.rooms.length} habitaciones · ${f.rooms.map(esc).join(', ')}</p></article>`).join('')}`, 'admin','floors'); }
function screenSettings() { return appShell(`${header()}<span class="mono-label">PREFERENCIAS DEL SISTEMA</span><h1 class="screen-title">Configuración global</h1><p class="screen-subtitle">Precios y datos administrativos.</p><article class="card"><h2 class="section-title" style="margin-top:0">Precios mensuales</h2>${field('HABITACIÓN INDIVIDUAL (MXN)','$2,500','number',MOCK.prices.Individual)}${field('HABITACIÓN COMPARTIDA (MXN)','$1,800','number',MOCK.prices.Compartida)}${field('CORREO DEL ADMINISTRADOR','admin@sicpes.mx','email','admin@sicpes.mx')}<button class="button primary clickable" data-action="save-settings">Guardar cambios</button></article><h2 class="section-title">Notificaciones del sistema</h2>${[['Nuevas reservaciones',true],['Pagos pendientes',true],['Avisos a residentes',false]].map(([label,on])=>`<label class="switch-row">${label}<input class="switch" type="checkbox" ${on?'checked':''}></label>`).join('')}`, 'admin','settings'); }

function render() {
  const renderers={landing:screenLanding,studentLogin:screenStudentLogin,forgotPassword:screenForgotPassword,register:screenRegister,verifyEmail:screenVerifyEmail,loading:screenLoading,home:screenHome,reserve:screenReserve,roomDetail:screenRoomDetail,requestStatus:screenRequestStatus,payments:screenPayments,paymentDetail:screenPaymentDetail,rateService:screenRateService,rateConfirm:screenRateConfirm,profile:screenProfile,adminLogin:screenAdminLogin,reservations:screenReservations,assignRoom:screenAssignRoom,pendingPayments:screenPendingPayments,validatePayment:screenValidatePayment,debts:screenDebts,floors:screenFloors,settings:screenSettings};
  if(state.screen!=='loading') clearInterval(state.loadingTimer);
  phone.classList.add('leaving');
  setTimeout(()=>{ phone.innerHTML=renderers[state.screen](); phone.classList.remove('leaving'); phone.classList.remove('screen-in'); void phone.offsetWidth; phone.classList.add('screen-in'); document.querySelector('#screenLabel').textContent=SCREENS[state.screen].label; document.querySelector('#roleCaption').textContent=state.role==='student'?'ESTUDIANTE':'ADMINISTRADOR'; document.querySelectorAll('.role-tab').forEach(b=>b.classList.toggle('active',b.dataset.role===state.role)); document.body.classList.toggle('zones-on',state.zones); document.querySelector('#backButton').hidden=ROOT_SCREENS.has(state.screen); renderScreenPanel(); if(state.screen==='loading') runLoading(); const rc=phone.querySelector('#rateComment'); if(rc) rc.addEventListener('input',()=>{const el=phone.querySelector('#rateCount'); if(el) el.textContent=`${rc.value.length} / 500`;}); },120);
}
function renderScreenPanel() {
  const screens=state.role==='student'?STUDENT_SCREENS:ADMIN_SCREENS;
  const list=document.querySelector('#roleScreens');
  list.innerHTML=screens.map(id=>`<button class="screen-link ${id===state.screen?'active':''}" type="button" data-go="${id}"><span>${SCREEN_CODES[id]}</span><span>${SCREENS[id].title}</span></button>`).join('');
  if(state.role==='admin'&&state.screen==='loading') list.insertAdjacentHTML('beforeend',`<button class="screen-link active" type="button" data-go="loading"><span>${SCREEN_CODES.loading}</span><span>Carga compartida</span></button>`);
  const options=SCREEN_ACTIONS[state.screen]||[];
  document.querySelector('#screenDestinations').innerHTML=options.length?options.map(([id,action])=>`<button class="destination-link" type="button" data-go="${id}"><span>${esc(action)}</span><b>→ ${SCREEN_CODES[id]} · ${esc(SCREENS[id].title)}</b></button>`).join(''):'<p class="no-destinations">Esta pantalla no tiene destinos directos.</p>';
  document.querySelector('#screenCount').textContent=`${screens.length} pantallas · ${state.role==='student'?'Rol Estudiante':'Rol Administrador'}`;
}
/* Escala uniforme el marco completo y reserva su tamaño visible en el layout. */
function updatePhoneScale() {
  const headerHeight=document.querySelector('.topbar').getBoundingClientRect().height;
  const scale=Math.max(.6,Math.min(1,(window.innerHeight-headerHeight-90)/868));
  const holder=document.querySelector('.phone-holder');
  document.documentElement.style.setProperty('--phone-scale',scale);
  holder.style.width=`${414*scale}px`;
  holder.style.height=`${868*scale}px`;
  document.querySelector('.device-label').style.width=`${414*scale}px`;
}
function screenAdminLogin() { return `<div class="app-scroll">${header(false)}<div style="height:56px"></div><span class="mono-label">SICPES · ACCESO RESTRINGIDO</span><h1 class="screen-title">Panel administrativo</h1><p class="screen-subtitle">Inicia sesión para gestionar la residencia.</p>${field('CORREO ADMINISTRADOR','admin@sicpes.mx','email')}${field('CONTRASEÑA','••••••••','password')}<button class="button primary clickable" data-action="admin-login">Entrar</button><p class="form-note">Acceso exclusivo para personal autorizado.</p></div>`; }
function runLoading() { clearInterval(state.loadingTimer); let progress=0; state.loadingTimer=setInterval(()=>{ progress=Math.min(progress+8,100); const fill=document.querySelector('#progressFill'); if(!fill){clearInterval(state.loadingTimer);return;} fill.style.width=`${progress}%`; document.querySelector('#progressPercent').textContent=`${progress}%`; if(progress===100){clearInterval(state.loadingTimer);setTimeout(()=>go(state.role==='admin'?'reservations':'home',{replace:true}),450);} },100); }
const diagramState={scrollY:0,bodyOverflow:''};
const SVG_NS='http://www.w3.org/2000/svg';
/* Diagrama de navegación: las posiciones se derivan de carriles (filas × columnas)
   y las conexiones se declaran una por una con su tipo de ruteo ortogonal.
   Nada se posiciona a mano: agregar una pantalla es agregar una celda o un enlace. */
const DG={TW:120,TH:96,GX:110,GY:72,LX:150,TOPY:56,LANEGAP:110,CORRIDORPITCH:36,PAD:40,LABEL_FS:10};
const DIAGRAM={
  student:{
    title:'ROL ESTUDIANTE',marker:'sicpesArrowStudent',
    lanes:[
      {label:'ACCESO',rows:[
        ['landing','studentLogin',null,'loading'],
        ['forgotPassword','register','verifyEmail',null]
      ]},
      {label:'RESERVACIÓN',rows:[
        ['home','reserve',null,'requestStatus'],
        [null,null,'roomDetail',null]
      ]},
      {label:'PAGOS Y CUENTA',rows:[
        ['payments','paymentDetail','profile','rateService','rateConfirm']
      ]}
    ],
    links:[
      {from:'landing',to:'studentLogin',kind:'h',label:'Iniciar sesión'},
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
      {from:'rateService',to:'rateConfirm',kind:'h',label:'Enviar'},
      {from:'requestStatus',to:'home',kind:'corridor',corridor:0,label:'Ir a Inicio'},
      {from:'rateConfirm',to:'home',kind:'corridor',corridor:0,label:'Ir a Inicio'},
      {from:'profile',to:'studentLogin',kind:'corridor',corridor:1,label:'Cerrar sesión'}
    ]
  },
  admin:{
    title:'ROL ADMINISTRADOR',note:'Acceso desde A1; la carga (E6) es compartida con el estudiante',marker:'sicpesArrowAdmin',
    lanes:[
      {label:'ACCESO',rows:[['adminLogin','loading','reservations','assignRoom']]},
      {label:'PAGOS',rows:[['pendingPayments','validatePayment','debts']]},
      {label:'INVENTARIO',rows:[['floors','settings']]}
    ],
    links:[
      {from:'adminLogin',to:'loading',kind:'h',label:'Entrar'},
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
      {from:'settings',to:'adminLogin',kind:'corridor',corridor:0,label:'Cerrar sesión'}
    ]
  }
};
function openDiagram() {
  const view=document.querySelector('#diagramView');
  if(!view.hidden)return;
  diagramState.scrollY=window.scrollY;
  diagramState.bodyOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  view.hidden=false;
  buildDiagram();
}
function closeDiagram() {
  const view=document.querySelector('#diagramView');
  if(view.hidden)return;
  view.hidden=true;
  document.body.style.overflow=diagramState.bodyOverflow;
  window.scrollTo(0,diagramState.scrollY);
}
function labelW(text){return String(text).length*6.4+14;}
function dgWrap(title){
  const words=String(title).split(' ');
  if(words.length<2)return [title];
  let a='',b='';
  const half=title.length/2+1;
  words.forEach(w=>{const cand=a?a+' '+w:w;if(!b&&cand.length<=half)a=cand;else b=b?b+' '+w:w;});
  return b?[a,b]:[a];
}
/* Convierte carriles + enlaces en coordenadas, rutas ortogonales y cajas de etiqueta.
   Cada conector se enruta por canales libres para no cruzar nunca una miniatura. */
function dgLayout(flow){
  const G=DG,cards={},lanes=[];
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
      const corrY=contentBottom+DG.CORRIDORPITCH*((link.corridor||0)+1);
      const xA=A.right+55,xB=B.left-55;
      s(A.cx,A.bottom);s(A.cx,A.bottom+16);s(xA,A.bottom+16);s(xA,corrY);s(xB,corrY);s(xB,B.cy);s(B.left,B.cy);
      labels.push({x:(xA+xB)/2,y:corrY+15,text:link.label,anchor:'middle'});
    }
    if(P.length)paths.push({d:P.map((p,i)=>(i?'L':'M')+Math.round(p[0])+','+Math.round(p[1])).join(' ')});
  });
  labels.forEach(l=>{const w=labelW(l.text);const x0=l.anchor==='middle'?l.x-w/2:l.anchor==='start'?l.x-6:l.x-w+6;bx.push(x0,x0+w);by.push(l.y-13,l.y+3);});
  const width=Math.ceil(Math.max(...bx,DG.LX+DG.TW))+DG.PAD;
  const height=Math.ceil(Math.max(...by,contentBottom))+DG.PAD;
  Object.values(cards).forEach(c=>{c.lines=dgWrap(SCREENS[c.id].title);c.badge=c.id==='loading'?'COMPARTIDA':'';});
  return {cards,lanes,paths,labels,viewBox:`0 0 ${width} ${height}`,width,height};
}
function diagramThumb(c){
  const current=state.screen===c.id,code=SCREEN_CODES[c.id],x=c.x,y=c.y,lines=c.lines,badge=c.badge;
  const title=lines.map((line,i)=>`<text x="${x+8}" y="${y+32+i*14}" font-family="Space Grotesk, Arial, sans-serif" font-size="12" font-weight="700" fill="#111">${esc(line)}</text>`).join('');
  const bars=[104,78,92].map((w,i)=>`<rect x="${x+8}" y="${y+56+i*7}" width="${w}" height="3" rx="1.5" fill="#dcdcdc"/>`).join('');
  const tag=badge?`<rect x="${x+58}" y="${y+5}" width="56" height="14" rx="7" fill="#f3f3f3" stroke="#ddd" stroke-width="1"/><text x="${x+86}" y="${y+15}" text-anchor="middle" font-family="Space Mono, monospace" font-size="7" font-weight="700" fill="#666">${badge}</text>`:'';
  return `<g class="thumb${current?' current':''}" data-go="${c.id}" role="button" tabindex="0" aria-label="${esc(`${code} · ${SCREENS[c.id].title}`)}"><rect class="thumb-box" x="${x}" y="${y}" width="120" height="96" rx="6" fill="${current?'#f5fff7':'#fff'}" stroke="${current?'#16a34a':'#ccc'}" stroke-width="${current?2:1}"/><text x="${x+8}" y="${y+15}" font-family="Space Mono, monospace" font-size="10" font-weight="700" fill="#666">${code}</text>${tag}${title}${bars}<rect x="${x+8}" y="${y+80}" width="48" height="8" rx="2" fill="${current?'#16a34a':'#d0d0d0'}"/></g>`;
}
function diagramLaneLabel(lane,width){
  const x=18,c=lane.center;
  return `<line x1="16" y1="${Math.round(lane.top-22)}" x2="${width-16}" y2="${Math.round(lane.top-22)}" stroke="#ececec" stroke-width="1"/><rect x="${x}" y="${c-11}" width="4" height="22" rx="2" fill="#16a34a"/><text x="${x+12}" y="${c+4}" font-family="Space Mono, monospace" font-size="11" font-weight="700" letter-spacing="1.5" fill="#666">${esc(lane.label)}</text>`;
}
function diagramPaths(g){
  const paths=g.paths.map(p=>`<path d="${p.d}" fill="none" stroke="#555" stroke-width="1.5" marker-end="url(#${g.marker})"/>`).join('');
  const texts=g.labels.map(l=>{const w=labelW(l.text);const x0=l.anchor==='middle'?l.x-w/2:l.anchor==='start'?l.x-6:l.x-w+6;return `<g><rect x="${Math.round(x0)}" y="${l.y-13}" width="${Math.round(w)}" height="17" rx="4" fill="#fff"/><text x="${l.x}" y="${l.y}" text-anchor="${l.anchor}" font-family="Space Mono, monospace" font-size="${DG.LABEL_FS}" fill="#444">${esc(l.text)}</text></g>`;}).join('');
  return paths+texts;
}
function diagramCard(flow){
  const g=dgLayout(flow);g.marker=flow.marker;
  const note=flow.note?`<p class="role-note">${esc(flow.note)}</p>`:'';
  const lanes=g.lanes.map(l=>diagramLaneLabel(l,g.width)).join('');
  const thumbs=Object.values(g.cards).map(diagramThumb).join('');
  return `<section class="diagram-card"><h3 class="diagram-role">${esc(flow.title)}</h3>${note}<svg class="diagram-svg" xmlns="${SVG_NS}" viewBox="${g.viewBox}" role="img" aria-label="${esc(`Diagrama de navegación · ${flow.title}`)}"><defs><marker id="${flow.marker}" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#555"/></marker></defs>${lanes}${thumbs}${diagramPaths(g)}</svg></section>`;
}
function buildDiagram() {
  document.querySelector('#diagramCanvas').innerHTML=diagramCard(DIAGRAM.student)+diagramCard(DIAGRAM.admin);
}
/* La exportación serializa los dos <svg> tal como se ven y los pinta a escala 2x. */
function diagramExportMarkup(svg,title){
  const vb=svg.getAttribute('viewBox').trim().split(/\s+/).map(Number);
  const width=vb[2],height=vb[3],head=44;
  const out=document.createElementNS(SVG_NS,'svg');
  out.setAttribute('xmlns',SVG_NS);
  out.setAttribute('width',width);
  out.setAttribute('height',height+head);
  out.setAttribute('viewBox',`0 0 ${width} ${height+head}`);
  const frame=document.createElementNS(SVG_NS,'rect');
  frame.setAttribute('x','0.5');frame.setAttribute('y','0.5');
  frame.setAttribute('width',width-1);frame.setAttribute('height',height+head-1);
  frame.setAttribute('fill','#fff');frame.setAttribute('stroke','#d9d9d9');
  out.appendChild(frame);
  const label=document.createElementNS(SVG_NS,'text');
  label.setAttribute('x','2');label.setAttribute('y','28');
  label.setAttribute('font-family','Space Mono, monospace');label.setAttribute('font-size','16');
  label.setAttribute('font-weight','700');label.setAttribute('letter-spacing','1.5');label.setAttribute('fill','#666');
  label.textContent=title;
  out.appendChild(label);
  const group=document.createElementNS(SVG_NS,'g');
  group.setAttribute('transform',`translate(0,${head})`);
  Array.from(svg.children).forEach(node=>group.appendChild(node.cloneNode(true)));
  out.appendChild(group);
  return new XMLSerializer().serializeToString(out);
}
function svgImageLoader(markup){
  return new Promise((resolve,reject)=>{
    const img=new Image();
    img.onload=()=>resolve(img);
    img.onerror=()=>reject(new Error('SVG'));
    img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(markup);
  });
}
function downloadDiagramPNG() {
  const cards=[...document.querySelectorAll('#diagramCanvas .diagram-card')];
  if(cards.length<2)return;
  const titles=cards.map(card=>card.querySelector('.diagram-role').textContent.trim());
  const sources=cards.map((card,i)=>diagramExportMarkup(card.querySelector('svg'),titles[i]));
  Promise.all(sources.map(svgImageLoader)).then(images=>{
    const margin=24,gap=28,scale=2;
    const width=(images[0]&&images[0].width||1256)+margin*2;
    const height=margin+images.reduce((sum,img)=>sum+img.height,0)+gap*(images.length-1)+margin;
    const canvas=document.createElement('canvas');
    canvas.width=Math.round(width*scale);
    canvas.height=Math.round(height*scale);
    const ctx=canvas.getContext('2d');
    ctx.scale(scale,scale);
    ctx.fillStyle='#fff';ctx.fillRect(0,0,width,height);
    let y=margin;
    images.forEach(img=>{ctx.drawImage(img,margin,y,img.width,img.height);y+=img.height+gap;});
    const link=document.createElement('a');
    link.download='sicpes-diagrama-navegacion.png';
    link.href=canvas.toDataURL('image/png');
    link.click();
  }).catch(()=>toast('No se pudo generar la imagen del diagrama.'));
}

/* Un solo controlador delega los clics de pantallas dinámicas. */
document.addEventListener('click',e=>{
  const target=e.target.closest('button,a,article,.feature,.notice,.file-drop,.thumb'); if(!target)return;
  if(target.hasAttribute('data-close-diagram')){closeDiagram();return;}
  if(target.dataset.role){setRole(target.dataset.role);return;}
  if(target.dataset.go){if(!document.querySelector('#diagramView').hidden)closeDiagram();go(target.dataset.go);return;}
  if(target.dataset.action==='back'){back();return;}
  if(target.dataset.type){state.type=target.dataset.type;render();return;}
  if(target.dataset.filter){const key=target.dataset.filterKey; if(key==='reservation')state.filter=target.dataset.filter;else if(key==='payment')state.paymentFilter=target.dataset.filter;else if(key==='debt')state.debtFilter=target.dataset.filter;render();return;}
  if(target.dataset.action==='student-login'){state.role='student';go('loading');return;}
  if(target.dataset.action==='admin-login'){state.role='admin';go('loading');return;}
  if(target.dataset.action==='register'){const checked=phone.querySelector('input[type=checkbox]')?.checked;if(!checked){toast('Acepta los términos para continuar.');return;}state.role='student';go('verifyEmail',{replace:false});return;}
  if(target.dataset.action==='verify-email'){toast('Correo verificado correctamente.');state.role='student';go('loading');return;}
  if(target.dataset.action==='resend-code'){toast('Código reenviado.');return;}
  if(target.dataset.action==='forgot-send'){toast('Te hemos enviado un enlace de recuperación a tu correo.');go('studentLogin');return;}
  if(target.dataset.rate){state.rating=Number(target.dataset.rate);phone.querySelectorAll('.rating-cell').forEach(c=>c.classList.toggle('selected',Number(c.dataset.rate)===state.rating));const rv=phone.querySelector('#rateValue');if(rv)rv.textContent=`Seleccionaste: ${state.rating} · ${RATING_LABELS[state.rating]}`;const sb=phone.querySelector('#sendRating');if(sb)sb.disabled=false;return;}
  if(target.dataset.action==='send-rating'){if(!state.rating){toast('Selecciona una calificación para continuar.');return;}toast('Tu evaluación se registró correctamente.');state.rating=0;go('rateConfirm');return;}
  if(target.dataset.action==='room-request'){toast('Solicitud enviada.');go('requestStatus');return;}
  if(target.dataset.action==='assign-room'){toast('Habitación asignada correctamente.');go('reservations');return;}
  if(target.dataset.action==='reject-room'){toast('Solicitud rechazada.');go('reservations');return;}
  if(target.dataset.action==='approve-payment'){toast('Pago aprobado.');go('pendingPayments');return;}
  if(target.dataset.action==='reject-payment'){toast('Pago rechazado.');go('pendingPayments');return;}
  if(target.dataset.action==='send-reminder'){toast('Recordatorio enviado.');return;}
  if(target.dataset.action==='reserve'){toast('¡Reservación confirmada!');setTimeout(()=>go('requestStatus'),600);return;}
  if(target.dataset.action==='request-payment'){toast('Solicitud de pago enviada.');return;}
  if(target.dataset.action==='logout'){state.history=[];setRole('student');go('studentLogin',{replace:true});return;}
  if(target.dataset.action==='social'){toast(`Continuar con ${target.textContent} (demo)`);return;}
  if(target.dataset.action==='reservation-card'){toast('Detalle de reservación seleccionado.');go('assignRoom');return;}
  if(target.dataset.action==='payment-card'){toast('Pago seleccionado para revisión.');go('validatePayment');return;}
  if(target.dataset.action==='add-floor'){const fields=phone.querySelectorAll('.field input');const name=fields[0]?.value.trim();const rooms=phone.querySelector('#roomInput')?.value.split(',').map(x=>x.trim()).filter(Boolean)||[];if(!name||!rooms.length){toast('Agrega el nombre del piso y al menos una habitación.');return;}MOCK.floors.unshift({name,rooms});toast('Piso agregado.');render();return;}
  if(target.dataset.removeFloor!==undefined){const i=Number(target.dataset.removeFloor);MOCK.floors.splice(i,1);toast('Piso eliminado.');render();return;}
  if(target.dataset.action==='save-settings'){const inputs=phone.querySelectorAll('input[type=number]');MOCK.prices.Individual=Number(inputs[0].value)||MOCK.prices.Individual;MOCK.prices.Compartida=Number(inputs[1].value)||MOCK.prices.Compartida;toast('Cambios guardados.');return;}
});
document.addEventListener('change',e=>{
  if(e.target.id==='receiptFile'&&e.target.files.length)toast(`Archivo listo: ${e.target.files[0].name}`);
  if(e.target.id==='paymentDetailFile'&&e.target.files.length)toast(`Comprobante cargado: ${e.target.files[0].name}`);
  const codes=phone.querySelectorAll('.code-row input');
  if([...codes].includes(e.target)){e.target.nextElementSibling?.focus();}
});
  document.querySelector('#backButton').addEventListener('click',back);

document.querySelector('#diagramToggle').addEventListener('click',openDiagram);
document.querySelector('#downloadDiagram').addEventListener('click',downloadDiagramPNG);
document.querySelector('#zonesToggle').addEventListener('click',()=>{state.zones=!state.zones;document.body.classList.toggle('zones-on',state.zones);document.querySelector('#zonesToggle').textContent=state.zones?'Ocultar zonas clicables':'Mostrar zonas clicables';});
window.addEventListener('keydown',e=>{
  if(e.key==='Escape')closeDiagram();
  if(e.key==='Enter'&&e.target instanceof Element&&e.target.classList.contains('thumb')){e.preventDefault();const id=e.target.dataset.go;if(id){closeDiagram();go(id);}}
});
window.addEventListener('resize',()=>{updatePhoneScale();});
updatePhoneScale();
render();

/* Tema claro/oscuro compartido con el diagrama de roles. */
(function(){
  var btn=document.getElementById('themeToggle');
  if(!btn)return;
  var root=document.documentElement;
  function apply(t){
    root.dataset.theme=t;
    btn.textContent=t==='dark'?'Tema claro':'Tema oscuro';
    btn.setAttribute('aria-pressed',String(t==='light'));
    btn.setAttribute('aria-label',t==='dark'?'Cambiar a tema claro':'Cambiar a tema oscuro');
  }
  apply(root.dataset.theme==='light'?'light':'dark');
  btn.addEventListener('click',function(){
    var t=root.dataset.theme==='dark'?'light':'dark';
    apply(t);
    try{localStorage.setItem('sicpes-sketches-theme',t);}catch(e){}
  });
})();


