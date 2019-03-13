const { Report } = require('src/domain/report')

module.exports = (Repository) => {
  const create = ({ body, tasks }) => {
    return Promise
      .resolve()
      .then(() => {
        body.date = new Date(body.date)
        const domain = new Report(body)
        Repository.create(domain, tasks)
      })
      .catch(error => {
        throw new Error(error)
      })
  }
  return { create }
}
