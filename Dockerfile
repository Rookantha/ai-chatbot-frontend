# Stage 1: Build the image with the Next.js app
FROM node:18 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Create a production-ready image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy the built app from the builder stage
COPY --from=builder /app /app

# Expose port for the app
EXPOSE 3000

# Command to run the Next.js app
CMD ["npm", "start"]
