// model for logs
import mongoose, { Document } from "mongoose";

// defines data structure
interface Logs extends Document {
  userId: mongoose.Types.ObjectId;
  incidentId: mongoose.Types.ObjectId;
  action: string;
  description: string;
}

// create schema
const logSchema = new mongoose.Schema<Logs>(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    incidentId: { type: mongoose.Types.ObjectId, ref: "Incident" },
    action: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

// create a model
export const Log = mongoose.model("Log", logSchema, "log");
