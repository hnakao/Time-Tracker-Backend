module.exports = (Repository) => {
    const getAll = (month, year) => {
        return Promise
            .resolve()
            .then(() =>
                Repository.getInvoicesByDate(month, year)
            )
            .catch(error => {
                throw new Error(error)
            })
    }

    return {
        getAll
    }
}
