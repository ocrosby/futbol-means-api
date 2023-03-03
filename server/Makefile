
.DEFAULT_GOAL := dist


all:


CONTAINER_NAME = means-api-container
IMAGE_NAME = local-means-api-dev

build-clean:
	rm -rf node_modules
	rm -rf dist

clean: build-clean

install:
  npm install -g --silent eslint
	npm install -g --silent npm@latest
	npm install --silent tsoa typescript
	npm install --silent

transpile: clean install
	npx tsoa spec-and-routes
	npx tsc
	cp tsoa.json dist/
	cp src/build/swagger.json dist/build/

dist: clean transpile
	cp package.json dist/
	cd dist/ && npm install --production --silent && cd ..

build:
	docker build -t means-api .

build-dev:
	docker build -t $(IMAGE_NAME) -f Dockerfile.dev .

prune:
	docker image prune -a -f

run-container:
	docker run --name $(CONTAINER_NAME) -d -p 8080:8080  $(IMAGE_NAME)

start:
	docker start $(CONTAINER_NAME)

stop:
	docker stop $(CONTAINER_NAME)

flush:
	docker stop $(CONTAINER_NAME) && docker rm $(CONTAINER_NAME)

rm:
	docker rm $(CONTAINER_NAME)

up:
	docker-compose up

down:
	docker-compose down

logs:
	docker logs -f  $(CONTAINER_NAME)

ssh-exec:
	docker exec -it $(CONTAINER_NAME) sh
