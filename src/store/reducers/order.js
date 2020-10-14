import { ADD_ORDER } from '../actions/order'
import Order from '../../models/order'

const initialState = {
	orders: [],
}
export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_ORDER:
			const newOrder = new Order(
				new Date().toString(),
				action.orderData.items,
				action.amount,
				new Date(),
			)
			return {
				...state,
				orders: state.orders.concat(newOrder), // concat() создает новый массив из нескольких, добавляя и не изменяя прежний
			}
	}

	return state
}
