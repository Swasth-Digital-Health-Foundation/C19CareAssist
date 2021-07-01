FROM node:15-alpine

WORKDIR /app

COPY package.json  ./

RUN npm install

COPY . .

# set your port
ENV PORT 8080
# expose the port to outside world
#EXPOSE  8080

# start command as per package.json
CMD ["npm", "start"]