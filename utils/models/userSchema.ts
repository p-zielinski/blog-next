import mongoose from "mongoose";
import { UserRoles } from "../enums/userRoles";

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password required"],
    unique: false,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
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
