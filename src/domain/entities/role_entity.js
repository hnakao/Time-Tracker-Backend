const t = require('tcomb')

const RoleEntity = t.struct({
  roleName: t.String,
  workMode: t.String,
  basicSalary: t.Number,
  extraHours: t.Number,
  payExtraHours: t.Number,
  description: t.String
})

module.exports = RoleEntity
