const { Role } = require('src/domain/role')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle

const repository = BaseRepository(database.models.roles, Role)

module.exports = repository
