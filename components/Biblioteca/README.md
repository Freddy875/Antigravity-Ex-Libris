La sala completa: cabecera, mueble con sus estantes y el libro abierto sobre un velo cuando tocas un lomo.

**Qué das:** `nombre` (p. ej. «Mi biblioteca»), `lema` (una línea: cuántos tomos, cómo se usa o el mapa de colores), `estantes` y, opcional, `onAbrir(libro)` para saber qué libro se abrió.

Cada estante es `{ rotulo, libros }` y cada libro `{ id?, titulo, autor?, color, categoria?, resumen?, encabezado?, notas? }`. `notas` puede ser texto (párrafos separados por una línea en blanco) o una lista de frases.

**Qué hace sola:** saca el lomo, abre el libro a los 320ms, pone el foco en «Devolver al estante», cierra con Esc o tocando el velo y devuelve el foco al lomo.

**Hazlo:**
- Conecta `estantes` a tus datos (por ejemplo, una base de Notion: un estante por tipo y un libro por fila).
- Si el color significa categoría, dilo en el `lema`.

**No lo hagas:**
- No pongas la sala dentro de un contenedor con scroll propio: el velo cubre la ventana.
- No mezcles tarjetas o listas con los estantes.
