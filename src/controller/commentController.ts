// controller for comment
import express from "express";
import {
  addComment,
  fetchAllComments,
  fetchByIdComment,
} from "../service/commentService";
import { Protect } from "../middleware/protected";

// create express object
const router: express.Router = express.Router();

// router  for add comment
router.post("/add/:id", Protect, addComment);
// router for get comment by id
router.get("/get/comment/:id", Protect, fetchByIdComment);
//router for fetching comments
router.get("/get/comments", Protect, fetchAllComments);

export { router };
