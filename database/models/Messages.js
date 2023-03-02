const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  createdAt: {
    type: Date,
    unique: true,
    required: true,
  },
});

const Messages = mongoose.models.Messages || model("Messages", messageSchema);
module.exports = { Messages };
