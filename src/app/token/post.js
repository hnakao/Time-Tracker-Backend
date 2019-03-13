/**
 * this file will hold all the get use-case for user domain
 */
const Token = require('src/domain/token')
const container = require('src/container')
const { database } = container.cradle

 /**
  * function for getter user.
  */
module.exports = ({ userRepository, webToken }) => {
  // code for getting all the items
  const validate = ({ body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const credentials = Token(body)
        const user = await userRepository.findOne({
          attributes: [
            'id', 'firstName', 'lastName', 'email', 'password', 'role', 'isDeleted', 'mobile', 'salary', 'internet'
          ],
          where: {
            email: credentials.email,
            isDeleted: 0
          }
        })

        const validatePass = userRepository.validatePassword(user.password)

        if (!validatePass(credentials.password)) {
          throw new Error('Invalid Credentials')
        }
        const signIn = webToken.signin()

        resolve({
          token: signIn({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roleName: user.role
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
