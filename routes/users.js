const router = require('express').Router();
const { validationUpdateUser } = require('../middlewares/validation');

const {
  getUserInformation,
  updateUser,
} = require('../controllers/users');

router.get('/me', getUserInformation);

router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;
