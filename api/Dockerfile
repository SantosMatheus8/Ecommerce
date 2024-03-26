FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /opt/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Start a new stage
FROM node:20

# Set the working directory inside the container
WORKDIR /opt/app

# Copy the built application from the previous stage
COPY --from=builder /opt/app ./

# Command to run your application
CMD ["npm", "run", "start"]