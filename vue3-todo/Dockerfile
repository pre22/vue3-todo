# Use official node image as base
FROM node:22.9-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./


# Copy package.json and install dependencies
COPY . .
RUN npm install

# Build the app
RUN npm run build

# Copy the rest of the application

# Expose the port Vite uses
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "dev"]
