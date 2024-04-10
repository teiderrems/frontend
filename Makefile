compile:
	$(shell `docker build -t frontend:dev .;docker container rm frontend;docker run -it --name frontend --mount type=bind,source=./src,target=/app/src -p 3000:80 --network=host  frontend:dev`)