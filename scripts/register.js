import mongoose from "mongoose";
import User from "../models/User.js";

function hash(username) {
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
        hash += username.charCodeAt(i);
    }
    return hash * 100
}

function makeId(username, firstname, lastname) {
    const epoch = Date.now();
    const uhash = hash(username);
    const fhash = hash(firstname);
    const lhash = hash(lastname);
    
    return (epoch + uhash + fhash + lhash) * 100
}

export async function createUser(userData, res, req) {
    try {
        await mongoose.connect(process.env.DB_URI);

        const thisDate = new Date();

        const user = new User({
            password: userData.password,
            email: userData.email,
            createdAt: thisDate
        });
        
        await user.save();

        return res.redirect("/dashboard/home", 200)

    } catch (e) {
        res.status(403);
        return res.render("register", { 
            title: "Register", 
            errors: e.errors, 
            forminfo: {
                name: userData.name,
                username: userData.username,
                password: userData.password,
                email: userData.email
            }
        });
    }
}