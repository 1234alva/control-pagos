# Etapa 1: construir la aplicación React
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servir con Nginx
FROM nginx:alpine

# Copiar el build de React a la carpeta de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto de Nginx
EXPOSE 80

# Comando por defecto de Nginx
CMD ["nginx", "-g", "daemon off;"]
