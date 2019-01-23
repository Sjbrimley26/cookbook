FROM node:lts-alpine
ADD . /src
WORKDIR /src
RUN npm i
EXPOSE 3000
CMD ["node", "src/app"]