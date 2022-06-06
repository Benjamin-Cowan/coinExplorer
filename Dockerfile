#create the node stage
FROM node:latest as builder
#set the working directory
WORKDIR /app
#copy the file from current to working directory
COPY . .
#install and build the application
RUN npm install && npm run ng build 

#create nginx stage
FROM nginx:alpine
#set the working directory to nginx assets directory
WORKDIR /usr/share/nginx/html
#remove default nginx files
RUN rm -rf ./*
#copy production app from builder stage
COPY --from=builder /app/dist/coin-explorer .
ENTRYPOINT ["nginx","-g","daemon off;"]

