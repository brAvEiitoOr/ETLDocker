# ETL in Docker
Dockered ETL Pipeline with Python, MongoDB and PostgresSQL

## MongoDB Main sharded replicaset
Replicaset where the raw data from the CRUD will be stored

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
db.createCollection("Trades")
sh.enableSharding("Proyecto")
sh.shardCollection("Proyecto.Trades", {"_id": "hashed"})
```
Main database will be avaiable on port `27117`
Secondary database will be available on port `27217`
CRUD will be available on port `3000`


### Configure the secondary MongoDB replicaset
```sh
docker exec mongoreplica1 sh /scripts/rs-init.sh
```
