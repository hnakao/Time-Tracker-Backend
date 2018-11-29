const t = require('tcomb')

const Entity = t.struct({
  id: t.maybe(t.String)
})

module.exports = Entity
