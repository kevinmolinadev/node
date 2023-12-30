# APLICACION DE MONITORIO "CENTRO DE OPERACIONES DE RED" - NOC

Esta es una aplicación de monitoreo. La aplicación utiliza tecnologías como TypeScript, Prisma, Mongoose, y Nodemailer para ofrecer funcionalidades de monitoreo y gestión de datos.

## Configuración del Proyecto

1. **Instalar Dependencias:**
   ```bash
   cd 05_aplicacion_de_monitoreo
   npm install
   ```
2. **Configurar Variables de Entorno:**
   
   Crea un archivo `.env` en la raíz del proyecto y configura las variables de entorno necesarias. Puedes encontrar un ejemplo en `.env.template`.

3. **Ejecutar el archivo docker:**
   ```bash
   docker compose up -d
   ```  
4. **Ejecutar el servicio de Prisma para la base de datos:**
   ```bash
   npx prisma migrate dev --name init
   ``` 
5. **Ejecutar el proyecto:**
   ```bash
   npm run dev
   ```

## Tecnologías Utilizadas

- [Prisma](https://www.prisma.io/): ORM para bases de datos SQL.
- [Mongoose](https://mongoosejs.com/): ODM para MongoDB.
- [Nodemailer](https://nodemailer.com/): Librería para enviar correos electrónicos.
- [Cron](https://www.npmjs.com/package/cron): Librería para la ejecución de tareas programadas.
