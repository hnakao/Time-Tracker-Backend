const { User } = require('src/domain/user')

module.exports = (Repository) => {
  const getTotalHours = (userId) => {
    return Promise
      .resolve()
      .then(() => {
        return Repository.getTotalHours(userId)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
  return {
    getTotalHours
  }
}
