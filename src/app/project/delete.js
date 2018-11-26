 /**
  * function for remove project.
  */
module.exports = ({ projectRepository }) => {
  const remove = ({ id }) => {
    return Promise
      .resolve()
      .then(() =>
        projectRepository.destroy({
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
