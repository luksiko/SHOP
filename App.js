import React, { useState } from 'react'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'
import ShopNavigator from './src/navigation/ShopNavigator'
import ProductsOverviewScreen from './src/screens/shop/ProductsOverviewScreen'
import productsReducer from './src/store/reducers/products'

const rootReduser = combineReducers({
	produsts: productsReducer,
})
const store = createStore(rootReduser)

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
				onError={(err) => console.log(err)}
			/>
		)
	}

	return (
		<Provider store={store}>
			<ShopNavigator />
		</Provider>
	)
}
