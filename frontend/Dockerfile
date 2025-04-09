FROM node:16-alpine

WORKDIR /themovies

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY themovies/package*.json ./
RUN npm install

COPY themovies/ ./

RUN npm run build

RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
