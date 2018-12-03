const t = require('tcomb')
const ProjectUsers = require('./project_users')
const Entity = require('../entity')

const Project = t.struct({
  id: t.maybe(t.String),
  projectName: t.String,
  description: t.String,
  estimatedDuration: t.Number,
  currentSpentTime: t.Number,
  //users: t.maybe(t.list(Entity.extend(ProjectUsers))),
  users: t.maybe(t.list(Entity))
})

module.exports = Project

