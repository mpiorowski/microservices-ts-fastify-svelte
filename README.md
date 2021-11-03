# microservices-fastify-svelte

## Simple microservice app written in typescript using:

- fastify
- svelte
- graphql
- prisma + postgres
- docker

# Deploy

Run 3 command line, one after another:

```
# run docker backend microservices and databases
sh start-back.sh
```

```
# run databases migration
sh start-migrate.sh
```

```
# run frontend app
sh start-front.sh
```

Log in using default user:  
access: `localhost:3000`  
email: `user@gmail.com`  
password: `pass`
