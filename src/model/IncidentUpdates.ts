// model for Incident Updates
import mongoose, { Document } from "mongoose";

// defines the  data types
interface IncidentUpdates extends Document {
  incidentId: mongoose.Types.ObjectId;
  new_status: string;
  old_status: string;
  updated_by: mongoose.Types.ObjectId;
}

// create schema
const IncidentUpdatesSchema = new mongoose.Schema<IncidentUpdates>(
  {
    incidentId: { type: mongoose.Types.ObjectId, ref: "Incident" },
    new_status: {
      type: String,
      enum: ["open", "investigating", "resolved", "closed"],
      required: false,
    },
    old_status: {
      type: String,
      enum: ["open", "investigating", "resolved", "closed"],
      required: false,
    },
    updated_by: { type: mongoose.Types.ObjectId , ref:"User" },
  },
  { timestamps: true },
);

// create a model
const IncidentUpdate = mongoose.model(
  "IncidentUpdate",
  IncidentUpdatesSchema,
  "IncidentUpdate",
);

export { IncidentUpdate };
