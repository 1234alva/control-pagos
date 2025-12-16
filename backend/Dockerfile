# Imagen base oficial de Node
FROM node:18

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json primero (para aprovechar cache de dependencias)
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar solo los archivos necesarios del backend
COPY server.js .
COPY db.js .
COPY routes ./routes
COPY middleware ./middleware
COPY entities ./entities

# Exponer el puerto de tu backend
EXPOSE 4000

# Comando por defecto para levantar el servidor
CMD ["node", "server.js"]
