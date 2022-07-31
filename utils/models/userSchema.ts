import mongoose from "mongoose";
import { UserRoles } from "../enums/userRoles";

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  email_confirmed: {
    type: Boolean,
    required: false,
    default: false,
  },
  role: {
    type: String,
    enum: Object.values(UserRoles),
    required: false,
    default: UserRoles.USER,
  },
  created_at: { type: Date, default: Date.now },
});

export default UserSchema;
