const router = require("express").Router();

const { getCurrentUser, updateUser } = require("../controllers/users");

const {
  userValidation,
  updateUserValidation,
} = require("../middlewares/validations.js");

//Получение информации о текущем пользователе
router.get("/users/me", getCurrentUser);

//Обновление данных пользователя
router.patch("/users/me", updateUserValidation, updateUser);

module.exports = router;
