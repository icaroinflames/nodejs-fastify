FROM node:gallium-alpine3.14

WORKDIR /app

COPY ./ ./

RUN npm install

CMD ["npm", "start"]