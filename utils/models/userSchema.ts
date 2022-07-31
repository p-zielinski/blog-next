import mongoose from "mongoose";
import {UserRoles} from "../enums/userRoles";

const UserSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    email_confirmed:{
        type: Boolean,
        required: false,
        default: false
    },
    role: {
        type:String,
        required: false,
        default: UserRoles.USER
    }
})

export default UserSchema