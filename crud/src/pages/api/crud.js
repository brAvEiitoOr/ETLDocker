import { tradeSchema } from "@/apiServices/schema";
import { mainConn } from "@/apiServices/dbconnect";

export default async function handler(req, res) {
  const tradeModel = mainConn.model("Trade", tradeSchema);
  if (req.method === "GET") {
    tradeModel.find().then((data) => res.status(200).json(data));
  }

  if (req.method === "POST") {
    const trade = new tradeModel(req.body);
    trade.save().then((data) => res.status(200).json({ message: "ok" }));
  }

  if (req.method === "PUT") {
    tradeModel.updateOne(req.body.id,req.body.data)
      .then((data) => res.status(200).json({ message: "ok" }));
  }

  if (req.method === "DELETE") {
    tradeModel.deleteOne(req.body.id,req.body.data)
      .then((data) => res.status(200).json({ message: "ok" }));
  }
}
