 /**
  * function for getter user.
  */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const all = () => {
    return Promise
      .resolve()
      .then(() =>
      userRepository.getAll({
        attributes: [
          'id', 'firstName', 'lastName', 'email', 'password', 'role', 'isDeleted', 'mobile', 'salary', 'internet'
        ]
      })
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  const byId = (id) => {
    return Promise
      .resolve()
      .then(() =>
        userRepository.findById(id)
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all,
    byId
  }
}
