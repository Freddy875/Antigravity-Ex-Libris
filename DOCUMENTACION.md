# 📘 Ex Libris — Documentación Técnica y Manual de Arquitectura

Este documento proporciona una especificación exhaustiva sobre la arquitectura, el sistema de diseño, la física de interacción, la síntesis acústica y la estructura de datos que rigen el proyecto **Ex Libris**.

---

## 📑 Tabla de Contenidos

1. [Filosofía del Proyecto y Principios de Diseño](#1-filosofía-del-proyecto-y-principios-de-diseño)
2. [Arquitectura del Sistema](#2-arquitectura-del-sistema)
3. [Sistema de Diseño y Tokens CSS](#3-sistema-de-diseño-y-tokens-css)
4. [Anatomía y Mecánica de los Componentes](#4-anatomía-y-mecánica-de-los-componentes)
5. [Motor Acústico Procedural (Web Audio API)](#5-motor-acústico-procedural-web-audio-api)
6. [Modelo de Datos y Persistencia](#6-modelo-de-datos-y-persistencia)
7. [Manual del Servidor Local (`servidor.py`)](#7-manual-del-servidor-local-servidorpy)
8. [Accesibilidad y Modo de Movimiento Reducido](#8-accesibilidad-y-modo-de-movimiento-reducido)
9. [Guía de Extensión y Conexión de Datos](#9-guía-de-extensión-y-conexión-de-datos)

---

## 1. Filosofía del Proyecto y Principios de Diseño

Ex Libris rechaza la concepción de las bibliotecas digitales como «tablas de datos» o «cuadrículas de tarjetas planas» (*cards*). En su lugar, aborda el conocimiento bajo la metáfora de **objetos físicos en un espacio**:

1. **Es un objeto tridimensional, no una base de datos visible**: Todo el contenido reside en lomos apoyados sobre repisas de nogal. Las búsquedas o filtrados nunca desmontan el mueble; únicamente atenúan los lomos que no coinciden.
2. **Estandarización dimensional**: Todos los lomos miden exactamente **`44px × 220px`** en reposo. El libro abierto mide exactamente **`760px × 480px`**. La jerarquía y el tipo de contenido se expresan por el color de la encuadernación y el grabado, nunca deformando el volumen del objeto.
3. **Trilogía de materiales nobles**:
   - **Madera de nogal**: Estructura del mueble y repisas.
   - **Papel crema**: Superficie de lectura reposada.
   - **Latón bruñido**: Elementos que se tocan o rotulan (placas identificadoras, botones, barras de herramientas).
4. **Voz bibliotecaria**: Se emplea un lenguaje de biblioteca en español clásico (*estante, lomo, tomo, placa, hoja, devolver al estante*), evitando terminología informática como *card, item, post o modal*.

---

## 2. Arquitectura del Sistema

La aplicación está construida sobre estándares web modernos sin dependencias externas pesadas, asegurando un tiempo de carga inferior a 50 milisegundos y 60 FPS en animaciones.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CAPA DE PRESENTACIÓN (UI)                       │
│  - HTML5 Semántico (<main>, <section>, <article>, <button>)            │
│  - CSS3 3D (Perspective: 2400px, Transform-Origin, Keyframe Animations)│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│                       CAPA DE LÓGICA (Vanilla JS)                      │
│  - Motor de Renderizado Dinámico de Estanterías y Tomos                │
│  - Máquina de Estados: Reposo → Sacado (220ms) → Abierto (320ms)       │
│  - Buscador Predictivo en Tiempo Real                                  │
│  - Gestor de Temas (Día / Noche) con CSS Custom Properties              │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │                                │
┌───────────────────▼────────────────┐   ┌───────────▼───────────────────┐
│     CAPA ACÚSTICA PROCEDURAL       │   │      CAPA DE PERSISTENCIA     │
│  - Web Audio API (Nativa)          │   │  - LocalStorage API           │
│  - Síntesis sustractiva analógica  │   │  - JSON Schema de Catálogo    │
│  - Ruido blanco filtrado (Papel)   │   │  - Backup automático          │
└────────────────────────────────────┘   └───────────────────────────────┘
```

---

## 3. Sistema de Diseño y Tokens CSS

Los tokens de diseño se encuentran centralizados en `tokens.css` y se integran automáticamente mediante variables CSS (`var(--...)`).

### 3.1 Paleta Cromática

| Token CSS | Valor Día | Valor Noche | Uso |
| :--- | :--- | :--- | :--- |
| `--wall` | `#f3ead9` | `#1a120c` | Fondo de la pared de la sala |
| `--ink` | `#2b1d12` | `#f2e7d3` | Tinta tipográfica principal |
| `--ink-muted` | `#6b5543` | `#c4b198` | Tinta tipográfica secundaria |
| `--wood-shelf` | `#6b3f22` | `#4a2b17` | Madera de laterales y cantos |
| `--wood-shelf-edge` | `#84502b` | `#5e3920` | Frente con veta de cada repisa |
| `--wood-back` | `#3a2214` | `#24150c` | Hueco oscuro interior del mueble |
| `--brass-plate` | `#c9a24a` | `#b88f3a` | Placas de latón y botones |
| `--on-brass` | `#2b1d12` | `#2b1d12` | Texto grabado sobre el latón |
| `--paper` | `#fbf6ea` | `#f4ead3` | Papel crema (claro incluso de noche) |
| `--paper-edge` | `#e3d3b2` | `#d9c7a3` | Filetes y bordes de hoja |
| `--foil` | `#f0d58c` | `#f0d58c` | Dorado estampado en lomos y tapas |
| `--velo` | `rgba(28,18,10,0.82)` | `rgba(12,8,5,0.88)` | Atenuación de sala al abrir libro |

### 3.2 Colores de Lomos

| Nombre | Variable CSS | Código Hex | Tipografía grabada |
| :--- | :--- | :--- | :--- |
| **Azul** | `--spine-azul` | `#1f4e79` | Oro estampado (`--foil`) |
| **Rojo** | `--spine-rojo` | `#8e2a26` | Oro estampado (`--foil`) |
| **Verde** | `--spine-verde` | `#2f5d3a` | Oro estampado (`--foil`) |
| **Amarillo** | `--spine-amarillo` | `#c99a2e` | Tinta oscura (`--on-spine-light`: `#2b1d12`) |
| **Morado** | `--spine-morado` | `#5b3768` | Oro estampado (`--foil`) |

### 3.3 Tipografías y Escalas

- **`Cinzel`** (`--font-rotulo`): Mayúsculas clásicas con tracking abierto (`letter-spacing: .06em` a `.14em`) para el estampado vertical de los lomos y las placas de latón.
- **`EB Garamond`** (`--font-serif`): Serif de transición para el nombre de la biblioteca (`56px`), títulos de obra (`28px`), autores en cursiva (`18px`) y prosa de lectura (`16px`/`25px`).
- **`Source Sans 3`** (`--font-sans`): Para metadatos de interfaz, categorías y botones.

---

## 4. Anatomía y Mecánica de los Componentes

### 4.1 El Tomo (`.xl-tomo`)
- **Proporción**: Ancho 44px, Alto 220px. Margen superior en el estante de 32px para permitir la elevación física.
- **Textura de Cuero**: Creada mediante un gradiente en el pseudo-elemento `::before`:
  ```css
  background: linear-gradient(90deg, rgba(0,0,0,.32), rgba(255,255,255,.12) 24%, rgba(255,255,255,0) 46%, rgba(0,0,0,.10) 78%, rgba(0,0,0,.34));
  ```
- **Texto Vertical**:
  ```css
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  ```
  Permite la lectura de abajo hacia arriba tradicional en las bibliotecas de habla hispana.
- **Estados de Movimiento**:
  - `:hover` / `:focus-visible`: `translateY(-10px)`.
  - `.is-sacado`: `translateY(-28px)` y `box-shadow: var(--shadow-sacado)`.

### 4.2 El Estante (`.xl-estante`)
- **Hueco (`.xl-estante__hueco`)**: Utiliza `box-shadow: var(--shadow-hueco)` con sombras internas combinadas (`inset 0 14px 18px -8px rgba(0,0,0,0.6)`) para generar la profundidad tridimensional que simula la sombra arrojada por la repisa superior.
- **Tabla (`.xl-estante__tabla`)**: Incorpora una veta sutil mediante gradientes repetitivos:
  ```css
  background-image: repeating-linear-gradient(0deg, rgba(0,0,0,.08) 0 1px, transparent 1px 6px);
  ```
- **Placa de Latón (`.xl-estante__placa`)**: Relieve perimetral y texto cincelado en mayúsculas.

### 4.3 El Libro Abierto (`.xl-libro`)
- **Contenedor 3D**: `perspective: 2400px`, ancho máximo de 760px, dividido en dos hojas simétricas (`grid-template-columns: 1fr 1fr`).
- **Pliegues Centrales**:
  - Hoja izquierda: `box-shadow: var(--shadow-pliegue)` (curvatura cóncava hacia el lomo).
  - Hoja derecha: `box-shadow: var(--shadow-pliegue-der)`.
- **Cinemática de Apertura de Portada**:
  - La portada `.xl-libro__portada` tiene su origen de transformación en el borde izquierdo (`transform-origin: left center`).
  - Gira 180° en el eje Y mediante la animación `xl-abrir`:
    ```css
    @keyframes xl-abrir {
      from { transform: rotateY(0deg); }
      to   { transform: rotateY(-180deg); visibility: hidden; }
    }
    ```
  - Mientras gira, la hoja izquierda se desvela suavemente mediante `xl-revelar`, dando la sensación táctil de levantar la tapa dura de un libro encuadernado.

---

## 5. Motor Acústico Procedural (Web Audio API)

La aplicación integra síntesis de sonido sustractiva nativa en JavaScript sin requerir un solo archivo `.mp3` o `.wav` externo:

### 5.1 Sonido de Extracción de Tomo (`reproducirSonidoExtraccion()`)
- Emplea un oscilador de onda triangular a 160 Hz que desciende exponencialmente a 60 Hz en 160 milisegundos con una ganancia sutil (`0.08`). Simula el golpe sordo de madera y la fricción del cuero saliendo de la estantería.

### 5.2 Sonido de Hojeo de Papel (`reproducirSonidoPaginas()`)
- Genera un *buffer* de ruido blanco atenuado exponencialmente:
  $$x[i] = (2r - 1) \cdot e^{-\frac{i}{f_s \cdot 0.05}}$$
- Se hace pasar por un filtro pasa-banda (`BiquadFilterNode`) centrado en 1400 Hz con un factor $Q = 1.0$, emulando el roce crujiente de hojas de papel de alto gramaje.

---

## 6. Modelo de Datos y Persistencia

El catálogo de estantes y tomos se almacena bajo la clave `ex_libris_biblioteca` en `localStorage`.

### 6.1 Esquema JSON de Libro

```typescript
interface LibroDatos {
  id: string;               // Identificador único (ej: "lecturas-1")
  titulo: string;           // Título de la obra
  autor?: string;           // Nombre del autor o entidad
  color: "azul" | "rojo" | "verde" | "amarillo" | "morado";
  categoria?: string;       // Etiqueta superior (ej: "Libro · Ensayo")
  resumen?: string | string[]; // Contenido de la hoja izquierda
  encabezado?: string;      // Título de la hoja derecha (defecto: "Notas")
  notas?: string | string[];   // Lista de puntos clave o párrafos
}
```

### 6.2 Esquema JSON de Estante

```typescript
interface EstanteDatos {
  rotulo: string;           // Nombre grabado en la placa de latón
  libros: LibroDatos[];     // Colección de tomos en la repisa
}
```

---

## 7. Manual del Servidor Local (`servidor.py`)

El servidor incluido en Python 3 está optimizado para entornos de desarrollo y uso doméstico:

- **Detección Dinámica de Puertos**: Mediante `socket.connect_ex`, comprueba la disponibilidad comenzando en el puerto `8080`. Si está ocupado, prueba consecutivamente hasta encontrar un puerto libre.
- **Encabezados Anti-Caché**: Inyecta `Cache-Control: no-cache, no-store, must-revalidate` para permitir modificaciones en vivo sin necesidad de vaciar la caché del navegador.
- **Lanzamiento Asistido**: Ejecuta `webbrowser.open(url)` en un hilo secundario para abrir la aplicación instantáneamente.
- **Salida Limpia**: Captura `KeyboardInterrupt` (`Ctrl + C`) para cerrar el socket del servidor sin dejar procesos huérfanos.

---

## 8. Accesibilidad y Modo de Movimiento Reducido

- **Navegación por Teclado**: Cada lomo es un elemento `<button>` accesible con etiqueta completa legible por lectores de pantalla:
  ```html
  aria-label="Abrir «Hábitos atómicos», de James Clear" aria-haspopup="dialog"
  ```
- **Anillo de Foco**: Foco visible `--focus` (`#f2c869`) de 2px con 3px de separación, diseñado para destacar tanto sobre la madera oscura como sobre el velo.
- **Preferencia de Movimiento Reducido (`prefers-reduced-motion: reduce`)**:
  - Desactiva las transiciones de extracción de lomo.
  - Oculta la rotación 3D de la portada (`display: none`).
  - Muestra el libro abierto inmediatamente al hacer clic sin retardos de animación.

---

## 9. Guía de Extensión y Conexión de Datos

### Cómo conectar con Notion, Obsidian o una API Externa
Para sincronizar tu biblioteca con una base de datos externa:
1. Genera un export JSON con la estructura `[{ rotulo: "...", libros: [...] }]`.
2. Actualiza la variable en la inicialización o sustituye `cargarDatos()` en `index.html` por un `fetch('/api/libros')`.
3. Llama a `renderizarBiblioteca()` para reconstruir el mueble en tiempo real.
