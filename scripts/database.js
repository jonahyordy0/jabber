import mongoose from "mongoose";
import User from "../models/User.js";
import Project from "../models/Project.js"

export async function validateUser(value) {
    await mongoose.connect(process.env.DB_URI);

    const query = await User.findOne({ email: value });

    if (!query) {
        return null
    }
    
    return query
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

export async function createProject(projectData) {
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

export async function getUserProjects(userId) {
    await mongoose.connect(process.env.DB_URI);

    const query = await Project.find({ email: { $all: [userId] }});
    
    if (query.length < 1) {
        return []
    }
    return query
}