import React, { useEffect } from 'react'
import { Platform, FlatList, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = (props) => {
	const products = useSelector((state) => state.products.availableProducts)
	const dispatch = useDispatch()
	//обращаемся к базе Firebase
	useEffect(() => {
		dispatch(productsActions.fetchProducts())
	}, [dispatch])

	const selectItemHandler = (id, title) => {
		props.navigation.navigate('ProductDetail', {
			productId: id,
			productTitle: title,
		})
	}

	return (
		<FlatList
			data={products}
			renderItem={(itemData) => (
				<ProductItem
					uri={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelectItem={() =>
						selectItemHandler(itemData.item.id, itemData.item.title)
					}>
					<Button
						color={Colors.primary}
						title='View Details'
						onPress={() =>
							selectItemHandler(itemData.item.id, itemData.item.title)
						}
					/>
					<Button
						color={Colors.primary}
						title='To Cart'
						onPress={() => dispatch(cartActions.addToCart(itemData.item))}
					/>
				</ProductItem>
			)}
		/>
	)
}
ProductsOverviewScreen.navigationOptions = (navData) => {
	return {
		headerTitle: 'All Products',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title='Menu'
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					iconSize={27}
					onPress={() => {
						navData.navigation.toggleDrawer()
					}}
				/>
			</HeaderButtons>
		),
		headerRight: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title='Cart'
					iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					onPress={() => navData.navigation.navigate('CardScreen')}
				/>
			</HeaderButtons>
		),
	}
}

export default ProductsOverviewScreen
