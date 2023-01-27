const usedCommandRecently = new Set()

const isFiltered = (from) => !!usedCommandRecently.has(from)
const addFilter = (from) => {
usedCommandRecently.add(from)
setTimeout(() => usedCommandRecently.delete(from), 6000) }

module.exports = {isFiltered, addFilter}
