# postgraphile

This project uses [Vue.js](https://vuejs.org/) as a web frontend, [PostGraphile](https://www.graphile.org/postgraphile/) as a GraphQL server, and PostgreSQL as a database.

I used this project to learn more about GraphQL and attempt to setup a project structure that would allow rapid development by not having to make many changes in the server to support changes in the data schema.

Notes:
- Docker environment used for development and production
- Deployment is handled with docker-compose `--host` option to target a remote Docker host
- Production provisioning is handled with `./provision.sh` which simply sets sshd config and installs Docker
- Configuration for entire stack is located in `.env` and `.env.production`
- [db-migrate](https://www.npmjs.com/package/db-migrate) is used for database migrations
- `./run` is a [jBash](https://www.npmjs.com/package/jbash) script that handles all development tooling and production deployment commands

### server
- ./run script

## Development

```
./run && open http://localhost:8080
```

### GraphQL

GraphiQL:

```
open http://localhost:8081/graphiql
```

### Database

Create new migration:

```
./run db:migration migrationName
```

Migrate:

```
./run db:up
```

## Production

### Provision

1. Create Droplet in Digital Ocean (Ubuntu / Starter / \$5 plan)
1. Create `.env.production` file with config for production. See `.env.production.example` as a template.
1. Update the `HOST_NAME` variable to contain the Droplet IP address.
1. Finally, run the following to make some config changes and install Docker on the droplet:

```
 ./run provision --prod
```

### Deploy

```
./run deploy --prod
```
