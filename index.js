// index.js

/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
/**
 *  App Configuration
 */

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

/**
 * Routes Definitions
 */

app.get("/dashboard/home", (req, res) => {
    let date = new Date();

    res.render("dashboard", { title: "Home", weekday: daysOfWeek[date.getDay()], day: date.getDate(), month: months[date.getMonth()]});
});

app.get("/dashboard/tasks", (req, res) => {
    res.render("tasks", { title: "Tasks" });
});

/**
 * Server Activation
 */

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});