import { ADD_ORDER, SET_ORDERS } from '../actions/order'
import Order from '../../models/order'

const initialState = {
	orders: [],
}
export default (state = initialState, action) => {
	switch (action.type) {
		case SET_ORDERS:
			return {
				orders: action.orders,
			}
		case ADD_ORDER:
			const newOrder = new Order(
				action.orderData.id,
				action.orderData.items,
				action.orderData.amount,
				action.orderData.date,
			)
			return {
				...state,
				orders: state.orders.concat(newOrder), // concat() создает новый массив из нескольких, добавляя и не изменяя прежний
			}
	}

	return state
}
