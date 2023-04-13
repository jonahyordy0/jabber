import { validateUser } from "./database.js";
import * as jwt from "jsonwebtoken";


export async function handleLogin(req, res) {
    const { email, password } = req.body;

    const user = await validateUser(email);

    if (!user) {
        res.status(401);
        return res.render("login", { 
            title: "Login", 
            error: "Incorrect username or password", 
            forminfo: {
                email: email
            }
        });
    }

    if (password != user.password) {
        res.status(401);
        return res.render("login", { 
            title: "Login", 
            error: "Incorrect username or password", 
            forminfo: {
                email: email
            }
        });
    }

    delete user.password;
    const token = jwt.default.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token);

    return res.redirect("/dashboard/home")
}