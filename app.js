// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());


// ROUTES
app.get("/", (req, res) => {
  res.send("Our Favorite Movies Application");
});

// MOVIES ROUTES
const moviesController = require("./controllers/movieController.js");
app.use("/movies", moviesController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
