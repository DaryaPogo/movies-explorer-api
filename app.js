require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookiesParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const { DB_ADRESS, PORT } = process.env;

const app = express();

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookiesParser());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

mongoose
  .connect(DB_ADRESS)
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });

app.listen(PORT, () => {
  console.log(`Listen on ${PORT}`);
});
