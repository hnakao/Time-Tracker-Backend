const repository = require('src/infra/repositories/project')
const { Project } = require('src/domain/project')

const createProject = ({ id, body }) => {
  return Promise
    .resolve()
    .then(() => {
      console.log("HHHHH => " + JSON.stringify(body.users))
      const domain = new Project(body)
      console.log("NNNNNN => " + JSON.stringify(domain))
      //const usersId = [...usersId, body.users]
      return repository.createProject(id, domain)
    })
    .catch(error => {
      throw new Error(error)
    })
}

module.exports = { createProject }
