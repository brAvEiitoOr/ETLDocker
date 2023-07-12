#!/bin/bash

DELAY=25

mongosh <<EOF
var config = {
    "_id": "mdbreplica",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongoreplica1:27017",
            "priority": 2
        },
        {
            "_id": 2,
            "host": "mongoreplica2:27017",
            "priority": 1
        },
        {
            "_id": 3,
            "host": "mongoreplica3:27017",
            "priority": 1
        }
    ]
};
rs.initiate(config, { force: true });
EOF

echo "****** Esperando ${DELAY} segundos a que se apliquen la configuración del conjunto de réplicas ******"

sleep $DELAY
