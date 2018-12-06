const { Report, GetReport } = require('src/domain/report')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.reports
const userModel = database.models.users
const projectModel = database.models.projects

const { toSequelizeSearch } = require('src/infra/support/sequelize_filter_attrs')
const { SearchResult } = require('src/domain/search')

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

const getAll = (searchParams) => {
  const attrs = toSequelizeSearch(searchParams)
  console.log(attrs)
  model.findAll({
      attrs,
      include: [{
          model: database.models.users,
          as: 'users'
        },
        {
          model: database.models.projects,
          as: 'projects'
        }
      ],
    })
    .then((entities) => {
      const rows = entities.rows.map((data) => {
        const { dataValues } = data
        console.log(dataValues)
        return GetReport(dataValues)
      })
      return SearchResult({ rows })
      // entities.map((data) => {
      //   const {
      //     dataValues
      //   } = data
      //   return GetReport(dataValues)
      // })
    })
}

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
