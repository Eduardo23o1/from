# Usa la imagen base de Node.js
FROM node:18.10

# Instala el Angular CLI
RUN npm install -g @angular/cli

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación en modo producción
RUN ng build

# Expón el puerto en el que se ejecutará la aplicación
EXPOSE 4200

# Comando para iniciar la aplicación
CMD ["npm", "start"]
