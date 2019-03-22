const { Report, GetReport } = require('src/domain/report')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.reports
const userModel = database.models.users
const projectModel = database.models.projects
const taskModel = database.models.tasks
const archiveModel = database.models.archives
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

const getAll = async (user, filter) => {
  var projectId = filter.projectId;
  var userId = filter.userId;
  var startDate;
  var endDate;

  if (!filter.startDate || !filter.endDate) {
    var archive = await archiveModel.findOne({
      where: {},
      order: [['createdAt', 'DESC']]
    })
    startDate = new Date(archive.year, archive.month, 1);
    endDate = new Date(archive.year, archive.month + 1, 1);
  } else {
    startDate = new Date(filter.startDate);
    endDate = new Date(filter.endDate);
  }

  var where = {}
  var whereProject = {}
  if (projectId) {
    whereProject = {
      id: projectId
    }
  }
  if (user.role === 'Admin') {
    if (userId) {
      where = {
        '$user.id$': userId
      }
    }
  } else {
    where = {
      '$user.id$': user.id
    }
  }
  where.date = {
    $between: [startDate, endDate]
  }

  return model.findAll({
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
          as: 'project',
          where: whereProject
        }
      ]
    }],
    where: where
  }).then(reports =>
    reports.map((data) => {
      const { dataValues } = data
      return GetReport(dataValues)
    })
  )
}

const getTotalHours = async (userId) => {

  var archive = await archiveModel.findOne({
    where: {},
    order: [['createdAt', 'DESC']]
  });
  startDate = new Date(archive.year, archive.month, 1);
  endDate = new Date(archive.year, archive.month + 1, 1);

  return model.findAll({
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
          as: 'project',
        }
      ]
    }],
    where: {
      '$user.id$': userId,
      date: { $between: [startDate, endDate] }
    }
  }).then(reports => {
    var totalHours = 0
    reports.forEach((report) => {
      report.tasks.forEach((task) => {
        totalHours += task.time
      })
    })
    return totalHours
  })
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
  getTotalHours,
  findById,
  destroy
}
