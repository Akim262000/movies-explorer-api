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

router.get("/", getCurrentUserMovies);

router.post("/", createMovieValidation, createMovie);

router.delete("/:movieId", movieValidation, deleteMovie);

module.exports = router;
