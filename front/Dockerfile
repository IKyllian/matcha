FROM node:20 as build

WORKDIR /app

COPY ./front .

ARG VITE_API_URL
ARG VITE_FRONT_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_FRONT_URL=$VITE_FRONT_URL

RUN npm install -g npm@11.0.0
RUN npm install
RUN npm run build

FROM nginx:1.23-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf.template

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 5173

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]