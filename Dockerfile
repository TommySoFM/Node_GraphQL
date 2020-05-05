FROM node:13
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm uninstall nodemon
COPY . .
CMD ["node", "app.js"]