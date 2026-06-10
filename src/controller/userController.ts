import {
  getLogInUser,
  userLogin,
  fetchAllUsers,
  resetPassword,
} from "../service/userService";
import express from "express";
import { Protect } from "../middleware/protected";

// create a router
const router: express.Router = express.Router();
// router for  user login
router.post("/login/user", userLogin);
//router for get login user from the token no need of id
router.get("/get/user", Protect, getLogInUser);
// router for getting all student
router.get("/get/all/users", Protect, fetchAllUsers);
// router for reseting password
router.patch("/reset/password", resetPassword);
export { router };
