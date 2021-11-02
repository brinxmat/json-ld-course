# Quickstart for course attendees

(If you're a node.js expert/someone who really hates docker, feel free to skip to the [node.js](#node-js) section below)

1. Install [Docker](https://www.docker.com/community-edition)

2. Open terminal, run ```$ docker pull brinxmat/json-ld-course-server```
3. Run ```docker run --publish 3211:3211 -it --name json-ld-course-server brinxmat/json-ld-course-server:latest``` which runs the docker container as a foreground process — if you want to keep the container running, you'll need to open a new terminal to run other shell processes.
4. Open [<http://localhost:3211>](http://localhost:3211) in web browser (or [http://192.168.99.100:3211](http://192.168.99.100:3211) if you're using an older version of Docker)
6. When you've finished and want to tidy up, in a new terminal:

```
docker ps -a |  grep json-ld-course-server
```
Which returns something like this:

```
CONTAINER ID        IMAGE                   COMMAND             CREATED             STATUS              PORTS                    NAMES
96c33a0cd6f4        json-ld-course-server   "npm start"         6 seconds ago       Up 5 seconds        0.0.0.0:3211->3211/tcp   json-ld-course-server
```
You can stop the container with: ```$ docker stop <CONTAINER ID>```

The delete it with ```$ docker rm <CONTAINER ID>```

To remove the image we downloaded:

```
$ docker rmi brinxmat/json-ld-course-server
```

# Less quick start for people who enjoy struggling

Pre-requisites [Docker](https://www.docker.com/community-edition), Make ([Debian](https://www.google.no/search?q=sudo+apt-get+install+build-essential&oq=sudo+apt-get+install+build-essential) | [Mac](https://stackoverflow.com/questions/10265742/how-to-install-make-and-gcc-on-a-mac) | [Win](http://www.mingw.org/))

```
$ git clone --recurse-submodules https://github.com/brinxmat/json-ld-course.git
$ cd json-ld-course/src/json-ld-course-server
$ make build
$ make run
```

Open [<http://localhost:3211>](http://localhost:3211) in web browser (or [http://192.168.99.100:3211](http://192.168.99.100:3211) if you're using an older version of Docker)

## Slow start for the pedants who want to know everything

Pre-requisites [Docker](https://www.docker.com/community-edition), Make ([Debian](https://www.google.no/search?q=sudo+apt-get+install+build-essential&oq=sudo+apt-get+install+build-essential) | [Mac](https://stackoverflow.com/questions/10265742/how-to-install-make-and-gcc-on-a-mac) | [Win](http://www.mingw.org/))

What we're doing here is creating a docker container and then running it. Why are we creating a docker container when we could just as easily run node locally? Be my guest — see the section on [node.js](#node-js) below; I'm not interested in helping people set up node.js or npm, and the docker set-up masks away all that stuff quite nicely.

We build the docker image by running the following command in the json-ld-course-server directory 

```$ docker build -t json-ld-course-server .```

This builds the image, which can then be run using the following command:

```$ docker run --publish 3211:3211 -it --name json-ld-course-server brinxmat/json-ld-course-server:latest```

Here we're specifying that we run the container, while exposing the server that we're built in the previous step on port 3211 on the host (it incidentally uses port 3211 internally).

We state with ```-it``` that we want to output STDOUT to a pseudo-tty.

Finally we give the container a recognisable name, so that when we run ```$ docker ps```, we get a nice display name to relate to, rather than a hash.

## node js

If you want to run the node application directly and have installed node and npm installed, you can try:

```
$ git clone --recurse-submodules https://github.com/brinxmat/json-ld-course.git
$ cd json-ld-course/src/json-ld-course-server
$ npm i
$ npm start
```
