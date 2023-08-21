const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const {ERROR_CREATE, ERROR_OK} = require('../utils/utils')

const ErrorConflict = require("../errors/ErrorConflict");
const ErrorBadRequest = require("../errors/ErrorBadRequest");
const ErrorNotFound = require("../errors/ErrorNotFound");

//Создание пользователя
function createUser(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ErrorBadRequest(`Неправильный логин или пароль`);
  }

    bcrypt.hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name: req.body.name,
      })
    )
    .then((user) =>
      res.status(ERROR_CREATE).send({
        name: user.name,
        _id: user._id,
        email: user.email,
      })
    )
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ErrorConflict("Пользователь с таким email уже существует"));
      }
      return next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user || !password) {
        return next(new ErrorBadRequest("Неверный email или пароль"));
      }
      const token = jwt.sign({ _id: user._id }, "some-secret-key", {
        expiresIn: "7d",
      });

      // вернём токен
      return res.send({ token });
    })
    .catch(next);
}

//Получение данных о текущем пользователе
function getCurrentUser(req, res, next) {
  const { _id } = req.user;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        return next(new ErrorNotFound("Пользователь не найден"));
      }

      return res.status(ERROR_OK).send(user);
    })
    .catch(next);
}

//Обновление данных пользователя
function updateUser(req, res, next) {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(ERROR_OK).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new ErrorBadRequest("Неверный тип данных"));
      }
      return next(err);
    });
}
module.exports = {
  createUser,
  login,
  getCurrentUser,
  updateUser,
};