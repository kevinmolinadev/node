# Web Server HTTP/2

Servidor web HTTP/2 

**Crear las credenciales ssl**
```
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```
guardar los archivos dentro de un directorio "keys"
