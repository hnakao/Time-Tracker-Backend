const t = require('tcomb')
const User = require('../user/user')

const GetInvoice = t.struct({
  id: t.maybe(t.String),
  user: t.maybe(User),
  time: t.Number,
  extra: t.Number,
  internet: t.Number,
  totalCUC: t.Number,
  month: t.Number,
  year: t.Number,
  updatedAt: t.Date,
  createdAt: t.Date
})

module.exports = GetInvoice
