// index.js

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { cookieJwtAuth } = require("./middleware/auth");

const app = express();
const port = process.env.PORT || "8000";

app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


app.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

app.get("/dashboard/home", cookieJwtAuth, (req, res) => {
    let date = new Date();

    res.render("dashboard", {
        title: "Home", 
        weekday: daysOfWeek[date.getDay()], 
        day: date.getDate(), 
        month: months[date.getMonth()]
    });
});

app.get("/dashboard/tasks", (req, res) => {
    res.render("tasks", { title: "Tasks" });
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});