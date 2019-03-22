const t = require('tcomb')

const User = t.struct({
  userId: t.String,
  name: t.String,
  time: t.Number
})

module.exports = User