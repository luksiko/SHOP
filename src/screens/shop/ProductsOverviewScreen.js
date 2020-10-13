import React, { useEffect, useCallback } from 'react'
import { StyleSheet, Text, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import ProductItem from '../../components/shop/ProductItem'

const ProductsOverviewScreen = (props) => {
	const products = useSelector((state) => state.produsts.availableProducts)

	const dispatch = useDispatch()

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
					onAddToCart={() => dispatch(cartActions.addToCart(itemData.item))}
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
