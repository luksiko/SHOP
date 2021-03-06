import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ScrollView, View, StyleSheet, Text, Image, Button } from 'react-native'
import Colors from '../../constants/Colors'
import * as cartActions from '../../store/actions/cart'

const ProductDetailScreen = props => {
	const product = useSelector(state => state.products.availableProducts)
	const productId = props.navigation.getParam('productId')
	const selectedProduct = product.find(prod => prod.id === productId)

	// props.navigation.setParams({ mealTitle: selectedProduct.title })
	const dispatch = useDispatch()

	return (
		<ScrollView>
			<Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
			<View style={styles.action}>
				<Button
					color={Colors.primary}
					title='Add to Cart'
					onPress={() => {
						dispatch(cartActions.addToCart(selectedProduct))
					}}
				/>
			</View>
			<Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
			<Text style={styles.description}>{selectedProduct.description}</Text>
		</ScrollView>
	)
}

export const screenOptions = navData => {
	return {
		headerTitle: navData.navigation.getParam('productTitle'),
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	action: {
		marginVertical: 10,
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: 300,
	},
	price: {
		fontFamily: 'open-sans-bold',
		fontSize: 20,
		color: '#888',
		textAlign: 'center',
		marginVertical: 22,
	},
	description: {
		fontFamily: 'open-sans',
		fontSize: 14,
		textAlign: 'center',
		marginHorizontal: 20,
	},
})

export default ProductDetailScreen
