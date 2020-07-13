FROM node:12

# Set the workdir
WORKDIR /app

# every package*.json file copy to the current WORKDIR
COPY package*.json ./

# install every dependency from package.json
RUN npm install

# copy all elements from current(local) dir, to the root directory(container)
# this is going to copy node_module also, ignore with a .dockerignore file
COPY . .

# Execute the npm to run
# CMD ["npm", "run","dev"]