const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const GetUser = t.struct({
  id: t.maybe(t.String),
  firstName: t.String,
  lastName: t.String,
  email: t.String,
  mobile: t.String,
  role: t.String,
  salary: t.Number,
  internet: t.Boolean,
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = compose(
  cleanData,
  GetUser
)