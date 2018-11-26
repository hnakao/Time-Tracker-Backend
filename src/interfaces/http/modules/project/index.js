const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container')

const {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getOneUseCase
} = require('src/app/project')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail } } = container.cradle

  /**
   * @swagger
   * definitions:
   *   project:
   *     properties:
   *       id:
   *         type: string
   *         format: uuid
   *       projectName:
   *         type: string
   *       description:
   *         type: string
   *       estimatedDuration:
   *          type: time
   *       currentSpentTime:
   *          type: time
   */

  router.use(auth.authenticate())

  /**
   * @swagger
   * /projects/:
   *   get:
   *     tags:
   *       - Projects
   *     description: Returns a list of projects
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: An array of projects
   *         schema:
   *           type: array
   *           items:
   *             $ref: '#/definitions/project'
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
   * /projects/id:
   *   get:
   *     tags:
   *       - Projects
   *     description: Returns one project
   *     security:
   *       - JWT: []
   *     responses:
   *       200:
   *         description: A project in json format
   *         schema:
   *           $ref: '#/definitions/project'
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
 * /projects/:
 *   post:
 *     tags:
 *       - Projects
 *     description: Create new project
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - projectName: body
 *         description: Project's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/project'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/project'
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
   * /projects/id:
   *   put:
   *     tags:
   *       - Projects
   *     description: Update Project
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - projectName: id
   *         in: path
   *         required: true
   *         description: Project's ID to update
   *         type: string
   *       - name: body
   *         description: Project's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/project'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/project'
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
   * /projects/id:
   *   delete:
   *     tags:
   *       - Projects
   *     description: Delete Project
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - projectName: id
   *         in: path
   *         required: true
   *         description: Project's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/project'
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
