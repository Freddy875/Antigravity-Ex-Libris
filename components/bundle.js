/* @ds-bundle: {"format":4,"namespace":"ExLibris","components":[{"name":"Tomo"},{"name":"Estante"},{"name":"LibroAbierto"},{"name":"Biblioteca"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var COLORES = ["azul", "rojo", "verde", "amarillo", "morado"];

  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function tono(c) { return COLORES.indexOf(c) >= 0 ? c : "azul"; }
  function movimientoReducido() {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  }

  /* Texto: una cadena se parte en párrafos por líneas en blanco; una lista de cadenas se vuelve viñetas. */
  function contenido(t) {
    if (t == null || t === false) return null;
    if (typeof t === "string") {
      return t.split(/\n\s*\n/).map(function (s, i) { return h("p", { key: i }, s); });
    }
    if (Array.isArray(t) && t.every(function (x) { return typeof x === "string"; })) {
      return h("ul", null, t.map(function (s, i) { return h("li", { key: i }, s); }));
    }
    return t;
  }

  /* ---------- Tomo ---------- */
  function Tomo(p) {
    var c = tono(p.color);
    return h("button", {
      type: "button",
      className: cx("xl-tomo", "xl-tomo--" + c, p.sacado && "is-sacado", p.className),
      title: p.titulo + (p.autor ? " — " + p.autor : ""),
      "aria-label": "Abrir «" + p.titulo + "»" + (p.autor ? ", de " + p.autor : ""),
      "aria-haspopup": "dialog",
      onClick: p.onAbrir,
      style: p.style
    },
      h("span", { className: "xl-tomo__banda xl-tomo__banda--arriba", "aria-hidden": "true" }),
      h("span", { className: "xl-tomo__lomo", "aria-hidden": "true" },
        h("span", { className: "xl-tomo__titulo" }, p.titulo),
        p.autor ? h("span", { className: "xl-tomo__autor" }, p.autor) : null),
      h("span", { className: "xl-tomo__banda xl-tomo__banda--abajo", "aria-hidden": "true" }));
  }

  /* ---------- Estante ---------- */
  function Estante(p) {
    return h("section", { className: cx("xl-estante", p.className), "aria-label": p.rotulo || "Estante" },
      h("div", { className: "xl-estante__hueco" },
        h("div", { className: "xl-estante__libros" }, p.children)),
      h("div", { className: "xl-estante__tabla" },
        p.rotulo ? h("span", { className: "xl-estante__placa" }, p.rotulo) : null));
  }

  /* ---------- LibroAbierto ---------- */
  function LibroAbierto(p) {
    var c = tono(p.color);
    var animar = p.animar !== false;
    return h("article", { className: cx("xl-libro", "xl-libro--" + c, animar && "is-abriendo", p.className), "aria-label": p.titulo },
      h("div", { className: "xl-libro__tapa xl-libro__tapa--izq" },
        h("div", { className: "xl-pagina xl-pagina--izq" },
          p.categoria ? h("p", { className: "xl-pagina__categoria" }, p.categoria) : null,
          h("h2", { className: "xl-pagina__titulo" }, p.titulo),
          p.autor ? h("p", { className: "xl-pagina__autor" }, p.autor) : null,
          h("hr", { className: "xl-pagina__filete" }),
          h("div", { className: "xl-pagina__texto" }, contenido(p.resumen)))),
      h("div", { className: "xl-libro__tapa xl-libro__tapa--der" },
        h("div", { className: "xl-pagina xl-pagina--der" },
          h("p", { className: "xl-pagina__categoria" }, p.encabezado || "Notas"),
          h("div", { className: "xl-pagina__texto" }, contenido(p.children)))),
      animar ? h("div", { className: "xl-libro__portada", "aria-hidden": "true" },
        h("div", { className: "xl-libro__marco" },
          h("span", { className: "xl-libro__portada-titulo" }, p.titulo),
          p.autor ? h("span", { className: "xl-libro__portada-autor" }, p.autor) : null)) : null);
  }

  /* ---------- Biblioteca ---------- */
  function Biblioteca(p) {
    var s1 = React.useState(null), sacado = s1[0], setSacado = s1[1];
    var s2 = React.useState(null), abierto = s2[0], setAbierto = s2[1];
    var espera = React.useRef(null), origen = React.useRef(null), boton = React.useRef(null);

    function abrir(libro, ev) {
      origen.current = ev && ev.currentTarget;
      setSacado(libro.id);
      clearTimeout(espera.current);
      espera.current = setTimeout(function () { setAbierto(libro); }, movimientoReducido() ? 0 : 320);
      if (p.onAbrir) p.onAbrir(libro);
    }
    function cerrar() {
      setAbierto(null);
      setSacado(null);
      var o = origen.current;
      if (o && o.focus) setTimeout(function () { o.focus(); }, 0);
    }

    React.useEffect(function () { return function () { clearTimeout(espera.current); }; }, []);
    React.useEffect(function () {
      if (!abierto) return undefined;
      if (boton.current) boton.current.focus();
      function tecla(e) { if (e.key === "Escape") cerrar(); }
      document.addEventListener("keydown", tecla);
      return function () { document.removeEventListener("keydown", tecla); };
    }, [abierto]);

    var estantes = p.estantes || [];
    return h("div", { className: cx("xl-biblioteca", p.className) },
      (p.nombre || p.lema) ? h("header", { className: "xl-biblioteca__cabecera" },
        p.nombre ? h("h1", { className: "xl-biblioteca__nombre" }, p.nombre) : null,
        p.lema ? h("p", { className: "xl-biblioteca__lema" }, p.lema) : null) : null,
      h("div", { className: "xl-mueble" },
        estantes.map(function (e, i) {
          return h(Estante, { key: e.rotulo || i, rotulo: e.rotulo },
            (e.libros || []).map(function (l, j) {
              var id = l.id || i + "-" + j;
              var libro = Object.assign({}, l, { id: id });
              return h(Tomo, {
                key: id, titulo: l.titulo, autor: l.autor, color: l.color,
                sacado: sacado === id,
                onAbrir: function (ev) { abrir(libro, ev); }
              });
            }));
        })),
      abierto ? h("div", {
        className: "xl-sala", role: "dialog", "aria-modal": "true", "aria-label": abierto.titulo,
        onClick: function (e) { if (e.target === e.currentTarget) cerrar(); }
      },
        h(LibroAbierto, {
          titulo: abierto.titulo, autor: abierto.autor, color: abierto.color,
          categoria: abierto.categoria, resumen: abierto.resumen, encabezado: abierto.encabezado
        }, abierto.notas),
        h("button", { type: "button", ref: boton, className: "xl-boton", onClick: cerrar }, "Devolver al estante")) : null);
  }

  window.ExLibris = Object.assign(window.ExLibris || {}, {
    Tomo: Tomo, Estante: Estante, LibroAbierto: LibroAbierto, Biblioteca: Biblioteca
  });
})();
