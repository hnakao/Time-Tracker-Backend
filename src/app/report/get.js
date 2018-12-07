const repository = require('src/infra/repositories/report')
const { Report } = require('src/domain/report')

const all = () => {
  return Promise
    .resolve()
    .then(() =>
      Repository.getAll(attrs)
    )
    .catch(error => {
      throw new Error(error)
    })
}

const createProject = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      const domain = new Project(body)
      return repository.createProject(id, domain)
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { all }
