const { toEntity } = require('./transform')
const { comparePassword } = require('../../encryption')

const { GetUser } = require('src/domain/user')
// const container = require('src/container')
// const { database } = container.cradle
// const userModel = database.models.users


module.exports = (model) => {

  const container = require('src/container')
  const { database } = container.cradle

  const getAll = () =>
    model.findAll({
      include: [{ model: database.models.roles, as: 'userRole' }],
    }).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data
        return GetUser(dataValues)
      })
    )

  const create = (...args) =>
    model.create(...args).then(({ dataValues }) => toEntity(dataValues))

  const update = (...args) =>
    model.update(...args)
      .catch((error) => { throw new Error(error) })

   const findById = (id) =>
    model.findById(id, {
      include: [{ model: database.models.roles, as: 'userRole' }],
    })
    .then((entity) => {
    const { dataValues } = entity
    return GetUser(dataValues)
  })

   const findOne = (...args) =>
    model.findOne(...args)
      .then(({ dataValues }) => toEntity(dataValues))
      .catch((error) => { throw new Error(error) })

  const validatePassword = (endcodedPassword) => (password) =>
    comparePassword(password, endcodedPassword)

  const destroy = (...args) =>
    model.destroy(...args)

  return {
    getAll,
    create,
    update,
    findById,
    findOne,
    validatePassword,
    destroy
  }
}
