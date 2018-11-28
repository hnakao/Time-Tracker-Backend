const repository = require('src/infra/repositories/project')
const { Project } = require('src/domain/project')

const attrs = ['id', 'projectName', 'description', 'estimatedDuration', 'currentSpentTime']

const {
  getOneUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/operations')(repository, Project, attrs)

const createProjectUseCase = require('./post')

module.exports = {
  getOneUseCase,
  createProjectUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
