const { GetMission } = require('src/domain/mission')
const container = require('src/container')
const { database } = container.cradle
const reportModel = database.models.reports
const archiveModel = database.models.archives


const getMissions = () => {
  return archiveModel.findOne({
    where: {
    },
    order: [['createdAt', 'DESC']],
  }).then(archive => {

    // Range of dates of next month
    var startDate = new Date(archive.year, archive.month, 1);
    var endDate = new Date(archive.year, archive.month + 1, 1);

    return reportModel.findAll({
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
            },
          ]
        }
      ],
      where: {
        date: {
          $between: [startDate, endDate]
        }
      }
    }).then(reports => {
      var map = new Map()
      var missions = []
      for (const report of reports) {
        for (const task of report.tasks) {
          if (!map[task.project.id]) {
            map[task.project.id] = missions.length + 1
            missions.push({
              projectName: task.project.projectName,
              users: [
                {
                  userId: report.user.id,
                  name: report.user.firstName,
                  time: task.time
                }
              ]
            })
          } else {
            const index = map[task.project.id] - 1
            var finded = false
            for (const user of missions[index].users) {
              if (user.userId === report.user.id) {
                finded = true
                user.time += task.time
              }
            }
            if (!finded) {
              missions[index].users.push({
                userId: report.user.id,
                name: report.user.firstName,
                time: task.time
              });
            }
          }
        }
      }

      return missions.map((mission) => {
        // const { dataValues } = archive
        return GetMission(mission)
      });
    });
  });
}


module.exports = {
  getMissions
}
