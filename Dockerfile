FROM node:22.12.0-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN NODE_OPTIONS=--max_old_space_size=6144 npm run build

FROM nginx:1.26.2-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./ci/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80/tcp
ENTRYPOINT ["nginx", "-g", "daemon off;"]