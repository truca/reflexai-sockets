const mongoose = require("mongoose");

async function initializeDB() {
  await mongoose.connect(process.env.MONGODB_URI);
}

module.exports = { initializeDB };
