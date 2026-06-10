//service  implementation for users
import { UserModel } from "../model/users";
import express from "express";
import bcrypt from "bcrypt";
import debug from "debug";
import jwt from "jsonwebtoken";
import { jwtExpire, jwtSecret } from "../config/config";
import { validateUser } from "../helper/validateUser";
const log: any = debug("app:userservice");

// service method for creating user
export async function createUser() {
  // create 4 users
  // create admin
  await UserModel.create({
    name: "Admin",
    email: "admin@gmail.com",
    password: await bcrypt.hash("admin", 10),
    role: "Admin",
  });
  // create report
  await UserModel.create({
    name: "Reporter",
    email: "repoerter@gmail.com",
    password: await bcrypt.hash("reporter", 10),
    role: "Reporter",
  });

  // create Operator
  await UserModel.create({
    name: "Operator",
    email: "operator@gmail.com",
    password: await bcrypt.hash("operator", 10),
    role: "Operator",
  });
}

export async function userLogin(
  req: express.Request,
  res: express.Response,
): Promise<any> {
  try {
    // get request body from the incoming data
    const { password, email } = req.body;
    log(`Incoming user data for login account are ${JSON.stringify(req.body)}`);
    // find the user if exist
    const user: any = await UserModel.findOne({
      email: email,
    });
    // checkinig if email existing
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username",
      });
    }
    // compare also password
    const isMatch: boolean = Boolean(
      await bcrypt.compare(password, user.password),
    );
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credetial",
      });
    }

    const tokenPayload: { _id: string; email: string } = {
      _id: user._id,
      email: user.email,
    };
    // create token which is valid only for day

    const token: string = jwt.sign(tokenPayload, jwtSecret, {
      expiresIn: jwtExpire,
    });

    return res.status(200).json({
      success: true,
      message: "Login successfully Enjoy!",
      data: {
        token: token,
        role: user.role,
      },
    });
  } catch (err: any) {
    log(`There is error occurs during userLogin ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurs",
    });
  }
}

export async function getLogInUser(
  req: express.Request,
  res: express.Response,
): Promise<any> {
  try {
    // get user id from token header using helper function
    const id: string = await validateUser(req);
    // find user
    const loginUser = await UserModel.findOne({ _id: id }).select({
      password: 0,
      __v: 0,
    });
    return res.status(200).json({
      success: true,
      message: "User is successfully fetch",
      data: loginUser,
    });
  } catch (err: any) {
    log(`There is error occurs  during fetching login user ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error Please try again later",
    });
  }
}

// fetch all  when user is admin
export async function fetchAllUsers(
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
        message: "Your not authorized user to view other users details",
      });
    } else {
      // now fetching all payment
      const usersData: any = await UserModel.find()
        .sort({ createdAt: -1 })
        .select({ __v: 0, password: 0 });

      return res.status(200).json({
        success: true,
        message: "All users are fetched successfully",
        data: {
          data: usersData,
        },
      });
    }
  } catch (err: any) {
    log(`There is error occurs during fetching of all users  ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurs ",
    });
  }
}

// method  for user to reset password
export async function resetPassword(
  req: express.Request,
  res: express.Response,
): Promise<any> {
  try {
    // get incomming data from the request body
    const { newPassword, email } = req.body;
    log(`Incoming data are ${newPassword} and ${email} for password change`)
    if (!newPassword || !email) {
      return res.status(400).json({
        success: false,
        message: "New password  and email are  required",
      });
    }

    // find the user and  and update
    await UserModel.findOneAndUpdate(
      { email: email },
      {
        $set: { password: await bcrypt.hash(newPassword, 10) },
      },
      { returnDocument: "after" },
    );
    return res.status(200).json({
      success: true,
      message: "Password has been reset success please login again",
    });
  } catch (err: any) {
    log(`There is error occurs ${err.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error occurs Please try again later ",
    });
  }
}

//
