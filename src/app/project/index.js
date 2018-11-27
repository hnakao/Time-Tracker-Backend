const repository = require('src/infra/repositories/project')
const { Project } = require('src/domain/project')

const attrs = ['id', 'projectName', 'description', 'estimatedDuration', 'currentSpentTime']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/operations')(repository, Project, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
