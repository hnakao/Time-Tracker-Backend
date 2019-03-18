const repository = require('src/infra/repositories/report')
const { Report } = require('src/domain/report')


const attrs = ['id', 'userId', 'date', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  //createUseCase,
  //getAllUseCase,
  removeUseCase,
  //updateUseCase
} = require('src/app/operations')(repository, Report, attrs)

const getAllUseCase = require('./get')(repository)
const getTotalHoursUseCase = require('./getTotalHours')(repository)
const createUseCase = require('./post')(repository)
const updateUseCase = require('./put')(repository)


module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  getTotalHoursUseCase,
  removeUseCase,
  updateUseCase
}
