const joi = require('@hapi/joi');

const proyectIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const proyectNameSchema = joi.string().max(80);
const proyectImagesSchema = joi.array().items(joi.string());
const proyectDescriptionSchema = joi.string().max(750);


const createProyectSchema = {
  name: proyectNameSchema.required(),
  images: proyectImagesSchema.required(),
  description: proyectDescriptionSchema.required(),
};

const updateProyectSchema = {
  name: proyectNameSchema,
  images: proyectImagesSchema,
  description: proyectDescriptionSchema
};

module.exports = {
  proyectIdSchema,
  createProyectSchema,
  updateProyectSchema,
};