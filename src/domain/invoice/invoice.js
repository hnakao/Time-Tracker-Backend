const t = require('tcomb')

const Invoice = t.struct({
  id: t.maybe(t.String),
  user: t.maybe(t.String),
  salary: t.Number,
  time: t.Number,
  extra: t.Number,
  internet: t.Number,
  totalCUC: t.Number,
  month: t.Number,
  year: t.Number,
  updatedAt: t.maybe(t.Date),
  createdAt: t.maybe(t.Date)
})

module.exports = Invoice