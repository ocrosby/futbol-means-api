# Means API

## Build from source

0. Installing TypeScript globally
    ```sh
    npm install -g typescript
    tsc --version
    ```

1. Clone the repo

    ```sh
    git clone https://github.com/ocrosby/futbol-means.git
    cd futbol-means
    ```

2. Install dependencies

    ```sh
    npm install
    ```

3. Build the production server

    ```sh
    npm build
    ```

4. Run the server

    ```sh
    npm start
    ```

## Building Docker image locally

```sh
docker build -t means-api .
```

## Verifying the docker image

```sh
docker images
```

or

```sh
npm run docker:build
```

## Run tests

```sh
npm test
```

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



## References

* [Rest API with Express TypeScript and Swagger](https://rsbh.dev/blogs/rest-api-with-express-typescript)
* [Rest API Express TypeScript Docker](https://rsbh.dev/blogs/rest-api-express-typescript-docker)
* [Swagger Node TypeScript with TSOA](https://medium.com/willsonic/swagger-nodejs-typescript-tsoa-15a3f10fabaf)
