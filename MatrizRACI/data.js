/**
 * data.js - Datos maestros de la Matriz RACI de SICPES
 * Proyecto Integrador - Universidad Tecnológica de Xicotepec de Juárez (UTXJ)
 * Generado y estructurado con el Agente de Inteligencia Artificial Archify
 */

const RACI_DATA = {
  meta: {
    project: "SICPES",
    fullName: "Sistema Integral de Control de Pensión de Estudiantes",
    slogan: "Una pensión más ordenada para un mejor estudiar",
    institution: "Universidad Tecnológica de Xicotepec de Juárez (UTXJ)",
    career: "Ingeniería en Desarrollo y Gestión de Software",
    version: "2.0.0",
    date: "Noviembre 2026",
    agent: "Archify (AI Software Architecture Agent)",
    goldenRule: "Regla de Oro RACI: Exactamente un (1) Accountable (A) por cada actividad o entregable."
  },

  definitions: {
    R: {
      code: "R",
      name: "Responsible (Responsable)",
      badgeClass: "badge-r",
      color: "#2F8A5C",
      summary: "El rol encargado de ejecutar, codificar o producir directamente el entregable o actividad."
    },
    A: {
      code: "A",
      name: "Accountable (Aprobador / Rinde Cuentas)",
      badgeClass: "badge-a",
      color: "#1E5AA0",
      summary: "La única persona que tiene la propiedad final, aprueba el resultado y rinde cuentas por su éxito o fallo."
    },
    C: {
      code: "C",
      name: "Consulted (Consultado)",
      badgeClass: "badge-c",
      color: "#D97706",
      summary: "Experto o interesado clave con quien se establece comunicación bidireccional previa para recabar requerimientos o validar decisiones."
    },
    I: {
      code: "I",
      name: "Informed (Informado)",
      badgeClass: "badge-i",
      color: "#6B7280",
      summary: "Personas que deben ser notificadas de los avances, decisiones o culminación de la tarea (comunicación unidireccional)."
    }
  },

  roles: [
    {
      id: "LP",
      code: "LP",
      name: "José Francisco Flores Amador",
      title: "Líder de Proyecto / Fullstack / Documentación",
      github: "JFFA25",
      avatar: "https://github.com/JFFA25.png",
      tag: "Equipo Interno",
      teamMember: true,
      description: "Coordinación general del equipo, gestión del cronograma, integración entre capas del sistema y redacción de documentación técnica y formal."
    },
    {
      id: "BE",
      code: "BE",
      name: "Edgar Cabrera Velázquez",
      title: "Backend Developer / Seguridad & APIs",
      github: "Edgar-Cbr",
      avatar: "https://github.com/Edgar-Cbr.png",
      tag: "Equipo Interno",
      teamMember: true,
      description: "Desarrollo de API REST en Node.js y microservicios FastAPI, reglas de negocio de reservas/pagos, autenticación JWT, rate limiting y pasarelas."
    },
    {
      id: "BD",
      code: "BD",
      name: "Edwin Hernández Campos",
      title: "Database Administrator / Modelador TiDB & MongoDB",
      github: "Edwinhdzcm",
      avatar: "https://github.com/Edwinhdzcm.png",
      tag: "Equipo Interno",
      teamMember: true,
      description: "Diseño y administración de base de datos relacional MySQL en TiDB Serverless, esquemas NoSQL en MongoDB, integridad referencial y procedimientos."
    },
    {
      id: "FE",
      code: "FE",
      name: "Giovany Raul Pazos Cruz",
      title: "Frontend Developer / UX/UI PWA & Flutter",
      github: "giova0412",
      avatar: "https://github.com/giova0412.png",
      tag: "Equipo Interno",
      teamMember: true,
      description: "Diseño y desarrollo de interfaces de usuario en React/Vite (PWA) y Flutter móvil, prototipado de baja a alta fidelidad y experiencia de usuario."
    },
    {
      id: "PO",
      code: "PO",
      name: "Arrendador / Dueño de Pensión",
      title: "Product Owner / Stakeholder del Negocio",
      github: null,
      avatar: null,
      tag: "Stakeholder",
      teamMember: false,
      description: "Representante de las necesidades de negocio del sector de hospedaje estudiantil en Xicotepec. Valida reglas operativas, cobros y aceptación de uso."
    },
    {
      id: "DOC",
      code: "DOC",
      name: "M.T.I Marco Antonio Ramírez Hernández",
      title: "Docente Asesor / Evaluador Institucional UTXJ",
      github: "MTI-MarcoRHb",
      avatar: "https://github.com/MTI-MarcoRHb.png",
      tag: "Institucional",
      teamMember: false,
      description: "Evaluación académica, auditoría metodológica de entregables de integradora y validación del cumplimiento de rúbricas institucionales."
    },
    {
      id: "EST",
      code: "EST",
      name: "Estudiante Residente",
      title: "Usuario Final Beneficiario",
      github: null,
      avatar: null,
      tag: "Usuario Final",
      teamMember: false,
      description: "Usuario final del sistema que busca alojamiento, gestiona reservaciones en línea, realiza pagos y califica el servicio mediante la plataforma."
    }
  ],

  phases: [
    {
      id: "F1",
      code: "FASE 1",
      name: "Planificación y Gestión del Proyecto",
      color: "#2F8A5C",
      description: "Modelado del negocio, asignación de roles, estimación de recursos y definición de la metodología de trabajo."
    },
    {
      id: "F2",
      code: "FASE 2",
      name: "Análisis y Especificación de Requerimientos",
      color: "#1E5AA0",
      description: "Levantamiento de historias de usuario, reglas de negocio críticas, requerimientos funcionales y no funcionales."
    },
    {
      id: "F3",
      code: "FASE 3",
      name: "Arquitectura, Modelado y Diseño UX/UI",
      color: "#8B5CF6",
      description: "Diseño de arquitectura de software, modelado híbrido de datos, sketches a lápiz, wireframes CAD y mockups de alta fidelidad."
    },
    {
      id: "F4",
      code: "FASE 4",
      name: "Desarrollo e Implementación de Software",
      color: "#D97706",
      description: "Codificación de backend Node.js, microservicios FastAPI, frontend React PWA, app móvil Flutter e integración con APIs externas."
    },
    {
      id: "F5",
      code: "FASE 5",
      name: "Aseguramiento de Calidad, Auditoría y Seguridad",
      color: "#DC2626",
      description: "Pruebas unitarias, de integración y estrés, pruebas de usabilidad con usuarios y auditoría de seguridad contra OWASP Top 10."
    },
    {
      id: "F6",
      code: "FASE 6",
      name: "Despliegue, Operación y Mejora Continua",
      color: "#059669",
      description: "Configuración de CI/CD, despliegue en Render y GitHub Pages, entrega formal de manuales, soporte y evaluación del servicio."
    }
  ],

  tasks: [
    // FASE 1: PLANIFICACIÓN Y GESTIÓN
    {
      id: "T01",
      phaseId: "F1",
      code: "ACT-01",
      name: "Definición del Business Model Canvas (Práctica 04)",
      description: "Estructuración de los 9 bloques del modelo de negocio de SICPES, propuesta de valor, fuentes de ingreso y estructura de costos.",
      deliverable: "Modelo Canvas interactivo (HTML/CSS) y documento de análisis.",
      raci: {
        LP: { type: "R", note: "Redacta la documentación e integra los bloques con el equipo." },
        BE: { type: "C", note: "Valida viabilidad técnica de costos de infraestructura y APIs externas." },
        BD: { type: "C", note: "Aporta estimaciones de almacenamiento y costos de base de datos." },
        FE: { type: "C", note: "Alinea la propuesta de valor con los canales de interacción UI/UX." },
        PO: { type: "A", note: "Aprueba el modelo de negocio, segmentos de clientes y flujo de monetización." },
        DOC: { type: "C", note: "Revisa alineación con los objetivos curriculares de la materia." },
        EST: { type: "I", note: "Se le comunican los beneficios de la propuesta de valor." }
      }
    },
    {
      id: "T02",
      phaseId: "F1",
      code: "ACT-02",
      name: "Elaboración del Diagrama de Gantt y Cronograma de Hitos",
      description: "Desglose estructurado del trabajo (EDT/WBS), estimación temporal de sprints y fijación de fechas de entrega de prácticas.",
      deliverable: "Diagrama de Gantt oficial y calendario de entregables.",
      raci: {
        LP: { type: "A", note: "Responsable final del cumplimiento de fechas, hitos y distribución de tareas." },
        BE: { type: "R", note: "Estima tiempos de desarrollo de endpoints, auth y backend." },
        BD: { type: "R", note: "Estima tiempos de modelado relacional, NoSQL y migraciones." },
        FE: { type: "R", note: "Estima tiempos de diseño de sketches, wireframes, PWA y Flutter." },
        PO: { type: "I", note: "Recibe el calendario de revisiones y demostraciones de avance." },
        DOC: { type: "C", note: "Establece las fechas de corte y firmas institucionales de la UTXJ." },
        EST: { type: "I", note: "No interviene directamente en la calendarización interna." }
      }
    },
    {
      id: "T03",
      phaseId: "F1",
      code: "ACT-03",
      name: "Definición de Roles de Usuario y Matriz de Permisos (Práctica 05)",
      description: "Identificación de actores, matriz CRUD de privilegios por módulo y límites de acceso para Estudiante, Administrador y Dueño.",
      deliverable: "Diagrama interactivo de roles de usuario y especificación de permisos.",
      raci: {
        LP: { type: "A", note: "Aprueba la jerarquía de roles y estructura formal del entregable." },
        BE: { type: "R", note: "Diseña la lógica de autorización basada en roles (RBAC) y middlewares." },
        BD: { type: "C", note: "Define tablas de roles, permisos foráneos y restricciones de acceso." },
        FE: { type: "R", note: "Construye la visualización interactiva y rutas protegidas en cliente." },
        PO: { type: "C", note: "Valida que las facultades asignadas a cada rol correspondan a la realidad operativa." },
        DOC: { type: "I", note: "Recibe el diagrama de roles para cotejo de rúbrica." },
        EST: { type: "I", note: "Se le informan las acciones permitidas dentro de su perfil." }
      }
    },
    {
      id: "T04",
      phaseId: "F1",
      code: "ACT-04",
      name: "Construcción y Mantenimiento de la Matriz RACI del Proyecto",
      description: "Definición de responsabilidades por rol, verificación de regla de oro (1 Accountable por tarea) y visualizador interactivo.",
      deliverable: "Módulo MatrizRACI interactivo, datos maestros y documentación técnica.",
      raci: {
        LP: { type: "A", note: "Aprueba el balance de cargas de trabajo y la asignación formal de roles." },
        BE: { type: "R", note: "Valida las actividades técnicas de backend, APIs y seguridad." },
        BD: { type: "R", note: "Valida las actividades de modelado de datos y persistencia." },
        FE: { type: "R", note: "Codifica la interfaz web interactiva y visualizador de la matriz." },
        PO: { type: "I", note: "Conoce la estructura de responsabilidades del equipo de desarrollo." },
        DOC: { type: "C", note: "Audita la coherencia metodológica y apego al estándar de ingeniería." },
        EST: { type: "I", note: "Informa indirectamente a través de sus necesidades de usuario." }
      }
    },

    // FASE 2: ANÁLISIS Y ESPECIFICACIÓN DE REQUERIMIENTOS
    {
      id: "T05",
      phaseId: "F2",
      code: "ACT-05",
      name: "Especificación de Requerimientos Funcionales y No Funcionales (RF/RNF)",
      description: "Catálogo exhaustivo de requerimientos técnicos, disponibilidad (99.5%), tiempos de respuesta (<200ms) y seguridad.",
      deliverable: "Documento de especificación de requerimientos según estándar IEEE 830.",
      raci: {
        LP: { type: "R", note: "Redacta el documento formal y coordina las sesiones de levantamiento." },
        BE: { type: "A", note: "Rinde cuentas por la factibilidad y completitud de las especificaciones técnicas." },
        BD: { type: "C", note: "Define requerimientos de atomicidad, transacciones concurrentes y retención." },
        FE: { type: "C", note: "Define requerimientos de accesibilidad, fluidez visual y compatibilidad móvil." },
        PO: { type: "C", note: "Aporta los criterios de éxito funcional y necesidades del negocio." },
        DOC: { type: "C", note: "Evalúa la estructura y rigor metodológico de la especificación." },
        EST: { type: "I", note: "Participa como fuente primaria en encuestas de requerimientos." }
      }
    },
    {
      id: "T06",
      phaseId: "F2",
      code: "ACT-06",
      name: "Redacción y Criterios de Aceptación de Historias de Usuario (HU)",
      description: "Desarrollo de HU bajo formato 'Como [rol], quiero [acción], para [beneficio]', incluyendo criterios Gherkin (Dado, Cuando, Entonces).",
      deliverable: "Historias de usuario documentadas (HU-01 a HU-08) con criterios de aceptación.",
      raci: {
        LP: { type: "R", note: "Estructura y cataloga las historias de usuario en el repositorio." },
        BE: { type: "C", note: "Revisa que los criterios de aceptación sean verificables mediante APIs." },
        BD: { type: "C", note: "Mapea las entidades de datos requeridas por cada historia." },
        FE: { type: "C", note: "Diseña los flujos de interacción asociados a cada historia." },
        PO: { type: "A", note: "Valida y aprueba formalmente las historias de usuario como dueño del producto." },
        DOC: { type: "I", note: "Monitorea la trazabilidad entre HU y la solución implementada." },
        EST: { type: "C", note: "Provee retroalimentación sobre la claridad y pertinencia de las funcionalidades." }
      }
    },
    {
      id: "T07",
      phaseId: "F2",
      code: "ACT-07",
      name: "Modelado de Reglas de Negocio Críticas (RN-01 a RN-10)",
      description: "Definición algorítmica de reglas: bloqueo tras 3 intentos fallidos, OTP de 6 dígitos con expiración a 10 min, contrato PDF y no empalme de cuartos.",
      deliverable: "Catálogo formal de reglas de negocio con diagramas de decisión y validaciones.",
      raci: {
        LP: { type: "C", note: "Verifica coherencia entre las reglas y la documentación del sistema." },
        BE: { type: "A", note: "Rinde cuentas por la consistencia lógica y la implementación de las reglas en el backend." },
        BD: { type: "R", note: "Implementa constraints y triggers necesarios para respaldar las reglas a nivel BD." },
        FE: { type: "C", note: "Adecúa mensajes de error y retroalimentación al usuario en las interfaces." },
        PO: { type: "C", note: "Establece las políticas comerciales de tolerancia a pagos y cancelaciones." },
        DOC: { type: "I", note: "Recibe el catálogo de reglas para evaluación técnica." },
        EST: { type: "I", note: "Sujeto a las reglas de operación (términos y condiciones)." }
      }
    },

    // FASE 3: ARQUITECTURA, MODELADO Y DISEÑO UX/UI
    {
      id: "T08",
      phaseId: "F3",
      code: "ACT-08",
      name: "Diseño de la Arquitectura en Capas y Despliegue Cloud",
      description: "Diseño cliente-servidor desacoplado: PWA React / Móvil Flutter, Backend Node.js / Express, FastAPI en Python, TiDB MySQL, Docker y Render.",
      deliverable: "Diagrama de arquitectura interactivo (HTML/CSS) y documento justificativo.",
      raci: {
        LP: { type: "C", note: "Revisa coherencia global y elabora el README del módulo de arquitectura." },
        BE: { type: "A", note: "Rinde cuentas por la arquitectura de software, protocolos de comunicación y servicios externos." },
        BD: { type: "C", note: "Define la topología de conexión y cifrado SSL con TiDB Serverless." },
        FE: { type: "C", note: "Define el consumo de endpoints REST/JSON y sincronización PWA." },
        PO: { type: "I", note: "Se le informa la infraestructura que sostendrá la plataforma." },
        DOC: { type: "C", note: "Evalúa los patrones de diseño arquitectónico empleados." },
        EST: { type: "I", note: "Beneficiario de la alta disponibilidad y velocidad resultante." }
      }
    },
    {
      id: "T09",
      phaseId: "F3",
      code: "ACT-09",
      name: "Modelado de Base de Datos Híbrida (Relacional MySQL TiDB + NoSQL MongoDB)",
      description: "Diseño de esquemas E-R normalizados en 3FN para entidades transaccionales (usuarios, cuartos, reservas, pagos) y colecciones JSON para bitácoras/evaluaciones.",
      deliverable: "Diagrama E-R, scripts DDL SQL, esquemas de validación JSON y diccionario de datos.",
      raci: {
        LP: { type: "C", note: "Valida que el modelo cubra todas las historias de usuario." },
        BE: { type: "C", note: "Valida la compatibilidad con el ORM/Query Builder en Node.js y FastAPI." },
        BD: { type: "A", note: "Rinde cuentas de la integridad referencial, índices, normalización y rendimiento de la BD." },
        FE: { type: "I", note: "Conoce las estructuras de datos que recibirá en las respuestas JSON." },
        PO: { type: "I", note: "Valida que los datos de las pensiones y cuartos se capturen adecuadamente." },
        DOC: { type: "C", note: "Evalúa el diseño E-R y la justificación del modelo híbrido." },
        EST: { type: "I", note: "Sus datos personales y transacciones son protegidos por el modelo." }
      }
    },
    {
      id: "T10",
      phaseId: "F3",
      code: "ACT-10",
      name: "Elaboración de Sketches de Baja Fidelidad a Lápiz (Práctica 07)",
      description: "Creación de al menos 20 sketches a mano alzada / Rough.js de apariencia a lápiz: 9 pantallas obligatorias y 11+ de funcionalidades por rol.",
      deliverable: "Visor interactivo de 28 sketches en plataforma móvil y PWA con selector de roles.",
      raci: {
        LP: { type: "C", note: "Verifica cumplimiento de los 20 sketches mínimos y rubro del Padlet." },
        BE: { type: "I", note: "Conoce los formularios y campos que requerirán endpoints en la API." },
        BD: { type: "I", note: "Alinea las pantallas con los campos existentes en el modelo de datos." },
        FE: { type: "A", note: "Rinde cuentas de la fidelidad conceptual, estética de boceto a lápiz y ergonomía visual." },
        PO: { type: "C", note: "Revisa la distribución básica de elementos y contenido en pantalla." },
        DOC: { type: "C", note: "Evalúa la técnica de baja fidelidad y correspondencia con el problema." },
        EST: { type: "C", note: "Aporta observaciones preliminares sobre la legibilidad de los bocetos." }
      }
    },
    {
      id: "T11",
      phaseId: "F3",
      code: "ACT-11",
      name: "Construcción de Wireframes Técnicos con Redlines CAD (#E0003C)",
      description: "Diseño de wireframes de media fidelidad con cotas exteriores en píxeles (px), puntos lógicos (lp) y especificaciones técnicas exactas para maquetación.",
      deliverable: "Visor interactivo con toggle de redlines CAD, cotas de espaciado y tokens de diseño.",
      raci: {
        LP: { type: "C", note: "Verifica la consistencia entre los redlines y el manual de estilos." },
        BE: { type: "I", note: "Revisa dimensiones de payloads y formatos de datos representados." },
        BD: { type: "I", note: "Alinea longitud de campos en pantalla con restricciones de columnas SQL." },
        FE: { type: "A", note: "Rinde cuentas de las cotas milimétricas, responsive grids y precisión dimensional." },
        PO: { type: "I", note: "Recibe los wireframes para apreciar la jerarquía visual refinada." },
        DOC: { type: "C", note: "Evalúa el rigor técnico del acotamiento CAD y preparación para codificación." },
        EST: { type: "I", note: "Experimentará las interfaces basadas en estas dimensiones." }
      }
    },
    {
      id: "T12",
      phaseId: "F3",
      code: "ACT-12",
      name: "Creación de Mockups de Alta Fidelidad con Fotografía Real y Paleta de Marca",
      description: "Implementación de interfaces de alta fidelidad aplicando la paleta institucional (#2F8A5C, #4CAF50, #FDFBF7), fotografías reales de residencias y avatares.",
      deliverable: "Galería de mockups fotorrealistas integrados en el visor interactivo de SICPES.",
      raci: {
        LP: { type: "C", note: "Valida el cumplimiento estricto de la identidad de marca de SICPES." },
        BE: { type: "I", note: "Observa los estados de carga, spinners y badges visuales requeridos." },
        BD: { type: "I", note: "Verifica que los datos de prueba simulados reflejen el esquema de BD." },
        FE: { type: "A", note: "Rinde cuentas del aspecto visual definitivo, contrastes WCAG AAA y maquetación de componentes." },
        PO: { type: "C", note: "Valida que el diseño visual proyecte confianza, calidez y profesionalismo." },
        DOC: { type: "I", note: "Evalúa la evolución gráfica de sketches a mockups de alta fidelidad." },
        EST: { type: "C", note: "Participa en sesiones de percepción visual y retroalimentación estética." }
      }
    },
    {
      id: "T13",
      phaseId: "F3",
      code: "ACT-13",
      name: "Generación del Diagrama de Navegación Interactivo con Archify",
      description: "Modelado del grafo direccional de navegación, rutas públicas/privadas, transiciones por rol, bloqueo por 3 intentos y atajos interactivos.",
      deliverable: "Diagrama vectorial interactivo (#diagramView) con nodos clicables y visualización de rutas.",
      raci: {
        LP: { type: "A", note: "Rinde cuentas de la integridad del flujo de navegación y coherencia entre módulos." },
        BE: { type: "C", note: "Valida las rutas de redirección ante errores de autenticación o bloqueo." },
        BD: { type: "I", note: "Conoce los flujos de consulta y persistencia en cada transición." },
        FE: { type: "R", note: "Implementa el grafo ortogonal SVG interactivo y eventos de navegación." },
        PO: { type: "C", note: "Prueba la secuencia lógica de navegación para reservar y pagar." },
        DOC: { type: "C", note: "Evalúa la completitud del diagrama conforme al estándar de la práctica." },
        EST: { type: "I", note: "Recorre los flujos diseñados durante las pruebas de prototipo." }
      }
    },

    // FASE 4: DESARROLLO E IMPLEMENTACIÓN TÉCNICA
    {
      id: "T14",
      phaseId: "F4",
      code: "ACT-14",
      name: "Configuración de Entorno de Desarrollo, Docker y TiDB Serverless",
      description: "Aprovisionamiento de contenedores Docker, variables de entorno (.env seguro), conexión SSL a TiDB MySQL y repositorio GitHub.",
      deliverable: "Archivos docker-compose.yml, Dockerfile, scripts de inicio y conexión a BD activa.",
      raci: {
        LP: { type: "C", note: "Supervisa la estandarización del entorno para todos los integrantes." },
        BE: { type: "A", note: "Rinde cuentas de la configuración de contenedores, red Docker y variables de entorno." },
        BD: { type: "R", note: "Configura los certificados SSL y parámetros de conexión hacia TiDB Serverless." },
        FE: { type: "I", note: "Utiliza las imágenes de desarrollo y endpoints configurados localmente." },
        PO: { type: "I", note: "Se le notifica la disponibilidad de los entornos de desarrollo y staging." },
        DOC: { type: "I", note: "Puede clonar y levantar el entorno siguiendo el README técnico." },
        EST: { type: "I", note: "No interviene en la configuración interna de DevOps." }
      }
    },
    {
      id: "T15",
      phaseId: "F4",
      code: "ACT-15",
      name: "Implementación de Esquemas de BD, Migraciones y Procedimientos Almacenados",
      description: "Ejecución de migraciones DDL, creación de vistas de cuartos disponibles, procedimientos de cálculo de adeudos y restricciones de integridad.",
      deliverable: "Repositorio de migraciones SQL versionadas, índices optimizados y datos semilla.",
      raci: {
        LP: { type: "I", note: "Monitorea la ejecución exitosa de las migraciones en el pipeline." },
        BE: { type: "C", note: "Solicita vistas optimizadas y define payloads requeridos por los endpoints." },
        BD: { type: "A", note: "Rinde cuentas de la ejecución sin errores de las migraciones y consistencia de datos." },
        FE: { type: "I", note: "Recibe el catálogo de datos de prueba para alimentar interfaces." },
        PO: { type: "I", note: "Valida que los catálogos de habitaciones y precios reflejen su operación real." },
        DOC: { type: "C", note: "Audita la estructura relacional y buenas prácticas de normalización SQL." },
        EST: { type: "I", note: "Sus reservas y registros se almacenan de forma segura y consistente." }
      }
    },
    {
      id: "T16",
      phaseId: "F4",
      code: "ACT-16",
      name: "Desarrollo del Backend Principal RESTful en Node.js y Express",
      description: "Programación de controladores, servicios y rutas para: gestión de usuarios, catálogo de habitaciones, solicitudes de reserva y registro de pagos.",
      deliverable: "API RESTful documentada, modular y probada con cobertura de endpoints clave.",
      raci: {
        LP: { type: "R", note: "Implementa módulos de apoyo y verifica apego a estándares de codificación." },
        BE: { type: "A", note: "Rinde cuentas de la robustez, rendimiento y lógica de negocio del servidor Node.js." },
        BD: { type: "C", note: "Optimiza consultas SQL ejecutadas por el pool de conexiones de la API." },
        FE: { type: "C", note: "Acuerda contratos de API (JSON schemas) y formatos de respuesta de error." },
        PO: { type: "I", note: "Observa el funcionamiento en las demostraciones de sprint." },
        DOC: { type: "I", note: "Revisa el código fuente y patrones de arquitectura en GitHub." },
        EST: { type: "I", note: "Interactúa indirectamente a través del cliente web y móvil." }
      }
    },
    {
      id: "T17",
      phaseId: "F4",
      code: "ACT-17",
      name: "Desarrollo del Microservicio en FastAPI (Python) para Reportes y Analíticas",
      description: "Construcción de servicio especializado en cálculo de estadísticas de ocupación, métricas de morosidad, procesamiento numérico y Swagger nativo.",
      deliverable: "Microservicio FastAPI desplegado con endpoints analíticos y documentación OpenAPI.",
      raci: {
        LP: { type: "C", note: "Revisa la integración entre el backend Node.js y el microservicio Python." },
        BE: { type: "A", note: "Rinde cuentas de la arquitectura del microservicio, tipado Pydantic y rendimiento." },
        BD: { type: "C", note: "Configura vistas de sólo lectura y réplicas analíticas para consultas pesadas." },
        FE: { type: "I", note: "Consume endpoints analíticos para pintar gráficas en el dashboard admin." },
        PO: { type: "C", note: "Indica qué reportes y métricas son prioritarios para su negocio de pensión." },
        DOC: { type: "C", note: "Valida la justificación técnica de incorporar un stack políglota (Node + Python)." },
        EST: { type: "I", note: "No interactúa con el microservicio de analíticas administrativas." }
      }
    },
    {
      id: "T18",
      phaseId: "F4",
      code: "ACT-18",
      name: "Integración de Web Services Externos (Geolocation, OSRM, Twilio, PDFmonkey)",
      description: "Consumo de API Geolocation y OSRM para rutas a pie a la universidad, Twilio WhatsApp para alertas, PDFmonkey para contratos y Mailtrap para correos.",
      deliverable: "Módulos de integración probados con manejo de cuotas, timeouts y fallbacks seguros.",
      raci: {
        LP: { type: "C", note: "Supervisa los costos y gestión de llaves API de servicios de terceros." },
        BE: { type: "A", note: "Rinde cuentas de la integración robusta, manejo de excepciones y webhooks externos." },
        BD: { type: "I", note: "Almacena identificadores de transacciones externas y tokens de documentos generados." },
        FE: { type: "R", note: "Integra la Geolocation API y renderiza mapas interactivos en la interfaz." },
        PO: { type: "C", note: "Valida el formato de los contratos en PDF y los mensajes de WhatsApp recibidos." },
        DOC: { type: "I", note: "Verifica que el uso de APIs externas esté debidamente documentado." },
        EST: { type: "I", note: "Recibe notificaciones automáticas y puede descargar su contrato firmado." }
      }
    },
    {
      id: "T19",
      phaseId: "F4",
      code: "ACT-19",
      name: "Implementación del Frontend Web Progresivo (PWA) con React / Vite",
      description: "Construcción de la SPA/PWA con TypeScript, Tailwind CSS, Service Workers para cache offline, Web App Manifest y diseño adaptable.",
      deliverable: "Aplicación PWA instalable, responsiva y funcional alojada en la web.",
      raci: {
        LP: { type: "C", note: "Valida la coherencia de estilos y la navegación entre rutas." },
        BE: { type: "C", note: "Provee soporte en el consumo de endpoints y resolución de errores HTTP." },
        BD: { type: "I", note: "Valida que el manejo de estados en frontend sea consistente con la BD." },
        FE: { type: "A", note: "Rinde cuentas de la arquitectura de componentes, rendimiento PWA y experiencia de usuario." },
        PO: { type: "C", note: "Prueba la versión web desde computadoras de escritorio y tablets." },
        DOC: { type: "C", note: "Evalúa el cumplimiento de estándares PWA (Lighthouse score > 85)." },
        EST: { type: "R", note: "Participa en pruebas de uso temprano navegando en la PWA." }
      }
    },
    {
      id: "T20",
      phaseId: "F4",
      code: "ACT-20",
      name: "Implementación de la Aplicación Móvil Multiplataforma con Flutter / Dart",
      description: "Desarrollo de la app móvil nativa para Android/iOS utilizando Flutter, gestión de estado con Provider/Bloc y consumo de APIs por HTTPS.",
      deliverable: "Código fuente Flutter compilable, APK de prueba y pantallas de la app terminadas.",
      raci: {
        LP: { type: "C", note: "Verifica paridad de funcionalidades entre la app móvil y la versión web." },
        BE: { type: "C", note: "Asegura compatibilidad de encabezados y tokens JWT con el cliente móvil." },
        BD: { type: "I", note: "Monitorea la latencia de respuestas consumidas desde redes móviles." },
        FE: { type: "A", note: "Rinde cuentas de la arquitectura Flutter, fluidez a 60 FPS y fidelidad a los sketches." },
        PO: { type: "I", note: "Instala y valida el APK en dispositivos móviles reales." },
        DOC: { type: "C", note: "Evalúa el uso adecuado de Dart, widgets personalizados y buenas prácticas móviles." },
        EST: { type: "R", note: "Prueba la instalación y uso en su propio teléfono inteligente." }
      }
    },
    {
      id: "T21",
      phaseId: "F4",
      code: "ACT-21",
      name: "Implementación de Mecanismos de Seguridad y Autenticación Robusta",
      description: "Implementación de JWT con expiración corta, refresh tokens, hashing de contraseñas con Argon2, bloqueo tras 3 intentos y validación OTP.",
      deliverable: "Middlewares de seguridad, filtros de saneamiento XSS/SQLi y suites de prueba de autenticación.",
      raci: {
        LP: { type: "C", note: "Audita que las políticas de seguridad cumplan con el marco institucional." },
        BE: { type: "A", note: "Rinde cuentas de la inviolabilidad de los mecanismos de autenticación y autorización." },
        BD: { type: "R", note: "Configura cifrado de columnas sensibles y permisos mínimos de usuario en TiDB." },
        FE: { type: "C", note: "Implementa almacenamiento seguro de tokens (HTTP-only cookies) e interceptores." },
        PO: { type: "I", note: "Se le garantiza que los datos financieros y residenciales están blindados." },
        DOC: { type: "C", note: "Evalúa los algoritmos criptográficos y protocolos de seguridad empleados." },
        EST: { type: "I", note: "Experimenta inicio de sesión seguro y verificación de dos pasos." }
      }
    },

    // FASE 5: ASEGURAMIENTO DE CALIDAD, AUDITORÍA Y SEGURIDAD
    {
      id: "T22",
      phaseId: "F5",
      code: "ACT-22",
      name: "Diseño y Ejecución de Pruebas Unitarias y de Integración Backend",
      description: "Elaboración de pruebas automatizadas con Jest / PyTest para validar controladores, servicios de reserva, cálculo de deudas y bloqueo de cuentas.",
      deliverable: "Reporte de cobertura de código (>80%), suite de tests ejecutables y reporte CI.",
      raci: {
        LP: { type: "C", note: "Supervisa que todas las historias de usuario cuenten con pruebas asociadas." },
        BE: { type: "A", note: "Rinde cuentas de la cobertura y pase exitoso de todas las pruebas unitarias." },
        BD: { type: "R", note: "Prepara bases de datos de prueba en memoria e inicializa fixtures de datos." },
        FE: { type: "I", note: "Se apoya en los contratos validados por las pruebas unitarias." },
        PO: { type: "I", note: "Recibe el resumen de estabilidad del software." },
        DOC: { type: "C", note: "Revisa los reportes de cobertura y rigor en aserciones de prueba." },
        EST: { type: "I", note: "Beneficiario directo de la ausencia de errores en producción." }
      }
    },
    {
      id: "T23",
      phaseId: "F5",
      code: "ACT-23",
      name: "Pruebas de Usabilidad con Estudiantes y Administradores de Pensión",
      description: "Sesiones de prueba de usuario guiadas para medir tiempos de tarea, tasa de error y satisfacción en los flujos de reserva y reporte de pagos.",
      deliverable: "Reporte de pruebas de usabilidad, métricas SUS (System Usability Scale) y mejoras UX.",
      raci: {
        LP: { type: "R", note: "Modera las sesiones de prueba y documenta las observaciones recopiladas." },
        BE: { type: "I", note: "Analiza logs de peticiones generadas durante las pruebas de usuario." },
        BD: { type: "I", note: "Monitorea el impacto transaccional de usuarios simultáneos." },
        FE: { type: "A", note: "Rinde cuentas de la facilidad de uso y aplica las correcciones de diseño derivadas." },
        PO: { type: "C", note: "Participa activamente validando la facilidad del panel de administración." },
        DOC: { type: "C", note: "Evalúa la metodología de evaluación con usuarios reales." },
        EST: { type: "R", note: "Ejecuta las pruebas en rol de usuario evaluando la navegación." }
      }
    },
    {
      id: "T24",
      phaseId: "F5",
      code: "ACT-24",
      name: "Auditoría de Seguridad, Pruebas de Penetración y Escaneo de Vulnerabilidades",
      description: "Análisis estático de código (SAST), escaneo de dependencias (npm audit, Snyk), pruebas contra inyección SQL, Cross-Site Scripting y CSRF.",
      deliverable: "Reporte de auditoría de seguridad OWASP Top 10 con matriz de mitigación de riesgos.",
      raci: {
        LP: { type: "C", note: "Valida la remediación de hallazgos críticos antes del cierre de sprint." },
        BE: { type: "A", note: "Rinde cuentas del blindaje contra vulnerabilidades conocidas y parches aplicados." },
        BD: { type: "R", note: "Verifica sanitización de parámetros y permisos de usuario a nivel de motor SQL." },
        FE: { type: "C", note: "Verifica cabeceras CSP (Content Security Policy) y prevención de XSS en inputs." },
        PO: { type: "I", note: "Se le presenta el dictamen de seguridad que avala la plataforma." },
        DOC: { type: "C", note: "Audita la metodología de escaneo y matriz de riesgos de seguridad." },
        EST: { type: "I", note: "Garantía de confidencialidad de sus datos de contacto y pago." }
      }
    },
    {
      id: "T25",
      phaseId: "F5",
      code: "ACT-25",
      name: "Documentación Técnica de APIs con Swagger / OpenAPI y Guías de Integración",
      description: "Especificación formal de endpoints, códigos de estado HTTP, esquemas de solicitud/respuesta JSON, ejemplos interactivos y manuales.",
      deliverable: "Endpoint Swagger UI funcional en línea y documentación Markdown en el repositorio.",
      raci: {
        LP: { type: "A", note: "Rinde cuentas de la claridad, estándares y completitud de la documentación técnica." },
        BE: { type: "R", note: "Genera y mantiene las anotaciones OpenAPI en los controladores de Node y FastAPI." },
        BD: { type: "C", note: "Valida que las descripciones de los esquemas reflejen con fidelidad las tablas." },
        FE: { type: "C", note: "Verifica que los ejemplos documentados correspondan con el consumo real del cliente." },
        PO: { type: "I", note: "Recibe el compendio de documentación que acredita la madurez del software." },
        DOC: { type: "C", note: "Revisa la documentación como evidencia formal para acreditación académica." },
        EST: { type: "I", note: "No consulta la documentación de APIs de bajo nivel." }
      }
    },

    // FASE 6: DESPLIEGUE, OPERACIÓN Y MEJORA CONTINUA
    {
      id: "T26",
      phaseId: "F6",
      code: "ACT-26",
      name: "Automatización de Pipeline CI/CD y Despliegue en Render y GitHub Pages",
      description: "Configuración de GitHub Actions para ejecución automática de pruebas, build de PWA para GitHub Pages y despliegue automático de contenedores en Render.",
      deliverable: "Workflows de GitHub Actions (.github/workflows), badges de status y URLs productivas activas.",
      raci: {
        LP: { type: "A", note: "Rinde cuentas de la disponibilidad del repositorio y sincronización de ramas." },
        BE: { type: "R", note: "Configura el webhook de despliegue continuo en Render y variables de entorno seguras." },
        BD: { type: "C", note: "Asegura la conectividad del entorno de producción con TiDB Cloud." },
        FE: { type: "R", note: "Configura la compilación de Vite y publicación automática en GitHub Pages." },
        PO: { type: "I", note: "Accede al enlace productivo para interactuar con la versión en vivo." },
        DOC: { type: "C", note: "Verifica el versionamiento continuo y despliegue en entornos públicos." },
        EST: { type: "I", note: "Accede a la plataforma desplegada en línea sin interrupciones." }
      }
    },
    {
      id: "T27",
      phaseId: "F6",
      code: "ACT-27",
      name: "Elaboración de Manuales de Usuario para Estudiante y Administrador",
      description: "Redacción de guías paso a paso ilustradas con capturas de pantalla reales: manual para el estudiante (búsqueda, reserva, pagos) y administrador (cuartos, cobros).",
      deliverable: "Manuales de usuario en formato PDF interactivo y versión web consultable.",
      raci: {
        LP: { type: "A", note: "Rinde cuentas de la redacción pedagógica, ortografía y estructura de los manuales." },
        BE: { type: "C", note: "Revisa las descripciones de procedimientos administrativos y validación de cobros." },
        BD: { type: "I", note: "Verifica que los términos usados coincidan con los conceptos del sistema." },
        FE: { type: "R", note: "Genera las capturas de pantalla de alta resolución y diagramas de flujo de usuario." },
        PO: { type: "C", note: "Valida que el manual del administrador sea comprensible para cualquier arrendador." },
        DOC: { type: "C", note: "Evalúa el manual según la rúbrica de entregables de titulación/integradora." },
        EST: { type: "I", note: "Utiliza el manual o sección de ayuda integrada en la aplicación." }
      }
    },
    {
      id: "T28",
      phaseId: "F6",
      code: "ACT-28",
      name: "Revisión Académica de Entregables y Cumplimiento de Firmas UTXJ",
      description: "Cotejo de todas las prácticas del proyecto integrador contra los instrumentos de evaluación institucional de la UTXJ para la firma de aprobación.",
      deliverable: "Carpeta de evidencias completa, repositorio actualizado y acta de evaluación firmada.",
      raci: {
        LP: { type: "R", note: "Presenta las evidencias, defiende el proyecto y gestiona las observaciones docentes." },
        BE: { type: "R", note: "Sustenta las decisiones de arquitectura, base de datos y backend ante el docente." },
        BD: { type: "R", note: "Defiende el modelo relacional y las pruebas de integridad de datos." },
        FE: { type: "R", note: "Demuestra los prototipos, diagramas de navegación y usabilidad móvil/PWA." },
        PO: { type: "I", note: "Emite carta de conformidad y validación del proyecto para el sector real." },
        DOC: { type: "A", note: "Rinde cuentas institucionales de la evaluación, asignación de calificación y otorgamiento de firmas." },
        EST: { type: "I", note: "Se beneficia de una plataforma auditada con rigor académico." }
      }
    },
    {
      id: "T29",
      phaseId: "F6",
      code: "ACT-29",
      name: "Monitoreo Operativo, Registro de Logs y Plan de Contingencia",
      description: "Implementación de monitoreo de disponibilidad, alertas de fallos en endpoints, recolección de logs centralizados y plan de recuperación ante desastres.",
      deliverable: "Dashboard de observabilidad, políticas de backup periódico de BD y protocolo de contingencia.",
      raci: {
        LP: { type: "C", note: "Coordina la ejecución de simulacros de recuperación y auditorías de servicio." },
        BE: { type: "A", note: "Rinde cuentas de la respuesta oportuna ante incidentes en servidores y APIs." },
        BD: { type: "R", note: "Programa backups diarios automatizados y verifica integridad de snapshots en TiDB." },
        FE: { type: "I", note: "Implementa páginas de mantenimiento y manejo amigable de errores 500." },
        PO: { type: "I", note: "Recibe informes mensuales de tiempo de actividad y estabilidad de la pensión." },
        DOC: { type: "I", note: "Verifica que el proyecto cuente con lineamientos de gobernanza de TI." },
        EST: { type: "I", note: "Disfruta de un servicio confiable con mínima degradación o caídas." }
      }
    },
    {
      id: "T30",
      phaseId: "F6",
      code: "ACT-30",
      name: "Gestión de Retroalimentación y Mejora Continua (HU-Evaluación del Servicio)",
      description: "Análisis periódico de las evaluaciones (estrellas 1-5 y comentarios) emitidas por los estudiantes al finalizar estancias para planear nuevos releases.",
      deliverable: "Tablero de satisfacción estudiantil, backlog de mejoras priorizado y plan de versiones v2.1.",
      raci: {
        LP: { type: "A", note: "Rinde cuentas de la priorización del backlog de mejoras y ciclo de vida del producto." },
        BE: { type: "C", note: "Evalúa viabilidad técnica de las nuevas funcionalidades solicitadas." },
        BD: { type: "C", note: "Diseña nuevas tablas o campos requeridos por las solicitudes de mejora." },
        FE: { type: "R", note: "Diseña e implementa las optimizaciones de interfaz sugeridas por los usuarios." },
        PO: { type: "C", note: "Prioriza mejoras que eleven la tasa de ocupación y reduzcan la morosidad." },
        DOC: { type: "I", note: "Supervisa la maduración del software como proyecto con impacto social." },
        EST: { type: "C", note: "Emite calificaciones y propuestas de mejora directa desde su perfil." }
      }
    }
  ]
};

// Validar en tiempo de carga que se cumpla la Regla de Oro RACI (exactamente 1 Accountable por tarea)
(function validateGoldenRule() {
  if (typeof window === "undefined" && typeof console !== "undefined") {
    let errors = [];
    RACI_DATA.tasks.forEach(task => {
      let accountableCount = 0;
      Object.keys(task.raci).forEach(roleKey => {
        if (task.raci[roleKey].type === "A") accountableCount++;
      });
      if (accountableCount !== 1) {
        errors.push(`Error en ${task.code} (${task.name}): tiene ${accountableCount} Accountables (debe ser exactamente 1).`);
      }
    });
    if (errors.length > 0) {
      console.error("VIOLACIONES A LA REGLA DE ORO RACI:", errors);
    } else {
      console.log("RACI Golden Rule validada con éxito: 100% de tareas tienen exactamente 1 Accountable.");
    }
  }
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = RACI_DATA;
}

