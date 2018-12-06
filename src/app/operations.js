module.exports = (Repository, Domain, attrs) => {
  const moment = require('moment')

  const create = ({ body }) => {
    return Promise
      .resolve()
      .then(() => {
        body.date = new Date(body.date)
        const domain = Domain(body)

        return Repository.create(domain)
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  const remove = ({ id }) => {
    return Promise
      .resolve()
      .then(() =>
        Repository.destroy(id)
      )
      .catch((error) => {
        throw new Error(error)
      })
  }

  const update = ({ id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const domain = Domain(body)
        await Repository.update(domain, id)
        resolve(domain)
      } catch (error) {
        reject(error)
      }
    })
  }

  const all = () => {
    return Promise
      .resolve()
      .then(() =>
        Repository.getAll(attrs)
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  const getOne = (id) => {
    return Promise
      .resolve()
      .then(() =>
        Repository.findById(id)
      )
  }

  const getAllUseCase = { all }
  const getOneUseCase = { getOne }
  const createUseCase = { create }
  const removeUseCase = { remove }
  const updateUseCase = { update }

  return {
    createUseCase,
    getAllUseCase,
    removeUseCase,
    updateUseCase,
    getOneUseCase
  }
}
