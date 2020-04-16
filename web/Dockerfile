FROM node:12.2.0-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional
ARG API_URL
ENV API_URL=${API_URL}
CMD ["npm", "run", "serve"]

FROM development as build
COPY ./ ./
RUN npm run build

FROM nginx:1.16.0-alpine as production 
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
ARG API_URL
ENV API_URL=${API_URL}
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]