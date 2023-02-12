# Docker

docker rm removes containers by their name or ID

Stop all running containers

```sh
docker stop $(docker ps -a -q)
```

Delete all stopped containers

```sh
docker rm $(docker ps -a -q)
```

Build an image with a tag

```sh
docker build -t means-api .
```

List all installed Docker images

```sh
docker images
```

List all docker containers

```sh
docker container ls -a
```

List all docker containers with size

```sh
docker container ls -a -s
```

List all docker containers even the stopped ones

```sh
docker ps -a -q
```

Deleting a Docker image

```sh
docker rmi <image id>
```

Remove all images without a container

```sh
docker image prune -a -f
```
