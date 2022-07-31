//IMPORT MONGOOSE
import mongoose from "mongoose"
import UserSchema from "./models/userSchema";

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
    const conn = await mongoose
        .connect(DATABASE_URL as string).then(data => {
            console.log("Mongoose Connection Established")
            return data
        })
        .catch(err => console.log(err))
    

    //Models
    const User = mongoose.models.User || mongoose.model("User", UserSchema)

    return { conn, User }
}