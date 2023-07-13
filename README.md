# ETL in Docker
Dockered ETL Pipeline with Python, MongoDB and PostgresSQL

## Starting

### Start the containers
```sh
docker compose up -d
```

### Configure the servers
```sh
docker exec configsvr1 sh -c "mongosh < /scripts/configserver-init.js"
docker exec mongo-shard1a sh -c "mongosh < /scripts/shard1-init.js"
docker exec mongo-shard2a sh -c "mongosh < /scripts/shard2-init.js"
docker exec mongo-shard3a sh -c "mongosh < /scripts/shard3-init.js"
docker exec router1 sh -c "mongosh < /scripts/router-init.js"
```

### Configure the database to be shardered
```sh
docker exec -it router1 mongosh
```
```js
use Proyecto
db.createCollection("trades")
sh.enableSharding("Proyecto")
sh.shardCollection("Proyecto.trades", {"_id": "hashed"})
exit
```
Load some data (Optional)
```sh
docker exec router1 mongoimport --type csv --headerline --db Proyecto --collection trades --file /scripts/testds.csv

```
Main database will be avaiable on port `27117`
Secondary database will be available on port `27217`
CRUD will be available on port `3000`


### Configure the secondary MongoDB replicaset
```sh
docker exec mongoreplica1 sh /scripts/rs-init.sh
```

## Testing

To test the ETL, reading from the main set to the secondary, run:
```sh
docker start etl-container 
```

Also, an API is provided, you can access to `localhost:3000/api/crud` or `localhost:3000/api/replica`