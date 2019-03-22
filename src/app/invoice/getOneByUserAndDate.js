module.exports = (Repository) => {
    const getOne = (userId, month, year) => {
        return Promise
            .resolve()
            .then(() =>
                Repository.getInvoiceByUserIdAndDate(userId, month, year)
            )
            .catch(error => {
                throw new Error(error)
            })
    }

    return {
        getOne
    }
}
