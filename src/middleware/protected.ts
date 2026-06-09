// helper methode for validate user based on the incomming token
import express from "express";
import debug from "debug";
import { UserModel } from "../model/users";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/config";
import mongoose from "mongoose";
const log: any = debug("app:validateuser");

export async function Protect(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
): Promise<any> {
  try {
    let token: any;
    let tokenHeader: string | undefined = req.headers["authorization"];
    if (tokenHeader !== undefined && tokenHeader.startsWith("Bearer")) {
      token = tokenHeader.split(" ")[1];
    }

    //check first if token does not expires
    const decode: any = jwt.verify(token, jwtSecret);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }
    // check if the extracted id is a valid mongoose id
    if (!mongoose.isValidObjectId(decode._id)) {
      return "Invalid  id";
    }
    // verfies if user exist
    const loginUser: any = await UserModel.findById(decode._id);
    if (!loginUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user ",
      });
    }
    next();
  } catch (err: any) {
    log(`Error occurs during  token verifies ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurs ",
    });
  }
}
