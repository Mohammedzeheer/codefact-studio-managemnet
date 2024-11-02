
const Joi = require('joi');
const ApiError = require('./ApiError');

const studioSchema = Joi.object({
  name: Joi.string().required().trim().min(3).max(100)
    .messages({
      'string.empty': 'Studio name is required',
      'string.min': 'Studio name must be at least 3 characters',
      'string.max': 'Studio name cannot exceed 100 characters'
    }),
  
  location: Joi.string().required().trim()
    .messages({
      'string.empty': 'Location is required'
    }),
  
  description: Joi.string().required().trim().min(20)
    .messages({
      'string.empty': 'Description is required',
      'string.min': 'Description must be at least 20 characters'
    }),
  
  pricePerHour: Joi.number().required().min(0)
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative',
      'number.empty': 'Price is required'
    }),
  
  amenities: Joi.array().items(Joi.string().trim()),
  
  contactEmail: Joi.string().email().required().trim()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required'
    }),
  
  contactPhone: Joi.string().required().trim().pattern(/^\d{10}$/)
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits',
      'string.empty': 'Phone number is required'
    })
});

// Validation function
const validateStudio = (data) => {
  const { error, value } = studioSchema.validate(data, { 
    abortEarly: false,
    stripUnknown: true 
  });
  
  if (error) {
    const errors = {};
    error.details.forEach((err) => {
      errors[err.path[0]] = err.message;
    });
    throw new ApiError(400, 'Validation failed', errors);
  }
  return value;
};

module.exports = {
  validateStudio
};