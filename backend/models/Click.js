import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
  urlId: mongoose.Schema.Types.ObjectId,
  timestamp: Date,
  ip: String,
  deviceType: String,
  browser: String,
});

const Click = mongoose.model("Click", clickSchema)

export default Click;
