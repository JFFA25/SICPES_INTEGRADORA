/* ============================================================
   Datos del Business Model Canvas de SICPES
   Fuente única de contenido para index.html y script.js
   ============================================================ */

(function () {
  'use strict';

  var svg = function (inner) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" ' +
      'stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">' +
      inner + '</svg>';
  };

  var icons = {
    'link': svg(
      '<path d="M10 13.5a4.5 4.5 0 0 0 6.36 0l2.5-2.5a4.5 4.5 0 0 0-6.36-6.36l-1.2 1.2"/>' +
      '<path d="M14 10.5a4.5 4.5 0 0 0-6.36 0l-2.5 2.5a4.5 4.5 0 0 0 6.36 6.36l1.2-1.2"/>'
    ),
    'check-square': svg(
      '<rect x="4" y="4" width="16" height="16" rx="3"/>' +
      '<path d="m8.5 12 2.5 2.5 4.5-5"/>'
    ),
    'database': svg(
      '<ellipse cx="12" cy="6.5" rx="7" ry="3"/>' +
      '<path d="M5 6.5v11c0 1.66 3.13 3 7 3s7-1.34 7-3v-11"/>' +
      '<path d="M19 12c0 1.66-3.13 3-7 3s-7-1.34-7-3"/>'
    ),
    'star': svg(
      '<path d="m12 4.5 2.35 4.76 5.25.76-3.8 3.7.9 5.23L12 16.5l-4.7 2.45.9-5.23-3.8-3.7 5.25-.76L12 4.5Z"/>'
    ),
    'message-circle': svg(
      '<path d="M20 11.7a7.6 7.6 0 0 1-11 6.76L4.2 19.8l1.34-4.6A7.6 7.6 0 1 1 20 11.7Z"/>' +
      '<path d="M9.4 11.6h.01M12 11.6h.01M14.6 11.6h.01"/>'
    ),
    'wifi': svg(
      '<path d="M3.5 9.3a13 13 0 0 1 17 0"/>' +
      '<path d="M6.6 12.8a8.4 8.4 0 0 1 10.8 0"/>' +
      '<path d="M9.7 16.2a3.9 3.9 0 0 1 4.6 0"/>' +
      '<path d="M12 19.6h.01"/>'
    ),
    'users': svg(
      '<path d="M15.5 19.5v-1.2a3.6 3.6 0 0 0-3.6-3.6H7.6A3.6 3.6 0 0 0 4 18.3v1.2"/>' +
      '<circle cx="9.75" cy="8" r="3.4"/>' +
      '<path d="M20 19.5v-1.2a3.6 3.6 0 0 0-2.7-3.5"/>' +
      '<path d="M15.4 4.7a3.4 3.4 0 0 1 0 6.6"/>'
    ),
    'trending-up': svg(
      '<path d="M3.5 16.5 9 11l3.5 3.5L20 7"/>' +
      '<path d="M15.5 6.8H20v4.5"/>'
    ),
    'credit-card': svg(
      '<rect x="3" y="5.5" width="18" height="13" rx="2.5"/>' +
      '<path d="M3 10h18"/>' +
      '<path d="M6.8 14.4h3"/>'
    ),
    'chevron': svg(
      '<path d="M9 5.5 16 12l-7 6.5"/>'
    )
  };

  var blocks = [
    {
      id: 'partners',
      title: 'Socios clave',
      subtitle: 'Key Partners',
      icon: 'link',
      summary: 'Arrendadores, institución y equipo',
      logo: { src: '../images/SICPES_Empresa.png', alt: 'Logotipo de la empresa SICPES', label: 'Empresa' },
      highlights: [
        'Arrendadores publican y mantienen sus inmuebles.',
        'Estudiantes recomendados y personal de la institución difunden.',
        'Equipo técnico y correo SMTP sostienen la aplicación.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Los socios clave son las personas u organizaciones que aportan capacidades necesarias para prestar el servicio y sostener el sistema. En una pensión, quien administra el alojamiento define las reglas, los cupos y los procesos; quien es dueño de la casa o pensión aporta el inmueble y su información.', 'El repositorio describe un proyecto de software y no acredita convenios firmados, proveedores contratados ni una institución operadora específica. Por eso, las colaboraciones externas deben entenderse como roles posibles por confirmar.'] },
        { title: '¿Cómo se relaciona con SICPES?', paragraphs: ['El equipo técnico construye y mantiene la aplicación, su API y su base de datos. Los arrendadores y propietarios publican sus casas o pensiones y mantienen actualizados los datos de habitaciones, cupos y precios. El personal de la institución educativa puede apoyar con la validación, la difusión y la coordinación.', 'Los estudiantes recomendados también participan: recomiendan la pensión y ayudan a que otros alumnos la conozcan (referidos). Si se habilitan avisos por correo, hará falta una cuenta SMTP operativa; el proyecto no confirma un proveedor ni un contrato.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Antes de iniciar un periodo de alojamiento, la administración revisaría los campos de registro y las reglas de reserva con el equipo técnico, mientras el arrendador carga la información de su inmueble. Juntos podrían comprobar que los datos necesarios se capturen y que el personal entienda cómo consultar los movimientos.', 'La institución, el servicio de correo y cualquier proveedor tecnológico son participantes potenciales; su selección y responsabilidades tendrían que acordarse para una implementación real.'] }
      ],
      image: 'partners.jpg', imageAlt: 'Estudiantes universitarios colaboran alrededor de una mesa en un edificio del campus.', caption: 'Foto referencial de colaboración estudiantil; no representa una alianza confirmada con SICPES.',
      metric: '5 tipos de socios',
      points: [
        { label: 'Arrendadores y propietarios', detail: 'Dueños de casas y pensiones que aportan los inmuebles que se publican y su información: habitaciones, cupos, precios y reglas.' },
        { label: 'Estudiantes recomendados', detail: 'Alumnos que recomiendan la pensión y traen a otros compañeros (referidos); apoyan la difusión entre estudiantes.' },
        { label: 'Trabajadores de la institución', detail: 'Personal de la institución educativa que apoya con validación, difusión y coordinación entre la escuela y las pensiones.' },
        { label: 'Equipo de desarrollo', detail: 'Construye, mantiene y revisa SICPES; la dedicación y el responsable de operación deben definirse.' },
        { label: 'Proveedor de correo (SMTP)', detail: 'Podría enviar avisos si la institución habilita y mantiene un servicio SMTP; no se confirma un proveedor contratado.' }
      ]
    },
    {
      id: 'activities',
      title: 'Actividades clave',
      subtitle: 'Key Activities',
      icon: 'check-square',
      summary: 'Reservas, pagos, reportes y soporte',
      highlights: [
        'El estudiante solicita; la administración aprueba o rechaza.',
        'Se da seguimiento a rentas, servicios y reparaciones.',
        'Los reportes reúnen citas, pagos y rentas.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Las actividades clave son el trabajo recurrente que permite entregar el servicio y mantener sus herramientas en condiciones útiles. Para SICPES hay dos frentes relacionados: operar la pensión —reservas, estancias, rentas y servicios— y mantener la aplicación que organiza esos registros.', 'El software puede apoyar el control, pero las decisiones sobre admisión, cupos, fechas y ajustes de cuenta pertenecen a quien administra el albergue y al arrendador.'] },
        { title: '¿Cómo funciona en SICPES?', paragraphs: ['El flujo de una reserva es: el estudiante solicita el cuarto, la administración revisa la solicitud y la aprueba o rechaza, y al confirmarse se registra la estancia. El sistema evita duplicar movimientos y no permite exceder el cupo disponible.', 'Además de la renta, se registran los pagos de servicios (luz, agua, internet) y las solicitudes de servicios o reparaciones: el estudiante reporta una falla y el arrendador o la administración la atiende y da seguimiento. Al concluir la estancia, el estudiante puede calificar de 1 a 5 y dejar un comentario.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Antes de reservar, un estudiante puede buscar una cita para visitar el inmueble y conocerlo. Si solicita la estancia, el personal revisa la información y la disponibilidad antes de aprobarla según las reglas locales, y al confirmarse queda registrada sin duplicarse.', 'Durante el alojamiento se capturan los pagos de renta y de servicios, y cualquier reparación se registra con su seguimiento. Al cierre, la administración revisa los registros consolidados y las evaluaciones disponibles; la revisión de respaldos y errores de la aplicación es una tarea técnica complementaria.'] }
      ],
      image: 'activities.jpg', imageAlt: 'Estudiantes trabajan en equipo frente a una computadora portátil en la universidad.', caption: 'Foto referencial de trabajo estudiantil asociado a las actividades del albergue.',
      metric: '6 actividades',
      points: [
        { label: 'Desarrollo y mantenimiento', detail: 'Evolución continua de la API REST, la app web/PWA y la base de datos.' },
        { label: 'Control de reservas', detail: 'El estudiante solicita; la administración revisa y aprueba o rechaza; al confirmarse se registra la estancia sin duplicar movimientos ni exceder el cupo.' },
        { label: 'Reportes y auditoría', detail: 'Búsqueda de citas para ver la reservación (visitas al inmueble antes de reservar) e historial de pagos y rentas, con exportación a PDF/Excel cuando está disponible.' },
        { label: 'Pagos de servicios', detail: 'Registro y seguimiento de los servicios (luz, agua, internet, etc.) además de la renta.' },
        { label: 'Solicitud de servicios y reparaciones', detail: 'El estudiante reporta una falla; el arrendador o la administración la atiende y da seguimiento al caso.' },
        { label: 'Retroalimentación', detail: 'Calificación de 1 a 5 y comentarios por estancia, con resultados agregados para la administración.' }
      ]
    },
    {
      id: 'resources',
      title: 'Recursos clave',
      subtitle: 'Key Resources',
      icon: 'database',
      summary: 'La app SICPES y los inmuebles',
      highlights: [
        'La app SICPES: PWA instalable, app móvil (sketches) y API REST.',
        'Modalidades de hospedaje e inmuebles registrados por arrendadores.',
        'Base técnica: MySQL, Node.js/Express, React/TypeScript y Nodemailer.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Los recursos clave son los activos que hacen posible prestar el servicio y operar SICPES: la propia aplicación, software, información, tiempo de trabajo y medios para alojar y mantener el sistema. En una pensión también cuentan los inmuebles, las modalidades de hospedaje y los datos correctos sobre residentes, habitaciones, periodos y pagos.', 'La existencia de código en el repositorio no garantiza que haya un servidor público, personal asignado o una base de datos operativa. Esos recursos dependen de la instalación y de quién se responsabilice de ella.'] },
        { title: '¿Cómo se relaciona con SICPES?', paragraphs: ['La aplicación SICPES se plantea en tres piezas: una PWA instalable que funciona desde el navegador, una app móvil (descrita en los sketches) que prioriza el uso del estudiante y una API REST que centraliza la lógica y la autenticación. En la parte técnica se usan MySQL para los datos, Node.js/Express para el servidor, React/TypeScript para la interfaz y Nodemailer para el correo.', 'Los inmuebles registrados por los arrendadores y las modalidades o planes de hospedaje (habitación individual, compartida, con o sin servicios incluidos) son recursos del servicio. La información requiere acceso limitado, captura cuidadosa y actualización por las personas responsables.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Para usar el sistema en una residencia, la instancia tendría que contar con una base de datos configurada y con los datos de habitaciones y usuarios que la administración autorice. La PWA y la API consultarían esos registros para presentar la información disponible según el perfil de acceso.', 'La capacidad del servidor, el mecanismo de respaldo y los responsables de soporte deben definirse para cada instalación; no se atribuyen a SICPES cifras de capacidad ni niveles de disponibilidad que no estén documentados.'] }
      ],
      image: 'resources.jpg', imageAlt: 'Estudiante trabaja en una computadora portátil con una aplicación en pantalla.', caption: 'Foto referencial de una computadora en uso; no muestra la aplicación real de SICPES.',
      metric: '4 grupos de recursos',
      points: [
        { label: 'La aplicación SICPES', detail: 'PWA instalable que funciona desde el navegador, app móvil (sketches) que prioriza el uso del estudiante y API REST que centraliza la lógica y la autenticación.' },
        { label: 'Modalidades o planes de hospedaje', detail: 'Habitación individual o compartida, con o sin servicios incluidos. Propuesta por definir según cada arrendador.' },
        { label: 'Inmuebles para renta', detail: 'Casas y pensiones registradas por los arrendadores, con habitaciones, cupos, precios y reglas.' },
        { label: 'Base técnica', detail: 'MySQL, Node.js/Express, React/TypeScript y Nodemailer para los datos, la lógica, la interfaz y el correo.' }
      ]
    },
    {
      id: 'value',
      title: 'Propuesta de valor',
      subtitle: 'Value Propositions',
      icon: 'star',
      summary: 'Registro, pagos y arrendadores',
      logo: { src: '../images/SICPES_Producto.png', alt: 'Logotipo de la aplicación SICPES', label: 'Producto' },
      highlights: [
        'Relaciona estudiantes, habitaciones y estancias.',
        'Ordena el seguimiento de pagos, rentas y adeudos.',
        'El arrendador publica y mantiene los datos de su inmueble.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['La propuesta de valor explica por qué el sistema resulta útil para los estudiantes que solicitan alojamiento, para los arrendadores que ofrecen sus inmuebles y para quienes administran la pensión. SICPES plantea reunir en un mismo flujo información que suele consultarse en distintas tareas: quién se hospeda, qué habitación ocupa y qué movimientos de pago se han registrado.', 'La ventaja esperada es tener un seguimiento más ordenado y consultable. No implica que el sistema elimine la atención personal ni que la información se mantenga correcta sin revisión.'] },
        { title: '¿Cómo funciona en SICPES?', paragraphs: ['El proyecto está orientado a registrar estudiantes, arrendadores, habitaciones, reservas, pagos y adeudos, y a ofrecer vistas para los perfiles de estudiante, arrendador y administración. El arrendador publica y mantiene los datos de su inmueble, mientras la administración valida la información, resuelve las excepciones y confirma las decisiones operativas.', 'Los avisos por correo y la exportación de reportes se consideran según lo documentado para la versión del proyecto; su disponibilidad requiere configuración. El personal conserva el criterio para validar datos antes de usarlos.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Una persona que busca hospedaje puede iniciar una solicitud o consultar la información de su estancia si su perfil y la versión instalada lo permiten. La administración revisa los datos, confirma según los cupos y reglas del albergue, y registra los pagos para dar seguimiento al saldo.', 'Si después se necesita aclarar un movimiento, contar con un historial organizado facilita ubicar el registro y conversar con la persona residente usando información común. Ese orden y trazabilidad son el valor que el sistema busca apoyar.'] }
      ],
      image: 'value.jpg', imageAlt: 'Estudiantes de intercambio acomodan sus pertenencias en una habitación compartida.', caption: 'Foto referencial de estudiantes en un alojamiento compartido; contexto del servicio que SICPES busca apoyar.',
      metric: '5 beneficios clave',
      points: [
        { label: 'Registro y reserva en línea', detail: 'El estudiante reserva su lugar sin formularios en papel ni desplazamientos innecesarios.' },
        { label: 'Pagos, rentas y adeudos', detail: 'Registra lo pendiente y guarda el historial de cada movimiento de renta o de servicios.' },
        { label: 'Entrada y salida fechadas', detail: 'Cada movimiento registra fecha y hora para el control interno del albergue.' },
        { label: 'Avisos automáticos', detail: 'Notificaciones por correo sobre reservas, pagos y estado de cuenta, si el correo está configurado.' },
        { label: 'Reportes para la administración', detail: 'Información consolidada de ocupación y pagos, exportable en PDF y Excel.' }
      ]
    },
    {
      id: 'relations',
      title: 'Relación con clientes',
      subtitle: 'Customer Relationships',
      icon: 'message-circle',
      summary: 'Autoservicio, arrendador y soporte',
      highlights: [
        'La atención combina uso del sistema y apoyo humano.',
        'El arrendador atiende su inmueble; la administración las excepciones.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Este bloque describe cómo se acompaña a estudiantes, arrendadores y responsables durante su interacción con la pensión. El trato incluye orientación previa, ayuda durante la estancia y resolución de preguntas sobre reservas, pagos o información registrada.', 'La relación no depende solo de una pantalla: el arrendador atiende las condiciones de su inmueble y la administración sigue siendo el punto de decisión para solicitudes especiales, correcciones y situaciones que requieren conocer las reglas del albergue.'] },
        { title: '¿Cómo funciona en SICPES?', paragraphs: ['La aplicación contempla perfiles de acceso para que el estudiante consulte o gestione la información disponible para su cuenta, el arrendador mantenga los datos de su inmueble y la administración supervise los registros operativos. El detalle de lo que cada perfil puede hacer depende de los permisos y funciones de la instalación.', 'Las notificaciones automáticas pueden complementar la comunicación cuando el servicio de correo está configurado. No reemplazan un canal de soporte humano ni aseguran que un mensaje haya sido leído; las consultas que requieren contexto deben dirigirse al personal responsable.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Si un residente detecta que un pago no aparece en su historial, puede informar el caso a la administración. El personal compara el comprobante y el registro correspondiente, corrige los datos si procede y comunica el resultado.', 'Una confirmación automática puede ayudar a dejar constancia de una acción rutinaria si esa función está habilitada. La respuesta ante excepciones y la decisión final siguen a cargo del equipo del albergue.'] }
      ],
      image: 'relations.jpg', imageAlt: 'Estudiante consulta en su celular el estado de su cuenta mientras conversa con otra persona.', caption: 'Foto referencial de atención y autoservicio; la persona retratada no representa a SICPES.',
      metric: '3 modalidades de atención',
      points: [
        { label: 'Autoservicio del estudiante', detail: 'El estudiante gestiona sus reservas y pagos sin intervención directa.' },
        { label: 'Atención del arrendador', detail: 'El arrendador responde por las condiciones de su inmueble y actualiza su información.' },
        { label: 'Soporte administrativo', detail: 'El administrador atiende dudas, corrige datos, revisa cuentas y da seguimiento a excepciones.' }
      ]
    },
    {
      id: 'channels',
      title: 'Canales',
      subtitle: 'Channels',
      icon: 'wifi',
      summary: 'App web/PWA, API REST y correo',
      highlights: ['App web/PWA para las funciones disponibles.', 'Correo sujeto a configuración SMTP.'],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Los canales son los medios por los que las personas conocen, solicitan y reciben el servicio, además de los medios técnicos por los que interactúan con el sistema. Para una pensión estudiantil, el contacto directo con la administración sigue siendo importante junto con las herramientas digitales.', 'El repositorio contiene una aplicación web y una API; eso describe la arquitectura del proyecto, pero no confirma que exista una dirección pública activa ni que terceros puedan conectarse a ella.'] },
        { title: '¿Cómo funciona en SICPES?', paragraphs: ['La interfaz web (y su versión PWA instalable) es el punto pensado para consultar y gestionar las funciones disponibles desde un navegador. La API REST comunica esa interfaz con la lógica de aplicación y los datos. El correo electrónico puede distribuir avisos si se configura un servidor saliente y se habilitan los mensajes correspondientes.', 'La publicación en internet, el uso desde dispositivos concretos y cualquier integración con plataformas externas requieren despliegue, pruebas y autorización. La API no debe interpretarse automáticamente como un canal comercial o una integración ya activa.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Una persona residente accedería a la dirección web que proporcione la pensión y entraría con su perfil para consultar la información autorizada. Si una operación genera una notificación y el correo está configurado, podría recibir el aviso en su bandeja.', 'Si no cuenta con acceso digital o tiene un caso que requiere revisión, el canal presencial o de contacto establecido por la administración puede completar el proceso. Esos medios locales deben definirse por quien ofrece el alojamiento.'] }
      ],
      image: 'channels.jpg', imageAlt: 'Estudiante consulta su teléfono móvil en el campus universitario.', caption: 'Representación del acceso móvil; la foto no muestra una interfaz real de SICPES.',
      metric: '3 canales de contacto',
      points: [
        { label: 'App web / PWA', detail: 'Interfaz accesible desde computadora, tablet y teléfono; la PWA puede instalarse y usarse desde el navegador.' },
        { label: 'API REST', detail: 'API interna que comunica la interfaz con servicios y datos; un uso por terceros requeriría autorización e integración.' },
        { label: 'Correo electrónico', detail: 'Canal de confirmación y notificación de reservas, pagos y movimientos.' }
      ]
    },
    {
      id: 'segments',
      title: 'Segmentos de clientes',
      subtitle: 'Customer Segments',
      icon: 'users',
      summary: 'Estudiantes, arrendadores y personal',
      highlights: [
        'Estudiantes foráneos y locales que buscan pensión.',
        'Arrendadores, administradores y personal de la institución.',
        'Padres o tutores que pagan (propuesta).'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Los segmentos de clientes identifican a las personas a quienes sirve el modelo de negocio. En SICPES conviene distinguir entre quienes reciben el servicio de hospedaje, quienes lo ofrecen y quienes lo administran, porque sus necesidades y responsabilidades son diferentes.', 'El proyecto no identifica una residencia, institución o base real de clientes. Los grupos siguientes son perfiles previstos para explicar el uso del sistema, no usuarios reales confirmados.'] },
        { title: '¿Cómo funciona en SICPES?', paragraphs: ['El estudiante necesita solicitar o revisar su estancia y consultar la información de su cuenta. El arrendador publica y mantiene su inmueble; el administrador organiza habitaciones, reservas, pagos y ocupación según los permisos asignados. El personal de la institución puede apoyar con validación y difusión.', 'La separación de perfiles ayuda a evitar que todas las personas vean o modifiquen los mismos datos. La configuración de roles debe corresponder con las responsabilidades reales del albergue y probarse antes de utilizar datos de residentes.'] },
        { title: 'Criterios de segmentación', paragraphs: ['Geográfico: cercanía al campus y ciudad o zona donde se ubica la pensión.', 'Demográfico: nivel educativo, carrera y edad aproximada del estudiante.', 'Conductual: frecuencia de uso del sistema, pago puntual o con adeudos y uso de PWA frente a app móvil.', 'Necesidades: presupuesto disponible, servicios incluidos y seguridad del inmueble.', 'Tipo de arrendador: casa individual o pensión con varias habitaciones.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Un estudiante foráneo que busca pensión cerca del campus y un arrendador que ofrece una casa individual tienen necesidades distintas; el sistema puede organizar la vista de cada uno según su cuenta, mientras el personal confirma cualquier discrepancia.', 'Una pensión que quisiera incorporar a los padres o tutores como contactos, o a personal de mantenimiento como otro perfil, tendría que definir y validar ese segmento antes de ampliar los roles; no se presenta como una función ya implementada.'] }
      ],
      image: 'segments.jpg', imageAlt: 'Grupo de estudiantes universitarios conversa sentado frente a un edificio del campus.', caption: 'Foto referencial de estudiantes; no identifica a usuarios reales de SICPES.',
      metric: '6 segmentos',
      points: [
        { label: 'Estudiantes foráneos que rentan', detail: 'Alumnos de otras ciudades que necesitan hospedaje cerca del campus.' },
        { label: 'Estudiantes locales', detail: 'Alumnos de la zona que buscan cambiar de pensión u otra opción de hospedaje.' },
        { label: 'Arrendadores y propietarios', detail: 'Dueños de casas y pensiones que publican y rentan habitaciones.' },
        { label: 'Administradores de pensión', detail: 'Personal que opera la pensión: reservas, pagos y ocupación.' },
        { label: 'Personal de la institución', detail: 'Trabajadores de la escuela que apoyan con validación, difusión y coordinación.' },
        { label: 'Padres y tutores que pagan (propuesta)', detail: 'Familiares que cubren la renta y consultan el estado de cuenta; participación por validar.' }
      ]
    },
    {
      id: 'costs',
      title: 'Estructura de costos',
      subtitle: 'Cost Structure',
      icon: 'trending-up',
      summary: 'Aproximación de costos por rubro',
      highlights: [
        'Rangos orientativos en MXN por rubro; no es una cotización.',
        'Incluye dominio/DNS, hosting, base de datos y correo.',
        'Aproximación por validar según el proveedor elegido.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['La estructura de costos reúne los recursos que se consumen para ofrecer hospedaje y mantener las herramientas que lo respaldan. Algunos costos pertenecen al albergue —personal, instalaciones y servicios cotidianos— y otros a desarrollar y operar la aplicación.', 'El proyecto no publica montos, contratos, remuneraciones ni un presupuesto. Los rangos siguientes son una aproximación orientativa para planear y no una cotización.'] },
        { title: 'Aproximación de costos (por validar, no cotización)', paragraphs: ['Los montos son rangos orientativos en pesos mexicanos (MXN) y dependen del proveedor elegido, del tamaño de la operación y del tiempo del equipo. Deben confirmarse con cotizaciones reales antes de decidir.', 'Rubros considerados: desarrollo y mantenimiento (horas del equipo), hosting/servidor y base de datos, dominio y DNS, correo/SMTP, respaldos y seguridad (certificado SSL), y soporte y documentación.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Antes de poner SICPES en uso, la administración puede hacer una lista de los recursos que ya tiene y de los que necesita: alojamiento del servidor, base de datos, dominio y DNS, correo, respaldos y tiempo para mantener los registros.', 'Esa revisión permite separar gastos propios del hospedaje de gastos específicos del software y decidir qué alternativas explorar. Cualquier cifra o proveedor sería una propuesta hasta que se cotice y apruebe.'] }
      ],
      image: 'costs.jpg', imageAlt: 'Estudiantes revisan juntos un presupuesto y una calculadora sobre la mesa.', caption: 'Foto referencial de presupuesto; las cifras mostradas no representan tarifas de SICPES.',
      metric: '6 rubros de costo',
      points: [
        { label: 'Desarrollo y mantenimiento', detail: '≈ $0 – $8,000 MXN al mes. Horas del equipo para construir y mantener la app; puede cubrirse de forma interna. Aproximación por validar, no cotización.' },
        { label: 'Hosting / servidor y base de datos', detail: '≈ $150 – $1,200 MXN al mes. Alojamiento del servidor Node.js y de la base de datos MySQL. Aproximación por validar, no cotización.' },
        { label: 'Dominio y DNS', detail: '≈ $200 – $500 MXN al año. Registro anual del dominio y gestión de DNS. Aproximación por validar, no cotización.' },
        { label: 'Correo / SMTP', detail: '≈ $0 – $300 MXN al mes. Envío de notificaciones automáticas; depende del proveedor. Aproximación por validar, no cotización.' },
        { label: 'Respaldos y seguridad', detail: '≈ $0 – $400 MXN al mes. Certificado SSL, respaldos y medidas de protección. Aproximación por validar, no cotización.' },
        { label: 'Soporte y documentación', detail: '≈ $500 – $2,000 MXN al mes. Tiempo de atención, manuales de uso y mantenimiento. Aproximación por validar, no cotización.' }
      ]
    },
    {
      id: 'revenue',
      title: 'Fuentes de ingresos',
      subtitle: 'Revenue Streams',
      icon: 'credit-card',
      summary: 'Renta, patrocinio y software',
      highlights: [
        'La renta la cobra el arrendador; SICPES registra movimientos.',
        'Patrocinio o convenios: propuesta por validar.',
        'Cobro por software y punto de equilibrio: propuesta.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Las fuentes de ingresos muestran de dónde proviene el dinero que sostiene el modelo. El ingreso central del hospedaje lo recibe el arrendador; SICPES es la herramienta de gestión y registra los movimientos, sin cobrar automáticamente en nombre de los arrendadores.', 'El proyecto no define tarifas, periodos de cobro, depósitos, becas ni penalizaciones. Esos términos corresponden a la política de quien opera la pensión y no deben inferirse del sistema.'] },
        { title: '¿Cómo se relaciona con SICPES?', paragraphs: ['Además de la renta, se plantean como propuesta el patrocinio o los convenios con la institución o negocios locales para apoyar la operación, y un posible cobro por el software (licencia o suscripción por pensión, por inmueble o por número de estudiantes, o comisión por reservación).', 'El proyecto no acredita procesamiento bancario ni cobro automático. Cualquier esquema de cobro por el software tendría que explicitarse y acordarse; los registros de SICPES no sustituyen los comprobantes ni la conciliación contable.'] },
        { title: 'Ejemplo ilustrativo (no real)', paragraphs: ['Ejercicio de punto de equilibrio con supuestos explícitos: si se fijara una cuota mensual hipotética de $100 MXN por pensión y se tuvieran N pensiones, el ingreso mensual sería 100 × N. Si los costos mensuales de operación (hosting, base de datos, correo, respaldos y soporte) sumaran, por ejemplo, $3,000 MXN, se necesitarían alrededor de 30 pensiones para igualar esos costos.', 'Estas cifras son un ejemplo didáctico, no un pronóstico ni una tarifa real. Los montos y la viabilidad deben definirse con datos concretos antes de proponer cualquier esquema.'] }
      ],
      image: 'revenue.jpg', imageAlt: 'Estudiante consulta el estado de cuenta de su renta desde una computadora portátil.', caption: 'Foto referencial de consulta de pagos; SICPES no documenta procesamiento de pagos en línea.',
      metric: '4 fuentes (propuesta)',
      points: [
        { label: 'Renta y hospedaje', detail: 'Ingreso del arrendador por el alojamiento. SICPES registra los movimientos, no cobra automáticamente.' },
        { label: 'Operación de servicios (patrocinio)', detail: 'Patrocinios o convenios con la institución o negocios locales que apoyan la operación. Propuesta.' },
        { label: 'Cobro por software', detail: 'Licencia o suscripción por pensión, por inmueble o por número de estudiantes, o comisión por reservación. Propuesta por definir.' },
        { label: 'Aproximación de ingresos y costos', detail: 'Ejemplo ilustrativo de punto de equilibrio: N pensiones × cuota mensual hipotética frente a los costos mensuales. No es un dato real.' }
      ]
    }
  ];

  var additional = {
    partners: [
      'La incorporación de arrendadores es una propuesta; requiere reglas de publicación y actualización de datos.',
      'Un programa de referidos necesitaría reglas claras y el consentimiento de los estudiantes.',
      'La participación del personal depende de la institución educativa y de sus tiempos.',
      'El alcance y las tareas de mantenimiento deben acordarse para cada instalación.',
      'La configuración, disponibilidad y costo del correo quedan por definir.'
    ],
    activities: [
      'Las actualizaciones deben coordinarse con la versión instalada y sus datos.',
      'La aprobación o el rechazo de una solicitud corresponde a la administración, no al sistema.',
      'Los reportes reúnen los registros disponibles; el personal debe validar su interpretación.',
      'El seguimiento de servicios depende de que la administración capture los movimientos.',
      'El flujo de atención de una falla y sus tiempos deben definirse por la pensión.',
      'Las evaluaciones se asocian a una estancia concluida; su uso es una propuesta por validar.'
    ],
    resources: [
      'La PWA y la app móvil son propuestas del proyecto; su alcance final debe confirmarse.',
      'Las modalidades y qué incluye cada plan los define cada arrendador; aquí son una aproximación por definir.',
      'Los inmuebles dependen de que los arrendadores los registren y mantengan actualizados.',
      'Las bibliotecas citadas describen componentes del proyecto, no una garantía de disponibilidad del servicio.'
    ],
    value: [
      'La confirmación de cupo y estancia corresponde a las reglas de la pensión.',
      'Los movimientos registrados sirven para seguimiento y deben contrastarse con comprobantes.',
      'Las fechas permiten ordenar el historial de estancia; el personal revisa correcciones.',
      'El envío depende de que correo y plantillas estén configurados en la instalación.',
      'La información disponible puede apoyar revisiones administrativas; debe validarse antes de tomar decisiones.'
    ],
    relations: [
      'El alcance del autoservicio depende de los permisos y las funciones habilitadas.',
      'La corrección de registros debe seguir el proceso interno y conservar evidencia pertinente.',
      'El correo complementa la atención, pero no sustituye la revisión de casos particulares.'
    ],
    channels: [
      'El acceso público requiere que la organización despliegue y comparta una dirección activa.',
      'La API es parte técnica de la aplicación; integraciones externas requerirían autorización.',
      'El envío depende de la configuración del servicio de correo y de datos de contacto vigentes.'
    ],
    segments: [
      'Este perfil corresponde a quien solicita o utiliza una estancia, no a clientes reales identificados.',
      'Cambiar de pensión es una hipótesis de uso; no hay datos reales que la confirmen.',
      'El arrendador publica y mantiene su inmueble; su incorporación es una propuesta.',
      'Las tareas administrativas dependen de la organización y sus permisos internos.',
      'La participación del personal depende de la institución educativa y de sus tiempos.',
      'La participación de padres o tutores es una propuesta por validar.'
    ],
    costs: [
      'Los montos dependen del alcance, del tiempo del equipo y de si el trabajo es interno o contratado.',
      'El costo de hosting y base de datos varía según el proveedor y el tamaño de la operación.',
      'El dominio y el DNS se pagan por periodos anuales; el precio depende del registrador elegido.',
      'El costo del correo depende del servicio SMTP que se elija; no hay proveedor confirmado.',
      'SSL y respaldos pueden incluirse con el hosting o contratarse aparte.',
      'La documentación y el soporte requieren tiempo de actualización y atención continua.'
    ],
    revenue: [
      'Las tarifas y periodos los establece cada arrendador; el proyecto no indica montos.',
      'El patrocinio o los convenios son una propuesta; no hay acuerdos confirmados.',
      'Cobrar por licencias o soporte sería una propuesta que requeriría aprobación y definición.',
      'El punto de equilibrio es un ejemplo con supuestos; no debe tomarse como un dato real.'
    ]
  };

  blocks.forEach(function (block) {
    block.points.forEach(function (point, index) {
      point.extra = additional[block.id][index];
    });
  });

  window.SICPES_CANVAS = { icons: icons, blocks: blocks };
})();
