rs.initiate({
  _id: "iabdshard3",
  version: 1,
  members: [
    { _id: 0, host: "mongo-shard3a:27017" },
    { _id: 1, host: "mongo-shard3b:27017" },
    { _id: 2, host: "mongo-shard3c:27017" },
  ],
});