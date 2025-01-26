# Step 1: Use Node.js image to build the React app
FROM node:20 AS build

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use a lightweight web server to serve the app
FROM nginx:stable-alpine

# Step 8: Copy the build output to the Nginx default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 8.1: Copy the custom nginx.conf to configure SPA routes
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
