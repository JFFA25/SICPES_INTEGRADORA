/* Pencil renderer using declarative specs */
(function () {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const PEN = '#111111';
  const RED = '#D32F2F';
  const BLUE = '#80DEEA';
  const YELLOW = '#FFF176';

  const state = { role: 'student', platform: 'mobile', activeIndex: 0, sheets: [] };

  const META = {
    landing:{code:'E1',title:'LANDING',sketch:1}, studentLogin:{code:'E2',title:'INICIAR SESIÓN',sketch:2}, forgotPassword:{code:'E3',title:'RECUPERAR CONTRASEÑA',sketch:3}, register:{code:'E4',title:'CREAR CUENTA',sketch:4}, verifyEmail:{code:'E5',title:'VERIFICAR CORREO',sketch:5}, loading:{code:'E6',title:'SINCRONIZANDO',sketch:6}, home:{code:'E7',title:'INICIO',sketch:7}, reserve:{code:'E8',title:'RESERVAR HABITACIÓN',sketch:8}, roomDetail:{code:'E9',title:'DETALLE DE HABITACIÓN',sketch:9}, requestStatus:{code:'E10',title:'ESTADO DE MI PETICIÓN',sketch:10}, payments:{code:'E11',title:'GESTIÓN DE PAGOS',sketch:11}, paymentDetail:{code:'E12',title:'DETALLE DE PAGO',sketch:12}, rateService:{code:'E13',title:'EVALUAR EL SERVICIO',sketch:13}, rateConfirm:{code:'E14',title:'EVALUACIÓN ENVIADA',sketch:14}, profile:{code:'E15',title:'CUENTA / PERFIL',sketch:15},
    adminLogin:{code:'A1',title:'ACCESO ADMINISTRADOR',sketch:16}, reservations:{code:'A2',title:'RESERVACIONES',sketch:17}, assignRoom:{code:'A3',title:'ASIGNAR HABITACIÓN',sketch:18}, pendingPayments:{code:'A4',title:'PAGOS PENDIENTES',sketch:19}, validatePayment:{code:'A5',title:'VALIDAR PAGO',sketch:20}, debts:{code:'A6',title:'ADEUDOS',sketch:21}, floors:{code:'A7',title:'PISOS',sketch:22}, settings:{code:'A8',title:'CONFIGURACIÓN GLOBAL',sketch:23}
  };

  const IDS_ST = ['landing','studentLogin','forgotPassword','register','verifyEmail','loading','home','reserve','roomDetail','requestStatus','payments','paymentDetail','rateService','rateConfirm','profile'];
  const IDS_AD = ['adminLogin','reservations','assignRoom','pendingPayments','validatePayment','debts','floors','settings'];

  function getR(svg){
    const g=rough.svg(svg);const w={};
    ['rectangle','line','circle','ellipse','path','polygon','linearPath','curve','arc'].forEach(function(k){
      w[k]=function(){const n=g[k].apply(g,arguments);svg.appendChild(n);return n;};
    });
    return w;
  }
  function penRect(r,x,y,w,h,o){o=o||{};r.rectangle(x,y,w,h,{stroke:o.stroke||PEN,strokeWidth:o.strokeWidth||2.2,roughness:o.roughness||1.0,bowing:o.bowing||0.8,fill:o.fill,fillStyle:o.fill?'hachure':undefined,fillWeight:o.fillWeight||1.2,hachureAngle:o.hachureAngle||-45,hachureGap:o.hachureGap||4});}
  function penLine(r,x1,y1,x2,y2,o){o=o||{};r.line(x1,y1,x2,y2,{stroke:o.stroke||PEN,strokeWidth:o.strokeWidth||2.0,roughness:o.roughness||0.9,bowing:o.bowing||0.7});}
  function txt(svg,x,y,t,s,w){const e=document.createElementNS(SVG_NS,'text');e.setAttribute('x',x);e.setAttribute('y',y);e.setAttribute('font-family','Caveat, Patrick Hand, cursive');e.setAttribute('font-size',s||18);e.setAttribute('font-weight',w||700);e.setAttribute('fill',PEN);e.textContent=t||'';svg.appendChild(e);return e;}

  function prim(r,svg,p){
    if(p.type==='browserFrame'){penRect(r,p.x,p.y,p.w,p.h,{strokeWidth:2.2});penLine(r,p.x,p.y+26,p.x+p.w,p.y+26,{strokeWidth:2.0});penLine(r,p.x+14,p.y+13,p.x+22,p.y+13,{strokeWidth:2.4});penLine(r,p.x+30,p.y+13,p.x+38,p.y+13,{strokeWidth:2.4});penLine(r,p.x+46,p.y+13,p.x+54,p.y+13,{strokeWidth:2.4});penRect(r,p.x+72,p.y+8,p.w-140,14,{strokeWidth:1.8});txt(svg,p.x+80,p.y+19,'app.sicpes.mx',10,700);}
    else if(p.type==='phoneFrame'){penRect(r,p.x,p.y,p.w,p.h,{strokeWidth:2.2});r.rectangle(p.x+8,p.y+8,p.w-16,p.h-16,{stroke:PEN,strokeWidth:1.8,roughness:1.0});penLine(r,p.x+p.w/2-26,p.y+6,p.x+p.w/2+26,p.y+6,{strokeWidth:1.8});}
    else if(p.type==='sideNav'){r.rectangle(p.x,p.y,p.w,p.h||680,{stroke:PEN,strokeWidth:2.0,roughness:1.0});(p.items||[]).forEach((it,i)=>{txt(svg,p.x+12,p.y+30+i*26,it,14,700);});}
    else if(p.type==='header'){r.rectangle(p.x,p.y,p.w,p.h,{stroke:'none',fill:BLUE,fillStyle:'solid',roughness:0.6});txt(svg,p.x+12,p.y+18,p.label||'SICPES',16,700);}
    else if(p.type==='title'){txt(svg,p.x,p.y,p.text||'',p.size||28,700);}
    else if(p.type==='subtitle'){txt(svg,p.x,p.y,p.text||'',p.size||16,700);}
    else if(p.type==='paragraph'){for(let i=0;i<(p.lines||3);i++){const len=(p.w||200)*(0.6+Math.random()*0.35);const yy=p.y+i*10;const path=document.createElementNS(SVG_NS,'path');const mx=p.x+len/2+(Math.random()-0.5)*6;path.setAttribute('d',`M ${p.x+(Math.random()-0.5)*2} ${yy} Q ${mx} ${yy+(Math.random()-0.5)*3} ${p.x+len+(Math.random()-0.5)*2} ${yy}`);path.setAttribute('fill','none');path.setAttribute('stroke',PEN);path.setAttribute('stroke-width','2.0');path.setAttribute('stroke-linecap','round');svg.appendChild(path);}}
    else if(p.type==='image'){penRect(r,p.x,p.y,p.w,p.h,{strokeWidth:2.2});r.rectangle(p.x+3,p.y+3,p.w-6,p.h-6,{stroke:'none',fill:YELLOW,fillStyle:'solid',roughness:0.6});penLine(r,p.x,p.y,p.x+p.w,p.y+p.h,{strokeWidth:2.0});penLine(r,p.x+p.w,p.y,p.x,p.y+p.h,{strokeWidth:2.0});}
    else if(p.type==='field'){txt(svg,p.x,p.y-4,p.label||'',13,700);penRect(r,p.x,p.y,p.w,24,{strokeWidth:1.8});}
    else if(p.type==='button'){if(p.style==='hatched'){r.rectangle(p.x,p.y,p.w,p.h,{stroke:PEN,strokeWidth:2.2,fill:PEN,fillStyle:'hachure',fillWeight:1.6,hachureAngle:-45,hachureGap:3,roughness:1.0});}else{penRect(r,p.x,p.y,p.w,p.h,{strokeWidth:2.2});}txt(svg,p.x+p.w/2,p.y+p.h/2+6,p.text||'',p.style==='hatched'?16:16,700);const t=svg.lastChild;if(t)t.setAttribute('text-anchor','middle');if(p.style==='hatched')t.setAttribute('fill','#fff');}
    else if(p.type==='card'){penRect(r,p.x,p.y,p.w,p.h,{strokeWidth:2.0});}
    else if(p.type==='table'){penRect(r,p.x,p.y,p.w,26,{strokeWidth:2.0});(p.headers||[]).forEach((h,i)=>{txt(svg,p.x+10+i*90,p.y+18,h,13,700);});(p.rows||[]).forEach((row,ri)=>{penLine(r,p.x,p.y+26+ri*34,p.x+p.w,p.y+26+ri*34,{strokeWidth:1.8});row.forEach((cell,ci)=>{txt(svg,p.x+10+ci*90,p.y+26+ri*34+20,String(cell),14,700);});});}
    else if(p.type==='tabs'){(p.items||[]).forEach((it,i)=>{const x=p.x+i*90;if(i===p.active){r.rectangle(x,p.y,80,22,{stroke:PEN,strokeWidth:2.0,fill:PEN,fillStyle:'hachure',fillWeight:1.4,hachureAngle:-45,hachureGap:3,roughness:1.0});txt(svg,x+40,p.y+15,it,14,700);const t=svg.lastChild;t.setAttribute('text-anchor','middle');t.setAttribute('fill','#fff');}else{penRect(r,x,p.y,80,22,{strokeWidth:2.0});txt(svg,x+40,p.y+15,it,14,700);const t=svg.lastChild;t.setAttribute('text-anchor','middle');}});}
    else if(p.type==='bottomNav'){r.rectangle(p.x,p.y,p.w,40,{stroke:PEN,strokeWidth:2.0,roughness:1.0});(p.items||[]).forEach((it,i)=>{const iw=p.w/(p.items.length||4);if(i===p.active){r.rectangle(p.x+i*iw+8,p.y+4,iw-16,32,{stroke:PEN,strokeWidth:2.0,fill:PEN,fillStyle:'hachure',fillWeight:1.2,hachureAngle:-45,hachureGap:3,roughness:1.0});txt(svg,p.x+i*iw+iw/2,p.y+24,it,12,700);const t=svg.lastChild;t.setAttribute('text-anchor','middle');t.setAttribute('fill','#fff');}else{txt(svg,p.x+i*iw+iw/2,p.y+24,it,12,700);const t=svg.lastChild;t.setAttribute('text-anchor','middle');}});}
    else if(p.type==='chip'){penRect(r,p.x,p.y,p.w||70,p.h||18,{strokeWidth:2.0});txt(svg,p.x+8,p.y+13,p.text||'',12,700);}
    else if(p.type==='list'){(p.items||[]).forEach((it,i)=>{r.circle(p.x+6,p.y+i*18+6,4,{stroke:PEN,strokeWidth:1.8});txt(svg,p.x+18,p.y+i*18+12,it,14,700);});}
    else if(p.type==='note'){const ax=p.target&&p.target.x||p.x-40, ay=p.target&&p.target.y||p.y;const path=document.createElementNS(SVG_NS,'path');path.setAttribute('d',`M ${ax} ${ay} Q ${(ax+p.x)/2} ${(ay+p.y)/2 - 10} ${p.x} ${p.y}`);path.setAttribute('fill','none');path.setAttribute('stroke',p.color||RED);path.setAttribute('stroke-width','2.2');path.setAttribute('stroke-linecap','round');svg.appendChild(path);const marker=document.createElementNS(SVG_NS,'marker');marker.setAttribute('id','arr'+Math.random());marker.setAttribute('markerWidth','8');marker.setAttribute('markerHeight','6');marker.setAttribute('refX','7');marker.setAttribute('refY','3');marker.setAttribute('orient','auto');const pm=document.createElementNS(SVG_NS,'path');pm.setAttribute('d','M0,0 L0,6 L8,3 z');pm.setAttribute('fill',p.color||RED);marker.appendChild(pm);if(!svg.querySelector('defs')){const d=document.createElementNS(SVG_NS,'defs');svg.appendChild(d);}svg.querySelector('defs').appendChild(marker);path.setAttribute('marker-end','url(#'+marker.getAttribute('id')+')');const t=txt(svg,p.x+6,p.y-2,p.text||'',p.size||16,700);t.setAttribute('fill',p.color||RED);}
  }

  const SHEET_SIZE={mobile:{w:420,h:960,label:'390 px · móvil'},pwa:{w:740,h:960,label:'1440 px · escritorio'}};
  function sheetSize(){return SHEET_SIZE[state.platform]||SHEET_SIZE.mobile;}
  function drawSheet(svg,id,platform){
    const spec=(window.PENCIL_SCREENS||{})[id];
    if(!spec){console.error('[pencil] FALTA DEFINIR',id);const t=txt(svg,200,200,'FALTA DEFINIR '+id,28,700);t.setAttribute('fill',RED);return;}
    platform=platform||state.platform;
    const isMobile=platform==='mobile';
    const tx=isMobile?25:20;
    const g=document.createElementNS(SVG_NS,'g');
    g.setAttribute('transform','translate('+tx+',60)');
    svg.appendChild(g);
    const r=getR(g);
    const parts=isMobile?spec.mobile:spec.desktop;
    if(parts){parts.forEach(p=>prim(r,g,p));}
    const roleLabel=META[id]&&META[id].role||(id==='loading'?'Compartido':(state.role==='student'?'Estudiante':'Administrador'));
    txt(svg,20,34,`SICPES · ${META[id]&&META[id].code||''} ${META[id]&&META[id].title||id}`,16,700);
    txt(svg,20,54,`Sketch #${META[id]&&META[id].sketch||''} · ${roleLabel}`,14,700);
    txt(svg,20,944,isMobile?'390 px · móvil':'1440 px · escritorio',16,700);
  }

  function getSheets(){const ids=state.role==='student'?IDS_ST:IDS_AD;return ids.map(id=>({id,...(META[id]||{}),role:id==='loading'?'Compartido':(state.role==='student'?'Estudiante':'Administrador')}));}
  function renderGallery(){const g=document.getElementById('pencilGallery');if(!g)return;g.innerHTML='';if(typeof rough==='undefined'){g.innerHTML='<p style="color:#f5f7fa;font-family:sans-serif">No se pudo cargar rough.min.js. Verifica que el archivo exista junto a index.html.</p>';return;}const sheets=getSheets();state.sheets=sheets;const size=sheetSize();sheets.forEach((sheet,idx)=>{const el=document.createElement('article');el.className='pencil-sheet'+(idx===state.activeIndex?' active':'');el.tabIndex=0;el.dataset.screen=sheet.id;const h=document.createElement('div');h.className='pencil-sheet-header';h.innerHTML=`<span class="pencil-sheet-topline">SICPES · ${sheet.code} ${sheet.title}</span><span class="pencil-sheet-subline">Sketch #${sheet.sketch} · ${state.platform==='mobile'?'Móvil':'PWA'}</span>`;el.appendChild(h);const fw=document.createElement('div');fw.className='pencil-sheet-frame';const svg=document.createElementNS(SVG_NS,'svg');svg.setAttribute('viewBox',`0 0 ${size.w} ${size.h}`);svg.setAttribute('preserveAspectRatio','xMidYMid meet');svg.setAttribute('width','100%');svg.setAttribute('height','100%');const bg=document.createElementNS(SVG_NS,'rect');bg.setAttribute('x','0');bg.setAttribute('y','0');bg.setAttribute('width',size.w);bg.setAttribute('height',size.h);bg.setAttribute('fill','#ffffff');svg.appendChild(bg);drawSheet(svg,sheet.id,state.platform);fw.appendChild(svg);el.appendChild(fw);el.addEventListener('click',()=>openModal(idx));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openModal(idx);}});g.appendChild(el);});}
  function renderModal(){const ms=document.getElementById('pencilModalSheet');if(!ms)return;ms.innerHTML='';const sheet=state.sheets[state.activeIndex];if(!sheet)return;const size=sheetSize();const svg=document.createElementNS(SVG_NS,'svg');svg.setAttribute('viewBox',`0 0 ${size.w} ${size.h}`);svg.setAttribute('preserveAspectRatio','xMidYMid meet');svg.setAttribute('width','100%');svg.setAttribute('height','auto');const bg=document.createElementNS(SVG_NS,'rect');bg.setAttribute('x','0');bg.setAttribute('y','0');bg.setAttribute('width',size.w);bg.setAttribute('height',size.h);bg.setAttribute('fill','#ffffff');svg.appendChild(bg);drawSheet(svg,sheet.id,state.platform);ms.appendChild(svg);document.getElementById('pencilModalTitle').textContent=sheet.title;document.getElementById('pencilModalCode').textContent=sheet.code;document.getElementById('pencilModalRole').textContent=(sheet.role||'')+(state.platform==='mobile'?' · Móvil':' · PWA');}
  function syncActiveSheet(){document.querySelectorAll('.pencil-sheet').forEach((x,j)=>x.classList.toggle('active',j===state.activeIndex));}
  function openModal(i){state.activeIndex=i;renderModal();document.getElementById('pencilModal').hidden=false;syncActiveSheet();}
  function closeModal(){document.getElementById('pencilModal').hidden=true;}
  function nav(d){if(!state.sheets.length)return;state.activeIndex=(state.activeIndex+d+state.sheets.length)%state.sheets.length;renderModal();syncActiveSheet();}
  function scrollActive(){const el=document.querySelector(`.pencil-sheet[data-screen="${state.sheets[state.activeIndex]&&state.sheets[state.activeIndex].id}"]`);if(el&&el.scrollIntoView)el.scrollIntoView({block:'nearest',behavior:'smooth'});}
  function syncPencilButtons(){
    document.querySelectorAll('[data-pencil-role]').forEach(x=>x.classList.toggle('active',x.dataset.pencilRole===state.role));
    document.querySelectorAll('[data-pencil-platform]').forEach(x=>x.classList.toggle('active',x.dataset.pencilPlatform===state.platform));
  }
  function showScreen(id, role, platform, options){
    options=options||{};
    if(role==='student'||role==='admin')state.role=role;
    if(platform==='mobile'||platform==='pwa')state.platform=platform;
    syncPencilButtons();
    renderGallery();
    const idx=state.sheets.findIndex(s=>s.id===id);
    if(idx>=0){
      state.activeIndex=idx;
      syncActiveSheet();
      if(options.modal)openModal(idx);else scrollActive();
    }
  }
  function svgToPng(svg,fn){const ser=new XMLSerializer();let s=ser.serializeToString(svg);if(!s.match(/^<svg[^>]+xmlns=/))s=s.replace(/^<svg/,'<svg xmlns="http://www.w3.org/2000/svg"');const blob=new Blob([s],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob);const img=new Image();img.onload=function(){const c=document.createElement('canvas');const sc=2;c.width=(img.width||1500)*sc;c.height=(img.height||960)*sc;const ctx=c.getContext('2d');ctx.fillStyle='#ffffff';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(img,0,0,c.width,c.height);const a=document.createElement('a');a.download=fn;a.href=c.toDataURL('image/png');a.click();URL.revokeObjectURL(url);};img.src=url;}
  function dlCur(){const sheet=state.sheets[state.activeIndex];if(!sheet)return;const size=sheetSize();const svg=document.createElementNS(SVG_NS,'svg');svg.setAttribute('viewBox',`0 0 ${size.w} ${size.h}`);svg.setAttribute('width',size.w);svg.setAttribute('height',size.h);svg.setAttribute('xmlns',SVG_NS);const bg=document.createElementNS(SVG_NS,'rect');bg.setAttribute('x','0');bg.setAttribute('y','0');bg.setAttribute('width',size.w);bg.setAttribute('height',size.h);bg.setAttribute('fill','#ffffff');svg.appendChild(bg);drawSheet(svg,sheet.id,state.platform);svgToPng(svg,`sicpes-sketch-${sheet.code}.png`);}
  async function dlAll(){const sheets=state.sheets;for(let i=0;i<sheets.length;i++){const size=sheetSize();const svg=document.createElementNS(SVG_NS,'svg');svg.setAttribute('viewBox',`0 0 ${size.w} ${size.h}`);svg.setAttribute('width',size.w);svg.setAttribute('height',size.h);svg.setAttribute('xmlns',SVG_NS);const bg=document.createElementNS(SVG_NS,'rect');bg.setAttribute('x','0');bg.setAttribute('y','0');bg.setAttribute('width',size.w);bg.setAttribute('height',size.h);bg.setAttribute('fill','#ffffff');svg.appendChild(bg);drawSheet(svg,sheets[i].id,state.platform);svgToPng(svg,`sicpes-sketch-${sheets[i].code}.png`);await new Promise(r=>setTimeout(r,150));}}

  function init(){
    document.querySelectorAll('[data-pencil-role]').forEach(b=>b.addEventListener('click',()=>{state.role=b.dataset.pencilRole;state.activeIndex=0;syncPencilButtons();renderGallery();}));
    document.querySelectorAll('[data-pencil-platform]').forEach(b=>b.addEventListener('click',()=>{state.platform=b.dataset.pencilPlatform;syncPencilButtons();renderGallery();}));
    document.querySelectorAll('[data-pencil-close]').forEach(b=>b.addEventListener('click',closeModal));
    const d1=document.getElementById('pencilDownloadOne');if(d1)d1.addEventListener('click',dlCur);
    const da=document.getElementById('pencilDownloadAll');if(da)da.addEventListener('click',dlAll);
    const np=document.getElementById('pencilNavPrev');const nn=document.getElementById('pencilNavNext');if(np)np.addEventListener('click',()=>nav(-1));if(nn)nn.addEventListener('click',()=>nav(1));
    window.addEventListener('keydown',e=>{const m=document.getElementById('pencilModal');if(m&&!m.hidden){if(e.key==='Escape'){e.preventDefault();closeModal();}if(e.key==='ArrowRight'){e.preventDefault();nav(1);}if(e.key==='ArrowLeft'){e.preventDefault();nav(-1);}}});
    renderGallery();
  }
  window.SicpesSketches={
    showScreen:showScreen,
    getScreen:function(){return state.sheets[state.activeIndex]?state.sheets[state.activeIndex].id:'landing';},
    getRole:function(){return state.role;},
    getPlatform:function(){return state.platform;},
    closeModal:closeModal
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();