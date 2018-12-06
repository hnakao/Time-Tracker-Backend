const t = require('tcomb')

const SearchParams = t.struct({
  filter: t.maybe(t.Object)
})

module.exports = SearchParams
