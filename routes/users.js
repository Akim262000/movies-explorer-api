const router = require("express").Router();

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');
const { userValidation, updateUserValidation } = require("../middlewares/validations.js");

router.get('/users/me', userValidation, getCurrentUser);


router.patch('/users/me', updateUserValidation, updateUser);

module.exports = router;

