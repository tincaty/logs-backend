// commont service implementation
import { Log } from "../model/logs";
import { validateUser } from "../helper/validateUser";
import express from "express";
import debug from "debug";
import mongoose from "mongoose";
import { UserModel } from "../model/users";

const log: any = debug("app:logservice");
//fetch all  when comments  is admin
export async function fetchAllLogs(
  req: express.Request,
  res: express.Response,
): Promise<any> {
  try {
    // validate user
    const userId: string = await validateUser(req);
    // find the user first
    const user: any = await UserModel.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // checking the user is admin
    if (user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "Your not authorized user to view other logs details",
      });
    } else {
      // now fetching all comments
      const logData: any = await Log.find()
        .sort({ createdAt: -1 })
        .select({ __v: 0 });

      return res.status(200).json({
        success: true,
        message: "All logs are fetched successfully",
        data: {
          data: logData,
        },
      });
    }
  } catch (err: any) {
    log(`There is error occurs during fetching of all logs  ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurs ",
    });
  }
}
