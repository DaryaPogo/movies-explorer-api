const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/BadRequestError');
const InvalidError = require('../errors/InvalidError');
const RequestError = require('../errors/RequestError');

const SUCSESS = 200;

const getUserInformation = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      res.status(SUCSESS).send(user);
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      res.status(SUCSESS).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data'));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password)
          .then((matched) => {
            if (matched) {
              const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
              res.cookie('jwt', token, { httpOnly: true })
                .send(user.toJSON());
            } else {
              next(new InvalidError('Invalid email'));
            }
          })
          .catch(next);
      } else {
        next(new InvalidError('User not found'));
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((newUser) => {
          res.status(SUCSESS).send(newUser.toJSON());
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new RequestError('email занят'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError('Incorrect data'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  return res.status(SUCSESS).send('Logged out');
};

module.exports = {
  getUserInformation,
  updateUser,
  login,
  createUser,
  logout,
};
