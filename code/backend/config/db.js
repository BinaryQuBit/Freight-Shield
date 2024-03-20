// Mongoose Import
import mongoose from "mongoose";

// Start of the Build
export default async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MDB_URL);
    console.log("Database Connected");
    return { mongooseConn: conn, nativeClient: conn.connection.getClient() };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
