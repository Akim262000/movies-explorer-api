const router = require("express").Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');
const { userValidation, updateUserValidation } = require("../middlewares/validations,js");

router.get('/me', userValidation, getUser);


router.patch('/me', updateUserValidation, updateUser);

module.exports = router;

