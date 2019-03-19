const t = require('tcomb')
const User = require('../user/user')

const GetArchive = t.struct({
  user: t.maybe(t.String),
  month: t.Number,
  year: t.Number
})

module.exports = GetArchive