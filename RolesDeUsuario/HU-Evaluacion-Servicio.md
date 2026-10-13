# HU-SIC-05 — Evaluación del servicio recibido por el cliente

## 1. Identificación

| Campo | Definición |
|---|---|
| Código | HU-SIC-05 (propuesto para esta práctica) |
| Título | Evaluación del servicio recibido por el cliente |
| Versión | 1.0 |
| Estado | Propuesta para análisis; pendiente de validación con las personas responsables de SICPES |
| Prioridad sugerida | Media: puede aportar información para mejorar la atención y la operación |
| Módulo | Gestión de la pensión y relación con clientes (módulo funcional propuesto para la aplicación móvil) |

## 2. Historia de usuario

**Como** estudiante alojado que ha recibido el servicio de la pensión, **quiero** calificar mi experiencia y, si lo deseo, dejar un comentario desde la aplicación móvil, **para** comunicar mi opinión y aportar información que ayude a la administración a identificar oportunidades de mejora.

## 3. Contexto y descripción

La documentación disponible describe SICPES como un sistema de gestión para pensiones o albergues estudiantiles que contempla reservas, pagos, adeudos, accesos y reportes operativos. No documenta una función de evaluación del servicio. Esta historia plantea una capacidad nueva para consideración del equipo; no afirma que esté implementada.

La persona que evalúa sería un estudiante alojado que haya recibido el servicio durante una estancia. Como propuesta, la invitación a evaluar podría mostrarse al finalizar la estancia o al abrir la sección correspondiente en la aplicación móvil. El momento y la forma de determinar el fin de la estancia deben confirmarse con las reglas operativas del proyecto.

La evaluación busca ofrecer un canal estructurado para expresar satisfacción y observaciones. En una propuesta de operación, la administración podría revisar resultados agregados para reconocer aspectos valorados y oportunidades de mejora. El uso, acceso y conservación de esas opiniones también requieren definición por parte del proyecto.

### Contexto conocido y supuestos

- **Conocido por la documentación:** SICPES se orienta a la gestión de una pensión o albergue estudiantil, incluyendo reservas, pagos, adeudos, accesos y reportes operativos.
- **Supuesto por validar:** la aplicación móvil puede identificar de forma autenticada al estudiante y asociarlo con una estancia concluida. No se documentan aquí el mecanismo de autenticación ni el modelo de datos.
- **Propuesta por validar:** permitir una evaluación por estancia concluida, con una calificación obligatoria y un comentario opcional.
- **Propuesta por validar:** que la administración consulte resultados agregados; no se especifican paneles, alertas ni reportes existentes.

## 4. Actores, precondiciones y disparador

### Actores

- **Actor principal:** estudiante alojado que recibió el servicio.
- **Actor secundario propuesto:** administración de la pensión, como destinataria de resultados para análisis y mejora. Sus permisos y vistas deben definirse.
- **Sistema móvil propuesto:** presenta el formulario, valida los datos y comunica el resultado del envío.

### Precondiciones

1. El usuario puede acceder a la aplicación. **Supuesto por validar:** la identidad se autentica antes de enviar la evaluación.
2. **Supuesto por validar:** el usuario tiene una estancia concluida y vinculable con su cuenta.
3. **Supuesto por validar:** no existe una evaluación registrada para esa estancia, según la regla propuesta de una evaluación por estancia.
4. La aplicación puede presentar el formulario sin exponer datos personales de otros usuarios.

Si el proyecto no dispone de un estado de estancia concluida o de una relación entre usuario y estancia, el equipo deberá acordar cómo determinar la elegibilidad antes de implementar el flujo.

### Disparador

El usuario abre la opción **Evaluar el servicio** desde la aplicación móvil o selecciona una invitación presentada tras la estancia (esta invitación es una propuesta por validar).

## 5. Flujo principal

