# Base image
FROM node:18

COPY . /next-js-frontend
WORKDIR /next-js-frontend

# Install app dependencies
RUN npm i

# Creates a "dist" folder with the production build
# RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "dev"]