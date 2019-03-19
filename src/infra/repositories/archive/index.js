const { Archive, GetArchive } = require('src/domain/archive')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.archives
const invoiceModel = database.models.invoices

const create = async () => {
  return model.findOne({
    where: {
    },
    order: [['createdAt', 'DESC']],
  }).then(archive => {
    var where = {};
    if (archive) {
      var last = new Date(archive.year, archive.month + 1, 1);
      const month = last.getMonth();
      const year = last.getFullYear();
      where = {
        month: month,
        year: year
      }
    }
    return invoiceModel.findAll({
      include: [
        {
          model: database.models.users,
          as: 'user'
        }
      ],
      where: where
    }).then(async (invoices) => {
      var newArchivesCount = 0
      for (let invoice of invoices) {
        const archive = await model.findOne({
          include: [
            {
              model: database.models.users,
              as: 'user'
            }
          ],
          where: {
            month: invoice.month,
            year: invoice.year,
            '$user.id$': invoice.user.id
          }
        })// .then(async (archive) => {
        if (!archive) {
          const newArchive = await model.create({
            month: invoice.month,
            year: invoice.year
          })
          await newArchive.setUser(invoice.user)
          newArchivesCount = newArchivesCount + 1
        }
        // })
      }
      return newArchivesCount
    })
  })
}

const getAllByUser = (userId) => {
  return model.findAll({
    include: [
      {
        model: database.models.users,
        as: 'user'
      }
    ],
    where: {
      '$user.id$': userId
    }
  }).then(archives => {
    var map = new Map();
    for (const archive of archives) {
      if (!map[archive.year]) {
        map[archive.year] = {
          user: archive.user,
          year: archive.year,
          months: [archive.month]
        }
      } else {
        map[archive.year].months.push(archive.month)
      }
    }
    var getArchives = [];

    Object.keys(map).forEach(function (year) {
      const archive = map[year];
      getArchives.push({
        user: archive.user,
        year: parseInt(year),
        months: archive.months.sort().filter((month, index, months) => months.indexOf(month) === index)
      })
    })
    getArchives.sort(function (a, b) {
      return a.year > b.year
    })

    return getArchives.map((archive) => {
      // const { dataValues } = archive
      return GetArchive(archive)
    })
  })
}


module.exports = {
  create,
  getAllByUser
}
