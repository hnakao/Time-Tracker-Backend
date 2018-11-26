/**
 * this file will hold all the get use-case for role domain
 */
const { Role } = require('src/domain/role')
 /**
  * function for create role.
  */
module.exports = ({ roleRepository }) => {
  const create = ({ body }) => {
    return Promise
      .resolve()
      .then(() => {
        const role = Role(entity)
        return roleRepository.create(role)
      })
      .catch((error) => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
