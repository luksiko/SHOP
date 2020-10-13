export const SET_FILTERS = 'SET_FILTERS'

export const setFilters = (filterSettings) => {
	return { type: SET_FILTERS, filters: filterSettings }
}
