const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const SUCSESS = 200;

const getMovies = (req, res, next) => {
  Movie.findOne({ owner: req.user._id })
    .then((movies) => {
      res.status(SUCSESS).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((newMovie) => newMovie.populate('owner'))
    .then((newMovie) => {
      res.status(SUCSESS).send(newMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректно введены данные'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .orFail(() => new NotFoundError('Нет карточки с таким id'))
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.findByIdAndDelete(movie)
          .then(() => res.status(SUCSESS).send(movie))
          .catch(next);
      } else {
        next(new ForbiddenError('Недостаточно прав'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Incorrect data'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
