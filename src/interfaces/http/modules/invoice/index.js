const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

const {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getOneUseCase,
  getOneByUserAndDateUseCase,
  getAllByDateUseCase,
  getArchivesUseCase
} = require('src/app/invoice')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail }, query: mapQuery } = container.cradle

  /**
   * @swagger
   * definitions:
   *   invoice:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       time:
   *         type: double
   *       extra:
   *         type: double
   *       internet:
   *         type: double
   *       totalCUC:
   *         type: double
   */
  router.use(auth.authenticate())

  /**
   * @swagger
   * /invoices:
   *   get:
   *     tags:
   *       - Invoices
   *     description: Returns a list of invoices
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of invoices
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/invoice'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/', (req, res) => {
      getAllUseCase
        .all(req, res)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

  /**
 * @swagger
 * /invoices/:
 *   post:
 *     tags:
 *       - Invoices
 *     description: Create new invoice
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *         schema:
 *           $ref: '#/definitions/invoice'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/invoice'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
  router
    .post('/', (req, res) => {
      createUseCase
        .create({ body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /invoices/id:
   *   put:
   *     tags:
   *       - Invoices
   *     description: Update Invoice
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *         schema:
   *           $ref: '#/definitions/invoice'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/invoice'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .put('/:id', (req, res) => {
      updateUseCase
        .update({ id: req.params.id, body: req.body })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })
  /**
   * @swagger
   * /invoices/id:
   *   delete:
   *     tags:
   *       - invoices
   *     description: Delete invoice
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/invoice'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   */
  router
    .delete('/:id', (req, res) => {
      removeUseCase
        .remove({ id: req.params.id })
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(error.message))
        })
    })

    /**
   * @swagger
   * /invoices/userDate:
   *   get:
   *     tags:
   *       - invoices by user Id
   *     description: Returns  the invoices that belong to a user for month and year
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: invoices in json format
   *         schema:
   *           $ref: '#/definitions/invoice'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
  .get('/userDate', (req, res) => {
    getOneByUserAndDateUseCase
      .getOne(req.query.userId, parseInt(req.query.month), parseInt(req.query.year))
      .then(data => {
        res.status(Status.OK).json(Success(data))
      })
      .catch((error) => {
        logger.error(error) // we still need to log every error for debugging
        Fail(error.message)
      })
  })

   /**
   * @swagger
   * /invoices/date:
   *   get:
   *     tags:
   *       - invoices by user Id
   *     description: Returns  the invoices that belong to a user for month and year
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: invoices in json format
   *         schema:
   *           $ref: '#/definitions/invoice'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
  .get('/date', (req, res) => {
    getAllByDateUseCase
      .getAll(parseInt(req.query.month), parseInt(req.query.year))
      .then(data => {
        res.status(Status.OK).json(Success(data))
      })
      .catch((error) => {
        logger.error(error) // we still need to log every error for debugging
        Fail(error.message)
      })
  })

  /**
   * @swagger
   * /invoices/id:
   *   get:
   *     tags:
   *       - Invoices
   *     description: Returns one invoice
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A invoice in json format
   *         schema:
   *           $ref: '#/definitions/invoice'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
    .get('/:id', (req, res) => {
      getOneUseCase
        .getOne(req.params.id)
        .then(data => {
          res.status(Status.OK).json(Success(data))
        })
        .catch((error) => {
          logger.error(error) // we still need to log every error for debugging
          Fail(error.message)
        })
    })

  return router;
};
