const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection");
    return;
  }

  try {
    const connect = await mongoose.connect(process.env.mongodbUrl);
    isConnected = true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
