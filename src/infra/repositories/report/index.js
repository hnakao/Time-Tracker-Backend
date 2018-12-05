const { Report, GetReport } = require('src/domain/report')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.reports
const userModel = database.models.users
const projectModel = database.models.projects

const {
  destroy
} = BaseRepository(model, Report)

const create = async (domain) => {
  const mUser = await userModel.findById(domain.users)
  const mProject = await projectModel.findById(domain.projects)
  const report = await model.create(domain)
  await report.setUsers(mUser)
  await report.setProjects(mProject)
  return Report(report)
}

const update = async (domain, id) => {
  const mUser = await userModel.findById(domain.users)
  const mProject = await projectModel.findById(domain.projects)
  const report = await model.findById(id)
  await report.update(domain, { where: { id } })
  await report.setUsers(mUser)
  await report.setProjects(mProject)
  return Report(report)
}

const getAll = () =>
  model.findAll({
    include: [
      {
        model: database.models.users,
        as: 'users'
      },
      {
        model: database.models.projects,
        as: 'projects'
      }
    ],
  })
  .then((entities) =>
    entities.map((data) => {
      const { dataValues } = data
      return GetReport(dataValues)
    })
  )

  const findById = (id) =>
    model.findById(id, {
      include: [
        { model: database.models.users,
          as: 'users'
        },
        { model: database.models.projects,
          as: 'projects'
        }
      ],
  })
    .then((entity) => {
    const { dataValues } = entity
    return GetReport(dataValues)
  })

module.exports = {
  create,
  update,
  getAll,
  findById,
  destroy
}
