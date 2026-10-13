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
      summary: 'Equipo, correo e institución',
      highlights: [
        'La administración del albergue define reglas, cupos y procesos.',
        'El equipo técnico mantiene la aplicación y sus datos.',
        'Correo SMTP: dependencia posible, sin proveedor confirmado.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Los socios clave son las personas u organizaciones que aportan capacidades necesarias para prestar el servicio y sostener el sistema. En una pensión, las reglas de alojamiento, la información de residentes y los recursos del inmueble dependen de quien administra el servicio.', 'El repositorio describe un proyecto de software, pero no acredita convenios firmados, proveedores contratados ni una institución operadora específica. Por eso, las colaboraciones externas deben entenderse como roles posibles por confirmar.'] },
        { title: '¿Cómo se relaciona con SICPES?', paragraphs: ['El equipo técnico puede encargarse de mantener la aplicación, su API y su base de datos. La persona responsable de la pensión define los procesos reales —por ejemplo, qué información se solicita al reservar y cómo se registra un pago— y valida que el sistema corresponda con ellos.', 'Si se habilitan avisos por correo, hará falta una cuenta y configuración SMTP operativa. Ese servicio se presenta como una dependencia técnica posible; el proyecto no confirma un proveedor ni un contrato.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Antes de iniciar un periodo de alojamiento, la administración revisaría los campos de registro y las reglas de reserva con el equipo técnico. Juntos podrían comprobar que la información necesaria se capture y que el personal entienda cómo consultar los movimientos.', 'La institución, el servicio de correo y cualquier proveedor de alojamiento tecnológico son participantes potenciales; su selección y responsabilidades tendrían que acordarse para una implementación real.'] }
      ],
      image: 'partners.jpg', imageAlt: 'Equipo de trabajo conversa alrededor de una mesa durante una reunión.', caption: 'Foto referencial de colaboración; no representa una alianza confirmada con SICPES.',
      metric: '3 tipos de socios',
      points: [
        { label: 'Equipo de desarrollo', detail: 'Rol necesario para construir, mantener y revisar SICPES; la dedicación y responsable de operación deben definirse.' },
        { label: 'Proveedor de correo (SMTP)', detail: 'Podría configurarse para enviar avisos si la institución habilita y mantiene un servicio SMTP; no se confirma un proveedor contratado.' },
        { label: 'Institución educativa o de pensión', detail: 'La institución que opera la pensión definiría reglas, cupos e infraestructura; su participación concreta debe confirmarse.' }
      ]
    },
    {
      id: 'activities',
      title: 'Actividades clave',
      subtitle: 'Key Activities',
      icon: 'check-square',
      summary: 'Desarrollo, reservas y control',
      highlights: ['Reservas y movimientos requieren revisión administrativa.', 'La aplicación requiere mantenimiento y documentación.'],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Las actividades clave son el trabajo recurrente que permite entregar el servicio y mantener sus herramientas en condiciones útiles. Para SICPES hay dos frentes relacionados: operar la pensión —reservas, estancias y pagos— y mantener la aplicación que organiza parte de esos registros.', 'El software puede apoyar el control, pero las decisiones sobre admisión, cupos, fechas y ajustes de cuenta pertenecen a quien administra el albergue.'] },
        { title: '¿Cómo funciona en SICPES?', paragraphs: ['El proyecto contempla cuentas con distintos perfiles, datos de estudiantes y habitaciones, reservas, pagos y adeudos. Mantener estos registros coherentes implica revisar altas y cambios, corregir información cuando corresponda y conservar un historial que permita dar seguimiento a cada estancia.', 'En el lado técnico, las tareas incluyen actualizar la interfaz, la API y la base de datos, revisar el acceso de usuarios y documentar el mantenimiento. Las funciones disponibles deben confirmarse en la versión desplegada; no todos los procesos se ejecutan sin intervención humana.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Al recibir una solicitud, el personal revisa la información de la persona y la disponibilidad antes de confirmar la estancia según las reglas locales. Durante el alojamiento, registra los pagos o movimientos que se realicen y consulta el historial si surge una duda.', 'Al cierre del periodo, la administración puede revisar los registros consolidados que estén disponibles. La revisión de respaldos, permisos y errores de la aplicación es una tarea técnica complementaria, no una labor que SICPES realice por sí solo.'] }
      ],
      image: 'activities.jpg', imageAlt: 'Grupo de estudiantes colabora alrededor de una computadora portátil.', caption: 'Foto referencial de trabajo en equipo asociado a las actividades del albergue.',
      metric: '5 actividades',
      points: [
        { label: 'Desarrollo y mantenimiento', detail: 'Evolución continua de la API, la interfaz web y la base de datos.' },
        { label: 'Cuentas y seguridad', detail: 'Registro, inicio de sesión, cifrado de contraseñas y recuperación de acceso.' },
        { label: 'Control de reservas', detail: 'Registro de entradas y salidas sin duplicar movimientos ni superar el cupo asignado.' },
        { label: 'Reportes y auditoría', detail: 'Historial de pagos y adeudos con información consolidada para reportes en PDF y Excel.' },
        { label: 'Calidad y documentación', detail: 'Pruebas de la API y documentación técnica en Markdown para el mantenimiento.' }
      ]
    },
    {
      id: 'resources',
      title: 'Recursos clave',
      subtitle: 'Key Resources',
      icon: 'database',
      summary: 'MySQL, Express, React, nodemailer',
      highlights: ['Base de datos MySQL y API Node.js/Express.', 'Interfaz React/TypeScript y correo con Nodemailer.'],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Los recursos clave son los activos que hacen posible prestar el servicio y operar SICPES: software, información, tiempo de trabajo y medios para alojar y mantener el sistema. En una pensión, también cuentan los datos correctos sobre residentes, habitaciones, periodos y pagos.', 'La existencia de código en el repositorio no garantiza que haya un servidor público, personal asignado o una base de datos operativa. Esos recursos dependen de la instalación y de quién se responsabilice de ella.'] },
        { title: '¿Cómo se relaciona con SICPES?', paragraphs: ['La documentación del proyecto identifica una aplicación web construida con React y TypeScript, una API basada en Node.js y Express, y MySQL para organizar registros. Nodemailer aparece como componente para correo. La documentación técnica apoya la instalación y el mantenimiento del conjunto.', 'La información de la pensión es otro recurso central y requiere acceso limitado, captura cuidadosa y actualización por las personas responsables. El proyecto no sustituye las políticas de privacidad, los respaldos ni la infraestructura que deben configurarse para el despliegue.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Para usar el sistema en una residencia, la instancia tendría que contar con una base de datos configurada y con los datos de habitaciones y usuarios que la administración autorice. La interfaz y la API consultarían esos registros para presentar la información disponible según el perfil de acceso.', 'La capacidad del servidor, el mecanismo de respaldo y los responsables de soporte deben definirse para cada instalación; no se atribuyen a SICPES cifras de capacidad ni niveles de disponibilidad que no estén documentados.'] }
      ],
      image: 'resources.jpg', imageAlt: 'Mano trabaja sobre el teclado de una computadora portátil con una interfaz en pantalla.', caption: 'Foto referencial de una computadora en uso; no muestra la aplicación real de SICPES.',
      metric: '5 recursos',
      points: [
        { label: 'MySQL', detail: 'Almacena estudiantes, administradores, habitaciones, reservas, pagos y adeudos.' },
        { label: 'Node.js y Express', detail: 'API REST que centraliza la lógica de negocio y la autenticación de usuarios.' },
        { label: 'React, TypeScript y TailwindCSS', detail: 'Interfaz web responsiva para computadoras, tablets y equipos de escritorio.' },
        { label: 'Nodemailer', detail: 'Envío de notificaciones y comprobantes por correo electrónico.' },
        { label: 'Documentación Markdown', detail: 'Manuales de instalación, uso y mantenimiento del sistema.' }
      ]
    },
    {
      id: 'value',
      title: 'Propuesta de valor',
      subtitle: 'Value Propositions',
      icon: 'star',
      summary: 'Registro, pagos y avisos',
      highlights: [
        'Relaciona estudiantes, habitaciones y estancias.',
        'Ordena el seguimiento de pagos y adeudos registrados.',
        'La administración valida la información y las excepciones.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['La propuesta de valor explica por qué el sistema resulta útil para quienes solicitan alojamiento y para quienes lo administran. SICPES plantea reunir en un mismo flujo información que suele consultarse en distintas tareas: quién se hospeda, qué habitación ocupa y qué movimientos de pago se han registrado.', 'La ventaja esperada es tener un seguimiento más ordenado y consultable. No implica que el sistema elimine la atención personal ni que la información se mantenga correcta sin revisión.'] },
        { title: '¿Cómo funciona en SICPES?', paragraphs: ['El proyecto está orientado a registrar estudiantes, habitaciones, reservas, pagos y adeudos, y a ofrecer vistas para los perfiles de estudiante y administración. Cuando esas funciones están habilitadas, los registros permiten relacionar una estancia con sus datos y revisar cambios relevantes desde la aplicación.', 'Los avisos por correo y la exportación de reportes se consideran según lo documentado para la versión del proyecto; su disponibilidad requiere configuración. El personal conserva el criterio para validar datos, resolver excepciones y confirmar decisiones operativas.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Una persona que busca hospedaje puede iniciar una solicitud o consultar la información de su estancia si su perfil y la versión instalada lo permiten. La administración revisa los datos, confirma según los cupos y reglas del albergue, y registra los pagos para dar seguimiento al saldo.', 'Si después se necesita aclarar un movimiento, contar con un historial organizado facilita ubicar el registro y conversar con la persona residente usando información común. Ese orden y trazabilidad son el valor que el sistema busca apoyar.'] }
      ],
      image: 'value.jpg', imageAlt: 'Habitación luminosa de alojamiento compartido con varias camas tendidas.', caption: 'Alojamiento compartido como contexto del servicio que SICPES busca apoyar.',
      metric: '5 beneficios clave',
      points: [
        { label: 'Registro y reserva en línea', detail: 'El pensionado reserva su lugar sin formularios en papel ni desplazamientos innecesarios.' },
        { label: 'Pagos y adeudos automatizados', detail: 'Calcula lo pendiente y guarda el historial de cada transacción realizada.' },
        { label: 'Entrada y salida fechadas', detail: 'Cada movimiento registra fecha y hora exactas para el control interno del albergue.' },
        { label: 'Avisos automáticos', detail: 'Notificaciones por correo sobre reservas, pagos y estado de cuenta.' },
        { label: 'Reportes para la administración', detail: 'Información consolidada de ocupación y pagos, exportable en PDF y Excel.' }
      ]
    },
    {
      id: 'relations',
      title: 'Relación con clientes',
      subtitle: 'Customer Relationships',
      icon: 'message-circle',
      summary: 'Autoservicio y soporte',
      highlights: ['La atención combina uso del sistema y apoyo humano.', 'Las excepciones las revisa la administración.'],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Este bloque describe cómo se acompaña a estudiantes y responsables durante su interacción con la pensión. El trato incluye orientación previa, ayuda durante la estancia y resolución de preguntas sobre reservas, pagos o información registrada.', 'La relación no depende solo de una pantalla: la administración sigue siendo el punto de decisión para solicitudes especiales, correcciones y situaciones que requieren conocer las reglas del albergue.'] },
        { title: '¿Cómo funciona en SICPES?', paragraphs: ['La aplicación contempla perfiles de acceso para que el estudiante consulte o gestione la información disponible para su cuenta y la administración supervise registros operativos. El detalle de lo que cada perfil puede hacer depende de los permisos y funciones de la instalación.', 'Las notificaciones automáticas pueden complementar la comunicación cuando el servicio de correo está configurado. No reemplazan un canal de soporte humano ni aseguran que un mensaje haya sido leído; las consultas que requieren contexto deben dirigirse al personal responsable.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Si un residente detecta que un pago no aparece en su historial, puede informar el caso a la administración. El personal compara el comprobante y el registro correspondiente, corrige los datos si procede y comunica el resultado.', 'Una confirmación automática puede ayudar a dejar constancia de una acción rutinaria si esa función está habilitada. La respuesta ante excepciones y la decisión final siguen a cargo del equipo del albergue.'] }
      ],
      image: 'relations.jpg', imageAlt: 'Representante de atención al cliente con auriculares frente a una computadora.', caption: 'Foto referencial de atención humana; la persona retratada no representa a SICPES.',
      metric: '3 modalidades de atención',
      points: [
        { label: 'Autoservicio del estudiante', detail: 'El pensionado gestiona sus reservas y pagos sin intervención directa.' },
        { label: 'Soporte administrativo', detail: 'El administrador atiende dudas, corrige datos y revisa el estado de las cuentas.' },
        { label: 'Comunicación automatizada', detail: 'Correos que confirman cada acción y reducen la carga de atención manual.' }
      ]
    },
    {
      id: 'channels',
      title: 'Canales',
      subtitle: 'Channels',
      icon: 'wifi',
      summary: 'App web, API REST y correo',
      highlights: ['Interfaz web para las funciones disponibles.', 'Correo sujeto a configuración SMTP.'],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Los canales son los medios por los que las personas conocen, solicitan y reciben el servicio, además de los medios técnicos por los que interactúan con el sistema. Para una pensión estudiantil, el contacto directo con la administración sigue siendo importante junto con las herramientas digitales.', 'El repositorio contiene una aplicación web y una API; eso describe la arquitectura del proyecto, pero no confirma que exista una dirección pública activa ni que terceros puedan conectarse a ella.'] },
        { title: '¿Cómo funciona en SICPES?', paragraphs: ['La interfaz web es el punto pensado para consultar y gestionar las funciones disponibles desde un navegador. La API REST comunica esa interfaz con la lógica de aplicación y los datos. El correo electrónico puede distribuir avisos si se configura un servidor saliente y se habilitan los mensajes correspondientes.', 'La publicación en internet, el uso desde dispositivos concretos y cualquier integración con plataformas externas requieren despliegue, pruebas y autorización. La API no debe interpretarse automáticamente como un canal comercial o una integración ya activa.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Una persona residente accedería a la dirección web que proporcione la pensión y entraría con su perfil para consultar la información autorizada. Si una operación genera una notificación y el correo está configurado, podría recibir el aviso en su bandeja.', 'Si no cuenta con acceso digital o tiene un caso que requiere revisión, el canal presencial o de contacto establecido por la administración puede completar el proceso. Esos medios locales deben definirse por quien ofrece el alojamiento.'] }
      ],
      image: 'channels.jpg', imageAlt: 'Mano sostiene un teléfono inteligente con la pantalla en blanco.', caption: 'Representación del acceso móvil; la foto no muestra una interfaz real de SICPES.',
      metric: '3 canales de contacto',
      points: [
        { label: 'Aplicación web', detail: 'Interfaz React accesible desde computadora, tablet y teléfono.' },
        { label: 'API REST', detail: 'API interna que comunica la interfaz con servicios y datos; un uso por terceros requeriría autorización e integración.' },
        { label: 'Correo electrónico', detail: 'Canal de confirmación y notificación de reservas, pagos y movimientos.' }
      ]
    },
    {
      id: 'segments',
      title: 'Segmentos de clientes',
      subtitle: 'Customer Segments',
      icon: 'users',
      summary: 'Estudiantes y administradores',
      highlights: [
        'Estudiantes que solicitan o usan el alojamiento.',
        'Administración y personal con responsabilidades autorizadas.',
        'Perfiles distintos ayudan a separar tareas y acceso a datos.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Los segmentos de clientes identifican a las personas a quienes sirve el modelo de negocio. En SICPES conviene distinguir entre quienes reciben el servicio de hospedaje y quienes lo administran, porque sus necesidades y responsabilidades son diferentes.', 'El proyecto no identifica una residencia, institución o base real de clientes. Los grupos siguientes son perfiles previstos para explicar el uso del sistema, no usuarios reales confirmados.'] },
        { title: '¿Cómo funciona en SICPES?', paragraphs: ['El estudiante pensionado necesita solicitar o revisar su estancia y consultar la información de su cuenta que la instalación le permita ver. El administrador o personal autorizado organiza datos de habitaciones, reservas, pagos y ocupación de acuerdo con los permisos asignados.', 'La separación de perfiles ayuda a evitar que todas las personas vean o modifiquen los mismos datos. La configuración de roles debe corresponder con las responsabilidades reales del albergue y probarse antes de utilizar datos de residentes.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Un estudiante que consulta su saldo y una persona administradora que revisa el conjunto de pagos realizan tareas distintas sobre información relacionada. El sistema puede organizar la vista de cada uno según su cuenta, mientras el personal confirma cualquier discrepancia.', 'Una pensión que quisiera incorporar familiares como contactos, o personal de mantenimiento como otro perfil, tendría que definir y validar ese segmento antes de ampliar los roles; no se presenta como una función ya implementada.'] }
      ],
      image: 'segments.jpg', imageAlt: 'Grupo de estudiantes universitarios conversa sentado frente a un edificio del campus.', caption: 'Foto referencial de estudiantes; no identifica a usuarios reales de SICPES.',
      metric: '2 perfiles de uso',
      points: [
        { label: 'Estudiantes pensionados', detail: 'Necesitan reservar, pagar y consultar su historial de estadía.' },
        { label: 'Administradores y dueños', detail: 'Gestionan habitaciones, pagos, ocupación y reportes del albergue.' },
        { label: 'Dos perfiles de acceso', detail: 'Cada usuario entra con permisos distintos según su rol dentro del sistema.' }
      ]
    },
    {
      id: 'costs',
      title: 'Estructura de costos',
      subtitle: 'Cost Structure',
      icon: 'trending-up',
      summary: 'Equipo, infraestructura y correo',
      highlights: [
        'Tiempo de desarrollo, mantenimiento y soporte.',
        'Infraestructura y correo por definir según el despliegue.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['La estructura de costos reúne los recursos que se consumen para ofrecer hospedaje y mantener las herramientas que lo respaldan. En el caso de SICPES, algunos costos pertenecen al albergue —personal, instalaciones y servicios cotidianos— y otros a desarrollar y operar la aplicación.', 'El proyecto no publica montos, contratos, remuneraciones ni un presupuesto. Los rubros son categorías para evaluar con la persona responsable antes de adoptar el sistema.'] },
        { title: '¿Cómo se relaciona con SICPES?', paragraphs: ['Entre los costos potenciales están el tiempo de desarrollo, soporte y capacitación; el alojamiento de la aplicación y la base MySQL; los respaldos y medidas de seguridad; y el envío de correo si se habilita. El personal también invierte tiempo en revisar datos, atender preguntas y mantener al día los registros.', 'El costo concreto depende de la infraestructura elegida, la frecuencia de soporte, las necesidades de protección de información y el tamaño de la operación. El repositorio no permite concluir que exista un proveedor o servicio contratado ni estimar una cantidad.'] },
        { title: 'Ejemplo práctico', paragraphs: ['Antes de poner SICPES en uso, la administración puede hacer una lista de los recursos que ya tiene y de los que necesita: equipo para acceder al sistema, alojamiento técnico, configuración de base de datos, capacitación y tiempo para mantener los registros.', 'Esa revisión permite separar gastos propios del servicio de hospedaje de gastos específicos del software y decidir qué alternativas explorar. Cualquier cifra o proveedor sería una propuesta hasta que se cotice y apruebe.'] }
      ],
      image: 'costs.jpg', imageAlt: 'Calculadora junto a billetes estadounidenses sobre una superficie azul.', caption: 'Foto referencial de presupuesto; la moneda no representa tarifas de SICPES.',
      metric: '4 rubros de costo',
      points: [
        { label: 'Equipo de desarrollo y pruebas', detail: 'Salarios del tiempo dedicado a construir, probar y dar soporte al sistema.' },
        { label: 'Infraestructura', detail: 'Alojamiento del servidor Node.js y de la base de datos MySQL.' },
        { label: 'Servicio de correo', detail: 'Envío de notificaciones automáticas a estudiantes y administradores.' },
        { label: 'Documentación y soporte', detail: 'Material de usuario, manuales de uso y mantenimiento del proyecto.' }
      ]
    },
    {
      id: 'revenue',
      title: 'Fuentes de ingresos',
      subtitle: 'Revenue Streams',
      icon: 'credit-card',
      summary: 'Renta y hospedaje de estudiantes',
      highlights: [
        'El alojamiento puede generar ingresos según las reglas de la pensión.',
        'SICPES registra movimientos; no documenta cobro automático ni tarifas.'
      ],
      sections: [
        { title: '¿Qué significa?', paragraphs: ['Las fuentes de ingresos muestran de dónde proviene el dinero que sostiene el modelo. Para una pensión estudiantil, el ingreso central suele estar ligado al alojamiento que ofrece la organización operadora. SICPES es la herramienta de gestión descrita en el proyecto y no se documenta como un servicio de alojamiento por sí mismo.', 'El repositorio no define tarifas, periodos de cobro, depósitos, becas, penalizaciones ni un cargo por licenciar SICPES. Esos términos corresponden a la política de quien opera la pensión y no deben inferirse del sistema.'] },
        { title: '¿Cómo se relaciona con SICPES?', paragraphs: ['Los registros de pagos y adeudos pueden ayudar a la administración a consultar qué movimientos se capturaron y relacionarlos con una estancia. Sirven para organizar el seguimiento, pero no prueban por sí solos que el dinero haya sido recibido ni sustituyen los comprobantes o la conciliación con los medios de pago utilizados.', 'El proyecto no acredita procesamiento bancario, cobro automático, comisión por transacción ni monetización del software. Si en el futuro se propusiera cobrar una licencia o servicio de soporte, sería un modelo adicional que tendría que explicitarse y acordarse.'] },
        { title: 'Ejemplo práctico', paragraphs: ['La administración establece el precio y las fechas de pago según sus reglas. Cuando recibe un pago por el medio que tenga habilitado, el personal registra el movimiento en SICPES y puede consultar después el historial asociado a la persona residente.', 'Al revisar los ingresos del periodo, el equipo contrasta los registros del sistema con sus comprobantes y reportes financieros. La aplicación ayuda a ordenar la información administrativa; la definición y validación contable permanecen con la organización.'] }
      ],
      image: 'revenue.jpg', imageAlt: 'Persona sostiene una tarjeta bancaria mientras consulta una computadora portátil.', caption: 'Foto referencial de un pago; SICPES no documenta procesamiento de pagos en línea.',
      metric: '1 fuente principal',
      points: [
        { label: 'Renta y hospedaje', detail: 'Ingreso que puede generar el alojamiento según el esquema de cobro definido por quien opera la pensión.' },
        { label: 'Operación del servicio', detail: 'SICPES se presenta como herramienta de gestión; no documenta intermediación comercial ni clientes externos.' },
        { label: 'Cobro por el software', detail: 'El proyecto no especifica tarifas o comisiones de SICPES; cualquier esquema requeriría definición.' }
      ]
    }
  ];

  var additional = {
    partners: ['El alcance y las tareas de mantenimiento deben acordarse para cada instalación.', 'La configuración, disponibilidad y costo del correo quedan por definir.', 'Las reglas operativas y quién autoriza cambios dependen de la entidad operadora.'],
    activities: ['Las actualizaciones deben coordinarse con la versión instalada y sus datos.', 'El acceso debe corresponder con responsabilidades definidas por la administración.', 'La disponibilidad y las fechas se confirman según reglas del albergue.', 'Los reportes reúnen registros disponibles; el personal debe validar su interpretación.', 'Las pruebas y notas de cambios ayudan a mantener el sistema de forma consistente.'],
    resources: ['El esquema de datos debe configurarse en cada instalación y protegerse con controles apropiados.', 'La API conecta operaciones de la aplicación; su despliegue y permisos requieren configuración.', 'Las bibliotecas citadas describen componentes del proyecto, no una garantía de disponibilidad del servicio.', 'Su uso efectivo depende de credenciales y configuración SMTP válidas.', 'La documentación puede orientar instalación y mantenimiento, y debe corresponder a la versión utilizada.'],
    value: ['La confirmación de cupo y estancia corresponde a las reglas de la pensión.', 'Los movimientos registrados sirven para seguimiento y deben contrastarse con comprobantes.', 'Las fechas permiten ordenar el historial de estancia; el personal revisa correcciones.', 'El envío depende de que correo y plantillas estén configurados en la instalación.', 'La información disponible puede apoyar revisiones administrativas; debe validarse antes de tomar decisiones.'],
    relations: ['El alcance del autoservicio depende de los permisos y las funciones habilitadas.', 'La corrección de registros debe seguir el proceso interno y conservar evidencia pertinente.', 'El correo complementa la atención, pero no sustituye la revisión de casos particulares.'],
    channels: ['El acceso público requiere que la organización despliegue y comparta una dirección activa.', 'La API es parte técnica de la aplicación; integraciones externas requerirían autorización.', 'El envío depende de la configuración del servicio de correo y de datos de contacto vigentes.'],
    segments: ['Este perfil corresponde a quien solicita o utiliza una estancia, no a clientes reales identificados.', 'Las tareas administrativas dependen de la organización y sus permisos internos.', 'Los permisos se deben revisar para limitar consulta y edición según la responsabilidad.'],
    costs: ['El esfuerzo depende del alcance, mantenimiento y soporte que se acuerden.', 'Servidor, base de datos y respaldos deben dimensionarse al preparar el despliegue.', 'El costo depende del servicio SMTP que eventualmente se elija; no hay proveedor confirmado.', 'La documentación y soporte requieren tiempo de actualización y atención.'],
    revenue: ['Las tarifas y periodos los establece la entidad operadora; el proyecto no indica montos.', 'Los registros de SICPES no equivalen a un pago recibido ni a conciliación contable.', 'Cobrar por licencias o soporte sería una propuesta que requeriría aprobación y definición.']
  };

  blocks.forEach(function (block) {
    block.points.forEach(function (point, index) {
      point.extra = additional[block.id][index];
    });
  });

  window.SICPES_CANVAS = { icons: icons, blocks: blocks };
})();
