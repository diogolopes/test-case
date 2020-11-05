FROM registry.access.redhat.com/ubi8/nodejs-12:latest as node
#FROM node:12 as node   
# SET ENVIRONMENT VARIABLES
#ENV ENVIRONMENT=production1
#ENV DIRF_DIRFPORTALLEGAISAPI_SERVICE_HOST="0.0.0.0"
#ENV DIRF_DIRFPORTALLEGAISAPI_SERVICE_PORT="0000"
#ENV PORTAL_LEGAIS_REGULATORIOS_SERVER_SERVICE_HOST="1.2.3.4.5"
#ENV PORTAL_LEGAIS_REGULATORIOS_SERVER_SERVICE_PORT="12345"
 
USER 0
 
#RUN groupadd -r node && adduser node -g node
 
#RUN mkdir -p /usr/src/app/node_modules && chown -R node:node /usr/src/app
 
WORKDIR /opt/app-root/src
COPY package*.json /opt/app-root/src/
 
RUN npm set strict-ssl false && npm i -g @angular/cli && npm install --unsafe-perm --verbose
COPY . /opt/app-root/src/
RUN chown -R default: /opt/app-root/src && ng build --prod
USER 1001
 
CMD ["npm", "run", "start"]
 
FROM registry.redhat.io/rhel8/nginx-116
#FROM nginx:1.19.3
COPY --from=node /opt/app-root/src/dist/portal-legais-regulatorios-front /opt/app-root/src
#COPY ./nginx-custom.conf /etc/nginx/nginx.conf
#COPY ./nginx-custom.conf /opt/app-root/etc/nginx.d/
 
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf
#EXPOSE 8080

CMD ["/usr/libexec/s2i/run"]