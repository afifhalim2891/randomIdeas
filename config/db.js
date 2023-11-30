const mongoose = require("mongoose");

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI);
  console.log(`Monggo DB Connected: ${connection.connection.host}`);
};

mongoose.set("strictQuery", true);

module.exports = connectDB;
