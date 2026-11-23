import type { ReactNode, MouseEvent, CSSProperties } from "react";

/** Los cinco colores de lomo. */
export type ColorLomo = "azul" | "rojo" | "verde" | "amarillo" | "morado";

export interface TomoProps {
  /** Título del libro, curso o episodio. Se corta con «…» en el lomo. */
  titulo: string;
  /** Autor o fuente, en forma corta. */
  autor?: string;
  /** Color del lomo. Por defecto "azul". */
  color?: ColorLomo;
  /** El libro está sacado del estante (sube y proyecta sombra). */
  sacado?: boolean;
  /** Se llama al tocar el lomo. */
  onAbrir?: (ev: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
}

export interface EstanteProps {
  /** Texto de la placa de latón. */
  rotulo?: string;
  /** Los Tomo del estante. */
  children?: ReactNode;
  className?: string;
}

export interface LibroAbiertoProps {
  titulo: string;
  autor?: string;
  color?: ColorLomo;
  /** Texto pequeño sobre el título: "Libro · Hábitos". */
  categoria?: string;
  /** Hoja izquierda: texto (párrafos separados por línea en blanco), lista de frases o elementos. */
  resumen?: ReactNode | string | string[];
  /** Encabezado de la hoja derecha. Por defecto "Notas". */
  encabezado?: string;
  /** Hoja derecha: texto, lista de frases o elementos. */
  children?: ReactNode | string | string[];
  /** Si es false, se muestra ya abierto, sin girar la portada. Por defecto true. */
  animar?: boolean;
  className?: string;
}

export interface LibroDatos {
  id?: string;
  titulo: string;
  autor?: string;
  color: ColorLomo;
  categoria?: string;
  resumen?: string | string[];
  encabezado?: string;
  notas?: string | string[];
}

export interface EstanteDatos {
  rotulo: string;
  libros: LibroDatos[];
}

export interface BibliotecaProps {
  /** Nombre de la biblioteca en la cabecera. */
  nombre?: string;
  /** Una línea bajo el nombre. */
  lema?: string;
  estantes: EstanteDatos[];
  /** Se llama cuando se saca un libro. */
  onAbrir?: (libro: LibroDatos & { id: string }) => void;
  className?: string;
}

export declare function Tomo(props: TomoProps): JSX.Element;
export declare function Estante(props: EstanteProps): JSX.Element;
export declare function LibroAbierto(props: LibroAbiertoProps): JSX.Element;
export declare function Biblioteca(props: BibliotecaProps): JSX.Element;
