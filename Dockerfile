 # Create image based on the official Node 6 image from the dockerhub
FROM node:8-alpine

# Create a directory where our app will be placed
RUN mkdir -p /usr/app

RUN npm install babel-cli -g

# Change directory so that our commands run inside this new directory
WORKDIR /usr/app

# Copy dependency definitions
COPY package.json /usr/app

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /usr/app

# Expose the port the app runs in
EXPOSE 80 8080

# Serve the app
CMD ["npm", "start"]