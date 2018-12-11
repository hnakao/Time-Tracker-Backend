const repository = require('src/infra/repositories/report')
const { Report } = require('src/domain/report')
const { User } = require('src/domain/user')

const attrs = ['id', 'time', 'description', 'date', 'createdAt', 'updatedAt', 'userId', 'projectId']

const {
  getOneUseCase,
  createUseCase,
  //getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/operations')(repository, Report, attrs)

const { getAllUseCase } = require('./get')(repository, User, attrs)


module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
