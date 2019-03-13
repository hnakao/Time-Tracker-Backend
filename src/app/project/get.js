module.exports = (Repository) => {
  const all = (userId) => {
    return Promise
      .resolve()
      .then(() =>
        Repository.getAllByUserId(userId)
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all
  }
}
