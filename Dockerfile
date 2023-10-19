FROM node:19-alpine3.15 as dev-deps
WORKDIR /app
COPY package.json package.json
RUN npm install

FROM node:19-alpine3.15 as builder
WORKDIR /app
COPY --from=dev-deps /app/node_modules /app/node_modules
COPY . . 
RUN npm run build

FROM nginx:1.21.3 as prod
EXPOSE 80
COPY --from=builder /app/dist/from /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]