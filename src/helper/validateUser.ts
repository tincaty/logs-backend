// helper methode for validate user based on the incomming token
import express from "express";
import debug from "debug";
import { UserModel } from "../model/users";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/config";
const log: any = debug("app:validateuser");
import mongoose from "mongoose";

export async function validateUser(req: express.Request): Promise<any> {
  try {
    let token: any;
    let tokenHeader: string | undefined = req.headers["authorization"];
    if (tokenHeader !== undefined && tokenHeader.startsWith("Bearer")) {
      token = tokenHeader.split(" ")[1];
    }

    //check first if token does not expires
    const decode: any = jwt.verify(token, jwtSecret);
    if (!decode) {
      throw new Error("Invalid token");
    }
    // check if the extracted id is a valid mongoose id
    if (!mongoose.isValidObjectId(decode._id)) {
      throw new Error("Invalid id ");
    }
    // verfies if user exist
    const isPresent: any = await UserModel.findOne({ _id: decode._id });
    if (!isPresent) {
      throw new Error("Invalid user ");
    }
    // return the id if the existing user
    return decode._id;
  } catch (err: any) {
    return `Error occurs during  token verifies ${err.message}`;
  }
}
