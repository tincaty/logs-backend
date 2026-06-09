// model reprenting users stucture
// model for users
import mongoose, { Schema, Document } from "mongoose";

// create the rules for the schema using interface

interface User extends Document {
  name: string;
  email: string;
  password: string;

  role: string;
}

// create a model
const userSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      required: true,
      enum: ["Reporter", "Operator", "Admin"],
    },
  },
  { timestamps: true },
);

// create a model
export const UserModel = mongoose.model("User", userSchema, "user");
