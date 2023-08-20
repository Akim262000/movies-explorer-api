const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const movieSchema = new Mongoose.Shema({
  country : {
    type: String,
    required: true,
  },
  director  : {
    type: String,
    required: true,
  },
  duration  : {
    type: Number,
    required: true,
  },
  year  : {
    type: String,
    required: true,
  },
  description  : {
    type: String,
    required: true,
  },
  image  : {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: "Неправильный формат ссылки",
    },
  },
  trailerLink  : {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: "Неправильный формат ссылки",
    },
  },
  thumbnail  : {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: "Неправильный формат ссылки",
    },
  },
  owner  : {
    type: Mongoose.Shema.Types.ObjectId,
    required: true,
  },
  movieId  : {
    type: Number,
    required: true,
  },
  nameRU  : {
    type: String,
    required: true,
  },
  nameEN  : {
    type: String,
    required: true,
  },
})