# ETL in Docker
Dockered ETL Pipeline with Python, MongoDB and PostgresSQL

## MongoDB Main sharded replicaset
Replicaset where the raw data from the CRUD will be stored

### Start the main MongoDB sharded replicaset
`docker compose --file docker-compose-main-sharded-replica.yml up -d`

### Configure the servers
`docker exec configsvr1 sh -c "mongosh < /scripts/configserver-init.js"`
`docker exec mongo-shard1a sh -c "mongosh < /scripts/shard1-init.js"`
`docker exec mongo-shard2a sh -c "mongosh < /scripts/shard2-init.js"`
`docker exec mongo-shard3a sh -c "mongosh < /scripts/shard3-init.js"`
`docker exec router1 sh -c "mongosh < /scripts/router-init.js"`

### Configure the database to be shardered
`docker exec -it router1 mongosh`
`use Proyecto`
`db.createCollection("Imports")`
`sh.enableSharding("Proyecto")`
`sh.shardCollection("Proyecto.Imports", {"_id": "hashed"})`

## MongoDB secondary replicaset
Replicaset where the data procesed by the ETL is stored

### Start the secondary MongoDB replicaset
`docker compose --file docker-compose-mongodb.yml up -d`
`docker exec mongoreplica1 sh /scripts/rs-init.sh`

## PostgresSQL secondary replicaset
`docker compose --file docker-compose-postgres.yml up -d`

## ETL and CRUD 
`docker compose --file docker-compose-etl.yml up -d`