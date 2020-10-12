import React from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

const ProductsOverviewScreen = (props) => {
	const products = useSelector((state) => state.produsts.availableProducts)

	return (
		<FlatList
			data={products}
			renderItem={(itemData) => <Text>{itemData.item.title}</Text>}
		/>
	)
}

ProductsOverviewScreen.navigationOptions = {
	headerTitle: 'All Products',
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default ProductsOverviewScreen
