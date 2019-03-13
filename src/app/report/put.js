const { Report } = require('src/domain/report')

module.exports = (Repository) => {
  const update = ({ id, body, tasks }) => {
    return new Promise(async (resolve, reject) => {
      try {
        body.date = new Date(body.date)
        const domain = Report(body)
        Repository.update(id, domain, tasks)
        resolve(domain)
      } catch (error) {
        reject(error)
      }
    })
  }
  return { update }
}
