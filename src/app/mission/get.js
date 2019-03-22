module.exports = (Repository) => {
    const getCurrentMonth = () => {
        return Promise
            .resolve()
            .then(() => {
                return Repository.getMissions()
            })
            .catch(error => {
                throw new Error(error)
            })
    }

    return {
        getCurrentMonth
    }
}
