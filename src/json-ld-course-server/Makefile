help:	## Show this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

build:	## Build the docker container
	docker build -t brinxmat/json-ld-course-server .

ifndef LOCAL_NETWORK
LOCAL_NETWORK="localhost:3211"
endif

run:	## Run the docker container, use environment variable LOCAL_NETWORK to supply alternate IP for server
	docker run -e LOCAL_NETWORK="${LOCAL_NETWORK}" --publish 3211:3211 --detach --name json-ld-course-server brinxmat/json-ld-course-server:latest