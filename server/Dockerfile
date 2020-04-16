FROM node:12.2.0-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional
CMD ["./wait-for-it.sh", "db", "5432", "npx nodemon ./index.js"]

FROM development as production 
COPY ./ ./
CMD ["./wait-for-it.sh", "db", "5432", "node ./index.js"]