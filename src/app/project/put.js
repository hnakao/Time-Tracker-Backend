/**
 * this file will hold all the get use-case for project domain
 */
const { Project } = require('src/domain/project')

 /**
  * function for update project.
  */
module.exports = ({ projectRepository }) => {
  // code for getting all the items
  const update = ({ id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const project = Project(body)
        await projectRepository.update(project, {
          where: { id }
        })

        resolve(project)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    update
  }
}
