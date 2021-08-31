const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground.js");

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
app.use(express.urlencoded({ extended: true }));

// -----Routes----- //
app.get("/", (req, res) => {
	res.render("home.ejs");
});

// All Campgrounds
app.get("/campgrounds", async (req, res) => {
	const campgrounds = await Campground.find({});
	res.render("campgrounds/index.ejs", { campgrounds });
});

// Serve form to make new campground
app.get("/campgrounds/new", (req, res) => {
	res.render("campgrounds/new.ejs");
});
// Submit form to make new campground
app.post("/campgrounds", async (req, res) => {
	const campground = new Campground(req.body.campground);
	await campground.save();
	res.redirect(`/campgrounds/${campground._id}`);
});

// Campground Details
app.get("/campgrounds/:id", async (req, res) => {
	const campground = await Campground.findById(req.params.id);
	res.render("campgrounds/show.ejs", { campground });
});

// -----Port----- //
app.listen(3000, () => {
	console.log("Listening on Port 3000");
});
