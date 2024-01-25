# Use an official Node.js runtime as a base image.
FROM node:18

# Set the working directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory.
COPY package*.json ./

# Install bot dependencies.\
RUN apt-get -y update
RUN apt-get -y upgrade
RUN npm install
RUN apt-get install -y ffmpeg

# Copy the bot code to the container.
COPY . .

# Command to run your bot (bot's main file)
CMD ["node", "index.js"]