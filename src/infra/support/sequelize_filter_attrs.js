const toSequelizeSearch = (searchParams) => {
  const attrs = {
    attributes: selectFields
  }
  if (searchParams.filter && searchParams.filter !== {}) {
    Object.assign(attrs, { where: searchParams.filter })
  }
  return attrs
}
module.exports = {
  toSequelizeSearch
}
