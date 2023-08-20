const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const ErrorBadRequest = require("../errors/ErrorBadRequest");

const signIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
});

const signUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
    name: Joi.string().min(2).max(30),
  }),
});

/* -------Users------- */

const userValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

/* -------Movies------- */

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value) => {
      if(!validator.isURL(value, {require_protocol: true })) {
        throw new ErrorBadRequest("Неправильный формат URL адреса");
      }
      return value;
    }),
    trailer: Joi.string().required().custom((value) => {
      if(!validator.isURL(value, {require_protocol: true })) {
        throw new ErrorBadRequest("Неправильный формат URL адреса");
      }
      return value;
    }),
    thumbnail: Joi.string().required().custom((value) => {
      if(!validator.isURL(value, {require_protocol: true })) {
        throw new ErrorBadRequest("Неправильный формат URL адреса");
      }
      return value;
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  signUp,
  signIn,
  userValidation,
  updateUserValidation,
  createMovieValidation,
  movieValidation,
};
