import mongoose from "mongoose";
import { db_url } from "../config/config";
import debug from "debug";

const log: any = debug("app:database");

//method for establish database connection
export async function connection(): Promise<any> {
  try {
    const dbConnection: any = await mongoose.connect(db_url, {
      dbName: "logs",
    });

    log(`Database connected with this db name :${mongoose.connection.name}`);
  } catch (err: any) {
    log(`There is error occurs ${err.message}`);
  }
}
