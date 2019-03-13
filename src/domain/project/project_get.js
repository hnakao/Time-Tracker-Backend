const t = require('tcomb')
const User = require('../user/user')

const GetProject = t.struct({
  id: t.maybe(t.String),
  projectName: t.String,
  description: t.String,
  estimatedDuration: t.Number,
  currentSpentTime: t.Number,
  users: t.maybe(t.list(User)),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = GetProject