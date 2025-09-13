# Project

## Requirements

1. Docker (If you do not have docker you must to install it)

## Commands

### Docker commands

**Execute docker compose services**
```
docker-compose up
```

**List the running containers**
```
docker ps -a
```

**Execute a terminal into the container**
```sh
docker exec -it <container-id> /bin/bash 

# or

docker exec -it <container-id> /bin/sh 
```



### Run mongodb with docker-compose

1. Open terminal in the path where you `docker-compose.yml` file is located
    1. Verify that docker application or daemon is running
2. Run the command `docker-compose up`
3. In the container terminal execute the command `mongosh mongodb://user:pass@127.0.0.1`


## Activity

1. Create a db called `library`
2. Create 2 collections:
    1. Authors
    2. Books
3. Insert data
4. Get all books
5. Get all books related to Pepe
6. Get pepe author data
7. Update the author name from pepe to manuel
8. Delete the book called `El muro de los mil lamentos`


## Homework

1. How to connect mongodb with NestJS API
2. JWT and OAuth/OAuth2.0 and implement in the NestJS API
3. Create endpoints:
    1. Endpoint to register a user and assign a role. Only the ADMIN can make this action
    2. Endpoint to change the role for specific user. Only the ADMIN can make this action