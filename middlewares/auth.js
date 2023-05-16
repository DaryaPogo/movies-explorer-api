const jwt = require('jsonwebtoken');
const InvalidError = require('../errors/InvalidError');

const { NODE_ENV, JWT_SECRET } = process.env;

const autotorization = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const playload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = playload;
    next();
  } catch (err) {
    next(new InvalidError('Invalid token'));
  }
};

module.exports = {
  autotorization,
};
