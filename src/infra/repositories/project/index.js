const { Project } = require('src/domain/project')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.projects
const userModel = database.models.users
const projectMapping = require('./projectMapping')

const {
  destroy
} = BaseRepository(model, Project)

const create = async (projectDomain, users) => {
  const mUsers = await userModel.findAll({ where: { id: users } })
  const project = await model.create(projectDomain)
  await project.addUsers(mUsers)
  return Project(project)
}

const update = async (id, projectDomain, users) => {
  const mUsers = await userModel.findAll({ where: { id: users } })
  const project = await model.findById(id)
  await project.update(projectDomain, { where: { id } })
  await project.setUsers(mUsers)
  return Project(project)
}

const getAll = () =>
  model.findAll({
    include: [
      {
        model: database.models.users,
        as: 'users'
      },
      {
        model: database.models.tasks
      }
    ]
  }).then(result => {
    return result.map((data) => {
      const { dataValues } = data
      return projectMapping.map(dataValues)
    })
  })

const getAllByUserId = (userId) =>
  userModel.findById(userId).then(user =>
    user.getProjects({
      include: [
        {
          model: database.models.users,
          as: 'users'
        }, {
          model: database.models.tasks
        }
      ]
    }).then(result => {
      return result.map((data) => {
        const { dataValues } = data
        return projectMapping.map(dataValues)
      })
    })
  )

const findById = (id) =>
  model.findById(id, {
    include: [{
      model: database.models.users, as: 'users'
    }, {
      model: database.models.tasks
    }]
  }).then((entity) => {
    const { dataValues } = entity
    return projectMapping.map(dataValues)
  })

module.exports = {
  create,
  update,
  // update,
  findById,
  destroy,
  getAll,
  getAllByUserId
}
