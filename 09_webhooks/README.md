# Integración de Webhooks Discord-GitHub

Este proyecto proporciona una integración entre Discord y GitHub a través de webhooks, permitiendo enviar mensajes automáticamente a un canal de Discord cuando se realizan cambios en un repositorio de GitHub.

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

### 3. Configuracion de las varaibles de entorno
1. cambia el `.env.template` a un `.env` 
2. Agrega los datos necesarios.

## Uso

¡Ahora tu integración está lista para usarse! Cuando ocurran cambios en tu repositorio de GitHub, recibirás mensajes en el canal de Discord configurado.

## Contribuciones

Si encuentras algún problema o tienes sugerencias de mejora, no dudes en abrir un problema o enviar una solicitud de extracción.

¡Espero que esta guía te sea útil! Asegúrate de adaptarla según tus necesidades específicas.