# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the app source
COPY . .

# Make port available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV NODE_ENV production

# Run the app when the container launches
CMD ["npm", "start"]