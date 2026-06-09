// module for env details
import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";
import debug from "debug";
dotenv.config();
const log: any = debug("app:config");
const port: number = Number(process.env.PORT);
const jwtSecret = process.env.JWT_SECRET as string;
const jwtExpire = process.env.JWT_EXPIRE as SignOptions["expiresIn"];
const db_url = process.env.DB_URL as string;

export {
  port,
  jwtSecret,
  jwtExpire,
  db_url,

};
