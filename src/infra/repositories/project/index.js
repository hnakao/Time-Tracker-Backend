const { Project } = require('src/domain/project')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.projects
const userModel = database.models.users

const {
  update,
  getById,
  destroy
} = BaseRepository(model, Project)

// const createProject = (id, projectDomain) => {
//   model.findAll({
//     where: { id: id}
//   }).then(users => {
//     return Project
//       .create
//   })
//   const project = model.create(projectDomain)
//   console.log("Users => " + JSON.stringify(users))
//   project.addUsers(users)
//   return Project(project)
// }

const createProject = async (id, projectDomain) => {
  console.log("Users ids => " + id)
  const users = await userModel.findAll({
    where: { id: id}
  })
  if (!users) {
    throw new EntityNotFound()
  }
  const project = await model.create(projectDomain)
  console.log("Users => " + JSON.stringify(users))
  await project.addUsers(users)
  return Project(project)
}

const getAll = () =>
  model.findAll({
    include: [{ model: database.models.users, as: 'users' }],
  }).then((entities) =>
    entities.map((data) => {
      const { dataValues } = data
      return Project(dataValues)
    })
  )

module.exports = {
  createProject,
  update,
  getById,
  destroy,
  getAll
}
