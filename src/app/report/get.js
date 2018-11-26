 /**
  * function for getter report.
  */
module.exports = ({ projectRepository }) => {
  const all = () => {
    return Promise
      .resolve()
      .then(() =>
      projectRepository.getAll({
        attributes: [
          'id', 'time', 'description'
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
