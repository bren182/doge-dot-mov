FROM node:16-alpine

WORKDIR /themovies

COPY themovies/package*.json ./

RUN npm install

COPY themovies/ .

EXPOSE 3000

CMD ["npm", "start"]