const { Invoice, GetInvoice } = require('src/domain/invoice')
const BaseRepository = require('../baseRepository')
const container = require('src/container')
const { database } = container.cradle
const model = database.models.invoices
const userModel = database.models.users
const archiveModel = database.models.archives

const {
  destroy
} = BaseRepository(model, Invoice)

const create = async (domain) => {
  const mUser = await userModel.findById(domain.user)
  const invoice = await model.create(domain)
  await invoice.setUser(mUser);
  return Invoice(invoice)
}

const update = async (id, domain) => {
  const mUser = await userModel.findById(domain.user)
  const invoice = await model.findById(id)
  await invoice.update(domain, { where: { id } })
  await invoice.setUser(mUser)
  return Invoice(invoice)
}

const getAll = () =>
  model.findAll({
    include: [
      {
        model: database.models.users,
        as: 'user'
      }
    ]
  }).then(invoices => {
    return invoices.map((invoice) => {
      const { dataValues } = invoice
      return GetInvoice(dataValues)
    })
  })

const findById = (id) =>
  model.findById(id, {
    include: [
      {
        model: database.models.users,
        as: 'user'
      }
    ],
  }).then((invoice) => {
    const { dataValues } = invoice
    return GetInvoice(dataValues)
  })

const getInvoiceByUserIdAndDate = async (userId, month, year) => {
  if (!month || !year) {
    const archive = await archiveModel.findOne({
      where: {
      },
      order: [['createdAt', 'DESC']],
    })

    var date = new Date(archive.year, archive.month + 1, 1);
    month = date.getMonth()
    year = date.getFullYear()
  }
  return model.findOne({
    include: [
      {
        model: database.models.users,
        as: 'user'
      }
    ],
    where: {
      month: month,
      year: year,
      '$user.id$': userId
    }
  }).then(invoice => {
    const { dataValues } = invoice
    return GetInvoice(dataValues)
  })
}

const getInvoicesByDate = async (month, year) => {
  if (!month || !year) {
    const archive = await archiveModel.findOne({
      where: {
      },
      order: [['createdAt', 'DESC']],
    })

    var date = new Date(archive.year, archive.month + 1, 1);
    month = date.getMonth()
    year = date.getFullYear()
  }
  return model.findAll({
    include: [
      {
        model: database.models.users,
        as: 'user'
      }
    ],
    where: {
      month: month,
      year: year
    }
  }).then(invoices => {

    return invoices.map((invoice) => {
      const { dataValues } = invoice
      return GetInvoice(dataValues)
    })
  })
}

module.exports = {
  create,
  update,
  //update,
  findById,
  destroy,
  getAll,
  getInvoiceByUserIdAndDate,
  getInvoicesByDate
}
