# Proyecto de WebSockets con Node.js y Cliente Navegador

## Descripción del Proyecto

Este proyecto proporciona una implementación básica de WebSockets utilizando Node.js en el lado del servidor y la API nativa de WebSockets en el lado del cliente. La aplicación permite la comunicación en tiempo real entre el servidor y el cliente a través de una conexión WebSocket.

## Requisitos Previos

Antes de ejecutar la aplicación, asegúrate de tener Node.js instalado en tu máquina. Puedes descargarlo desde [nodejs.org](https://nodejs.org/).
## Configuración

1. Clona el repositorio:
2. Instala las dependencias:

   ```bash
   npm install
   ```
3. crea un archivo `.env` basado en el archivo `.env.template`
## Uso

1. Inicia el servidor Node.js:

   ```bash
   npm run dev
   ```

   El servidor estará disponible en `ws://localhost:3000`.

2. Inicia el cliente en tu navegador web:

   ```bash
   npm run dev:client
   ```

3. Ingresa mensajes en la página web y observa cómo se transmiten en tiempo real a través de la conexión WebSocket.

## Configuración del Servidor

Utilizando la librería `ws`. Define un servidor WebSocket que escucha en el puerto `3000` y maneja eventos como la conexión, los mensajes y el cierre de la conexión.

## Implementación del Cliente

El archivo `public/index.html` contiene la interfaz del cliente, mientras que `public/src/app.js` maneja la lógica del cliente. Este utiliza la API nativa de WebSockets en el navegador para establecer una conexión con el servidor y enviar/recebir mensajes en tiempo real.

¡Disfruta del proyecto y la implementación de WebSockets!