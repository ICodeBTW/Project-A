
# Dev
FROM node:22-alpine AS devagent

RUN apk update --no-cache && apk upgrade

USER node

WORKDIR /app

COPY --chown=node:node package.json .
RUN npm install

EXPOSE 3000

ENTRYPOINT [ "npm" ]
CMD ["run", "dev"]

# build stage
FROM devagent AS buildagent

COPY . .

RUN ["npm", "run", "build"]


# Production stage
FROM node:22-alpine AS prodagent
WORKDIR /app
RUN apk update --no-cache && apk upgrade

COPY . .
RUN npm install 

EXPOSE 3000

CMD ["npm", "server"]






