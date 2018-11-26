 /**
  * function for remove project.
  */
module.exports = ({ projectRepository }) => {
  const remove = ({ id }) => {
    return Promise
      .resolve()
      .then(() =>
      projectRepository.update({
          isDeleted: 1
        }, {
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
