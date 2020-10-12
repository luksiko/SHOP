import React from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'

const ProductsOverviewScreen = (props) => {
	const products = useSelector((state) => state.produsts.availableProducts)

	return (
		<FlatList
			data={products}
			renderItem={(itemData) => (
				<ProductItem
					title={itemData.item.title}
					uri={itemData.item.imageUrl}
					price={itemData.item.price}
					onViewDetail={() =>
						props.navigation.navigate('ProductDetail', {
							productId: itemData.item.id,
							productTitle: itemData.item.title,
						})
					}
					onAddToCart={() => props.navigation.navigate('CardScreen')}
				/>
			)}
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
