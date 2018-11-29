const t = require('tcomb')

const Report = t.struct({
  id: t.maybe(t.String),
  time: t.Integer,
  description: t.String,
  userId: t.maybe(t.String),
  projectId: t.maybe(t.String),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = Report
