const joi = require('@hapi/joi');

const poemaIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const poemaNameSchema = joi.string().max(80);
const poemaContenidoSchema =  joi.string().max(750);

const createPoemaSchema = {
  name: poemaNameSchema.required(),
  contenido: poemaContenidoSchema.required(),
};

const updatePoemaSchema = {
  name: poemaNameSchema,
  contenido: poemaContenidoSchema,
};

module.exports = {
  poemaIdSchema,
  createPoemaSchema,
  updatePoemaSchema,
};