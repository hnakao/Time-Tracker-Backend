/**
 * this file will hold all the get use-case for report domain
 */
const { Report } = require('src/domain/report')
 /**
  * function for create report.
  */
module.exports = ({ reportRepository }) => {
  const create = ({ body }) => {
    return Promise
      .resolve()
      .then(() => {
        const report = Report(entity)
        return reportRepository.create(report)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
