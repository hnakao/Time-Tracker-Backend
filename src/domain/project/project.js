const t = require('tcomb')

const Project = t.struct({
  id: t.maybe(t.String),
  projectName: t.String,
  description: t.String,
  estimatedDuration: t.Number,
  currentSpentTime: t.Number,
  users: t.maybe(t.list(t.String)),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = Project

