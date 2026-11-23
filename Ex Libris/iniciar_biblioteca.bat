@echo off
chcp 65001 > nul
title Ex Libris — Biblioteca Digital

echo ================================================================
echo                   EX LIBRIS — BIBLIOTECA DIGITAL
echo ================================================================
echo.
echo Iniciando interfaz de la biblioteca...
echo.

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    echo [✓] Python detectado. Iniciando servidor local...
    python "%~dp0servidor.py"
) else (
    echo [i] Abriendo directamente en tu navegador predeterminado...
    start "" "%~dp0index.html"
    echo.
    echo Biblioteca abierta con exito.
    pause
)
