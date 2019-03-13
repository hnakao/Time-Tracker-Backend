const repository = require('src/infra/repositories/project')
const { Project } = require('src/domain/project')

const createProject = ({ body, users }) => {
  return Promise
    .resolve()
    .then(() => {
      const domain = new Project(body)
      return repository.create(domain, users)
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { createProject }
