const { Report, GetReport } = require('src/domain/report')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.reports

const {
  destroy,
  create,
  update,
} = BaseRepository(model, Report)

const getAll = () =>
  model.findAll({
    include: [
      {
        model: database.models.users,
        as: 'users'
      },
      {
        model: database.models.projects,
        as: 'projects'
      }
    ],
  })
  .then((entities) =>
    entities.map((data) => {
      const { dataValues } = data
      return GetReport(dataValues)
    })
  )

  const findById = (id) =>
    model.findById(id, {
      include: [
        { model: database.models.users,
          as: 'users'
        },
        { model: database.models.projects,
          as: 'projects'
        }
      ],
  })
    .then((entity) => {
    const { dataValues } = entity
    return GetReport(dataValues)
  })

module.exports = {
  create,
  update,
  getAll,
  findById,
  destroy
}
