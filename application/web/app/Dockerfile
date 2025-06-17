
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

USER node

COPY  --chown=node:node . .

RUN ls

RUN npm run build


# Production stage
FROM nginx:alpine AS prodagent

COPY --from=buildagent /app/dist /usr/share/nginx/html

RUN echo 'server { \
	listen 80; \
	server_name localhost; \
	root /usr/share/nginx/html; \
	index index.html; \
	location / { \
	try_files $uri $uri/ /index.html; \
	} \
	location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ { \
	expires 1y; \
	add_header Cache-Control "public, immutable"; \
	} \
	}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]





