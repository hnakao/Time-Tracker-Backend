const { Report, GetReport } = require('src/domain/report')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.reports
const userModel = database.models.users
const projectModel = database.models.projects
const taskModel = database.models.tasks
const { toSequelizeFilter } = require('src/infra/support/sequelize_filter_attrs')
const Sequelize = require('sequelize')

const create = async (domain, tasks) => {
  const mUser = await userModel.findById(domain.user)
  const mTasks = []
  for (const task of tasks) {
    const mProject = await projectModel.findById(task.project)
    const mTask = await taskModel.create(task)
    await mTask.setProject(mProject)
    mTasks.push(mTask)
  }

  let report = await model.create(domain)
  // await mProject.increment('currentSpentTime', { by: domain.time, where: { id: domain.projects } }) // TODO
  await report.setUser(mUser)
  // await report.setProjects(mProject)
  await report.addTasks(mTasks)
  return findById(report.id)
}

const update = async (id, domain, tasks) => {
  // const mUser = await userModel.findById(domain.users)
  // const mTasks = await taskModel.findAll({ where: { id: tasks} })
  var taskIds = []
  for (var task of tasks) {
    if (task.id) {
      taskIds.push(task.id);
    }
  }
  const Op = Sequelize.Op
  await taskModel.destroy({ where: { id: { [Op.notIn]: taskIds }, reportId: id } });
  const mTasks = await taskModel.findAll({ where: { id: { [Op.in]: taskIds } } })
  for (const task of tasks) {
    console.debug(task);
    if (!task.id) {
      const mProject = await projectModel.findById(task.project)
      const mTask = await taskModel.create(task)
      await mTask.setProject(mProject)
      mTasks.push(mTask)
    }
  }
  var report = await model.findById(id)
  // await mProject.decrement('currentSpentTime', { by: report.time, where: { id: domain.projects } })
  // await mProject.increment('currentSpentTime', { by: domain.time, where: { id: domain.projects } })
  await report.update(domain, { where: { id } })
  // await report.setUser(mUser)
  await report.setTasks(mTasks)
  return findById(id)
}

const getAll = (user, filter) => {
  const filterOptions = {
    // attributes: attrs,
    include: [{
      model: database.models.users,
      as: 'user'
    },
    {
      model: database.models.tasks,
      as: 'tasks',
      include: [
        {
          model: database.models.projects,
          as: 'project'
        }
      ]
    }]
  }

  Object.assign(filterOptions, toSequelizeFilter(filter, user))

  return model.findAll(filterOptions).then(reports =>
    reports.map((data) => {
      const { dataValues } = data
      return GetReport(dataValues)
    })
  )
}

const findById = (id) =>
  model.findById(id, {
    include: [
      {
        model: database.models.users,
        as: 'user'
      },
      {
        model: database.models.tasks,
        as: 'tasks',
        include: [
          {
            model: database.models.projects,
            as: 'project'
          }
        ]
      }
    ],
  }).then((entity) => {
    var dataValues = entity.toJSON()
    return GetReport(dataValues)
  })

const destroy = async (id) => {
  const report = await model.findById(id)
  // const mProject = await projectModel.findById(report.projectId)
  // await mProject.decrement('currentSpentTime', { by: report.time, where: { id: mProject.id } })
  await model.destroy({ where: { id } })
}

module.exports = {
  create,
  update,
  getAll,
  findById,
  destroy
}
