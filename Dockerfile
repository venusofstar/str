FROM jrottenberg/ffmpeg:6.0-alpine

WORKDIR /app
COPY . .

RUN apk add --no-cache nodejs npm
RUN npm install

CMD ["npm","start"]
