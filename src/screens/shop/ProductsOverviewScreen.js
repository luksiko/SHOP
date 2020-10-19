import React from 'react'
import {Platform, FlatList, Button} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import ProductItem from '../../components/shop/ProductItem'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = (props) => {
	const products = useSelector((state) => state.produsts.availableProducts)

	const dispatch = useDispatch()

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
					title={itemData.item.title}
					uri={itemData.item.imageUrl}
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
