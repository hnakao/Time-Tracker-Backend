const t = require('tcomb')
const User = require('./mission_user')

const GetMission = t.struct({
  projectName: t.String,
  users: t.list(User)
})

module.exports = GetMission