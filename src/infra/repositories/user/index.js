const { toEntity } = require('./transform')
const { comparePassword } = require('../../encryption')
const { GetUser } = require('src/domain/user')

module.exports = (model) => {

  const container = require('src/container')
  const { database } = container.cradle
  const roleModel = database.models.roles

  const getAll = () =>
    model.findAll({
      include: [{ model: database.models.roles, as: 'userRole' }],
    }).then((entity) =>
      entity.map((data) => {
        const { dataValues } = data
        return GetUser(dataValues)
      })
    )

    const create = async (...args) => {
      const user = args[0]
      const role = await roleModel.findOne({ where: { id: user.userRole} })
      user.userRole = role.dataValues;
      console.log(user)
      userAdded = await model.create(user, {
        include: [{
          association: database.models.users.roles,
        }],
      })
      return toEntity(userAdded)
    }

    // const create = (...args) =>
    //   model.create(...args, {
    //     include: [{

    //     }]
    //   })
    // .then(({ dataValues }) => toEntity(dataValues))


    // const updateProject = async (id, projectDomain, users) => {
    //   const mUsers = await userModel.findAll({ where: { id: users} })
    //   const project = await model.findById(id)
    //   await project.update(projectDomain, { where: { id } })
    //   await project.addUsers(mUsers)
    //   return Project(project)
    // }

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
    model.findOne(...args, {
      include: [{ model: database.models.roles, as: 'userRole' }],
    })
    .then(({ dataValues }) => GetUser(dataValues))
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
