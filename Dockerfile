# Step 1: Build the Next.js app
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the Next.js app
RUN npm run build

# Step 2: Setup the production environment
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copy the build output and package dependencies from the build stage
COPY --from=build /app ./

# Install only production dependencies
RUN npm install --production

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
