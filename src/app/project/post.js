const repository = require('src/infra/repositories/project')
const { Project } = require('src/domain/project')

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

module.exports = { createProject }
