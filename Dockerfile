# Use an official Node.js runtime as the base image
FROM node:latest as build-stage

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire app source code to the container
COPY . .

# Build the Angular app
RUN npm run build --prod

# Use Nginx as the web server to serve the app
FROM nginx:stable-alpine as production-stage
# Remove the default Nginx configuration
RUN rm -rf /etc/nginx/conf.d

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app from the build-stage
COPY --from=build-stage /app/dist/app /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

# app_partial_name="angular-app"
# docker build -t majidmashhadi/angular-app:1 . && docker push majidmashhadi/angular-app:1
# pod=$(kubectl get pods | awk '/'"$app_partial_name"'/ {print $1}') && kubectl delete pod "$pod"
# docker push majidmashhadi/angular-app:1
