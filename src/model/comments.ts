// model for comment
import mongoose, { Document } from "mongoose";

// define the data
interface Comments extends Document {
  incidentId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  comment: string;
}

// create a schema
const commentSchema = new mongoose.Schema<Comments>(
  {
    incidentId: { type: mongoose.Types.ObjectId, ref: "Incident" },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

// create a model
export const Comment = mongoose.model("Comment", commentSchema, "comment");
