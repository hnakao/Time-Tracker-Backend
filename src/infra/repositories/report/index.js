const { Report, GetReport } = require('src/domain/report')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.reports
const userModel = database.models.users
const projectModel = database.models.projects
const roleModel = database.models.roles
const { toSequelizeFilter } = require('src/infra/support/sequelize_filter_attrs')

const create = async (domain) => {
  const mUser = await userModel.findById(domain.users)
  const mProject = await projectModel.findById(domain.projects)
  const report = await model.create(domain)
  await mProject.increment('currentSpentTime', {by: domain.time, where: {id: domain.projects}})
  await report.setUsers(mUser)
  await report.setProjects(mProject)
  return Report(report)
}

const update = async (domain, id) => {
  const mUser = await userModel.findById(domain.users)
  const mProject = await projectModel.findById(domain.projects)
  const report = await model.findById(id)
  await mProject.decrement('currentSpentTime', {by: report.time, where: {id: domain.projects}})
  await mProject.increment('currentSpentTime', {by: domain.time, where: {id: domain.projects}})
  await report.update(domain, { where: { id } })
  await report.setUsers(mUser)
  await report.setProjects(mProject)
  return Report(report)
}

const getAll = (attrs, user, filter) =>
  roleModel.findById(user.roleId).then(mRole => {
    const filterOptions = {
      attributes: attrs,
      include: [ {
          model: database.models.users,
          as: 'users'
        },
        {
          model: database.models.projects,
          as: 'projects'
        }]
    }

    Object.assign(filterOptions, toSequelizeFilter(filter, user, mRole))
    return filterOptions
  }).then(options =>
      model.findAll(options)
  ).then(reports =>
    reports.map((data) => {
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

const destroy = async (id) => {
  const report = await model.findById(id)
  const mProject = await projectModel.findById(report.projectId)
  await mProject.decrement('currentSpentTime', {by: report.time, where: {id: mProject.id}})
  await model.destroy({ where: { id } })
}

module.exports = {
  create,
  update,
  getAll,
  findById,
  destroy
}
