/**
 * this file will hold all the get use-case for user domain
 */
const Token = require('src/domain/token')
const container = require('src/container')
const { database } = container.cradle
const roleModel = database.models.roles

 /**
  * function for getter user.
  */
module.exports = ({ userRepository, webToken }) => {
  // code for getting all the items
  const validate = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = Token(body)
        const userCredentials = await userRepository.findOne({
          attributes: [
            'id', 'firstName', 'lastName', 'email', 'password', 'roleId', 'isDeleted'
          ],
          where: {
            email: credentials.email,
            isDeleted: 0
          }
        })

        const role = await roleModel.findById(userCredentials.roleId)

        const validatePass = userRepository.validatePassword(userCredentials.password)

        if (!validatePass(credentials.password)) {
          throw new Error('Invalid Credentials')
        }
        const signIn = webToken.signin()

        resolve({
          token: signIn({
            id: userCredentials.id,
            firstName: userCredentials.firstName,
            lastName: userCredentials.lastName,
            email: userCredentials.email,
            roleName: role.roleName
          })
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    validate
  }
}
