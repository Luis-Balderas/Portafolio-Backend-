const express = require('express');

const ProyectService = require('../services/proyect');

const {
    proyectIdSchema,
    createProyectSchema,
    updateProyectSchema,
} = require('../utils/schemas/proyects');

const validationHandler = require('../utils/middleware/validationHandler');



function proyectsApi(app) {
  const router = express.Router();
  app.use('/api/proyects', router);

  const proyectsService = new ProyectService();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {
      const proyects = await proyectsService.getProyects({
        tags,
      });

      res.status(200).json({
        data: proyects,
        message: 'Proyect listed',
      });
    } catch (err) {
      next(err);
    }
  });


  router.get(
    '/:proyectId',
    validationHandler( { proyectId: proyectIdSchema,}, 'params'),
    async function (req, res, next) {
      const { proyectId } = req.params;
      try {
        const proyect = await proyectsService.getProyect({
            proyectId,
        });

        res.status(200).json({
          data: proyect,
          message: 'Proyect retrieve',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createProyectSchema),
    async function (req, res, next) {
      const { body: proyect } = req;
      try {
        const createdProyectId = await proyectsService.createProyect({
            proyect,
        });

        res.status(200).json({
          data: createdProyectId,
          message: 'Proyect created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:proyectId',
    validationHandler( {proyectId: proyectIdSchema,},'params'),
    validationHandler( updateProyectSchema ),
    async function (req, res, next) {
      const { body: proyect } = req;
      const { proyectId } = req.params;
      try {
        const updatedProyectId = await proyectsService.updateProyect({
            proyectId,
            proyect,
        });

        res.status(200).json({
          data: updatedProyectId,
          message: 'Proyect updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:proyectId',
    validationHandler({proyectId: proyectIdSchema,}, 'params'),
    async function (req, res, next) {
      const { proyectId } = req.params;
      try {
        const deletedProyectId = await proyectsService.deleteProyect({
            proyectId,
        });

        res.status(200).json({
          data: deletedProyectId,
          message: 'Proyect deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = proyectsApi;