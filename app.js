const express = require("express");
const mongoose = require("mongoose");
const auth = require('./middlewares/auth')
const { errors } = require('celebrate');
const { createUser, login } = require("./controllers/users");
const ErrorNotFound = require("./errors/ErrorNotFound");
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { signUp, signIn } = require("./middlewares/validations.js");
const cors = require("./middlewares/cors");

const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/bitfilmsdb", {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// подключаем логгер запросов
app.use(requestLogger);

app.post('/signup', signUp, createUser);
app.post('/signin', signIn, login);


app.use(auth);

// роуты, которым нужна авторизация
app.use('/', require('./routes/users'));
app.use('/', require('./routes/movies'));

// запрос к несуществующему роуту
app.use('*', (req, res, next) => {
  next(new ErrorNotFound('Страница не найдена'));
});

app.use(cors);

// подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
