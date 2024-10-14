# Usar la imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json al directorio
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todos los archivos del directorio
COPY . .

# Exponer el puerto 8001 para acceder
EXPOSE 8001

# Definir el comando por defecto que se ejecutará al iniciar el contenedor
CMD ["node", "auth.js"]
