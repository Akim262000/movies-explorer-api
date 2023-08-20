const User = require("../models/user");

//Получение данных о конкретном пользователе
function getUser(req, res) {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res
          .status(ERROR_NOT_FOUND)
          .send({ message: "Пользователь не найден" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => errorsHandler(err, res));
}

//Создание пользователя
function createUser(req, res) {
  const { email, password, name } = req.body;
  User.create({ email, password, name })
    .then((user) => res.status(200).send(user))
    .catch((err) => errorsHandler(err, res));
}

//Обновление данных пользователя
function updateUser(req, res) {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => errorsHandler(err, res));
}

module.exports = {
  getUser,
  createUser,
  updateUser,
};