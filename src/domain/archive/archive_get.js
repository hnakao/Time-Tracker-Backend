const t = require('tcomb')
const User = require('../user/user')

const GetArchive = t.struct({
  user: User,
  year: t.Number,
  months: t.list(t.Number)
})

module.exports = GetArchive