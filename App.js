import React, { useState } from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import ReduxThunk from 'redux-thunk' // пакет позволяет асинхронно использовать Redux

import productsReducer from './src/store/reducers/products'
import cartReducer from './src/store/reducers/cart'
import ordersReducer from './src/store/reducers/order'
import ShopNavigator from './src/navigation/ShopNavigator'

const rootReducer = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	orders: ordersReducer,
})
const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	})
}

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false)

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={err => console.log(err)}
			/>
		)
	}

	return (
		<Provider store={store}>
			<ShopNavigator />
		</Provider>
	)
}
