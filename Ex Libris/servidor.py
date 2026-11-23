#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Ex Libris — Servidor Local de la Biblioteca Digital
Inicia un servidor HTTP local y abre automáticamente la biblioteca en el navegador web predeterminado.
"""

import os
import sys
import webbrowser
import socket
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT_DEFAULT = 8080

class ExLibrisHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Desactivar caché local para desarrollo fluido
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def encontrar_puerto_libre(puerto_inicial=PORT_DEFAULT):
    puerto = puerto_inicial
    while puerto < puerto_inicial + 100:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('127.0.0.1', puerto)) != 0:
                return puerto
            puerto += 1
    return puerto_inicial

def iniciar_servidor():
    directorio_actual = os.path.dirname(os.path.abspath(__file__))
    os.chdir(directorio_actual)

    puerto = encontrar_puerto_libre(PORT_DEFAULT)
    url = f"http://localhost:{puerto}/index.html"

    print("=" * 64)
    print("                EX LIBRIS — BIBLIOTECA DIGITAL")
    print("=" * 64)
    print(f" * Directorio: {directorio_actual}")
    print(f" * Servidor:   http://localhost:{puerto}")
    print(f" * Enlace directo: {url}")
    print("-" * 64)
    print(" Abriendo la biblioteca en tu navegador predeterminado...")
    print(" Presiona [Ctrl + C] en cualquier momento para detener el servidor.")
    print("=" * 64)

    # Abrir navegador automáticamente
    webbrowser.open(url)

    server_address = ('', puerto)
    try:
        httpd = HTTPServer(server_address, ExLibrisHandler)
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\nServidor detenido. ¡Hasta pronto en Ex Libris!")
        try:
            httpd.server_close()
        except Exception:
            pass
        sys.exit(0)

if __name__ == '__main__':
    iniciar_servidor()
