const repository = require('src/infra/repositories/mission')

const getMissionsUseCase = require('./get')(repository)

module.exports = {
  getMissionsUseCase
}
