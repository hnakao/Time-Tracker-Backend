const t = require('tcomb')

const Role = t.struct({
  id: t.maybe(t.String),
  roleName: t.String,
  workMode: t.String,
  basicSalary: t.Number,
  extraHours: t.Number,
  payExtraHours: t.Number,
  description: t.String,
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = Role
