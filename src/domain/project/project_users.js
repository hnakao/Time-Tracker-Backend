const t = require('tcomb')

const ProjectUsers = t.struct({
  firstName: t.maybe(t.String),
  lastName: t.maybe(t.String)
})

module.exports = ProjectUsers
