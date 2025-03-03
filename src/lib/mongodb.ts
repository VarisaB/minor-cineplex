import mongoose from "mongoose";

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connect to mongodb");
  } catch (error) {
    console.log("Error connecting to mongodb");
    throw error;
  }
}

export default connectMongoDB;
