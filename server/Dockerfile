FROM node:12.2.0-alpine as development

WORKDIR /app

COPY package*.json ./
RUN npm install --no-optional

ENV NODE_ENV development
CMD ["npx", "nodemon", "./index.js"]

FROM development as production 

COPY ./ ./

ENV NODE_ENV production
CMD [ "node", "index.js" ]