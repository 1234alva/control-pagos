# Imagen base de Node.js
FROM node:18

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json primero para aprovechar la cache
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código del backend
COPY . .

# Exponer el puerto del backend
EXPOSE 4000

# Comando para iniciar el servidor
CMD ["node", "index.js"]
