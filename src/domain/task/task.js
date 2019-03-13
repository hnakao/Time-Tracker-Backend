const t = require('tcomb')

const Task = t.struct({
  id: t.maybe(t.String),
  project: t.maybe(t.String),
  report: t.maybe(t.String),
  time: t.Number,
  description: t.String,
  updatedAt: t.maybe(t.Date),
  createdAt: t.maybe(t.Date)
})

module.exports = Task