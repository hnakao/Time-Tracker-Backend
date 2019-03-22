const { User } = require('src/domain/user')

module.exports = (Repository) => {
  const getAll = ({ user }, filter) => {
    return Promise
      .resolve()
      .then(() => {
        const mUser = User(user)
        return Repository.getAll(mUser, filter)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
  return {
    getAll
  }
}
