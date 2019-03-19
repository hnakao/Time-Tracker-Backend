const repository = require('src/infra/repositories/archive')
const { Archive } = require('src/domain/archive')

const attrs = ['id', 'user', 'month', 'year', 'createdAt', 'updatedAt']

const {
  getOneUseCase,
  getAllUseCase,
  removeUseCase,
  // createUseCase,
  updateUseCase
} = require('src/app/operations')(repository, Archive, attrs)

const getAllByUserUseCase = require('./getAllByUser')(repository)
const createUseCase = require('./post')(repository)

module.exports = {
  getOneUseCase,
  getAllUseCase,
  removeUseCase,
  createUseCase,
  updateUseCase,
  getAllByUserUseCase
}
