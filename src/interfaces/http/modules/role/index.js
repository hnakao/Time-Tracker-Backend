const { Router } = require('express')
const Status = require('http-status')
const container = require('src/container') // we have to get the DI

const {
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getOneUseCase
} = require('src/app/role')

module.exports = () => {
  const router = Router()
  const { logger, auth, response: { Success, Fail } } = container.cradle

  /**
 * @swagger
 * definitions:
 *   role:
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *       roleName:
 *         type: string
 *       workMode:
 *         type: string
 *       basicSalary:
 *          type: integer
 *       extraHours:
 *          type: integer
 *       payExtraHours:
 *          type: integer
 *       description:
 *          type: string
 */

  router.use(auth.authenticate())

  /**
  * @swagger
  * /roles:
  *   get:
  *     tags:
  *       - Roles
  *     description: Returns a list of roles
  *     security:
  *       - JWT: []
  *     responses:
  *       200:
  *         description: An array of roles
  *         schema:
  *           type: array
  *           items:
  *             $ref: '#/definitions/role'
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
 * /roles/id:
 *   get:
 *     tags:
 *       - Roles
 *     description: Returns one role
 *     security:
 *       - JWT: []
 *     responses:
 *       200:
 *         description: A role in json format
 *         schema:
 *           $ref: '#/definitions/role'
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
 * /roles:
 *   post:
 *     tags:
 *       - Roles
 *     description: Create new role
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - roleName: body
 *         description: Role's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/shop'
 *     responses:
 *       200:
 *         description: Successfully Created
 *         schema:
 *           $ref: '#/definitions/role'
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
   * /roles/id:
   *   put:
   *     tags:
   *       - Roles
   *     description: Update Role
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - id: id
   *         in: path
   *         required: true
   *         description: Role's ID to update
   *         type: string
   *       - roleName: body
   *         description: Role's Entity
   *         in: body
   *         required: true
   *         type: string
   *         schema:
   *           $ref: '#/definitions/shop'
   *     responses:
   *       200:
   *         description: Successfully Updated
   *         schema:
   *           $ref: '#/definitions/role'
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
   * /roles/id:
   *   delete:
   *     tags:
   *       - Roles
   *     description: Delete Collection
   *     security:
   *       - JWT: []
   *     produces:
   *       - application/json
   *     parameters:
   *       - id: id
   *         in: path
   *         required: true
   *         description: Role's ID to delete
   *         type: string
   *     responses:
   *       200:
   *         description: Successfully Deleted
   *         schema:
   *           $ref: '#/definitions/role'
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
