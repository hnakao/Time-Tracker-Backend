 /**
  * function for getter projects.
  */
module.exports = ({ projectRepository }) => {
  const all = () => {
    return Promise
      .resolve()
      .then(() =>
      projectRepository.getAll({
        attributes: [
          'id', 'projectName', 'description', 'estimatedDuration', 'currentSpentTime'
        ]
      })
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all
  }
}
