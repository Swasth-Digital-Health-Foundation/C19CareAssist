FROM node:14-alpine

#var
RUN apk --update --no-cache add g++ make python tzdata bash curl
# Create app directory
WORKDIR /local/services/eua-service

COPY package.json package-lock.json ./

RUN npm install --silent

# copy app dependencies
COPY . .

RUN cd /local/services/eua-service \
  && npm run build \
  && apk del g++ make python tzdata bash curl
EXPOSE 3000

CMD ["sh", "-c", "node build/app.js"]