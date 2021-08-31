const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

const app = express();

// -----Mongoose Connect----- //
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("DB connected");
});

// -----EJS----- //
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// -----Middleware----- //

// -----Routes----- //
app.get("/", (req, res) => {
	res.render("home.ejs");
});

app.get("/makecampground", async (req, res) => {
	const camp = new Campground({
		title: "My Backyard",
		description: "cheap camping",
	});
	await camp.save();
	res.send(camp);
});

// -----Port----- //
app.listen(3000, () => {
	console.log("Listening on Port 3000");
});
