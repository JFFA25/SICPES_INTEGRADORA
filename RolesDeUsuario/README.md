# Práctica 05 – Diagrama de Roles de Usuario de SICPES

Diagrama interactivo de **Roles de Usuario** de **SICPES** (Sistema Integral de Control de Pensión de Estudiantes) que cubre **todo el sistema** —cuenta y acceso, cuartos y reservas, pagos y evaluación del servicio—, tomando la historia **HU-SIC-05: Evaluación del servicio recibido por el cliente** como uno más de sus módulos. Cada rol es clicable: resalta sus flujos, marca su columna en la matriz de permisos y abre un panel con su objetivo, sus módulos, lo que puede y no puede hacer y con qué roles interactúa.

**[Ver el diagrama de roles en GitHub Pages](https://jffa25.github.io/Practicas_Integradora_230417/Practica05/diagrama-roles-usuario-sicpes.html)**


### Diagrama de Roles de Usuario - SICPES
![Vista previa del diagrama de roles de usuario](/Practica05/sicpes_roles.png)

### Documentación de la historia de usuario

Consulta la historia completa, los criterios de aceptación, las reglas de negocio y los supuestos por validar en la [documentación de la historia de usuario](./HU-Evaluacion-Servicio.md).

## SICPES (Sistema Integral de Control de Pension de Estudiantes) <p align="center">
  <img src="/images/SICPES_Producto.png" alt="SICPES" width="80" height="80">
</p>

SICPES es un sistema de gestión para albergues o pensiones estudiantiles, pensado para controlar reservas, pagos, adeudos, accesos y reportes operativos de forma centralizada. La historia HU-SIC-05 propone una capacidad nueva dentro de la aplicación móvil: que el estudiante alojado califique el servicio recibido y la administración use esa información para mejorar.

## Evolución de los prompts

| Versión | Qué pidió | Qué corrigió después |
|---|---|---|
| v1 | Diagrama de casos de uso de la historia de evaluación del servicio | Se pidió mejorarlo |
| v2 | Mejorar el diagrama existente según el proyecto SICPES | Casos agrupados en uno principal con «include» y «extend», leyenda y estilo discontinuo para lo propuesto |
| v3 | Corregir el cursor al pasar el mouse y mejorar estilos | El cursor mostraba selección de texto por una clase CSS que no se aplicaba; se confirmó que era un diagrama de casos de uso y no de roles |
| v4 | Crear el Diagrama de Roles de Usuario, ya que la actividad solo lo indica así | Tres roles (estudiante, sistema, administración) y matriz de permisos |
| v5 | Llevar al diagrama de roles las animaciones del diagrama anterior | Entrada escalonada, resaltado por rol, diálogo de detalle y tema claro/oscuro |
| v6 | Ampliar el diagrama a todo SICPES y no solo a la evaluación del servicio | Roles reales (Estudiante/Usuario, Administrador, Sistema SICPES), flujos rotulados entre roles, leyenda útil en vez del panel «Conceptos», matriz por módulos con filtro y diálogos ampliados. Se corrigió que el rol Administrador ya no es propuesta completa, «Sistema móvil» pasó a «Sistema SICPES» (actor de sistema) y se agregaron roles propuestos marcados |

<details>
<summary>Prompt v1</summary>

```
Genera un diagrama UML de casos de uso en HTML para la historia de usuario HU-SIC-05 "Evaluación del servicio recibido por el cliente" de SICPES (documento HU-Evaluacion-Servicio.md).

Requisitos:
- Actores fuera del límite del sistema: estudiante / residente (principal) y administrador de la pensión (secundario).
- Límite del sistema "Aplicación móvil SICPES" con casos de uso ovalados: consultar criterios, iniciar evaluación, calificar, agregar comentario opcional, revisar, enviar y ver confirmación.
- Funciones administrativas (consultar, filtrar, revisar comentarios, identificar mejoras, resumen) marcadas como propuestas por validar.
- Al hacer clic en un óvalo, mostrar su detalle y criterios de aceptación; al seleccionar un actor, resaltar sus asociaciones.
- No inventes funciones que el documento no confirma.

Salida: un archivo HTML autocontenido, responsive y accesible, con tema claro y oscuro.
```
</details>

<details>
<summary>Prompt v2</summary>

```
Tengo que hacer mi diagrama de Roles de Usuario, se mira bien pero podrías mejorarlo? Es de acuerdo a mi proyecto SICPES.
```
</details>

<details>
<summary>Prompt v3 — Cursor y estilos</summary>

```
Cuando paso el mouse se queda en modo selección de texto pero debería ser como selección de vínculo. Mejora estilos y crees que así está bien? No sé si ese es el diagrama de roles de usuario.
```
</details>

<details>
<summary>Prompt v4 — Diagrama de Roles de Usuario</summary>

```
Es que la actividad solo dice "Diagrama de Roles de Usuario".
```
</details>

<details>
<summary>Prompt v5 — Animaciones</summary>

```
Déjale las animaciones anteriores y creo que con eso se mira épico.
```
</details>

<details>
<summary>Prompt v6 — Cubrir todo el sistema y corregir roles</summary>

```
Mejora el diagrama de Roles de Usuario de SICPES (diagrama-roles-usuario-sicpes.html) sin romper lo que ya funciona: HTML único y autocontenido, hub central con el logo, paleta verde (#2F8A5C, #4CAF50, #81C784, #C7CCB9, #FDFBF7), animaciones escalonadas, resaltado por rol, diálogo por rol, tema claro/oscuro, accesibilidad y responsive.

1. Amplía el diagrama a todo SICPES (reservas, pagos, adeudos, accesos y reportes) y deja la evaluación como un módulo más.
2. Roles reales: Estudiante/Usuario (registrar cuenta, verificar correo, iniciar sesión, petición de cuartos, realizar pagos + evaluación) y Administrador (asignar cuartos, validar pagos + evaluación propuesta). El Administrador ya no es "propuesta por validar": solo lo son sus funciones de evaluación (asterisco y punteado).
3. "Sistema móvil" no es un rol: cámbialo a "Sistema SICPES" (actor de sistema, forma distinta) con sus responsabilidades; no afirmes "móvil" ni "web".
4. Dibuja flechas rotuladas y animadas con el flujo real entre roles (Estudiante → Sistema → Administrador → Estudiante y evaluación).
5. Reemplaza el panel decorativo "Conceptos" por una leyenda útil (rol interno vs usuario externo, actor de sistema, confirmado vs propuesta, línea sólida vs punteada).
6. Amplía la matriz con columnas Estudiante/Administrador/Sistema, filas agrupadas por módulo y filtro por módulo; conserva la fila "Editar o eliminar una evaluación enviada: no permitido".
7. Mejora la jerarquía visual (tipografía, contraste, cita junto al título, etiquetas de grupo asociadas).
8. En el diálogo de cada rol agrega objetivo, módulos, qué puede y qué no puede hacer y con qué roles interactúa.

Si propones algo adicional (Propietario/Dueño o Seguridad/Accesos), márcalo "propuesta por validar" con punteado y asterisco, y no lo conectes como confirmado. Actualiza también sicpes_roles.png (tema oscuro, ~2000 px) y este README.
```
</details>

## Revisión del resultado

- Alcance ampliado a todo SICPES (cuenta y acceso, cuartos y reservas, pagos y evaluación del servicio): sí
- Roles confirmados: Estudiante / Usuario (usuario externo), Administrador (rol interno) y Sistema SICPES (actor de sistema): sí
- El rol Administrador ya no se marca completo como propuesta; solo sus funciones de evaluación llevan asterisco y estilo punteado: sí
- «Sistema móvil» reemplazado por «Sistema SICPES» como actor de sistema, sin afirmar plataforma móvil ni web: sí
- Flechas rotuladas y animadas con el flujo real entre roles (Estudiante → Sistema → Administrador → Estudiante y evaluación): sí
- Leyenda útil en lugar del panel decorativo «Conceptos»: sí
- Matriz de permisos agrupada por módulos con columnas Estudiante / Usuario, Administrador y Sistema SICPES, filtro por módulo y resaltado de columna: sí
- Diálogo por rol con objetivo, módulos donde participa, qué puede hacer, qué no puede hacer y con qué roles interactúa: sí
- Tema claro/oscuro con botón de cambio (oscuro por defecto): sí
- Roles propuestos (Seguridad / Accesos y Propietario / Dueño de la pensión) marcados como «propuesta por validar» y sin conectar al flujo confirmado: sí
- Lo no confirmado por la documentación está marcado como propuesta por validar: sí
- Se ve bien en celular y escritorio: por confirmar en dispositivos reales
- Rutas configuradas para funcionar bien en GitHub Pages: por confirmar al publicar

## Descripción del diagrama

El diagrama cubre **todo SICPES** y muestra la evaluación del servicio como uno más de sus módulos:

- **Estudiante / Usuario (usuario externo, actor principal)**: registra su cuenta, verifica su correo, inicia sesión, realiza la petición de cuarto y realiza pagos. En el módulo de evaluación consulta los criterios, califica de 1 a 5, agrega un comentario opcional de hasta 500 caracteres, envía la evaluación y ve la confirmación.
- **Administrador (rol interno, actor secundario)**: asigna cuartos a los usuarios y valida los pagos. Como **propuesta por validar (\*)**, consulta resultados agregados, filtra por periodo o categoría, revisa comentarios con acceso restringido e identifica áreas de mejora.
- **Sistema SICPES (actor de sistema, no es una persona)**: verifica el correo y las credenciales, comprueba la elegibilidad de la estancia, valida los datos, registra una evaluación por estancia, evita duplicados ante reintentos y protege los datos personales.
- **Roles propuestos por validar (\*)**: Seguridad / Accesos (registro de accesos) y Propietario / Dueño de la pensión (adeudos y reportes operativos). El README menciona estos temas, pero no define los roles; se muestran punteados y **sin conectarlos** al flujo confirmado.

Las **flechas rotuladas** representan el flujo real entre roles: Estudiante → Sistema («solicita cuarto, realiza pago y envía evaluación») → Administración («notifica y comparte resultados agregados») → Estudiante («asigna cuarto, valida pago y responde»). Una **matriz de permisos agrupada por módulos** (Cuenta y acceso, Cuartos y reservas, Pagos y Evaluación del servicio) resume qué acción corresponde a cada rol, incluye un filtro por módulo e indica que editar o eliminar una evaluación enviada no se permite en la primera versión. Las funciones de evaluación del administrador y los dos roles propuestos siguen pendientes de validar con las personas responsables de SICPES.

## Autor

- **Jose Francisco Flores Amador** /[@JFFA25](https://github.com/JFFA25)
