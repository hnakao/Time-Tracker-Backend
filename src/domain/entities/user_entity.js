const t = require('tcomb')

const UserEntity = t.struct({
  firstName: t.maybe(t.String),
  lastName: t.maybe(t.String),
  email: t.String,
  roleId: t.maybe(t.String),
  isDeleted: t.Number
})

module.exports = UserEntity
