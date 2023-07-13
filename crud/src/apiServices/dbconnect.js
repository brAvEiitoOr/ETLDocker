import mongoose from "mongoose";

const mainConn = mongoose.createConnection(process.env.MONGO_URI_MAIN)
const secondConn = mongoose.createConnection(process.env.MONGO_URI_SEC)

export {
  mainConn,
  secondConn
};
