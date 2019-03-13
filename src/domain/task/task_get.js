const t = require('tcomb')
const Project = require('../project/project')

const GetTask = t.struct({
  id: t.maybe(t.String),
  project: t.maybe(Project),
  time: t.Number,
  description: t.String,
  updatedAt: t.maybe(t.Date),
  createdAt: t.maybe(t.Date)
})

module.exports = GetTask
