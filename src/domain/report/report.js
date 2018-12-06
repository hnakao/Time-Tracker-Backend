const t = require('tcomb')

const Report = t.struct({
  id: t.maybe(t.String),
  time: t.Integer,
  description: t.String,
  date: t.Date,
  users: t.maybe(t.String),
  projects: t.maybe(t.String)
})

module.exports = Report
