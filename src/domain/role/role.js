const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const Role = t.struct({
  id: t.maybe(t.String),
  rolName: t.String,
  workMode: t.String,
  basicSalary: t.Integer,
  extraHours: t.Integer,
  payExtraHours: t.Integer,
  description: t.String
})

module.exports = compose(
  cleanData,
  Role
)
