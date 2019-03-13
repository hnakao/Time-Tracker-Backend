const t = require('tcomb')
const Task = require('../task/task')

const Report = t.struct({
  id: t.maybe(t.String),
  date: t.maybe(t.Date),
  tasks: t.maybe(t.list(Task)),
  user: t.String,
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = Report