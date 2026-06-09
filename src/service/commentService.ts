// commont service implementation
import { Comment } from "../model/comments";
import { validateUser } from "../helper/validateUser";
import express from "express";
import debug from "debug";
import mongoose from "mongoose";
import { UserModel } from "../model/users";

const log: any = debug("app:commentservice");
// service method for opertor to    add comments
export async function addComment(
  req: express.Request,
  res: express.Response,
): Promise<any> {
  try {
    // get incidince id
    const { id } = req.params as { id: string };
    const { comment } = req.body;
    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "Comment required ",
      });
    }
    // valide if it is mongoose id
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid id ",
      });
    }
    // validate user
    const userId: string = await validateUser(req);
    //get the user
    const user: any = await UserModel.findById(userId);
    //check is user is null
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // cheking the role if is operator
    if (user.role === "Operator") {
      // create a comment on the incident
      await Comment.create({
        incidentId: id,
        userId: user._id,
        comment,
      });

      return res.status(201).json({
        success: true,
        message: "Comment created successfully ",
      });
    }

    return res.status(403).json({
      success: false,
      message: "Your not authorized user to create comment ",
    });
  } catch (err: any) {
    log(`There is error occurs during comment creation ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server  ",
    });
  }
}


//fetch all  when comments  is admin
export async function fetchAllComments(
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
    if (user.role !== "Admin" ) {
      return res.status(401).json({
        success: false,
        message: "Your not authorized user to view other comments details",
      });
    } else {
      // now fetching all comments 
      const commentData: any = await Comment.find()
        .sort({ createdAt: -1 })
        .select({ __v: 0});

      return res.status(200).json({
        success: true,
        message: "All comments are fetched successfully",
        data: {
          data: commentData,
        },
      });
    }
  } catch (err: any) {
    log(`There is error occurs during fetching of all comments  ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurs ",
    });
  }
}