const filters = {
    searchText: '',
    hideCompleted: false
}


const setFilters = (updates) => {
    
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    }

    if (typeof updates.hideCompleted === 'boolean') {
        filters.hideCompleted = updates.hideCompleted
    }

}

const getFilters = () => filters

export { getFilters, setFilters }