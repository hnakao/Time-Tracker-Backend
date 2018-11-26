const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const Report = t.struct({
  id: t.maybe(t.String),
  time: t.Integer,
  description: t.String
})

module.exports = compose(
  cleanData,
  Report
)
