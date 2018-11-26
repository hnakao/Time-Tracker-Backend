 /**
  * function for remove role.
  */
module.exports = ({ roleRepository }) => {
  const remove = ({ id }) => {
    return Promise
      .resolve()
      .then(() =>
        roleRepository.destroy({
          where: { id }
        })
      )
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    remove
  }
}
