import mongoose, { Schema } from "mongoose";

const userModel = new Schema({
  name: { type: String },
  password: { type: String },
  gender: { type: String },
  bday: { type: String },
  exp: { type: Number },
  point: { type: Number },
  pet: { type: Array },
  timestamp: { type: Date }
});

export default mongoose.model("User", userModel);
