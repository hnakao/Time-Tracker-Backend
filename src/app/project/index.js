const repository = require('src/infra/repositories/project')
const { Project } = require('src/domain/project')

const attrs = ['id', 'projectName', 'description', 'estimatedDuration', 'currentSpentTime', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  getAllUseCase,
  removeUseCase
  //updateUseCase
} = require('src/app/operations')(repository, Project, attrs)

const createUseCase = require('./post')
const updateUseCase = require('./put')
const getAllByUserIdUseCase = require('./get')(repository)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  getAllByUserIdUseCase,
  removeUseCase,
  updateUseCase
  //updateUseCase
}
