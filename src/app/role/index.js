const repository = require('src/infra/repositories/role')
const { Role } = require('src/domain/role')

const attrs = ['id', 'roleName', 'workMode', 'basicSalary', 'extraHours', 'payExtraHours', 'description']

const {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
} = require('src/app/operations')(repository, Role, attrs)

module.exports = {
  getOneUseCase,
  createUseCase,
  getAllUseCase,
  removeUseCase,
  updateUseCase
}
