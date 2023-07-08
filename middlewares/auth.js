const jwt = require('jsonwebtoken');
const InvalidError = require('../errors/InvalidError');

const { JWT_SECRET } = require('../config');

const autotorization = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    const playload = jwt.verify(token, JWT_SECRET);
    req.user = playload;
    next();
  } catch (err) {
    next(new InvalidError('Invalid token'));
  }
};

module.exports = {
  autotorization,
};
