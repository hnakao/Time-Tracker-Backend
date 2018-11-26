 /**
  * function for remove report.
  */
module.exports = ({ reportRepository }) => {
  const remove = ({ id }) => {
    return Promise
      .resolve()
      .then(() =>
        reportRepository.destroy({
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
