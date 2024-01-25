# Integración de Webhooks Discord-GitHub con Netlify Edge Functions

Este proyecto ha sido actualizado para implementar Netlify Edge Functions, permitiendo una ejecución eficiente y rápida de la integración entre Discord y GitHub. Aquí tienes una guía actualizada para la configuración y despliegue con Netlify CLI:

## Configuración

### 1. Configuración en Discord

1. Crea un servidor de Discord si aún no tienes uno.
2. Abre el servidor y selecciona el canal al que deseas enviar los mensajes de GitHub.
3. Ve a Configuración del servidor -> Integraciones -> Webhooks y crea un nuevo webhook.

### 2. Configuración en GitHub

1. Abre tu repositorio en GitHub.
2. Ve a Configuración -> Webhooks -> Agregar webhook.
3. En la URL del webhook, ingresa la URL del webhook de Discord que obtuviste previamente.
4. Configura los eventos que desees que desencadenen la notificación en Discord (por ejemplo, `push` para cambios en el código).

### 3. Configuración de Netlify CLI

1. Instala Netlify CLI si aún no lo tienes:

   ```bash
   npm install -g netlify-cli
   ```

2. Inicia sesión en tu cuenta de Netlify:

   ```bash
   netlify login
   ```

3. Inicializa tu proyecto Netlify:

   ```bash
   netlify init
   ```

   Sigue las instrucciones para configurar tu proyecto.

4. En la configuración, asegúrate de seleccionar la opción para configurar funciones (`Functions`) y elige la carpeta donde se encuentra la función de webhook.

## Despliegue

1. Despliega tu proyecto en Netlify:

   ```bash
   netlify deploy
   ```

   Sigue las instrucciones y selecciona la función de webhook cuando se te pida.

2. Abre la URL proporcionada por Netlify después de desplegar para acceder a tu aplicación.

## Contribuciones

Si encuentras algún problema o tienes sugerencias de mejora, no dudes en abrir un problema o enviar una solicitud de extracción.

¡Ahora tu integración está lista para ejecutarse eficientemente en Netlify Edge Functions! Asegúrate de adaptar esta guía según tus necesidades específicas.