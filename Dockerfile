FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install missing shuffle-array dependency explicitly
RUN npm install shuffle-array

# Copy project files
COPY . .

# Command to run when container starts
CMD ["node", "--no-warnings", "test-betting-patterns.js"] 