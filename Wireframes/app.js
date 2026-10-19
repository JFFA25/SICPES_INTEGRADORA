const studentDefs=['Landing','Inicia sesi\u00f3n','Crea tu cuenta','Pantalla de carga','Dashboard','Nueva Petici\u00f3n / Registro','Gesti\u00f3n de Pagos','Verificar correo','Recuperar contrase\u00f1a','Detalle de habitaci\u00f3n','Estado de mi petici\u00f3n','Detalle de pago','Evaluar el servicio','Evaluaci\u00f3n enviada','Cuenta / Perfil'];
const adminDefs=['Login admin','Pantalla de carga','Reservaciones','Pagos pendientes','Configuración global','Pisos'];
const adminOffset=studentDefs.length;
const students=document.querySelector('#studentScreens'), admins=document.querySelector('#adminScreens');let navigateMode=false;
function asset(name,alt=''){return `<img class=\"asset\" src=\"img/${encodeURI(name)}\" alt=\"${alt}\" draggable=\"false\">`}function logo(){return `<div class=\"logo\"><span class=\"logo-icon\">${asset('Vector.png','')}</span>SICPES</div>`}function topbar(){return `<div class="topbar">${logo()}<nav><a href="#" data-go="0">Inicio</a><a href="#contacto" data-contact>Contacto</a><button data-go="1">Iniciar sesión</button></nav></div>`}
function field(label,placeholder,type='text',opts=''){let kind=type==='password'?'password':label.startsWith('CORREO')?'email':label==='FECHA DE INGRESO'?'date':type;return `<div class="field"><label>${label}</label><div class="${kind==='password'?'password-box':''}"><input type="${kind}" ${label.toLowerCase().startsWith('confirmar')?'data-confirm-password':label.toLowerCase().startsWith('contrase')?'data-password':''} placeholder="${placeholder}" ${opts}>${type==='password'?'<button class="eye" type="button" aria-label="Mostrar contraseña">◉</button>':''}</div></div>`}
function social(labels){return `<div class="social-row">${labels.map(x=>`<button class="social">${x}</button>`).join('')}</div>`}
function auth(login=true,admin=false){let head=admin?'PANEL ADMINISTRATIVO SICPES':login?'Bienvenido de nuevo':'Crea tu cuenta';return `<div class="form-page">${admin?`<div class="auth-head"><div class="auth-logo">${asset('SICPES Emblema Administrativo.png','Emblema administrativo SICPES')}</div><div class="eyebrow" style="background:#e5f5e9;color:#0b6b2e">${head}</div><h2 style="margin-top:16px">Inicia sesión</h2></div>`:`<div class="auth-head"><div class="auth-logo">${asset('Vector.png','')}</div><h2>${head}</h2><p>${login?'Accede a tu cuenta de estudiante':'Completa tus datos para comenzar'}</p></div>`}${login?field('CORREO','correo@ejemplo.com','text','required')+field('CONTRASEÑA','Ingresa tu contraseña','password','required')+(admin?'<a class="form-link" data-forgot style="margin-top:0">¿Olvidaste tu contraseña?</a>':'<a class="form-link" data-forgot>¿Olvidaste tu contraseña?</a>'):field('NOMBRE','Tu nombre completo','text','required')+field('CORREO ELECTRÓNICO','correo@ejemplo.com','text','required')+field('CONTRASEÑA','Crea una contraseña','password','required')+field('CONFIRMAR CONTRASEÑA','Confirma tu contraseña','password','required')}<button class="btn green full submit-action" data-go="${admin?8:login?3:3}"> ${login?'Entrar':'Registrarme'}</button>${!admin?`<div class="divider">${login?'O CONTINÚA CON':'O REGÍSTRATE CON'}</div>${social(login?['Google','Facebook','LinkedIn']:['G','f','in'])}`:''}<div class="auth-foot">${admin?'¿No tienes cuenta? <a data-go="0">Regístrate':login?'¿Aún no tienes una cuenta? <a data-go="2">Regístrate':'¿Ya tienes una cuenta? <a data-go="1">Ingresa'}</a></div>${!admin&&login?'<div class="terms">Al continuar, aceptas nuestros Términos de servicio y Política de privacidad.</div>':''}</div>`}
function loader(){return `<div class="loader"><span class="secure">● &nbsp; CONEXIÓN SEGURA SSL</span><div class="auth-logo">${asset('Vector.png','')}</div><h2>SICPES</h2><div class="sub">Sistema de Control y Gestión Residencial</div><div class="progress"><span style="width:46%"></span></div><p class="load-copy">Sincronizando registros residenciales... <b class="pct">46%</b></p><p class="muted" style="margin-top:24px">Cargando entorno de usuario...</p><div class="loader-foot">v1.0.8 \u00b7 Plataforma institucional</div></div>`}
function nav(items,active,admin=false){let icons=admin?[asset('Icon (1).png','Reservaciones'),asset('Icon (3).png','Pagos'),asset('Vector.png','Pisos'),'<span aria-hidden="true">&#9881;</span>']:[asset('Vector.png','Inicio'),asset('Icon (2).png','Reservas'),asset('Icon (3).png','Pagos'),asset('Background.png','Cuenta')];return `<div class="bottom-nav">${items.map((x,i)=>`<button class="nav-item ${i===active?'active':''}" data-section="${admin?adminOffset+2+i:i===3?14:4+i}"><span class="nav-icon">${icons[i]}</span>${x}</button>`).join('')}</div>`}
function adminBar(){return `<div class="topbar admin-brand"><div class="admin-brand-name">${asset('SICPES Emblema Administrativo.png','')}<b>SICPES</b><small>ADMIN</small></div><span class="user-avatar">${asset('Background.png','Cuenta administrativa')}</span></div>`}
function landing(){return `${topbar()}<div class="hero"><span class="eyebrow">✦ &nbsp; PLATAFORMA OFICIAL ESTUDIANTES</span><h1>Encuentra tu espacio ideal para vivir y estudiar.</h1><p>Conectamos estudiantes con residencias verificadas para que tu única preocupación sea alcanzar tus metas.</p><div class="actions"><button class="btn white" data-go="1">Explorar Instituciones</button><button class="btn outline" data-go="1">Iniciar sesión</button></div></div><div class="building-photo">${asset('Edificio moderno residencial para estudiantes SICPES.png','Edificio moderno residencial para estudiantes SICPES')}</div><div class="landing-cards"><div class="mini-card"><div class="icon-tile">${asset('Icon (1).png','')}</div><strong>Residencias Verificadas</strong><p>Espacios seguros y de calidad.</p></div><div class="mini-card"><div class="icon-tile">${asset('Icon (2).png','')}</div><strong>Gesti?n Centralizada</strong><p>Todo lo que necesitas en un lugar.</p></div></div><div class="contact-box"><strong>¿Tienes preguntas sobre el servicio?</strong><p>Estamos aquí para ayudarte en cada paso.</p><button class="btn darkgreen" data-contact>Contactar asesoría SICPES</button></div>`}
function dashboard(){return `<div class="topbar">${logo()}<span class="user-avatar">${asset('Background.png','Cuenta de estudiante')}</span></div><div class="welcome"><small>INICIO</small><h2>¡Bienvenido,<br>Luis Humberto!</h2></div><div class="card"><div class="card-heading"><strong>▣ &nbsp;Tu reservación</strong><span class="badge">ACEPTADA</span></div><div class="data-grid"><div><span class="data-label">Piso</span><span class="data-value">Piso 1</span></div><div><span class="data-label">Tipo</span><span class="data-value">Individual</span></div><div><span class="data-label">Habitación</span><span class="data-value">101</span></div><div><span class="data-label">Estado</span><span class="data-value">Confirmada</span></div></div></div><div class="card"><div class="card-heading"><strong>＄ &nbsp;Próximo pago</strong><span class="badge amber">PENDIENTE</span></div><div class="data-grid"><div><span class="data-label">Monto</span><span class="data-value">$900.00</span></div><div><span class="data-label">Vence</span><span class="data-value">1/15/2025</span></div><div><span class="data-label">Estado</span><span class="badge amber">Pendiente de Solicitud</span></div></div><button class="btn green full" style="margin-top:14px" data-go="6">Gestionar pago</button></div><div class="card"><div class="card-heading"><strong>♧ &nbsp;Avisos</strong><a class="form-link" style="margin:0" data-go="5">Ver todos</a></div><div class="notice"><div class="icon-tile">⌁</div><div><strong>Recordatorio de pago</strong><p>Tu próximo pago vence el 15 de enero.</p></div></div><div class="notice"><div class="icon-tile">${asset('Icon (1).png','')}</div><div><strong>Reserva confirmada</strong><p>Tu habitación está lista.</p></div></div></div>${nav(['Inicio','Reservas','Pagos','Cuenta'],0)}`}
function requestPage(){return `<div class="subhead"><button class="back" data-go="4">‹</button>Nueva Petición</div><div class="page-content"><h2>Registro de Estudiantes</h2><p>Completa los datos para solicitar tu reserva.</p><div class="card form-card"><h3>Datos de la Reserva</h3>${field('FECHA DE INGRESO','Selecciona una fecha','text','required')}<div class="field"><label>TIPO DE HABITACIÓN</label><div class="choice-grid"><button class="choice selected"><span class="icon-tile">${asset('Icon (4).png','')}</span><b>Individual</b><small>Espacio privado</small></button><button class="choice"><span class="icon-tile">${asset('Icon (2).png','')}</span><b>Compartida</b><small>Comparte tu espacio</small></button></div></div><div class="field"><label>PLAN</label><select required><option value="">Selecciona un plan</option><option>Mensual</option></select></div><div class="field"><label>HABITACIÓN</label><select required><option value="">Selecciona habitación</option><option>101</option></select></div>${field('MONTO MENSUAL','$900.00')}<button class="btn green full submit-action" data-go="4">Reservar</button></div></div>`}
function payments(){return `<div class="subhead">Gestión de Pagos</div><div class="page-content"><h2>Mis pagos</h2><p>Consulta el estado de tus pagos residenciales.</p><div class="card"><div class="card-heading"><strong>Tu Próximo Pago</strong><span class="badge amber">PENDIENTE</span></div><div style="font-size:28px;font-weight:800;color:#0b6b2e;margin:4px 0 14px">$900.00</div><div class="data-grid"><div><span class="data-label">Fecha de vencimiento</span><span class="data-value">15 de enero, 2025</span></div><div><span class="data-label">Estado</span><span class="badge amber">Pendiente de Solicitud</span></div></div><button class="btn green full" style="margin-top:17px" data-request-payment>Solicitar Pago</button></div><div class="card"><div class="card-heading"><strong>Historial de Pagos</strong></div><div class="empty"><div class="icon-tile">${asset('Icon (3).png','')}</div><strong>No hay registros de pagos anteriores</strong><p>Aquí aparecerá tu historial de pagos.</p></div></div></div>${nav(['Inicio','Reservas','Pagos','Cuenta'],2)}`}
const reservaData=[['Luis Mart\u00ednez','Individual','Piso 2 - Hab. 109','$3,126.00','15/01/2025'],['Elena P\u00e9rez','Individual','Piso 1 - Hab. 148','$3,895.00','20/01/2025'],['Hueto','Compartida','Piso 1 - Hab. 103','$1,800.00','25/01/2025'],['Edgar Cabrera','Individual','Piso 1 - Hab. 101','$2,500.00','29/01/2025']];const pagoData=[['Edgar Cabrera','edgar.cabrera@sicpes.mx','$2,500.00','29/01/2025','Pagado'],['Hueto','hueto@sicpes.mx','$1,800.00','25/01/2025','Pagado']];
function adminList(pay=false){let data=pay?pagoData:reservaData;let tabs=pay?['Todos','Pendientes','Aceptados','Rechazados']:['Todas','Pendientes','Aceptadas','Rechazadas'];return `${adminBar()}<div class="page-content"><h2>${pay?'Pagos pendientes':'Reservaciones'}</h2><div class="search">⌕ <input placeholder="Buscar ${pay?'estudiante':'reservación'}..."></div><div class="stats ${pay?'four':''}">${(pay?[['2','Total'],['0','Pendientes'],['2','Aceptados'],['0','Rechazados']]:[['4','Total'],['0','Pendientes'],['4','Aceptadas'],['0','Rechazadas'],['0','Finalizadas']]).map(x=>`<div class="stat"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div><div class="tabs">${tabs.map((t,i)=>`<button class="tab ${i===0?'active':''}" data-filter="${i}">${t}</button>`).join('')}</div><div class="admin-records">${data.map((d,i)=>`<article class="card admin-card" data-status="2"><div class="admin-card-head"><div class="admin-student"><span>${asset('Icon (4).png','')}</span><strong>${d[0]}</strong></div><span class="badge ${pay&&d[4]==='Pendiente'?'amber':''}">${pay?d[4]:'CONFIRMADA'}</span></div><div class="email">${pay?d[1]:''}</div><div class="admin-detail"><div><span class="data-label">${pay?'Monto':'Tipo de cuarto'}</span><span class="data-value">${pay?d[2]:d[1]}</span></div><div><span class="data-label">${pay?'Fecha':'Ubicación'}</span><span class="data-value">${pay?d[3]:d[2]}</span></div><div><span class="data-label">${pay?'Estudiante':'Fecha de ingreso'}</span><span class="data-value">${pay?d[0]:d[4]}</span></div><div><span class="data-label">${pay?'Acciones':'Monto'}</span><span class="data-value">${pay?'<button class="btn soft" data-view-payment>Ver pago</button>':d[3]}</span></div></div>${!pay?'<button class="btn soft" style="margin-top:9px" disabled>Sin acciones</button>':''}</article>`).join('')}</div></div>${nav(['Reservaciones','Pagos','Pisos','Configuración'],pay?1:0,true)}`}
function configPage(){return `${adminBar()}<div class="page-content"><h2>Configuración global</h2><p>Administra los parámetros de la plataforma.</p><div class="settings-price"><div class="price-tile"><span>PRECIO INDIVIDUAL</span><b>$2,500 <small>/ mes</small></b></div><div class="price-tile"><span>PRECIO COMPARTIDO</span><b>$1,800 <small>/ mes</small></b></div></div><div class="card form-card"><h3>Editar parámetros</h3>${field('PRECIO DE HABITACIÓN INDIVIDUAL','$2,500','text','required')}${field('PRECIO DE HABITACIÓN COMPARTIDA','$1,800','text','required')}${field('CORREO DE CONTACTO','contacto@sicpes.mx','text','required')}<button class="btn green full" data-save-config>Guardar cambios</button></div></div>${nav(['Reservaciones','Pagos','Pisos','Configuración'],3,true)}`}
function floors(){return `${adminBar()}<div class="page-content"><h2>Pisos y habitaciones</h2><p>Administra los espacios residenciales disponibles.</p><div class="card form-card"><h3>Agregar nuevos pisos y habitaciones</h3>${field('PISO','Ej. Piso 3','text','required')}${field('HABITACIONES','Ej. 301, 302, 303','text','required')}<button class="btn green full" data-add-floor>Agregar habitaciones</button></div><h3 class="section-title" style="margin:18px 2px 12px">Pisos existentes</h3><div class="floor-list"><div class="card admin-card"><div class="floor-head"><strong>Piso 1</strong><span class="badge">5 habitaciones</span></div><div class="room-chips"><span class="room-chip">101</span><span class="room-chip">102</span><span class="room-chip">103</span><span class="room-chip">104</span><span class="room-chip">105</span></div><button class="btn red" data-remove>Eliminar piso</button></div></div></div>${nav(['Reservaciones','Pagos','Pisos','Configuración'],2,true)}`}
function captureScreen(file){return `<div class="reference-shot"><img class="reference-capture" src="caps/${file}" alt="Captura de referencia" draggable="false"></div>`}
const studentBodies=[landing(),auth(true),auth(false),loader(),dashboard(),requestPage(),payments(),captureScreen('image.png'),captureScreen('img.png'),captureScreen('img2.png'),captureScreen('img3.png'),captureScreen('img4.png'),captureScreen('img5.png'),captureScreen('img6.png'),captureScreen('img7.png')];const adminBodies=[auth(true,true),loader(),adminList(),adminList(true),configPage(),floors()];
function makeScreens(){studentDefs.forEach((name,i)=>students.appendChild(makeScreen(name,studentBodies[i],false,i)));adminDefs.forEach((name,i)=>admins.appendChild(makeScreen(name,adminBodies[i],true,i)))}function makeScreen(name,body,admin,i){let wrap=document.createElement('div');wrap.className='screen-wrap';let globalIndex=admin?adminOffset+i:i;wrap.dataset.index=globalIndex;wrap.innerHTML=`<div class="screen-label">SICPES ${admin?'Admin':'M\u00f3vil'} \u00b7 ${name}</div><div class="phone ${admin?'admin-screen':''}" data-screen="${globalIndex}"><div class="phone-inner">${body}</div></div>`;return wrap}makeScreens();
const studentOrder=[0,1,2,7,8,3,4,9,5,10,6,11,12,13,14];
studentOrder.forEach(index=>students.appendChild(students.querySelector(`.screen-wrap[data-index="${index}"]`)));
const screenMenu=document.querySelector('#screenMenu'),pickerCount=document.querySelector('#pickerCount');let activeRole='student',activeScreen=null;
function renderScreenMenu(role){activeRole=role;activeScreen=null;const defs=role==='admin'?adminDefs:studentDefs;const offset=role==='admin'?adminOffset:0;const entries=role==='admin'?defs.map((name,i)=>({name,index:i})):studentOrder.map(index=>({name:studentDefs[index],index}));screenMenu.innerHTML=entries.map(({name,index},position)=>`<button class="screen-menu-item" type="button" data-pick-screen="${offset+index}" aria-pressed="false"><span class="menu-code">${role==='admin'?'A':'E'}${String(position+1).padStart(2,'0')}</span><span>${name}</span></button>`).join('');document.querySelectorAll('.role-button').forEach(button=>{const on=button.dataset.role===role;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});document.querySelectorAll('.screen-wrap').forEach(wrap=>{wrap.hidden=(Number(wrap.dataset.index)>=adminOffset)!==(role==='admin');});document.querySelectorAll('.group-title').forEach(title=>title.hidden=(title.classList.contains('admin-title'))!==(role==='admin'));pickerCount.textContent=`${defs.length} pantallas \u00b7 Rol ${role==='admin'?'Administrador':'Estudiante'}`;document.querySelector('.screen-count').textContent=`${defs.length} pantallas`;
}
function pickScreen(index,scroll=true){const wrap=document.querySelector(`.screen-wrap[data-index="${index}"]`);if(!wrap)return;activeRole=index>=adminOffset?'admin':'student';activeScreen=index;document.querySelectorAll('.screen-wrap').forEach(item=>item.hidden=item!==wrap);document.querySelectorAll('.group-title').forEach(title=>title.hidden=(title.classList.contains('admin-title'))!==(activeRole==='admin'));document.querySelectorAll('.role-button').forEach(button=>{const on=button.dataset.role===activeRole;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});if(!screenMenu.querySelector(`[data-pick-screen="${index}"]`))renderScreenMenu(activeRole);document.querySelectorAll('.screen-wrap').forEach(item=>item.hidden=item!==wrap);document.querySelectorAll('.group-title').forEach(title=>title.hidden=(title.classList.contains('admin-title'))!==(activeRole==='admin'));screenMenu.querySelectorAll('.screen-menu-item').forEach(button=>{const on=Number(button.dataset.pickScreen)===index;button.classList.toggle('active',on);button.setAttribute('aria-pressed',String(on));});pickerCount.textContent=`Pantalla ${(index>=adminOffset?index-adminOffset:index)+1} de ${index>=adminOffset?adminDefs.length:studentDefs.length} \u00b7 Rol ${activeRole==='admin'?'Administrador':'Estudiante'}`;document.querySelector('.screen-count').textContent=pickerCount.textContent.split(' \u00b7 ')[0];if(scroll)wrap.scrollIntoView({behavior:'smooth',block:'start',inline:'center'});}
renderScreenMenu('student');
function go(index){
  const target=document.querySelector(`[data-screen="${index}"]`);
  if(!target){showToast('No se encontr\u00f3 esa pantalla.');return false;}
  pickScreen(index,false);
  document.querySelectorAll('.phone').forEach(p=>p.classList.remove('selected'));
  target.classList.add('selected');
  target.scrollIntoView({behavior:'smooth',block:'center',inline:navigateMode?'center':'nearest'});
  return true;
}
pickScreen(0,false);
const loaderTimers=new Map();
function startLoader(index){
  const screen=document.querySelector(`[data-screen="${index}"]`);
  if(!screen)return;
  const bar=screen.querySelector('.progress span');
  const pct=screen.querySelector('.pct');
  if(!bar||!pct)return;
  if(loaderTimers.has(index))clearTimeout(loaderTimers.get(index));
  bar.style.transition='none';bar.style.width='0%';pct.textContent='0%';
  requestAnimationFrame(()=>{bar.style.transition='width 2s ease';bar.style.width='100%';});
  const timer=setTimeout(()=>{
    pct.textContent='100%';
    if(screen.classList.contains('selected'))go(index===3?4:adminOffset+2);
    loaderTimers.delete(index);
  },2100);
  loaderTimers.set(index,timer);
}
function showToast(message){
  let toast=document.querySelector('.toast');
  if(!toast){toast=document.createElement('div');toast.className='toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.appendChild(toast);}
  toast.textContent=message;toast.classList.add('visible');
  clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove('visible'),2800);
}
function validateFields(root){
  let valid=true,firstInvalid=null,issue='Completa los campos marcados.';
  root.querySelectorAll('input[required],select[required]').forEach(field=>{
    const label=field.closest('.field')?.querySelector('label')?.textContent.trim().toUpperCase()||'';
    const empty=!field.value.trim();
    const badEmail=label.includes('CORREO')&&field.value.trim()&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    field.classList.toggle('invalid',empty||badEmail);
    if(empty||badEmail){valid=false;firstInvalid ||= field;if(badEmail)issue='Revisa el correo electr\u00f3nico.';}
  });
  const password=root.querySelector('[data-password]');
  const confirmation=root.querySelector('[data-confirm-password]');
  if(password&&confirmation&&password.value!==confirmation.value){confirmation.classList.add('invalid');valid=false;firstInvalid ||= confirmation;issue='Las contrase\u00f1as no coinciden.';}
  if(!valid){firstInvalid?.focus();showToast(issue);}
  return valid;
}
function safeText(value){return value.replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
document.addEventListener('click',event=>{
  const control=event.target.closest('button,a');
  if(!control||control.disabled)return;
  if(control.dataset.go!==undefined){
    event.preventDefault();
    if(control.classList.contains('submit-action')&&!validateFields(control.closest('.phone')))return;
    const index=Number(control.dataset.go);
    if(go(index)&&(index===3||index===adminOffset+1))startLoader(index);
  }
  if(control.dataset.role){const firstScreen=control.dataset.role==='admin'?adminOffset:0;renderScreenMenu(control.dataset.role);document.querySelectorAll('.phone').forEach(phone=>phone.classList.remove('selected'));pickScreen(firstScreen,false);}
  if(control.dataset.pickScreen!==undefined){go(Number(control.dataset.pickScreen));}
  if(control.dataset.forgot!==undefined){event.preventDefault();showToast('Si el correo est\u00e1 registrado, recibir\u00e1s instrucciones para recuperar tu contrase\u00f1a.');}
  if(control.dataset.contact!==undefined){event.preventDefault();showToast('Escr\u00edbenos a contacto@sicpes.mx para recibir asesor\u00eda.');}
  if(control.classList.contains('eye')){
    const input=control.parentElement.querySelector('input');
    input.type=input.type==='password'?'text':'password';
    control.textContent=input.type==='password'?'?':'?';
    control.setAttribute('aria-label',input.type==='password'?'Mostrar contrase\u00f1a':'Ocultar contrase\u00f1a');
  }
  if(control.classList.contains('choice')){
    control.closest('.choice-grid').querySelectorAll('.choice').forEach(choice=>choice.classList.remove('selected'));
    control.classList.add('selected');
  }
  if(control.classList.contains('social'))showToast(`Acceso de demostraci\u00f3n con ${control.textContent.trim()}.`);
  if(control.classList.contains('tab')){
    const page=control.closest('.page-content');
    page.querySelectorAll('.tab').forEach(tab=>tab.classList.remove('active'));
    control.classList.add('active');
    const filter=Number(control.dataset.filter);
    page.querySelectorAll('.admin-card[data-status]').forEach(card=>card.style.display=filter===0||Number(card.dataset.status)===filter?'':'none');
  }
  if(control.dataset.section!==undefined)go(Number(control.dataset.section));
  if(control.id==='viewAll'){
    navigateMode=false;document.body.classList.remove('nav-mode');
    document.querySelectorAll('.phone').forEach(phone=>phone.classList.remove('selected'));
    document.querySelectorAll('.screen-wrap,.group-title').forEach(item=>item.hidden=false);
    document.querySelector('.screen-count').textContent='21 pantallas';pickerCount.textContent='21 pantallas \u00b7 Todos los roles';activeScreen=null;
    document.querySelectorAll('.tool-btn').forEach(button=>button.classList.remove('active'));
    control.classList.add('active');
  }
  if(control.id==='navMode'){
    navigateMode=true;document.body.classList.add('nav-mode');
    document.querySelectorAll('.tool-btn').forEach(button=>button.classList.remove('active'));
    control.classList.add('active');
  }
  if(control.dataset.requestPayment!==undefined){
    control.disabled=true;control.textContent='Solicitud enviada';
    const badge=control.closest('.card').querySelector('.badge');
    if(badge){badge.classList.remove('amber');badge.textContent='SOLICITADO';}
    showToast('Tu solicitud de pago qued\u00f3 registrada.');
  }
  if(control.dataset.viewPayment!==undefined)showToast('Comprobante de pago disponible para revisi\u00f3n.');
  if(control.dataset.saveConfig!==undefined){
    const card=control.closest('.form-card');
    if(!validateFields(card))return;
    const values=[...card.querySelectorAll('input')];
    const prices=card.parentElement.querySelectorAll('.price-tile b');
    values.slice(0,2).forEach((field,index)=>{if(prices[index])prices[index].innerHTML=`${safeText(field.value)} <small>/ mes</small>`;});
    showToast('Configuraci\u00f3n guardada correctamente.');
  }
  if(control.dataset.remove!==undefined){control.closest('.admin-card')?.remove();showToast('Piso eliminado.');}
  if(control.dataset.addFloor!==undefined){
    const form=control.closest('.form-card');
    if(!validateFields(form))return;
    const inputs=form.querySelectorAll('input');
    const rooms=[...new Set(inputs[1].value.split(',').map(room=>room.trim()).filter(Boolean))];
    if(!rooms.length){inputs[1].classList.add('invalid');inputs[1].focus();showToast('Escribe al menos una habitaci\u00f3n.');return;}
    const row=document.createElement('div');row.className='card admin-card';
    const chips=rooms.map(room=>`<span class="room-chip">${safeText(room)}</span>`).join('');
    row.innerHTML=`<div class="floor-head"><strong>${safeText(inputs[0].value)}</strong><span class="badge">${rooms.length} habitaciones</span></div><div class="room-chips">${chips}</div><button class="btn red" data-remove>Eliminar piso</button>`;
    document.querySelector('.floor-list').prepend(row);inputs.forEach(input=>input.value='');showToast('Piso agregado correctamente.');
  }
});
document.addEventListener('input',event=>{
  const field=event.target;
  if(field.matches('input,select'))field.classList.remove('invalid');
  if(field.matches('.search input')){
    const query=field.value.trim().toLocaleLowerCase('es');
    field.closest('.page-content').querySelectorAll('.admin-card[data-status]').forEach(card=>card.style.display=card.textContent.toLocaleLowerCase('es').includes(query)?'':'none');
  }
});
document.addEventListener('change',event=>{if(event.target.matches('select'))event.target.classList.remove('invalid');});
