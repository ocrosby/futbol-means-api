# Means API

## Setup

### Installing TypeScript globally

```sh
npm install -g typescript
tsc --version
```
   
### Installing Eslint globally

```sh
npm install -g eslint
```

### Clone the repo

```sh
git clone https://github.com/ocrosby/futbol-means.git
cd futbol-means
```

### Install dependencies

```sh
npm install
```

### Build the production server

```sh
npm build
```

### Run the server

```sh
npm start
```

## Docker

Note: I always forget this but the docker port mapping rules start with the port on the
      local machine (on the left) followed by a ':' then the port within the container
      (on the right).

### Build the API Docker image locally

```sh
docker build -t means-api .
```

## Verifying the docker image

```sh
docker images
```


## Run tests

```sh
npm test
```

## Dependencies

* express - Fast, unopinionated, minimalist web framework for Node.js
* dotenv - Zero-dependency module that loads environment avariables from a .env file into process.env
* cors - Express middleware to enable CORS with various options
* helmet - Express middleware to secure your apps by setting various HTTP headers, which mitigate common attack vectors
* envalid - Envalid is a small library for validating and accessing environment variables in Node.js programs
* inversify - A powerful and lightweight inversion of control container for JavaScript & Node.js apps powered by TypeScript.
* inversify-binding-decorators - An utility that allows developers to declare InversifyJS bindings using ES2016 decorators:
* mongoose - elegant mongodb object modeling for node.js
* reflect-metadata - Polyfill for Metadata Reflection API
* swagger-ui-express - Swagger UI Express
* tsoa - OpenAPI-compliant REST APIs using TypeScript and Node



## Development Dependencies

* concurrently
* eslint
* nodemon
* npm-run-all
* rimraf
* ts-node
* typescript
* ts-node-dev - restarts a target Node.js process when any of the required files change

## Development

The dev run script now uses ts-node-dev which has the following parameters

* --respawn: Keep watching for changes after the script has exited.
* --pretty: Use pretty diagnostic formatter ( TS_NODE_PRETTY )
* --transpile-only: Use TypeScript's faster transpileModule (TS_NODE_TRANSPILE_ONLY) 
* src/server.ts: This is the application's entry file.

Simply run the dev script to launch the project:

> npm run dev

## Directory Structure
The directory structure of the application emphasizes an architectural approach based on a "separation of concerns":

src/data-layer: responsible for organizing how the data will be stored and accessed.

* adapters: implements the setup of database
* data-abstracts: delineates both the schemas representing the structure of each mongo collection and the documents representing each set of data in the collection.
* data-agents: implements the query transactions against the data store for each particular collection
* model: contains a Typescript class representing the definition of the data portrayed by the Document.

src/business-layer: implementation of business logic and other resources needed by the service-layer and/or middleware

* security: contains apparatus for creating tokens and processing security checks on specific API request.
* validators: contains schema and processing logic for validating data sent with API request.

src/service-layer: contains the processes for establishing API endpoints in the form of routes which will facilitate responses to data request.

* controllers: serve the basis for processing data request associated with routes.  The custom controllers (User and Authorization) extend tsoa controllers, using decorators to associate router endpoints to specific functions exposed in each of the controllers.  These functions, commonly referred to as CRUD (create, read, update, and delete) implement the basic GET, POST, PUT, PATCH, and DELETE processes for transacting with RESTful api.

* request: contains TypeScript interfaces representing the attributes that make up each of the various types of request.

* response: contains TypeScript interfaces representing the attributes that make up various types of responses.

src/presentation-layer/: contains the presentational views offered by the application.

* documentation: contains the Swagger-UI files and directories facilitating the display and mechanisms for making REST based API calls and presenting the responses.

Note: Since the responsibility of this Node application is essentially providing data against requests, there are no other views but documentation.

src/middleware/: contains resources to establish the server configuration as well as a place to store utility processes shared across the application.

* common: currently contains the instantiation of the 'logger' that can be shared across the application

* server-config: contains vendor specific implementation of the node server framework vendor, 'Express' as well as the all important 'routes' configuration organizing the REST API endpoints.

src/server.ts: initializes our web server with our chosen Node framework Express.

src/server-config: contains the core infrastructure for instantiating the web-server.

tsoa.json: establishes the various locations of files needed to generate the swagger.json, which will eventually be used by the Swagger UI to represent the API documentation.  A couple of key configurations are

* listing the Security definitions which will be used to signify protected data access
* hosting and domain configurations, the directory path to place the output of our TypeScript complilation, as well as the label '/api' used to signify the handling and processing of request data rather than other kinds of resources.

* the all import route configuration is used to identify the file used to stand up the web-server application, the location of the directory where the routes.ts can be found, and finally where the file(s) reside used in conjunction with our security apparatus are located.

## Setting up MongoDB within a Docker container for local development

Pull the image
> docker pull mongo

Start the container 
> docker run
-d
--name YOUR_CONTAINER_NAME_HERE
-p YOUR_LOCALHOST_PORT_HERE:27017
-e MONGO_INITDB_ROOT_USERNAME=YOUR_USERNAME_HERE
-e MONGO_INITDB_ROOT_PASSWORD=YOUR_PASSWORD_HERE
mongo

Check that the container's up and running
> docker container ls

Connect to the container and access your MongoDB instance

> docker exec -it YOUR_CONTAINER_NAME_HERE bash

Access the MongoDB instance via the mongo command line interface

> mongo --username YOUR_USERNAME_HERE --password YOUR_PASSWORD_HERE

List all databases:

> show dbs
> 

Connecting to the database from outside of the container

> mongodb://YOUR_USERNAME_HERE:YOUR_PASSWORD_HERE@0.0.0.0:YOUR_LOCALHOST_PORT_HERE

or 

> mongodb://YOUR_USERNAME_HERE:YOUR_PASSWORD_HERE@0.0.0.0:YOUR_LOCALHOST_PORT_HERE/YOUR_DATABASE_NAME_HERE



## References

* [Another Example](https://github.com/GeekyAnts/express-typescript)
* [Typescript Expres Tutorial](https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/)
* [Rest API with Express TypeScript and Swagger](https://rsbh.dev/blogs/rest-api-with-express-typescript)
* [Rest API Express TypeScript Docker](https://rsbh.dev/blogs/rest-api-express-typescript-docker)
* [Swagger Node TypeScript with TSOA](https://medium.com/willsonic/swagger-nodejs-typescript-tsoa-15a3f10fabaf)
* [TypeScript Dependency Injection](https://levelup.gitconnected.com/dependency-injection-in-typescript-2f66912d143c)
* [Inversify IOC](https://inversify.io)
* [Simplifying Dependency Injection](https://engineering.monstar-lab.com/en/post/2019/10/02/simplifying-dependency-injection-and-ioc-concepts-with-typescript/)
