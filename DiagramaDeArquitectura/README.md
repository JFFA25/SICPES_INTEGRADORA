# <p align="center">SICPES · Diagrama de Arquitectura</p>

<p align="center">
  <strong>Sistema Integral de Control de Pensión de Estudiantes</strong><br>
  <em>Arquitectura cliente-servidor en capas · API REST sobre HTTPS · Despliegue en la nube con contenedores</em>
</p>

<p align="center">
  <a href="https://jffa25.github.io/SICPES_INTEGRADORA/DiagramaDeArquitectura/arquitectura.html">
    <img src="/DiagramaDeArquitectura/arquitectura-sicpes.png" alt="Diagrama de arquitectura de SICPES" width="900"/>
  </a>
</p>

<p align="center">
  <a href="https://jffa25.github.io/SICPES_INTEGRADORA/DiagramaDeArquitectura/arquitectura.html"><strong>▶ Ver el diagrama interactivo (GitHub Pages)</strong></a>
</p>

## Contenido

1. [Resumen](#resumen)
2. [Capas de la arquitectura](#capas-de-la-arquitectura)
3. [Componentes](#componentes)
4. [Conexiones y flujos de datos](#conexiones-y-flujos-de-datos)
5. [Existente vs. planeado](#existente-vs-planeado)
6. [Cómo usar el diagrama interactivo](#cómo-usar-el-diagrama-interactivo)
7. [Estructura de la carpeta](#estructura-de-la-carpeta)
8. [Ver en línea y ejecutar en local](#ver-en-línea-y-ejecutar-en-local)
9. [Decisiones de diseño](#decisiones-de-diseño)

## Resumen

Este diagrama documenta cómo está organizado SICPES: quiénes lo usan, qué clientes consumen el sistema, qué APIs concentran la lógica de negocio, dónde se guardan los datos, qué servicios de terceros se integran y cómo se despliega todo en la nube.

Sigue el estilo de un diagrama C4 por capas: cada capa es un límite (*boundary*) con sus componentes, y las flechas indican quién llama a quién y por qué protocolo.

**Estilo arquitectónico:** cliente-servidor en capas, con una API REST (JSON) sobre HTTPS y un canal WebSocket para comunicación en tiempo real.

## Capas de la arquitectura

| Capa | Qué contiene | Rol dentro del sistema |
| :--- | :--- | :--- |
| **Usuarios (actores)** | Estudiante y Administrador | Interactúan con el sistema a través de los clientes. |
| **Capa de presentación** | Web React, App móvil Flutter *(planeada)*, PWA *(planeada)* | Interfaz que ve el usuario; consume la API por HTTPS (REST / JSON). |
| **Capa de lógica de negocio** | Backend principal (Node.js + Express) y API complementaria (FastAPI) | Autenticación, reglas del negocio, integración con servicios externos y tiempo real. |
| **Capa de datos** | MySQL sobre TiDB Serverless y MongoDB | Persistencia de la información estructurada y documental. |
| **Servicios externos** | Geolocation API, Google Maps Embed, Mailtrap, Twilio, PDFmonkey, OSRM | Capacidades de terceros que SICPES no implementa por sí mismo. |
| **Infraestructura** | Docker, Render y TiDB Serverless | Contenedores, hospedaje y base de datos en la nube. |

## Componentes

### Usuarios

| Actor | Qué hace en el sistema |
| :--- | :--- |
| **Estudiante** | Busca pensiones, solicita reservaciones, ve la ruta a pie y la distancia hasta la pensión. |
| **Administrador** | Gestiona inmuebles, valida pagos y cuotas, y genera contratos en PDF. |

### Clientes (capa de presentación)

| Componente | Tecnologías | Estado | Descripción |
| :--- | :--- | :--- | :--- |
| **Web React** | React, TypeScript, TailwindCSS | Existe | Interfaz principal: dashboards por rol y solicitud de reservaciones. Desplegada en Render. |
| **App móvil Flutter** | Dart, Flutter | Planeado | App para Android e iOS que consumiría el mismo Backend y la misma API por HTTPS. |
| **PWA** | Web App Manifest, Service Worker | Planeado | Capa sobre el mismo frontend React que lo vuelve instalable y usable sin conexión. No es una aplicación aparte. |

### Backend y API (capa de lógica de negocio)

| Componente | Tecnologías | Descripción |
| :--- | :--- | :--- |
| **Backend principal** | Node.js, Express | API REST (JSON) con la autenticación y la lógica de negocio. Maneja **WebSockets** para comunicación en tiempo real con los clientes. Se integra con Mailtrap, Twilio y PDFmonkey. |
| **API complementaria** | FastAPI (Python), Swagger / OpenAPI | Servicios complementarios con documentación interactiva de sus endpoints. Consulta a OSRM para calcular rutas. |

### Capa de datos

| Componente | Tipo | Descripción |
| :--- | :--- | :--- |
| **MySQL · TiDB Serverless** | Relacional | Información estructurada (usuarios, habitaciones, reservas, pagos). Conexión cifrada con SSL/TLS. |
| **MongoDB** | Documental (NoSQL) | Información de estructura flexible. |

### Servicios externos

| Servicio | Qué aporta | Lo llama |
| :--- | :--- | :--- |
| **Geolocation API (HTML5)** | Latitud y longitud del dispositivo, solo con consentimiento del usuario. | Web |
| **Google Maps Embed** | Mapa interactivo de la UT Xicotepec de Juárez y ubicación de la pensión. | Web |
| **Mailtrap API** | Correos transaccionales: confirmación de cuenta y código de verificación en dos pasos por correo. | Backend |
| **Twilio API** | Servicio adicional para enviar mensajes y notificaciones por WhatsApp. | Backend |
| **PDFmonkey API** | Generación de contratos de arrendamiento, recibos y reportes en PDF. | Backend |
| **OSRM API** | Ruta óptima a pie y distancia exacta en kilómetros hasta la pensión. | API complementaria |

### Infraestructura y despliegue

| Componente | Función |
| :--- | :--- |
| **Docker** | Un contenedor por servicio (frontend, backend y API); se levanta en local con `docker compose`. |
| **Render** | Despliega la web, el Backend y la API, con HTTPS/TLS automático. |
| **TiDB Serverless** | Aloja la base de datos MySQL con conexión SSL/TLS. |

## Conexiones y flujos de datos

| Conexión | Protocolo | Descripción |
| :--- | :--- | :--- |
| Usuario → Cliente | Interacción | El estudiante o el administrador usan la Web (y, a futuro, la app o la PWA). |
| Clientes → Backend y API | **HTTPS · REST (JSON)** | Los clientes consumen las dos APIs. |
| Web ⇄ Backend principal | **WebSocket** | Canal bidireccional para actualizaciones en tiempo real. |
| Backend → MySQL | SQL sobre SSL/TLS | Lectura y escritura de datos estructurados. |
| Backend → MongoDB | NoSQL | Lectura y escritura de datos documentales. |
| Backend → Mailtrap, Twilio, PDFmonkey | API REST sobre HTTPS | Correos y verificación, mensajes de WhatsApp y generación de PDF. |
| API complementaria → OSRM | API REST sobre HTTPS | Cálculo de la ruta a pie y la distancia. |
| Web → Geolocation y Google Maps | API del navegador / Embed | Ubicación del usuario y mapa de la pensión. |

### Flujos animados incluidos

El botón **Ver flujo** recorre paso a paso tres escenarios:

1. **Registro de estudiante:** formulario en la web → Backend (HTTPS/REST) → Mailtrap envía el código de verificación al correo → el estudiante ingresa el código y el Backend lo valida → la cuenta se guarda en MySQL.
2. **Buscar pensión:** búsqueda en la web → el navegador pide la ubicación (Geolocation) → la web envía las coordenadas a la API FastAPI → la API consulta a OSRM la ruta a pie y la distancia → la web muestra la pensión en Google Maps.
3. **Generar contrato:** el administrador lo solicita en su dashboard → la web llama al Backend → PDFmonkey genera el PDF → el Backend registra el contrato y el pago en MySQL → avisa a la web en tiempo real por WebSocket.

## Existente vs. planeado

| Estado | Componentes |
| :--- | :--- |
| **Existe** | Web React, Backend principal, API complementaria, MySQL (TiDB), MongoDB, Docker, Render y los seis servicios externos. |
| **Planeado** | App móvil Flutter y PWA. |

En el diagrama, lo planeado se dibuja con borde y línea **punteados** y la etiqueta *PLANEADO*. El botón **Mostrar planeado** lo oculta o lo muestra.

## Cómo usar el diagrama interactivo

| Acción | Resultado |
| :--- | :--- |
| Pasar el mouse sobre un componente | Resalta el componente y sus conexiones; atenúa el resto. |
| Clic o `Enter` en un componente | Abre una ventana con su descripción, tecnologías, detalle y los componentes con los que se conecta. |
| **Mostrar planeado** | Oculta o muestra los componentes planeados. |
| **Ver flujo** | Anima un escenario de uso paso a paso (registro, búsqueda o contrato). |
| **Presentar** | Recorre los componentes en orden con las flechas ← / →; `Esc` para salir. |
| **Exportar PNG / SVG** | Descarga el diagrama como imagen. |
| **Tema claro/oscuro** | Cambia el tema; la preferencia se guarda en el navegador. |
| **Ver sketches** | Abre los sketches de navegación del proyecto. |

El diagrama es **responsivo**: en escritorio se muestra completo, y en tablet y celular las capas se apilan en tarjetas. Se puede navegar con teclado (`Tab`, `Enter` y `Esc`) y respeta la preferencia de movimiento reducido del sistema.

## Estructura de la carpeta

```text
DiagramaDeArquitectura/
├── arquitectura.html   # Diagrama interactivo (un solo archivo: HTML + CSS + JS + SVG)
├── arquitectura.png    # Vista previa del diagrama
├── README.md           # Este documento
└── assets/             # Imágenes opcionales (logos y capturas de pantalla)
    ├── logo-producto.png
    ├── logo-empresa.png
    ├── shot-web.png
    ├── shot-pwa-student.png
    └── shot-flutter.png
```

El HTML funciona por sí solo; los archivos de `assets/` son opcionales y, si faltan, el diagrama usa maquetas dibujadas en su lugar.

## Ver en línea y ejecutar en local

- **En línea (GitHub Pages):** <https://jffa25.github.io/SICPES_INTEGRADORA/DiagramaDeArquitectura/arquitectura.html>
- **En local:** abre la carpeta del proyecto en VS Code y usa la extensión **Live Server** sobre `DiagramaDeArquitectura/arquitectura.html` (por ejemplo `http://127.0.0.1:5500/DiagramaDeArquitectura/arquitectura.html`). También se puede abrir el archivo directamente en el navegador.

> La opción **Exportar PNG** incluye las imágenes de `assets/` solo cuando el archivo se sirve desde Live Server o GitHub Pages.

## Decisiones de diseño

- **Capas con nombre académico:** presentación, lógica de negocio y datos, para que la arquitectura se lea de un vistazo.
- **Un solo archivo:** sin dependencias ni compilación, para que se pueda abrir en cualquier lugar.
- **Paleta del proyecto:** verdes de SICPES (`#2F8A5C`, `#4CAF50`, `#81C784`, `#C7CCB9`, `#FDFBF7`) y el mismo estilo visual de los Sketches.
- **Lo planeado se muestra, pero se distingue:** el diagrama es honesto sobre lo que ya existe y lo que viene después.
