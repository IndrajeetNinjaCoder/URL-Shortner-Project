import mongoose from "mongoose";


const urlSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  shortID: {
    type: String,
    required: true,
    unique: true
  },
  redirectURL: {
    type: String,
    required: true
  },
  alias: {
    type: String,
    unique: true,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expirationDate: {
    type: Date,
    default: () => new Date(Date.now() + 60 * 60 * 1000) // 1 hour later
  }
});


const url = mongoose.model("Url", urlSchema)

export default url;