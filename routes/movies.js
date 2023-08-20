const router = require("express").Router();

const {
  getCurrentUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { movieValidation, createMovieValidation } = require("../middlewares/validations.js");

router.get('/', movieValidation, getCurrentUserMovies)

router.post('/movies', createMovieValidation, createMovie);


router.delete('/movies', deleteMovie);

module.exports = router;

