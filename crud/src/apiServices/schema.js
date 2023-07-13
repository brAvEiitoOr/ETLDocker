import mongoose from "mongoose";

const tradeSchema = mongoose.Schema({
  id: Number,
  exp_imp: Number,
  Year: Number,
  month: Number,
  Country: Number,
  Unit1: String,
  Unit2: String,
  Q1: Number,
  Q2: Number,
  Value: Number,
  hs2: String,
  hs4: String,
  hs6: String,
  hs9: String,
  Custom: Number,
});

const cleanTradeSchema = mongoose.Schema({
  id: Number,
  date:Date,
  country:String,
  type:String,
  part:String,
  weight:Number,
  value:Number,
});


export {
  tradeSchema,
  cleanTradeSchema
};