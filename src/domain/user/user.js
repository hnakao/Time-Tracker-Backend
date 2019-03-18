const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const User = t.struct({
  id: t.maybe(t.String),
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  password: t.maybe(t.String),
  mobile: t.String,
  role: t.String,
  salary: t.Number,
  internet: t.maybe(t.Boolean),
  isDeleted: t.maybe(t.Number),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = User