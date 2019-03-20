const { toEntity } = require('./transform')
const { comparePassword } = require('../../encryption')

module.exports = (model) => {
  const container = require('src/container')
  const { database } = container.cradle
  const userModel = database.models.users

  const getAll = () =>
    model.findAll({ where: { isDeleted: 0 } }).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
    )
  
  const getDevelopers = () =>
    model.findAll({ where: { isDeleted: 0, role: 'Developer' } }).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data
        return toEntity(dataValues)
      })
    )

  const create = (...args) =>
    model.create(...args).then(({ dataValues }) => toEntity(dataValues))

  const update = (...args) =>
    model.update(...args)
      .catch((error) => { throw new Error(error) })

  const findById = (id) => model.findById(id)
    .then((entity) => {
      const { dataValues } = entity
      return toEntity(dataValues)
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
    destroy,
    getDevelopers
  }
}
