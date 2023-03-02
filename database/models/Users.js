const mongoose = require("mongoose");

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
});

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);
module.exports = { Users };
