const { User } = require('src/domain/user')

module.exports = (Repository) => {
  const getTotalHours = ({ user }, filter) => {
    return Promise
      .resolve()
      .then(() => {
        const mUser = User(user)
        return Repository.getTotalHours(mUser, filter)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
  return {
    getTotalHours
  }
}
