# APLICACION DE CONSOLA

## Descripción
Aplicación de consola desarrollado en Node.js que genera tablas de multiplicar y proporciona la opción de guardarlas en archivos de texto.

## Requisitos

- Node.js instalado en tu sistema.

## Instalación

1. Clona el repositorio o descarga los archivos.

```bash
git clone https://github.com/TuUsuario/tu-repositorio.git
cd tu-repositorio
```

2. Instala las dependencias.

```bash
npm install
```

## Uso

Puedes utilizar el script con los siguientes comandos:

```bash
node index.js -b <base> -l <limit> -c -n <name> -d <directory>
```

### Opciones

- `-b, --base`: Número base para la tabla de multiplicar (obligatorio).
- `-l, --limit`: Número para limitar la tabla de multiplicar (por defecto: 10).
- `-c, --create`: Crea un archivo con la tabla de multiplicar (por defecto: false).
- `-n, --name`: Nombre del archivo de salida (por defecto: "table").
- `-d, --directory`: Directorio de salida para los archivos (por defecto: "tables").

### Ejemplos

Generar una tabla de multiplicar del 5 hasta el límite de 15 y guardarla en un archivo llamado "mi-tabla" en el directorio "resultados":

```bash
node index.js -b 5 -l 15 -c -n mi-tabla -d resultados
```
---
Con este proyecto aprendi a crear aplicaciones de consola con Node.js,a utilizar el paquete yargs para crear comandos personalizados. Tambien el uso de typescript para crear aplicaciones de consola y como hacer testing de aplicaciones con Jest.
