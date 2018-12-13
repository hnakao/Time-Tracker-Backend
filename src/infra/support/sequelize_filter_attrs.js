const toSequelizeFilter = (filterParams, user, role) => {
  const attrs = {}
  const mDate = new Date();
  const firstDay = new Date(mDate.getFullYear(), mDate.getMonth(), 1);
  const lastDay = new Date(mDate.getFullYear(), mDate.getMonth() + 1, 0);
  const userOption = (role.roleName !== "admin") ? { userId: user.id } : {}

  if (!isEmpty(filterParams.filter)) {
    const mFilter = filterParams.filter
    const startDate = (mFilter.startDate) ? new Date(mFilter.startDate) : firstDay
    const endDate = (mFilter.endDate) ? new Date(mFilter.endDate): lastDay

    const whereConditions = { date: { $between: [startDate, endDate] }}
    Object.keys(mFilter).forEach(key => {
      if(key !== "startDate" && key !== "endDate"){
        Object.assign(whereConditions, { [key]: mFilter[key]})
      }
    });

    if(!hasProp(whereConditions, "userId")){
      if(!isEmpty(userOption))
        Object.assign(whereConditions, userOption)
    }

    Object.assign(attrs, {
      where: whereConditions
    })
  } else{
    const whereConditions = { date: { $between: [firstDay, lastDay] }}
    if(!isEmpty(userOption))
        Object.assign(whereConditions, userOption)
    Object.assign(attrs, {
      where: whereConditions
    })
  }
  return attrs
}

const isEmpty = (obj) => !obj || Object.keys(obj).length === 0
const hasProp = (obj, key) => obj ? hasOwnProperty.call(obj, key) : false;

module.exports = {
  toSequelizeFilter
}
