const { celebrate, Joi, Segments } = require('celebrate');

const validateLoggedin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Field is required',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Field is required',
    }),
  }),
});

const validateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Field is required',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Field is required',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Length must be greate than 2',
        'string.max': 'Length must be less than 30',
        'any.required': 'Field is required',
      }),
  }),
});

const validationUpdateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Length must be greate than 2',
      'string.max': 'Length must be less than 30',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Field is required',
    }),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'any.required': 'Field is required',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Field is required',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Field is required',
        'number.base': 'must be a number',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Field is required',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Field is required',
      }),
    image: Joi.string().uri().required().messages({
      'any.required': 'Field is required',
    }),
    trailerLink: Joi.string().uri().required().messages({
      'any.required': 'Field is required',
    }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Field is required',
      }),
    nameEN: Joi.string().required()
      .messages({
        'any.required': 'Field is required',
      }),
    thumbnail: Joi.string().uri().required().messages({
      'any.required': 'Field is required',
    }),
    movieId: Joi.number().required().messages({
      'any.required': 'Field is required',
    }),
  }),
});

const validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  validateLoggedin,
  validateUser,
  validationUpdateUser,
  validationCreateMovie,
  validationDeleteMovie,
};
