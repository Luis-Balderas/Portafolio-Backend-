const express = require('express');

const FotosService = require('../services/foto');

const {
    fotoIdSchema,
    createFotoSchema,
    updateFotoSchema,
} = require('../utils/schemas/proyects');

const validationHandler = require('../utils/middleware/validationHandler');



function fotosApi(app) {
  const router = express.Router();
  app.use('/api/fotos', router);

  const fotosService = new FotosService();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {
      const fotos = await fotosService.getFotos({
        tags,
      });

      res.status(200).json({
        data: fotos,
        message: 'Foto listed',
      });
    } catch (err) {
      next(err);
    }
  });


  router.get(
    '/:fotoId',
    validationHandler( { fotoId: fotoIdSchema,}, 'params'),
    async function (req, res, next) {
      const { fotoId } = req.params;
      try {
        const foto = await fotosService.getFoto({
            fotoId,
        });

        res.status(200).json({
          data: foto,
          message: 'Foto retrieve',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createFotoSchema),
    async function (req, res, next) {
      const { body: foto } = req;
      try {
        const createdFotoId = await fotosService.createFoto({
            foto,
        });

        res.status(200).json({
          data: createdFotoId,
          message: 'Foto created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:fotoId',
    validationHandler( {fotoId: fotoIdSchema,},'params'),
    validationHandler( updateFotoSchema ),
    async function (req, res, next) {
      const { body: foto } = req;
      const { fotoId } = req.params;
      try {
        const updatedFotoId = await fotosService.updateFoto({
            fotoId,
            foto,
        });

        res.status(200).json({
          data: updatedFotoId,
          message: 'Foto updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:fotoId',
    validationHandler({fotoId: fotoIdSchema,}, 'params'),
    async function (req, res, next) {
      const { fotoId } = req.params;
      try {
        const deletedFotoId = await fotosService.deleteFoto({
            fotoId,
        });

        res.status(200).json({
          data: deletedFotoId,
          message: 'Foto deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = fotosApi;