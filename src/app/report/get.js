module.exports = (Repository, User, attrs) => {
    const all = ({ user, filter }) => {
      return Promise
        .resolve()
        .then(() => {
          const mUser = User(user)
          return Repository.getAll(attrs, mUser, filter)
        })
        .catch(error => {
          throw new Error(error)
        })
    }

    const getAllUseCase = {
      all
    }

    return {
      getAllUseCase
    }
  }
