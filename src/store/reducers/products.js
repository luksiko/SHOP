import PRODUCTS from '../../data/dummy-data'

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
}

const mealsReducer = (state = initialState, action) => {
	return state
}

export default mealsReducer
