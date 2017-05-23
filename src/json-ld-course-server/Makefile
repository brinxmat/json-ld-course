help:	## Show this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build:	## Build the docker container
	docker build -t json-ld-course-server .

run:	## Run the docker container
	docker run -p 3211:3211 -it --rm --name json-ld-course-server json-ld-course-server
