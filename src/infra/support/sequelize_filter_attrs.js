const toSequelizeFilter = (filterParams, user, role) => {
  const attrs = {}
  var mDate = new Date();
  var firstDay = new Date(mDate.getFullYear(), mDate.getMonth(), 1);
  var lastDay = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 0);

  if (!isEmpty(filterParams.filter)) {
    console.log(JSON.stringify(filterParams.filter))
    const mFilter = filterParams.filter
    const startDate = (mFilter.startDate) ? new Date(mFilter.startDate) : firstDay
    const endDate = (mFilter.endDate) ? new Date(mFilter.endDate): lastDay

    Object.assign(attrs, {
      where: {
        date: {
          $between: [startDate, endDate]
        },
        projectId: mFilter.projectId,
        userId: mFilter.userId
      }
    })
  } else{
    const userId = (role.roleName !== "admin") ? user.id : ""
    Object.assign(attrs, {
      where: {
        date: {
          $between: [firstDay, lastDay]
        },
        userId: userId
      }
    })
  }
  return attrs
}

const isEmpty = (obj) => !obj || Object.keys(obj).length === 0


module.exports = {
  toSequelizeFilter
}
