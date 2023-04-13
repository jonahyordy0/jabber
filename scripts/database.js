import mongoose from "mongoose";
import User from "../models/User.js";

export async function validateUser(value) {
    await mongoose.connect(process.env.DB_URI);

    const query = await User.findOne({ email: value });

    if (!query) {
        return null
    }
    
    return { email: value, password: query.password }
}

export async function createUser(userData) {
    await mongoose.connect(process.env.DB_URI);

    const thisDate = new Date();

    const user = new User({
        name: {
            first: userData.firstname,
            last: userData.lastname,
        },
        password: userData.password,
        email: userData.email,
        createdAt: thisDate
    });
    
    await user.save();

    return user
}