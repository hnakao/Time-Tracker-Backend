const t = require('tcomb')
const User = require('../user/user')
const GetTask = require('../task/task_get')

const GetReport = t.struct({
  id: t.maybe(t.String),
  date: t.maybe(t.Date),
  tasks: t.list(GetTask),
  user: t.maybe(User),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = GetReport
