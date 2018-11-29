const repository = require('src/infra/repositories/project')
const { Project } = require('src/domain/project')

const updateProject = ({ id, body, users }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const domain = Project(body)
      await repository.updateProject(id, domain, users)
      resolve(domain)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = { updateProject }
