const repository = require('src/infra/repositories/archive')

const getArchivesUseCase = require('./getAll')(repository)

module.exports = {
  getArchivesUseCase
}
