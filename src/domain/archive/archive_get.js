const t = require('tcomb')
const User = require('../user/user')

const GetArchive = t.struct({
  user: User,
  months: t.list(t.Number),
  year: t.Number
})

module.exports = GetArchive