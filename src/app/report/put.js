/**
 * this file will hold all the get use-case for report domain
 */
const { Report } = require('src/domain/report')

 /**
  * function for update report.
  */
module.exports = ({ reportRepository }) => {
  const update = ({ id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const report = Report(body)
        await reportRepository.update(report, {
          where: { id }
        })

        resolve(report)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    update
  }
}
