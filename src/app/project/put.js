const repository = require('src/infra/repositories/project')
const { Project } = require('src/domain/project')

const updateProject = ({ id, body }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const domain = Domain(body)
      await Repository.update(domain, id)
      resolve(domain)
    } catch (error) {
      reject(error)
    }
  })
}
