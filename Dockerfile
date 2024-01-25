# Use an official Node.js runtime as a base image.
FROM node:16

# Set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./

# Install bot dependencies.
RUN npm install

# Copy the bot code to the container.
COPY . .

# Expose the port the bot will run on.
EXPOSE 3000

# Command to run your bot (bot's main file)
CMD ["node", "deploy-commands.js"]