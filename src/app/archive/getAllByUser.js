module.exports = (Repository) => {
    const getAllByUser = (userId) => {
        return Promise
            .resolve()
            .then(() =>
                Repository.getAllByUser(userId)
            )
            .catch(error => {
                throw new Error(error)
            })
    }

    return {
        getAllByUser
    }
}
