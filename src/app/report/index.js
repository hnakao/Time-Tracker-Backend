const repository = require('src/infra/repositories/report')
const { Report } = require('src/domain/report')

const attrs = ['id', 'time', 'description', 'createdAt', 'updatedAt', 'userId', 'projectId',]

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/operations')(repository, Report, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
