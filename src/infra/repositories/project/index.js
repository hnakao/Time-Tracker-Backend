const { Project, GetProject } = require('src/domain/project')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.projects
const userModel = database.models.users

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
        model: database.models.reports,
        as: 'reports'
      }
    ]
  }).then(result => {
    return result.map((data) => {
      const { dataValues } = data
      return GetProject(dataValues)
    })
  })

const getAllByUserId = (userId) =>
  userModel.findById(userId).then(user =>
    user.getProjects({
      include: [
        {
          model: database.models.users,
          as: 'users'
        }
      ]
    }).then(result => {
      return result.map((data) => {
        const { dataValues } = data
        return GetProject(dataValues)
      })
    })
  )

const findById = (id) =>
  model.findById(id, {
    include: [{ model: database.models.users, as: 'users' }],
  })
    .then((entity) => {
      const { dataValues } = entity
      return GetProject(dataValues)
    })

module.exports = {
  create,
  update,
  //update,
  findById,
  destroy,
  getAll,
  getAllByUserId
}
