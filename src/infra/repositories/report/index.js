const { Report } = require('src/domain/report')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle

const repository = BaseRepository(database.models.reports, Report)

module.exports = repository
