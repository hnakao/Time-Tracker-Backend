const { Project } = require('src/domain/project')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.projects
const userModel = database.models.users

const {
  //update,
  findById,
  destroy
} = BaseRepository(model, Project)

const createProject = async (users, projectDomain) => {
  const mUsers = await userModel.findAll({ where: { id: users} })
  console.log("HHHHH => " + JSON.stringify(projectDomain))
  const project = await model.create(projectDomain)
  await project.addUsers(mUsers)
  return Project(project)
}

const updateProject = async (id, projectDomain, users) => {
  const mUsers = await userModel.findAll({ where: { id: users} })
  const project = await model.findById(id)
  await project.update(projectDomain, { where: { id } })
  await project.addUsers(mUsers)
  return Project(project)
}

const getAll = () =>
  model.findAll({
    include: [{ model: database.models.users, as: 'users' }],
  })
  .then((entities) =>
    entities.map((data) => {
      const { dataValues } = data
      return Project(dataValues)
    })
  )

module.exports = {
  createProject,
  updateProject,
  //update,
  findById,
  destroy,
  getAll
}
