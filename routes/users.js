const router = require("express").Router();

const { getCurrentUser, updateUser } = require("../controllers/users");

const {
  userValidation,
  updateUserValidation,
} = require("../middlewares/validations.js");

//Получение информации о текущем пользователе
router.get("/me", getCurrentUser);

//Обновление данных пользователя
router.patch("/me", updateUserValidation, updateUser);

module.exports = router;
