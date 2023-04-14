// index.js
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from "path";
import cookieParser from "cookie-parser";

import { verifyUserSession } from "./scripts/jwt-auth.js";
import { handleRegistration } from "./scripts/register.js";
import { handleLogin } from './scripts/login.js';

import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || "8000";

app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");


const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const JWT_SECRET = process.env.JWT_SECRET;

app.get("/register", verifyUserSession, (req, res) => {
    res.render("register", { title: "Register", forminfo: {
        name: {
            first: '',
            last: ''
        },
        email: '',
        username: '',
        password: ''
    }});
});

app.post("/register", handleRegistration);

app.get("/login", verifyUserSession, (req, res) => {
    res.render("login", { title: "Login", forminfo: {
        email: ''
    }});
});

app.post('/login', handleLogin);

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