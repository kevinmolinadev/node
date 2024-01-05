# Rest Server

## Pasos para ejecutar el proyecto
1. Clonar el repositorio
2. Ejecutar el comando `npm install` para instalar las dependencias
3. Copiar el archivo `.env.template` y renombrarlo a `.env`
4. Levantat el servicio docker con el comando `docker-compose up -d`
5. Ejecutar el comando `npx prisma migrate dev --name init` para crear la base de datos
6. Ejecutar el comando `npm run dev` para levantar el servidor