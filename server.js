// index.js
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from "path";
import cookieParser from "cookie-parser";
import * as jwt from "jsonwebtoken";

import { verifyUserSession } from "./scripts/auth.js";
import { createUser } from "./scripts/register.js";

import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || "8000";

app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const JWT_SECRET = process.env.JWT_SECRET || 'development';

app.get("/register", (req, res) => {
    res.render("register", { title: "Register"});
});

app.post("/register", async (req, res) => {
    const { firstname, lastname, email, username, password } = req.body;
    createUser({
        name: {
            first: firstname,
            last: lastname,
        },
        email: email,
        username: username,
        password: password

    }, res, req);    
});

app.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await validateUser(username);

    if (password != user.password) {
        return res.status(403).json({
            error: "invalid login",
        });
    }

    delete user.password;
    
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token);

    return res.redirect("/dashboard/home")

});

app.get("/dashboard/home", verifyUserSession, (req, res) => {
    let date = new Date();

    res.render("dashboard", {
        title: "Home", 
        weekday: WEEKDAYS[date.getDay()], 
        day: date.getDate(), 
        month: MONTHS[date.getMonth()],
        user: req.user
    });
});

app.get("/dashboard/tasks", (req, res) => {
    res.render("tasks", { title: "Tasks" });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});