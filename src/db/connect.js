import mongoose from "mongoose";
import config from "../config/config.js";

async function connect() {
  try {
    const { dbConfig } = config;
    await mongoose.connect(dbConfig.uri);
    console.log("DB is connected");
  } catch (err) {
    throw new Error(err);
  }
}

export default connect;
