# 📚 Ex Libris — Biblioteca Digital

> *Una biblioteca digital que se comporta como una de verdad: un mueble de nogal, estantes con placa de latón y tomos encuadernados de colores.*

[![Estado](https://img.shields.io/badge/Estado-Producci%C3%B3n-success?style=flat-square)](#)
[![Diseño](https://img.shields.io/badge/Diseño-Ex%20Libris%20System-84502b?style=flat-square)](#)
[![Tecnología](https://img.shields.io/badge/Tecnolog%C3%ADa-HTML5%20%7C%20CSS3%203D%20%7C%20Vanilla%20JS-blue?style=flat-square)](#)
[![Licencia](https://img.shields.io/badge/Licencia-MIT-green?style=flat-square)](#)

---

## 📖 Descripción General

**Ex Libris** es una experiencia digital inmersiva diseñada para gestionar tu conocimiento personal (libros, cursos, notas, podcasts y videos) como un objeto físico tangible, alejándose del paradigma convencional de cuadrículas de tarjetas frías.

Al entrar en la sala, te encuentras frente a un **mueble de madera de nogal** con estantes identificados con **placas de latón grabado**. Al posar el cursor sobre cualquier tomo, el libro se desliza sutilmente hacia arriba; al hacer clic, el tomo se extrae del estante, la sala se atenúa con un velo cálido y la **portada gira en 3D sobre su lomo**, permitiéndote leer sus dos páginas en tipografía serif clásica con sus ideas clave y notas.

---

## 🚀 Inicio Rápido (Cómo Ejecutar)

Tienes tres opciones sencillas para iniciar la aplicación:

### Opción 1: Con el Lanzador Automático de Windows (Recomendada)
Haz **doble clic** sobre:
```cmd
iniciar_biblioteca.bat
```
*(o en el acceso directo rápido `run.bat`)*

> El script comprobará si tienes Python instalado para iniciar el servidor local con detección automática de puertos y abrirá tu navegador predeterminado de inmediato. Si no detecta Python, abrirá el archivo web directamente en tu navegador.

---

### Opción 2: Mediante Servidor Python
Si prefieres iniciar el servidor por línea de comandos o terminal:
```bash
python servidor.py
```
El servidor:
1. Buscará automáticamente un puerto libre a partir del puerto `8080`.
2. Lanzará el navegador predeterminado en `http://localhost:8080/index.html`.
3. Ofrece cabeceras anti-caché para refresco instantáneo de cambios.
4. Para detenerlo, presiona `Ctrl + C` en la terminal.

---

### Opción 3: Apertura Directa en el Navegador (Sin servidor)
Haz doble clic directamente sobre:
```cmd
index.html
```
La aplicación es 100% autónoma y funcional sin necesidad de conexión a internet ni dependencias externas obligatorias.

---

## ✨ Características Principales

| Característica | Descripción |
| :--- | :--- |
| **Mueble de Nogal Artesanal** | Repisas con textura de veta de madera, fondo oscuro de profundidad y placas de latón dorado. |
| **Lomos Texturizados en Relieve** | 5 colores canónicos con doble banda dorada y tipografía Cinzel en lectura vertical (de abajo hacia arriba). |
| **Apertura de Libro en 3D** | Animación física en perspectiva (`2400px`): la portada gira 180° sobre el lomo desvelando las dos hojas de lectura. |
| **Audio Táctil Sintetizado** | Sonido sutil analógico generado proceduralmente en tiempo real (Web Audio API): deslizamiento de cuero/madera al sacar el tomo y roce suave de papel al abrirlo. |
| **Buscador en Tiempo Real** | Barra de búsqueda de latón para filtrar tomos instantáneamente por título, autor o categoría. |
| **Persistencia Local (`localStorage`)** | Tus libros, notas y nuevos estantes se guardan de forma permanente en tu navegador. |
| **Gestor de Nuevos Tomos** | Modal con formulario para incorporar nuevos libros o cursos con selección de color de lomo y notas. |
| **Iluminación Día / Noche** | Conmutador de ambiente entre luz diurna y modo nocturno bajo la lámpara de lectura. |
| **Navegación Accesible y Teclado** | Cierre de libro con tecla `Escape`, navegación completa con foco accesible (`Tab`), y compatibilidad con `prefers-reduced-motion`. |

---

## 🎨 Principios de Diseño y Materiales

El diseño se rige estrictamente por la filosofía de materiales nobles y consistencia visual:

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                           MUEBLE                                │
  │  Lateral / Canto: Nogal (#6b3f22)                               │
  │  Frente de repisa: Nogal cálido con veta (#84502b)              │
  │  Fondo de hueco: Sombra profunda (#3a2214)                      │
  │                                                                 │
  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────────┐ │
  │  │ Tomo Azul │  │ Tomo Rojo │  │Tomo Verde │  │ Tomo Morado   │ │
  │  │  (#1f4e79)│  │  (#8e2a26)│  │  (#2f5d3a)│  │  (#5b3768)   │ │
  │  └───────────┘  └───────────┘  └───────────┘  └───────────────┘ │
  │  ═════════════════[ PLACA DE LATÓN: #c9a24a ]══════════════════ │
  └─────────────────────────────────────────────────────────────────┘
```

### Código de Color de los Lomos
- 📘 **Azul (`--spine-azul` / `#1f4e79`)**: Libros y tratados de hábitos o psicología.
- 📕 **Rojo (`--spine-rojo` / `#8e2a26`)**: Ensayos, investigación y videos.
- 📗 **Verde (`--spine-verde` / `#2f5d3a`)**: Cursos de aprendizaje y bienestar.
- 📙 **Amarillo (`--spine-amarillo` / `#c99a2e`)**: Historia, notas y programación.
- 📓 **Morado (`--spine-morado` / `#5b3768`)**: Tecnología, productividad y automatización.

### Tipografía
- **EB Garamond**: Títulos de obras, autor en cursiva (`cita`) y texto de lectura en las hojas crema.
- **Cinzel**: Títulos estampados en vertical en los lomos y rótulos en las placas de latón.
- **Source Sans 3**: Etiquetas de categoría, contadores, botones y metadatos de interfaz.

---

## 📁 Estructura del Proyecto

```plaintext
Ex Libris/
│
├── index.html               # Aplicación web completa y autónoma
├── servidor.py              # Servidor HTTP local con apertura automática
├── iniciar_biblioteca.bat   # Lanzador ejecutable para Windows
├── run.bat                  # Acceso directo rápido
├── README.md                # Este documento de presentación
├── DOCUMENTACION.md         # Documentación técnica, arquitectura y API
├── tokens.css               # Variables y tokens de diseño CSS oficiales
├── tokens.json              # Definición estructurada de tokens de diseño
├── manifest.json            # Manifiesto de componentes y librerías
│
├── api/                     # Documentación de componentes individuales
│   ├── tokens.md
│   └── components/
│       ├── Biblioteca.md
│       ├── Estante.md
│       ├── LibroAbierto.md
│       └── Tomo.md
│
└── components/              # Fuentes y estilos empaquetados
    ├── bundle.css           # Estilos oficiales del sistema de diseño
    ├── bundle.js            # Módulos React opcionales
    ├── index.d.ts           # Definiciones TypeScript
    ├── Biblioteca/          # Componente sala completa
    ├── Estante/             # Componente estante y repisa
    ├── Tomo/                # Componente lomo de libro
    ├── LibroAbierto/        # Componente libro abierto 3D
    └── Cover/               # Portada y marca visual
```

---

## ⌨️ Atajos y Controles

- **Clic en un lomo**: Extrae y abre el libro en la sala.
- **Tecla `Escape`**: Cierra el libro abierto o cualquier ventana modal activa.
- **Clic en el velo exterior**: Cierra el libro y vuelve al estante.
- **`Tab` / `Shift+Tab`**: Navega fluidamente entre lomos y botones con anillo de foco visible (`--focus`).
- **Botón `Lámpara` (Día / Noche)**: Cambia la ambientación de la pared de la sala.
- **Botón `Sonido`**: Activa o silencia los efectos táctiles de madera y papel.

---

## 🛠️ Tecnologías Empleadas

- **HTML5 Semántico**: Estructura accesible con soporte para lectores de pantalla (`aria-haspopup="dialog"`, `role="region"`, etc.).
- **CSS3 Moderno**: Transformaciones 3D con `perspective`, `transform-origin`, variables nativas CSS (`var(--...)`) y animaciones con curvas Bézier cúbicas suaves.
- **Vanilla JavaScript (ES6+)**: Cero dependencias pesadas, arranque instantáneo y rendimiento a 60 FPS constantes.
- **Web Audio API**: Motor acústico analógico procedural sin archivos MP3 externos.
- **Python 3 (Opcional)**: Servidor HTTP estándar mediante `http.server`.

---

## 📄 Licencia

Distribuido bajo la licencia MIT. Diseñado para amantes de la lectura, el estudio estructurado y la preservación del conocimiento digital.
