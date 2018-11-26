 /**
  * function for getter roles.
  */
module.exports = ({ roleRepository }) => {
  const all = () => {
    return Promise
      .resolve()
      .then(() =>
      roleRepository.getAll({
        attributes: [
          'id', 'rolName', 'workMode', 'basicSalary', 'extraHours', 'payExtraHours', 'description'
        ]
      })
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all
  }
}
