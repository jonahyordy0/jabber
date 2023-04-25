import mongoose from "mongoose";
import User from "../models/User.js";
import Jab from "../models/Jab.js"

export async function getUser(value) {

    if (value.length != 12 || value.length != 24) return null

    const db = await mongoose.connect(process.env.DB_URI);

    try {
        const query = await User.findOne({ _id: value });

        if (!query) {
            return null
        }
        return query
    
    } catch (e) {
        console.log(e);
    } finally {
        db.disconnect();
    }
    
    
    
}

export async function validateUser(value) {
    const db = await mongoose.connect(process.env.DB_URI);

    const query = await User.findOne({ email: value });

    if (!query) {
        return null
    }
    
    db.disconnect();
    return query
}

export async function createUser(userData) {
    const db = await mongoose.connect(process.env.DB_URI);

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

    db.disconnect();
    return user
}

export async function getJabs(userData) {
    const db = await mongoose.connect(process.env.DB_URI);
    let newFollowing = userData.following;
    newFollowing.push(userData._id)

    const query = await Jab.find({ author: { $in : newFollowing } }).populate('author');

    console.log(query)
    db.disconnect();

    return query;
}

export async function createJab(jabData, authorD) {
    const db = await mongoose.connect(process.env.DB_URI);

    const thisDate = new Date();
    const jab = new Jab({
        content: jabData.jabcontent,
        author: authorD,
        createdAt: thisDate
    });
    
    await jab.save();

    db.disconnect();
    return jab;
}