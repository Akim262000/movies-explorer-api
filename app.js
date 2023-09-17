const express = require("express");
const mongoose = require("mongoose");
const { errors } = require('celebrate');
const errorHandler = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require("./middlewares/cors");
const router = require("./routes/index");

const {PORT = process.env.PORT || 4000, DB_ADDRESS = process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/bitfilmsdb'} = process.env;

const app = express();

mongoose.connect(DB_ADDRESS, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);

// подключаем логгер запросов
app.use(requestLogger);

app.use(router)

// app.use(cors);

// подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
