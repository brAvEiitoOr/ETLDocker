import { cleanTradeSchema } from "@/apiServices/schema";
import { secondConn } from "@/apiServices/dbconnect";

export default async function handler(req, res) {
  const tradeModel = secondConn.model("Trade", cleanTradeSchema);
  if (req.method === "GET") {
    tradeModel.find().then((data) => res.status(200).json(data));
  }
}