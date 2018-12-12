const { filterParams } = require('src/domain/filter')
module.exports = () => {
  const mapQuery = (params) => {
    const { ...filter } = params

    const mFilterParams = filterParams({ filter })
    return mFilterParams
  }
  return mapQuery
}
