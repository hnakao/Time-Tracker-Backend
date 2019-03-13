const t = require('tcomb')
const User = require('../user/user')
const Task = require('../task/task')

const GetReport = t.struct({
  id: t.maybe(t.String),
  date: t.maybe(t.Date),
  tasks: t.list(Task),
  user: t.maybe(User),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = GetReport
