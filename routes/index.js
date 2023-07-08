const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const {
  login,
  createUser,
  logout,
} = require('../controllers/users');
const { autotorization } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { validateLoggedin, validateUser } = require('../middlewares/validation');

router.post('/signin', validateLoggedin, login);

router.post('/signup', validateUser, createUser);

router.use(autotorization);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.get('/signout', logout);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Page not found'));
});
module.exports = router;
