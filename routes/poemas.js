const express = require('express');

const PoemasService = require('../services/poema');

const {
    poemaIdSchema,
    createPoemaSchema,
    updatePoemaSchema,
} = require('../utils/schemas/poemas');

const validationHandler = require('../utils/middleware/validationHandler');



function poemasApi(app) {
  const router = express.Router();
  app.use('/api/poemas', router);

  const poemasService = new PoemasService();

  router.get('/', async function (req, res, next) {
    const { tags } = req.query;
    try {
      const poema = await poemasService.getPoemas({
        tags,
      });

      res.status(200).json({
        data: poema,
        message: 'Poema listed',
      });
    } catch (err) {
      next(err);
    }
  });


  router.get(
    '/:poemaId',
    validationHandler( { poemaId: poemaIdSchema,}, 'params'),
    async function (req, res, next) {
      const { poemaId } = req.params;
      try {
        const poema = await poemasService.getPoema({
            poemaId,
        });

        res.status(200).json({
          data: poema,
          message: 'Poema retrieve',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createPoemaSchema),
    async function (req, res, next) {
      const { body: poema } = req;
      try {
        const createdPoemaId = await poemasService.createPoema({
            poema,
        });

        res.status(200).json({
          data: createdPoemaId,
          message: 'Poema created',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:poemaId',
    validationHandler( {poemaId: poemaIdSchema,},'params'),
    validationHandler( updatePoemaSchema ),
    async function (req, res, next) {
      const { body: poema } = req;
      const { poemaId } = req.params;
      try {
        const updatedPoemaId = await poemasService.updatePoema({
            poemaId,
            poema,
        });

        res.status(200).json({
          data: updatedPoemaId,
          message: 'Poema updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:poemaId',
    validationHandler({poemaId: poemaIdSchema,}, 'params'),
    async function (req, res, next) {
      const { poemaId } = req.params;
      try {
        const deletedPoemaId = await poemasService.deletePoema({
            poemaId,
        });

        res.status(200).json({
          data: deletedPoemaId,
          message: 'Poema deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = poemasApi;