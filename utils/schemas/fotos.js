const joi = require('@hapi/joi');

const fotoIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const fotoNameSchema = joi.string().max(80);
const fotoImagesSchema = joi.array().items(joi.string());
const fotoDescriptionSchema = joi.string().max(750);


const createFotoSchema = {
  name: fotoNameSchema.required(),
  images: fotoImagesSchema.required(),
  description: fotoDescriptionSchema.required()
};

const updateFotoSchema = {
  name: fotoNameSchema,
  images: fotoImagesSchema,
  description: fotoDescriptionSchema
};

module.exports = {
  fotoIdSchema,
  createFotoSchema,
  updateFotoSchema,
};