import mongoose from "mongoose";
import User from "../models/User.js";

export async function validateUser(value) {
    await mongoose.connect(process.env.DB_URI);

    const query = await User.findOne({ email: value })
    return { email: value, password: query.password }
}