const repository = require('src/infra/repositories/project')
const { Project } = require('src/domain/project')

const attrs = ['id', 'projectName', 'description', 'estimatedDuration', 'currentSpentTime', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  getAllUseCase,
  removeUseCase
  //updateUseCase
} = require('src/app/operations')(repository, Project, attrs)

const createProjectUseCase = require('./post')
const updateProjectUseCase = require('./put')
const getAllByUserIdUseCase = require('./get')(repository)

module.exports = {
  getOneUseCase,
  createProjectUseCase,
  getAllUseCase,
  getAllByUserIdUseCase,
  removeUseCase,
  updateProjectUseCase
  //updateUseCase
}
