
all:


CONTAINER_NAME = means-api-container
IMAGE_NAME = local-means-api-dev

build-clean:
	rm -rf node_modules
	rm -rf dist

clean: build-clean

dist: clean
	rm -rf dist
	npm install -g --silent npm@latest
	npm install --silent tsoa typescript
	npx tsc
	npx tsoa swagger
	npx tsoa routes
	cp -rf config dist/
	cp package.json dist/
	cp tsoa.json dist/
	cp -rf src/presentation-layer dist/
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
