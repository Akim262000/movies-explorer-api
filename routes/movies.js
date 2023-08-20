const router = require("express").Router();

const {
  getUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getUserMovies)

router.post('/movies', createMovie);


router.delete('/movies', deleteMovie);

module.exports = router;

