/**
 * this file will hold all the get use-case for project domain
 */
const { Project } = require('src/domain/project')
 /**
  * function for create project.
  */
module.exports = ({ projectRepository }) => {
  const create = ({ body }) => {
    return Promise
      .resolve()
      .then(() => {
        const project = Project(entity)
        return projectRepository.create(project)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
