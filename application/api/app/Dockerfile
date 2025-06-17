# Dev stage
FROM node:22-alpine AS devagent
RUN apk update --no-cache && apk upgrade
USER node
WORKDIR /app
COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci
EXPOSE 3000
ENTRYPOINT ["npm"]
CMD ["run", "dev"]

# Production stage
FROM node:22-alpine AS prodagent
RUN apk update --no-cache && apk upgrade

USER node

WORKDIR /app

# Copy package files and install only production dependencies
COPY --chown=node:node package.json package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy application source code
COPY --chown=node:node . .
 
EXPOSE 3000
CMD ["npm","run","serve"]