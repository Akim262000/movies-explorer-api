const router = require('express').Router();
const userRouret = require('./users');
const movieRouter = require('./movies');
const { createUser, login } = require("../controllers/users");
const auth = require('../middlewares/auth')
const ErrorNotFound = require("../errors/ErrorNotFound");
const { signUp, signIn } = require("../middlewares/validations");

router.post('/signup', signUp, createUser);
router.post('/signin', signIn, login);


router.use(auth);

// роуты, которым нужна авторизация
router.use('/users', userRouret);
router.use('/movies', movieRouter);

// запрос к несуществующему роуту
router.use('*', (req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
});

module.exports = router;