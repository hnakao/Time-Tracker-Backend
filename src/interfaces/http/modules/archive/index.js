const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

const {
  getArchivesUseCase
} = require('src/app/archive')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail } } = container.cradle

  /**
   * @swagger
   * definitions:
   *   archive:
   *     properties:
   *       user:
   *         type: string
   *         format: uuid
   *       year:
   *         type: integer
   *       months:
   *         type: array
   */
  router.use(auth.authenticate())

   /**
   * @swagger
   * /archives:
   *   get:
   *     tags:
   *       - archives by user Id
   *     description: Returns  the archives for an user
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: archives in json format
   *         schema:
   *           $ref: '#/definitions/archive'
   *       401:
   *        $ref: '#/responses/Unauthorized'

   */
  router
  .get('/', (req, res) => {
    getArchivesUseCase
      .getAll(req.query.userId)
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