1. El usuario abre la aplicación e ingresa a **Evaluar el servicio**.
2. La aplicación comprueba la elegibilidad usando la cuenta y la estancia asociada, de acuerdo con las reglas que el equipo valide.
3. Si cumple las condiciones, la aplicación presenta una escala de satisfacción de cinco niveles, claramente rotulada de **1 — Muy insatisfecho** a **5 — Muy satisfecho**.
4. La aplicación ofrece un campo opcional para comentarios e indica su límite de longitud propuesto de 500 caracteres.
5. El usuario selecciona una valoración y, si lo desea, escribe un comentario.
6. La aplicación valida los campos, muestra cualquier error junto al control correspondiente y habilita el envío solo cuando la valoración es válida.
7. El usuario revisa su respuesta y selecciona **Enviar evaluación**.
8. La aplicación muestra un estado de envío y evita que se procesen toques repetidos como envíos diferentes.
9. El servicio registra la respuesta asociada a la estancia, de forma protegida y sin devolver información personal innecesaria.
10. La aplicación muestra una confirmación accesible, por ejemplo: **“Tu evaluación se registró correctamente. Gracias por compartir tu opinión.”**

## 6. Criterios de aceptación

Los límites y políticas identificados como propuestas deberán confirmarse antes de convertirse en reglas definitivas.

### CA-01 — Acceso y elegibilidad

**Dado** que un usuario abre la opción de evaluación, **cuando** el sistema comprueba que tiene una estancia concluida y aún no evaluada según las reglas validadas, **entonces** puede acceder al formulario asociado a esa estancia.

**Dado** que el usuario no tiene una estancia elegible o ya registró una evaluación para ella, **cuando** intenta abrir el formulario, **entonces** no puede enviar otra evaluación y recibe una explicación clara con una alternativa de navegación.

### CA-02 — Escala de valoración

**Dado** que el usuario elegible visualiza el formulario, **cuando** selecciona una valoración, **entonces** puede elegir un único valor entero del 1 al 5, cada valor tiene una etiqueta comprensible y la selección queda visible y accesible.

### CA-03 — Comentario opcional y longitud

**Dado** que el usuario decide agregar un comentario, **cuando** escribe texto de hasta 500 caracteres (límite propuesto por validar), **entonces** puede continuar y ve los caracteres restantes o el límite informado.

**Dado** que el texto excede el límite configurado, **cuando** intenta continuar o enviar, **entonces** la aplicación impide guardar el exceso y comunica el límite sin borrar silenciosamente el comentario.

### CA-04 — Validación y envío completo

**Dado** que el formulario está vacío o carece de una valoración válida, **cuando** el usuario intenta enviarlo, **entonces** no se transmite una evaluación incompleta, el campo requerido queda identificado y el foco puede desplazarse a ese error.

### CA-05 — Envío exitoso

**Dado** que existe una valoración válida y una conexión disponible, **cuando** el usuario confirma el envío y el registro se guarda, **entonces** ve una confirmación accesible y la evaluación deja de estar disponible para un segundo envío de la misma estancia, conforme a la regla propuesta.

### CA-06 — Conexión interrumpida y reintento

**Dado** que la conexión se pierde antes de recibir confirmación, **cuando** falla el envío, **entonces** la aplicación informa que no pudo confirmar el registro, conserva temporalmente el contenido en la pantalla mientras siga abierta y ofrece reintentar.

**Dado** que el servidor pudo guardar la evaluación pero la confirmación no llegó, **cuando** el usuario reintenta, **entonces** la solicitud se reconoce como el mismo intento lógico o se consulta el estado previo para evitar duplicados.

### CA-07 — Error de guardado

**Dado** que ocurre un error al guardar, **cuando** la aplicación recibe o detecta el fallo, **entonces** informa que la evaluación no pudo confirmarse, no muestra éxito prematuro, conserva el texto durante la sesión y ofrece reintentar o salir sin afirmar que el registro fue realizado.

### CA-08 — Accesibilidad

**Dado** que el usuario navega mediante lector de pantalla, teclado, controles de asistencia o ajustes de texto, **cuando** completa el formulario, **entonces** los controles tienen nombres accesibles, estados seleccionados y requeridos anunciables, foco visible y errores comprensibles sin depender solo del color.

### CA-09 — Tamaños de pantalla

**Dado** que el formulario se muestra en distintos tamaños de pantalla y orientaciones compatibles, **cuando** el usuario lo recorre, **entonces** el contenido se adapta sin recortes ni desplazamiento horizontal, y los controles y mensajes siguen siendo utilizables.

