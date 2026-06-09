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
const r2accessKey = process.env.R2_ACCESS_KEY as string;
const r2secreteKey = process.env.R2_SECRET_KEY as string;
const r2Endpoint = process.env.R2_ENDPOINT as string;
const r2viwanjaApi = process.env.S3_API_VIWANJA as string;
const webhookUrl = process.env.WEBHOOK_URL as string;
const snippeBaseUrl = process.env.BASE_URL as string;
const snippeApiKey = process.env.SNIPPE_API_KEY as string;
const webhookSecret = process.env.SNIPPE_WEBHOOK_SECRET as string;
export {
  port,
  jwtSecret,
  jwtExpire,
  db_url,
  r2accessKey,
  r2secreteKey,
  r2Endpoint,
  r2viwanjaApi,
  webhookUrl,
  snippeBaseUrl,
  snippeApiKey,
  webhookSecret,
};
