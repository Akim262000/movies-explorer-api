const router = require("express").Router();

const {
  getCurrentUserMovies,
  createMovie,
  deleteMovie,
} = require("../controllers/movies");
const {
  movieValidation,
  createMovieValidation,
} = require("../middlewares/validations.js");

router.get("/", movieValidation, getCurrentUserMovies);

router.post("/", createMovieValidation, createMovie);

router.delete("/:movieId", deleteMovie);

module.exports = router;