### CA-10 — Protección de información

**Dado** que el usuario envía una evaluación, **cuando** la aplicación transmite y presenta el resultado, **entonces** solo envía los datos mínimos necesarios, no revela información de otros usuarios ni muestra identificadores internos, y no incluye información personal innecesaria en mensajes de error o confirmación.

## 7. Reglas de negocio

| Regla propuesta | Decisión para esta historia | Estado |
|---|---|---|
| Elegibilidad | Solo una persona con una estancia concluida asociada a su cuenta puede evaluar. El criterio operativo de “concluida” debe acordarse. | **Supuesto por validar** |
| Cantidad | Una evaluación por estancia, para mantener una respuesta comparable y evitar duplicados. | **Supuesto por validar** |
| Escala | Valor entero requerido de 1 a 5 con etiquetas visibles, de muy insatisfecho a muy satisfecho. | Propuesta de esta historia, por validar |
| Comentario | Opcional, texto plano, máximo propuesto de 500 caracteres. Rechazar o limpiar entradas peligrosas en el servidor según diseño técnico. | **Supuesto por validar** |
| Edición y eliminación | Propuesta: no permitir modificar ni eliminar después de confirmar el envío en la primera versión. Si se requiere corrección, definir un proceso explícito de soporte. | **Supuesto por validar** |
| Anonimato | Propuesta: no prometer anonimato; asociar la respuesta a la estancia con acceso restringido y presentar a administración resultados agregados cuando sea posible. | **Supuesto por validar** |
| Momento de evaluación | Propuesta: permitirla después de terminar la estancia; la vigencia del formulario y el tratamiento de una evaluación tardía se deben acordar. | **Supuesto por validar** |
| Reintentos | Una repetición de red del mismo envío no crea otra evaluación; el servidor debe aplicar una verificación única por estancia o mecanismo equivalente. | Requisito propuesto para evitar duplicados |
| Uso de resultados | Propuesta: usar opiniones para revisar la calidad del servicio; definir quién puede consultarlas, por cuánto tiempo y con qué propósito. | **Supuesto por validar** |

Estas decisiones no están confirmadas por la documentación de SICPES revisada. El equipo debe validarlas con las personas responsables antes de tratarlas como políticas del producto.

## 8. Flujos alternativos y excepciones

1. **Usuario no elegible:** no se muestra un formulario enviable. Se explica de manera neutral que no hay una estancia disponible para evaluar o que ya se registró una respuesta; no se exponen detalles de estancia innecesarios.
2. **Formulario incompleto:** se conserva lo capturado mientras el usuario permanezca en el formulario, se marca la valoración requerida y no se transmite el envío.
3. **Usuario abandona el formulario:** no se registra una evaluación. La conservación de borradores después de cerrar o salir de la aplicación queda como supuesto por validar; propuesta inicial: no conservarlos de forma persistente.
4. **Conexión no disponible antes del envío:** se informa que se necesita conexión para enviar y se mantiene el botón de reintento disponible. El almacenamiento y envío fuera de línea no se proponen para esta versión.
5. **Conexión interrumpida durante el envío:** se presenta estado no confirmado y se ofrece reintentar. La aplicación debe consultar o repetir de forma idempotente para no duplicar la respuesta.
6. **Toques repetidos en Enviar:** mientras haya una solicitud en curso, se bloquea el control y se indica el estado de carga. Si llega más de una solicitud, el servicio valida la unicidad por estancia.
7. **Error del servicio o guardado:** se muestra un mensaje útil sin detalles técnicos sensibles, se conserva el contenido en la sesión y se permite reintentar. No se presenta confirmación hasta verificar el registro.
8. **Evaluación ya registrada por otra solicitud o dispositivo:** el sistema informa que la estancia ya cuenta con una evaluación y actualiza la pantalla para reflejar ese estado.

## 9. Datos y privacidad

### Datos mínimos propuestos

- Identificador interno de la estancia elegible, necesario para controlar duplicados y contexto de la evaluación.
- Identificador interno del usuario o referencia autenticada, solo si resulta necesario para verificar elegibilidad; no debe mostrarse en la interfaz ni exponerse a otros usuarios.
- Valor de satisfacción (1–5) y fecha/hora de recepción del registro.
- Comentario opcional, si el usuario decide proporcionarlo.
- Clave de idempotencia o identificador técnico del envío, si el diseño del servicio la requiere para reintentos seguros.

