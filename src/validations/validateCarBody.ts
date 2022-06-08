import Joi from 'joi';

import { TBodyValidate } from '../types';

const carSchema = Joi.object({
  _id: Joi.string().hex().length(24).messages({
    'string.base': 'Car ID must be a string',
    'string.hex': 'Car ID must be a hexadecimal string',
    'string.length': 'Car ID must be 24 characters long',
  }),
  model: Joi.string().trim().min(3).required()
    .messages({
      'string.base': 'Model must be a string',
      'string.empty': 'Model is required',
      'string.min': 'Model must be at least 3 characters long',
      'any.required': 'Model is required',
    }),
  year: Joi.number().integer().min(1900).max(2022)
    .required()
    .messages({
      'number.base': 'Year must be a number',
      'number.integer': 'Year must be an integer',
      'number.min': 'Year must be at least 1900',
      'number.max': 'Year must be at most 2022',
      'any.required': 'Year is required',
    }),
  color: Joi.string().trim().min(3).required()
    .messages({
      'string.base': 'Color must be a string',
      'string.empty': 'Color is required',
      'string.min': 'Color must be at least 3 characters long',
      'any.required': 'Color is required',
    }),
  status: Joi.boolean().messages({
    'boolean.base': 'Status must be a boolean',
  }),
  buyValue: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'Buy value must be a number',
      'number.integer': 'Buy value must be an integer',
      'number.positive': 'Buy value must be a positive number',
      'any.required': 'Buy value is required',
    }),
  doorsQty: Joi.number().integer().min(2).max(4)
    .required()
    .messages({
      'number.base': 'Doors quantity must be a number',
      'number.integer': 'Doors quantity must be an integer',
      'number.min': 'Doors quantity must be at least 2',
      'number.max': 'Doors quantity must be at most 4',
      'any.required': 'Doors quantity is required',
    }),
  seatsQty: Joi.number().integer().min(2).max(7)
    .required()
    .messages({
      'number.base': 'Seats quantity must be a number',
      'number.integer': 'Seats quantity must be an integer',
      'number.min': 'Seats quantity must be at least 2',
      'number.max': 'Seats quantity must be at most 7',
      'any.required': 'Seats quantity is required',
    }),
}).messages({
  'object.unknown': 'Property {{#label}} is not allowed',
});

/* class CarValidate {
  private _errorCatcher = ErrorCatcher;

  private _httpStatusCode = StatusCode;

  handle(
    obj: Car,
  ) {
    const { error } = carSchema.validate(obj);

    if (error) {
      return new this._errorCatcher(
        this._httpStatusCode.BadRequest,
        error.message,
      );
    }
  }
}

export default CarValidate; */

const carValidate: TBodyValidate = (body) => {
  const { error, value } = carSchema.validate(body);

  return { error, value };
};

export default carValidate;