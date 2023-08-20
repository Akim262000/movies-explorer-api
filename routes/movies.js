const router = require("express").Router();

const {
  getUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const { movieValidation, createMovieValidation } = require("../middlewares/validations,js");

router.get('/', movieValidation, getUserMovies)

router.post('/movies', createMovieValidation, createMovie);


router.delete('/movies', deleteMovie);

module.exports = router;

