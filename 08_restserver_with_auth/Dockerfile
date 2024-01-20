FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY dist .
EXPOSE 3000
CMD [ "node", "app.js" ]
