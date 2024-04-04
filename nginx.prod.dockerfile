# Stage 1 - Build image
FROM node:latest as node
LABEL name="Issue Analysis Extended"
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN ng build

# Stage 2 - move dist to runtime image
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
