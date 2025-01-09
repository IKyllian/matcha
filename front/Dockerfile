FROM node:20

WORKDIR /usr/src/app

COPY ./front .

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]