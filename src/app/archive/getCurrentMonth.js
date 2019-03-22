module.exports = (Repository) => {
    const getCurrentMonth = () => {
        return Promise
            .resolve()
            .then(() =>
                Repository.getCurrentMonth()
            )
            .catch(error => {
                throw new Error(error)
            })
    }

    return {
        getCurrentMonth
    }
}
