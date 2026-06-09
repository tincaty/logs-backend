// model for Incidents
import mongoose, { Document } from "mongoose";

interface Incidents extends Document {
  userId: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  severity: string;
  status: string;
}

// create schema
const IncidentsSchema = new mongoose.Schema<Incidents>(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    title: { type: String, required: false },
    description: { type: String, required: false },
    severity: {
      type: String,
      required: false,
      enum: ["low", "medium", "high", "critical"],
    },
    status: {
      type: String,
      required: false,
      enum: ["open", "investigating", "resolved", "closed"],
    },
  },
  { timestamps: true },
);

//create model
const Incident = mongoose.model("Incident", IncidentsSchema, "incident");

export { Incident };