La documentación revisada confirma el alcance general de SICPES, pero **no confirma** que existan estos campos, un modelo de estancia, identificadores de usuario, autenticación móvil ni almacenamiento de opiniones. Son datos mínimos propuestos y deben cotejarse con el diseño vigente.

### Medidas de privacidad propuestas

- Solicitar solo calificación y comentario opcional; no pedir nombre, teléfono, domicilio ni datos de pago en el formulario.
- Usar referencias internas únicamente para elegibilidad, unicidad y operación autorizada; restringir su acceso.
- No incluir contenido del comentario ni identificadores personales en notificaciones, analítica o registros técnicos sin una necesidad definida.
- Informar al usuario quién puede consultar la evaluación, con qué propósito y durante cuánto tiempo, una vez que el proyecto defina estas condiciones.
- Considerar presentar resultados agregados a administración y evaluar moderación de comentarios libres. Ambos puntos son propuestas por validar, no capacidades existentes.

## 10. Consideraciones para desarrollo móvil multiplataforma

- Diseñar controles táctiles con tamaño y separación cómodos; no depender de gestos ocultos para seleccionar la calificación.
- Usar un diseño adaptable a pantallas pequeñas y grandes, orientación compatible y cambios de tamaño de texto, sin recortar formularios ni botones.
- Acompañar cada nivel de la escala con texto, no únicamente iconos o colores; mantener contraste y foco visible.
- Etiquetar el campo opcional y su límite; comunicar validaciones junto al control y anunciar los cambios de estado a tecnologías de asistencia.
- Representar claramente los estados de carga, error, éxito y envío no confirmado; deshabilitar el envío mientras se procesa la solicitud.
- En conectividad limitada, no asumir que un tiempo de espera implica que el servidor no guardó. Consultar el estado o reintentar de forma idempotente antes de permitir un nuevo registro.
- Mantener la experiencia y el lenguaje de los mensajes coherentes entre las plataformas que decida soportar el proyecto; la tecnología y las plataformas específicas no están definidas en la documentación revisada.

## 11. Pruebas y definición de terminado

### Casos de prueba derivados

- Usuario elegible con estancia concluida abre el formulario; usuario no elegible recibe una explicación y no puede enviar.
- Usuario que ya evaluó la estancia no genera una segunda respuesta.
- Se aceptan valores 1 y 5, y cada opción intermedia; no se acepta ausencia de valoración ni valores fuera de rango.
- Se envía una valoración sin comentario; se acepta un comentario en el límite y se rechaza o limita correctamente el texto que lo excede.
- El envío exitoso muestra confirmación solo tras guardar y bloquea un nuevo envío de la misma estancia.
- Una pérdida de conexión, un tiempo de espera y un error de guardado permiten reintentar sin duplicar; el contenido no desaparece inesperadamente durante la sesión.
- Toques repetidos durante la carga no provocan envíos duplicados.
- Controles, etiquetas, errores, foco y mensajes se verifican con navegación accesible y lector de pantalla.
- La pantalla se comprueba en tamaños pequeños y grandes y con texto ampliado, sin recortes ni desplazamiento horizontal.
- La solicitud y los mensajes no exponen datos personales innecesarios ni detalles internos.

### Definición de terminado

- La historia, el alcance y las reglas marcadas como **supuesto por validar** fueron revisados con las personas responsables del producto.
- Los criterios de aceptación son verificables y los casos aplicables se comprobaron en las plataformas que el equipo defina.
- Las validaciones de elegibilidad, rango, comentario y duplicidad están comprobadas tanto en la interfaz como en el servicio correspondiente.
- Los estados de conexión, carga, error, reintento y éxito se verificaron, incluida la protección contra duplicados.
- La experiencia móvil se revisó en tamaños de pantalla distintos y con criterios de accesibilidad acordados.
- El tratamiento de datos, permisos de consulta, conservación y propósito de las opiniones quedaron documentados y aprobados por el proyecto.
