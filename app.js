const express = require("express");
const app = express();
const path = require("path");

// -----Mongoose Connect----- //

// -----EJS----- //
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -----Middleware----- //

// -----Routes----- //
app.get("/", (req, res) => {
	res.render("home.ejs");
});

// -----Port----- //
app.listen(3000, () => {
	console.log("Listening on Port 3000");
});
