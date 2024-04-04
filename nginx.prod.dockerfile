# Stage 1 - Build image
FROM node:latest as node
LABEL name="Issue Analysis Extended"
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build
RUN ls -l /app/dist/jira-issue-analysis-frontend/browser

# Stage 2 - move dist to runtime image
FROM nginx:alpine
VOLUME /var/cache/nginx
COPY --from=node /app/dist/jira-issue-analysis-frontend/browser /usr/share/nginx/html
COPY /usr/share/nginx/html/jira-issue-analysis-frontend/browser/* /usr/share/nginx/html/
# COPY --from=node /app/dist/jira-issue-analysis-frontend/browser/index.html /usr/share/nginx/html/
# COPY --from=node /app/dist/jira-issue-analysis-frontend/browser/assets /usr/share/nginx/html/assets
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf
