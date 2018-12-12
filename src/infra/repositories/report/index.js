const { Report, GetReport } = require('src/domain/report')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.reports
const userModel = database.models.users
const projectModel = database.models.projects
const roleModel = database.models.roles

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

const getAll = (attrs, user, filter) =>
  roleModel.findById(user.roleId).then(mRole => {
    options = {};
    whereSearch
    var mDate = new Date();
    var firstDay = new Date(mDate.getFullYear(), mDate.getMonth(), 1);
    var lastDay = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 0);

    if(filter && filter !== {}){
      options.date = (filter.startDate && filter.endDate) ?
                           {$between: [filter.startDate, filter.endDate]} :
                           {$between: [firstDay, lastDay]}
      options.projectId = filter.projectId ? filter.projectId : {}
      options.userId = filter.userId ? filter.userId : {}
    } else{
      options.date = {$between: [firstDay, lastDay]}
      options.userId = (mRole.roleName !== "admin") ? user.id : {}
    }
    options.assign({ where: options })
    console.log("OPTIONS => " + JSON.stringify(options))
  }).then(options =>
    model.findAll(
      {
        attributes: attrs,
        include: [
        {
          model: database.models.users,
          as: 'users'
        },
        {
          model: database.models.projects,
          as: 'projects'
        }],
        where: options
      }
    )).then(reports =>
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

module.exports = {
  create,
  update,
  getAll,
  findById,
  destroy
}
