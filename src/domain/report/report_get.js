const t = require('tcomb')
const UserEntity = require('../entities/user_entity')
const ProjectEntity = require('../entities/project_entity')
const Entity = require('../entity')

const GetReport = t.struct({
  id: t.maybe(t.String),
  time: t.Integer,
  description: t.String,
  users: t.maybe(Entity.extend(UserEntity)),
  projects: t.maybe(Entity.extend(ProjectEntity))
})

module.exports = GetReport
