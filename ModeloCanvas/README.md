# Business Model Canvas de SICPES

Business Model Canvas interactivo de **SICPES** (Sistema Integral de Control de Pensión de Estudiantes), generado con **opencode** y **Archify**. Cada bloque es clicable y abre un panel con información detallada sobre la operación del sistema.

**[Ver el canvas en GitHub Pages](https://jffa25.github.io/Practicas_Integradora_230417/Practica04/index.html)**

### Modelo Canvas - SICPES Version Final
![Vista previa del Modelo](/images/sicpes_canvas_2.png)

### Modelo Canvas - SICPES Version Inicial
![Vista previa del Modelo](/images/sicpes_canvas.png)

### Documentación de imágenes

Consulta los créditos, autores y fuentes de las fotografías utilizadas en el canvas en la [documentación de imágenes](./IMAGENES.md).

## SICPES (Sistema Integral de Control de Pension de Estudiantes) <p align="center">
  <img src="/images/SICPES_Producto.png" alt="SICPES" width="80" height="80">
</p>

SICPES es un sistema de gestión para albergues o pensiones estudiantiles, pensado para controlar reservas, pagos, adeudos, accesos y reportes operativos de forma centralizada. El modelo de negocio se apoya en la operación propia del albergue y en la digitalización de procesos antes manuales.

## Evolución de los prompts

| Versión | Qué pidió | Qué corrigió después |
|---|---|---|
| v1 | Los nueve bloques clásicos con contenido concreto para SICPES | Se necesitaban más detalles de operación |
| v2 | Interacción para expandir bloques, accesibilidad y datos en `data.js` | Se refinó el diseño y el contenido |
| v3 | Fotografías reales locales y descripciones ampliadas | Se documentaron las fuentes y licencias |
| v4 | Más información en bloques amplios y presentación ordenada en tarjetas | Mejor lectura en móvil y escritorio |
| v5 | Viñetas verdes consistentes y detalles desplegables en cada elemento | Interacción uniforme y accesible |
| v6 | Sección en el README principal para enlazar los créditos de imágenes | Navegación directa a la documentación |

<details>
<summary>Prompt v1</summary>

```
Usa Archify para generar un Business Model Canvas del Sistema Integral de Control de Pensión de Estudiantes (SICPES).

Requisitos:
- Incluir los 9 bloques del canvas: Segmentos de clientes, Propuesta de valor, Canales, Relación con clientes, Fuentes de ingresos, Recursos clave, Actividades clave, Socios clave y Estructura de costos.
- Cada bloque debe tener 3 a 5 puntos concretos y relacionados con la operación de un albergue estudiantil.
- Presentarlo como un boceto visual con el layout clásico del canvas.

Salida: una página HTML/CSS/JS lista para subir a un repositorio.
```
</details>

<details>
<summary>Prompt v2</summary>

```
Usa Archify para generar un Business Model Canvas de SICPES.

Estructura:
- 9 bloques en el layout clásico del Business Model Canvas.
- Cada bloque muestra solo su título e ícono en estado cerrado.

Interacción (obligatoria):
- Al hacer clic en un bloque, este se expande y muestra información detallada.
- Al hacer clic de nuevo, o en un botón de cerrar, se contrae.
- Solo un bloque expandido a la vez.
- Accesible con teclado y con atributos aria-expanded.

Diseño:
- Responsive.
- Un color distinto por bloque, tipografía legible.

Código:
- Archivos separados: index.html, styles.css, script.js.
- Los datos de cada bloque en un archivo data.js.
- Comentarios breves y nombres de variables claros.
```
</details>

<details>
<summary>Prompt v3 — Fotografías reales y contenido ampliado</summary>

```
Mejora el Business Model Canvas de SICPES sin cambiar su distribución clásica ni su interacción actual.

- Reemplaza las ilustraciones e íconos de los nueve bloques por fotografías reales y relevantes para cada tema. No uses SVG, dibujos ni emojis.
- Revisa primero las imágenes existentes. Si agregas fotografías, usa fuentes con licencia de uso adecuada, guárdalas localmente en el proyecto y evita enlaces externos.
- Usa imágenes distintas y pertinentes para socios, actividades, propuesta de valor, relación con clientes, segmentos, recursos, canales, costos e ingresos.
- Añade texto alternativo y conserva las proporciones con recortes uniformes.
- Amplía la descripción de cada bloque con varios párrafos cortos y ejemplos concretos de cómo se relaciona con SICPES y la operación de una pensión estudiantil.
- No inventes cifras, proveedores, acuerdos ni capacidades no confirmadas; identifica claramente cualquier posibilidad como propuesta.
- Mantén el diseño responsive y comprueba que las rutas relativas funcionen en GitHub Pages.
- Documenta en un archivo Markdown los autores, fuentes y licencias de las fotografías, con enlaces a las páginas originales.
```
</details>

<details>
<summary>Prompt v4 — Espacio y organización del contenido</summary>

```
Conserva el diseño, las fotografías reales y las descripciones actuales del canvas. Ajusta únicamente la distribución del contenido:

- Agrega información útil a los bloques que tengan más espacio disponible y mantén más breves los bloques pequeños.
- En los paneles expandidos, organiza los elementos relacionados en tarjetas o secciones con títulos, espaciado y jerarquía visual, en lugar de una lista larga de renglones.
- En pantallas grandes, usa columnas cuando ayuden a aprovechar el espacio; en móviles, acomoda el contenido en una sola columna.
- No inventes información ni alteres la distribución clásica o el comportamiento existente.
- Verifica el resultado en escritorio y móvil.
```
</details>

<details>
<summary>Prompt v5 — Indicadores verdes y detalles interactivos</summary>

```
Haz consistentes los indicadores verdes de los elementos informativos en todos los bloques del canvas:

- Agrega las viñetas verdes a los bloques que todavía no las tengan.
- En los paneles expandidos, muestra un botón circular verde con una flecha junto a cada elemento informativo.
- Al pulsar cada elemento, despliega información adicional relacionada; al volver a pulsarlo, permite contraerla. Aplica el comportamiento a todos los elementos de los nueve bloques.
- Implementa los controles como botones accesibles, con soporte de teclado, estado de foco visible y atributos aria-expanded actualizados.
- Mantén el diseño, las fotografías locales, las descripciones y el comportamiento actual para abrir y cerrar los bloques.
- Comprueba que los detalles se puedan leer completos en móvil y escritorio, y que no haya contenido recortado.
```
</details>

<details>
<summary>Prompt v6 — Documentación de imágenes</summary>

```
En el README principal, agrega una sección con un título de nivel ### llamada “Documentación de imágenes”, un texto breve que explique que ahí se consultan los créditos y las fuentes de las fotografías y un enlace relativo a `CREDITOS-IMAGENES.md`.
```
</details>

## Revisión del resultado

- 9 bloques en posición clásica del canvas: sí
- Contenido específico de SICPES: sí
- Se ve bien en celular y escritorio: sí
- Código ordenado en archivos separados: sí
- Rutas de recursos configuradas para funcionar bien en GitHub Pages: sí

## Descripción del modelo

En el centro está la **propuesta de valor**: un sistema centralizado para gestionar reservas, pagos, adeudos, controles de acceso y reportes del albergue. Se dirige a **segmentos** como estudiantes pensionados, administradores y dueños del inmueble, y llega por **canales** como la aplicación web, la API y el correo electrónico.

El canvas se agrupa en tres zonas:

- **Cliente y valor**: segmentos, propuesta de valor, canales y relación con clientes.
- **Motor de ingresos**: renta y hospedaje, junto con la gestión eficiente del servicio.
- **Motor operativo**: infraestructura, desarrollo, soporte, documentación y socios clave del negocio.

## Autor

- **Jose Francisco Flores Amador** /[@JFFA25](https://github.com/JFFA25)