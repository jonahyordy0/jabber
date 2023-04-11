import { validateUser } from "./database.js";
import * as jwt from "jsonwebtoken";


export async function handleLogin(req, res) {
    const { username, password } = req.body;

    const user = await validateUser(username);

    if (password != user.password) {
        return res.status(403).json({
            error: "invalid login",
        });
    }

    delete user.password;
    const token = jwt.default.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token);

    return res.redirect("/dashboard/home")
}