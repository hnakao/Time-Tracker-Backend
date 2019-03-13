const repository = require('src/infra/repositories/invoice')
const { Invoice } = require('src/domain/invoice')

const attrs = ['id', 'time', 'extra', 'internet', 'totalCUC', 'month', 'year', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  getAllUseCase,
  removeUseCase,
  createUseCase,
  updateUseCase
} = require('src/app/operations')(repository, Invoice, attrs)

const getOneByUserAndDateUseCase = require('./getOneByUserAndDate')(repository)
const getAllByDateUseCase = require('./getAllByDate')(repository)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase,
  getOneByUserAndDateUseCase,
  getAllByDateUseCase
}
