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

        if (userData.password != userData.cpassword) {
            console.log("yeah")
            throw {
                errors: {
                    password: "Passwords don't match"
                }
            }
            
        }
        const user = await createUser(userData);
    
        delete user.password;
        const token = jwt.default.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token);

        return res.redirect("/dashboard/home")

    } catch (e) {
        let errors = e.errors;
        let formError = errors[Object.keys(errors)[0]];
        console.log(formError);
        
        res.status(403);
        return res.render("register", { 
            title: "Register", 
            error: formError, 
            forminfo: {
                name: {
                    first: userData.firstname,
                    last: userData.lastname
                },
                email: userData.email
            }
        });
    }
}