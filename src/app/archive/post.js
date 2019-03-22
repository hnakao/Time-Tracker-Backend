module.exports = (Repository) => {
  // code for getting all the items
  const create = () => {
    return Promise
      .resolve()
      .then(() => {
        return Repository.create()
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
