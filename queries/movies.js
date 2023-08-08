const db = require("../db/dbConfig.js");

// ALL Movies
const getAllMovies = async () => {
  try {
    const allMovies = await db.any("SELECT * FROM movies");
    return allMovies;
  } catch (error) {
    console.error("Error fetching all movies:", error.message); // Log the error message for debugging
    throw new Error("Unable to fetch movies.");
  }
};

// ONE Movies
const getMovie = async (id) => {
  try {
    const oneMovie = await db.one("SELECT * FROM movies WHERE id=$1", id);
    return oneMovie;
  } catch (error) {
    return error;
  }
};

// CREATE
const createMovie = async (movie) => {
  try {
    const newMovie = await db.one(
      "INSERT INTO movies (title, director, genre, length, year, is_favorite) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        movie.title,
        movie.director,
        movie.genre,
        movie.length,
        movie.year,
        movie.is_favorite,
      ]
    );
    return newMovie;
  } catch (error) {
    return error;
  }
};

//Delete

const deleteMovie = async (id) => {
  try {
    const deletedMovie = await db.one(
      "DELETE FROM movies WHERE id = $1 RETURNING *",
      id
    );
    return deletedMovie;
  } catch (error) {
    return error;
  }
};

//UPDATE

const updateMovie = async (id, movie) => {
  try {
    const updatedMovie = await db.one(
      "UPDATE movies SET title=$1, director=$2, genre=$3, length=$4, year=$5, is_favorite=$6 where id=$7 RETURNING *",
      [
        movie.title,
        movie.director,
        movie.genre,
        movie.length,
        movie.year,
        movie.is_favorite,
        id,
      ]
    );
    return updatedMovie;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllMovies,
  getMovie,
  createMovie,
  deleteMovie,
  updateMovie,
};
