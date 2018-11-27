const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const Project = t.struct({
  id: t.maybe(t.String),
  projectName: t.String,
  description: t.String,
  estimatedDuration: t.Number,
  currentSpentTime: t.Number,
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = compose(
  cleanData,
  Project
)
