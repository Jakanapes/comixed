# Running ComiXed from Docker

## Creating and running Docker image from the Dockerfile

```docker build --squash -t comixed .```

```docker run -it -p 7171:7171/tcp -v /PATH/TO/COMICS:/comic_dir -v comixed_db:/root/.comixed comixed```

## Running Docker from docker-compose

Copy docker-compose.yml.EXAMPLE to docker-compose.yml
Replace ```{/PATH/TO/COMICS}``` with the absolute path to your comics directory.  Surround with quotes if there are spaces.

```docker-compose up -d``` to run the docker image detached.
