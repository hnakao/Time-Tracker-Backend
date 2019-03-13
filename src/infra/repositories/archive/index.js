const { GetArchive } = require('src/domain/archive')
const container = require('src/container')
const { database } = container.cradle
const invoiceModel = database.models.invoices


const getArchives = (userId) => {
  return invoiceModel.findAll({
    include: [
      {
        model: database.models.users,
        as: 'user'
      }
    ],
    where: {
      '$user.id$': userId
    }
  }).then(invoices => {
    var map = new Map();
    for (const invoice of invoices) {
      if (!map[invoice.year]) {
        map[invoice.year] = {
          user: invoice.user,
          year: invoice.year,
          months: [invoice.month]
        }
      } else {
        map[invoice.year].months.push(invoice.month)
      }
    }
    var archives = [];
    
    Object.keys(map).forEach(function (year) {
      const archive = map[year];
      archives.push({
        user: archive.user,
        year: parseInt(year),
        months: archive.months.sort().filter((month, index, months) => months.indexOf(month) === index)
      })
    })
    archives.sort(function (a, b) {
      return a.year > b.year
    })

    return archives.map((archive) => {
      // const { dataValues } = archive
      return GetArchive(archive)
    })
  })
}


module.exports = {
  getArchives
}
