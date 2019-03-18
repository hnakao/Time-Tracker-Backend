module.exports = (Repository) => {
    const getAll = (start, end) => {
        return Promise
            .resolve()
            .then(() => {
                var startDate = new Date(start);
                var endDate = new Date(end);
                return Repository.getMissions(startDate, endDate)
            })
            .catch(error => {
                throw new Error(error)
            })
    }

    return {
        getAll
    }
}
