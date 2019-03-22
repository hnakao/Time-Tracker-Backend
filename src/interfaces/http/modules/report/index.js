const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  createUseCase,
  getAllUseCase,
  getTotalHoursUseCase,
  updateUseCase,
  removeUseCase,
  getOneUseCase
} = require('src/app/report')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail }, query: mapQuery } = container.cradle

  /**
 * @swagger
 * definitions:
 *   report:
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       time:
 *          type: time
 *       description:
 *         type: string
 */

  router.use(auth.authenticate())

  /**
  * @swagger
  * /Reports:
  *   get:
  *     tags:
  *       - Reports
  *     description: Returns a list of reports
  *     security:
  *       - JWT: []
  *     responses:
  *       200:
  *         description: An array of reports
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/definitions/report'
  *       401:
  *        $ref: '#/responses/Unauthorized'
  */
  router
    .get('/', (req, res) => {
      getAllUseCase
        .getAll({ user: req.user }, mapQuery(req.query).filter)
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
  * /Reports:
  *   get:
  *     tags:
  *       - Reports
  *     description: Returns total hours logged by user on date range
  *     security:
  *       - JWT: []
  *     responses:
  *       200:
  *         description: An number
  *         schema:
  *           type: number
  *       401:
  *        $ref: '#/responses/Unauthorized'
  */
 router
 .get('/totalHours', (req, res) => {
   getTotalHoursUseCase
     .getTotalHours(req.query.userId)
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
   * /reports/id:
   *   get:
   *     tags:
   *       - Reports
   *     description: Returns one report
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A report in json format
   *         schema:
   *           $ref: '#/definitions/report'
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
  /**
 * @swagger
 * /reports:
 *   post:
 *     tags:
 *       - Reports
 *     description: Create new report
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - time: body
 *         description: Report's Entity
 *         in: body
 *         required: false
 *         type: time
 *         schema:
 *           $ref: '#/definitions/report'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/report'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
  router
    .post('/', (req, res) => {
      createUseCase
        .create({ body: req.body, tasks: req.body.tasks })
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
   * /reports/id:
   *   put:
   *     tags:
   *       - Reports
   *     description: Update Report
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - id: id
   *         in: path
   *         required: true
   *         description: Report's ID to update
   *         type: integer
   *       - time: body
   *         description: Report's Entity
   *         in: body
   *         required: false
   *         type: time
   *         schema:
   *           $ref: '#/definitions/report'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/report'
   *       401:
   *         $ref: '#/responses/Unauthorized'
   *       400:
   *         $ref: '#/responses/BadRequest'
   */
  router
    .put('/:id', (req, res) => {
      updateUseCase
        .update({ id: req.params.id, body: req.body, tasks: req.body.tasks })
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
   * /reports/id:
   *   delete:
   *     tags:
   *       - Reports
   *     description: Delete Report
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - id: id
   *         in: path
   *         required: true
   *         description: Report's ID to delete
   *         type: integer
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/report'
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

  return router;
};
