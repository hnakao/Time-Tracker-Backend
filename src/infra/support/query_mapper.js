const { SearchParams } = require('src/domain/search')
module.exports = () => {
  const mapQuery = (params) => {
    const { ...filter } = params
    const searchParams = SearchParams({ filter })
    return searchParams
  }
  return mapQuery
}
