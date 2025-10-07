# Use official Node.js LTS version
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy backend source code to container
COPY . .

# Expose port 8080
EXPOSE 8080

# Start the backend server
CMD ["node", "server.js"]