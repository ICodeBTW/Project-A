
# Dev
FROM node:22-alpine AS devagent

RUN apk update --no-cache && apk upgrade

USER node

WORKDIR /app

COPY --chown=node:node package.json .
RUN npm install

EXPOSE 4321

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

COPY --from=buildagent /app/dist ./dist
COPY --from=buildagent /app/package.json ./package.json

RUN npm install --production

EXPOSE 4321

CMD ["npm", "start"]






