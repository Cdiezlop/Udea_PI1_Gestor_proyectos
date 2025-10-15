FROM node:18

WORKDIR /usr/src/app

# Copiar package.json y lock primero
COPY package*.json ./

# Instalar dependencias
RUN npm install

# 👇 Aseguramos bootstrap (esto soluciona tu error)
RUN npm install bootstrap

# Copiar el resto del código
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

