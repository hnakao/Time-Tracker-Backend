const { GetProject } = require('src/domain/project')
const map = (dbModel) => {
  if (dbModel.tasks) {
    let timeTotal = 0
    dbModel.tasks.forEach((task) => {
      timeTotal += task.time
    })
    dbModel.currentSpentTime = timeTotal
  }
  console.log(JSON.stringify(dbModel))
  return GetProject(dbModel)
}
module.exports = {
  map
}
