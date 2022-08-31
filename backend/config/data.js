const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`mongo connection ${conn.connection.host}`.cyan);
  } catch (Err) {
    throw new Err("could not connect");
    process.exit(1);
  }
};

module.exports = connectDB;
