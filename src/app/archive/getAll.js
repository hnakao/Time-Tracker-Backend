module.exports = (Repository) => {
    const getAll = (userId) => {
        return Promise
            .resolve()
            .then(() =>
                Repository.getArchives(userId)
            )
            .catch(error => {
                throw new Error(error)
            })
    }

    return {
        getAll
    }
}
