const t = require('tcomb')

const ProjectEntity = t.struct({
  projectName: t.String,
  description: t.String,
  estimatedDuration: t.Number,
  currentSpentTime: t.Number,
})

module.exports = ProjectEntity

