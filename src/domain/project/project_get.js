const t = require('tcomb')
const UserEntity = require('../entities/user_entity')
const Entity = require('../entity')

const GetProject = t.struct({
  id: t.maybe(t.String),
  projectName: t.String,
  description: t.String,
  estimatedDuration: t.Number,
  currentSpentTime: t.Number,
  users: t.maybe(t.list(Entity.extend(UserEntity)))
})

module.exports = GetProject

