# Means API

## Build from source

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

## References

* [Rest API with Express TypeScript and Swagger](https://rsbh.dev/blogs/rest-api-with-express-typescript)
* [Rest API Express TypeScript Docker](https://rsbh.dev/blogs/rest-api-express-typescript-docker)
