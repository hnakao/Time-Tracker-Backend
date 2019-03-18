const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

const {
  getMissionsUseCase
} = require('src/app/mission')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail } } = container.cradle

  /**
   * @swagger
   * definitions:
   *   mission:
   *     properties:
   *       projectName:
   *         type: string
   *         format: uuid
   *       users:
   *         type: array
   */
  router.use(auth.authenticate())

   /**
   * @swagger
   * /missions:
   *   get:
   *     tags:
   *       - missions resume
   *     description: Returns resume of time reported on date range by project
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: missions in json format
   *         schema:
   *           $ref: '#/definitions/mission'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
  .get('/', (req, res) => {
    getMissionsUseCase
      .getAll(req.query.startDate, req.query.endDate)
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
