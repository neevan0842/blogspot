# Stage 1: Build the React app
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json for caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# # Set the environment variable for Vite API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# # Build the application
RUN npm run build

# # Stage 2: Serve the built files using Caddy
# FROM caddy:alpine

# # Copy the built files from the previous stage
# COPY --from=build /app/dist /usr/share/caddy
