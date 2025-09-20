import mongoose from "mongoose";
import { serverConfig } from "./index.js";
export async function connectDB() {
  try {
    await mongoose.connect(serverConfig.MONGO_URI);
    console.log(`connected to database`);
  } catch (error) {
    console.error(`error connecting to database`);
    throw new Error(error);
  }
}
