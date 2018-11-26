const { Project } = require('src/domain/project')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle

const repository = BaseRepository(database.models.projects, Project)

module.exports = repository
