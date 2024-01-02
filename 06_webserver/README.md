# Web Server

Aprendiendo a crear un servidor web con Node.js de las siguientes formas:

- [http](http-server/README.md)
- [http2](http2-server/README.md)
- [express](express-server/README.md)

Hicimos proyectos simples para aprender y practicar, tanto como para entender el funcionamiento de cada uno de ellos.

## Conceptos
### Request - Response
La request es la peticion que hace el cliente al servidor, y la response es la respuesta que da el servidor al cliente. 

### Tipos de request:
- GET: Se usa para pedir informacion al servidor.
- POST: Se usa para enviar informacion al servidor.
- PUT: Se usa para actualizar informacion en el servidor.
- DELETE: Se usa para eliminar informacion del servidor.

### Tipos de response:
- 1xx: Informacion
- 2xx: Exito
- 3xx: Redireccion
- 4xx: Error del cliente
- 5xx: Error del servidor

### Peticion
Ya sea un request o un response, estan formados por 2 partes: el header y el body. El header contiene informacion sobre la peticion, y el body contiene la informacion que se envia.

### Midleware
Es una funcion que se ejecuta entre el request y el response. Se puede usar para validar informacion, o para hacer un log de la informacion que se envia.

### Rutas
Es la direccion que se le da al servidor para que sepa que hacer. Por ejemplo, si se le da la ruta `/` el servidor va a devolver el index.html, y si se le da la ruta `/about` el servidor va a devolver el about.html.
