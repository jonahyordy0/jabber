import { createUser, validateUser } from "./database.js";
import * as jwt from "jsonwebtoken";

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

export async function handleRegistration (req, res) {
    const userData = req.body;
    try {
        await createUser(userData);

        const user = await validateUser(userData.email);

        const token = jwt.default.sign(userData, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token);

        return res.redirect("/dashboard/home")

    } catch (e) {
        console.log(e);
        res.status(403);
        return res.render("register", { 
            title: "Register", 
            errors: e.errors, 
            forminfo: {
                email: userData.email
            }
        });
    }
}