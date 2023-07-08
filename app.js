const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookiesParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { DB_ADRESS } = require('./config');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://diplom.dashapogo.nomoredomains.monster',
    'https://diplom.dashapogo.nomoredomains.monster', 'https://api.diplom.dashapogo.nomoredomains.monster'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(cookiesParser());

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

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
