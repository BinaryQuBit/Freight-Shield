// Mongoose Import
import mongoose from "mongoose";

// Start of the Build
export default async function connectDB() {
  try {
    // Connecting to database by passing .env variable
    const conn = await mongoose.connect(process.env.MDB_URL);
    // Returning connection for Web Socket
    return { mongooseConn: conn, nativeClient: conn.connection.getClient() };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}
