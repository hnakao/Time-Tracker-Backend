  module.exports = (Repository, User, attrs) => {
    const all = ({ user }) => {
      return Promise
        .resolve()
        .then(() => {
          const mUser = User(user)
          console.log("On App => " + JSON.stringify(user))
          return Repository.getAll(attrs, mUser)
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
