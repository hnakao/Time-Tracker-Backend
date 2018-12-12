const t = require('tcomb')

const filterParams = t.struct({
  filter: t.maybe(t.Object)
})

module.exports = filterParams
