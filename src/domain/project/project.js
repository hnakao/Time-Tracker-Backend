const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const Project = t.struct({
  id: t.maybe(t.String),
  projectName: t.String,
  description: t.String,
  estimatedDuration: t.Integer,
  currentSpentTime: t.Integer
})

module.exports = compose(
  cleanData,
  Project
)
