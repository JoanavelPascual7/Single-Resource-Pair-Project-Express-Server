const express = require("express");
const movies = express.Router();
const {
  getAllMovies,
  getMovie,
  createMovie,
  deleteMovie,
  updateMovie,
} = require("../queries/movies");
const { checkYear, checkBoolean, checkTitle } = require("../validations/checkMovies.js");

// INDEX
movies.get("/", async (req, res) => {
  try {
    console.log("Calling getAllMovies...");
    const allMovies = await getAllMovies();
    console.log("All Movies:", allMovies);
    if (allMovies.length > 0) {
      res.status(200).json(allMovies);
    } else {
      res.status(404).json({ error: "No movies found" });
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// SHOW
movies.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Calling getMovie with ID:", id);
    const movie = await getMovie(id);
    console.log("Movie:", movie);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// CREATE
movies.post("/", checkTitle, checkBoolean, async (req, res) => {
  try {
    console.log("Creating a new movie...");
    const newMovie = await createMovie(req.body);
    console.log("New Movie:", newMovie);
    res.json(newMovie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(400).json({ error: error });
  }
});

// DELETE
movies.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting movie with ID:", id);
    const deletedMovie = await deleteMovie(id);
    console.log("Deleted Movie:", deletedMovie);
    if (deletedMovie.id) {
      res.status(200).json(deletedMovie);
    } else {
      res.status(404).json("Movie not found");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE
movies.put("/:id", checkTitle, checkBoolean, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Updating movie with ID:", id);
    const updatedMovie = await updateMovie(id, req.body);
    console.log("Updated Movie:", updatedMovie);
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = movies;
