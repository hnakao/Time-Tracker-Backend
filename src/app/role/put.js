/**
 * this file will hold all the get use-case for role domain
 */
const { Role } = require('src/domain/role')

 /**
  * function for update role.
  */
module.exports = ({ roleRepository }) => {
  const update = ({ id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const role = Role(body)
        await roleRepository.update(role, {
          where: { id }
        })

        resolve(role)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    update
  }
}
