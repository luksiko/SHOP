import React, { useState, useEffect, useCallback } from 'react'
import { View, Platform, FlatList, Button, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = props => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState()
	const products = useSelector(state => state.products.availableProducts)
	const dispatch = useDispatch()

	//обращаемся к базе Firebase
	const loadProducts = useCallback(async () => {
		setError(null)
		setIsLoading(true)
		try {
			await dispatch(productsActions.fetchProducts())
		} catch (err) {
			setError(err.message)
		}
		setIsLoading(false)
	}, [dispatch, setError, setIsLoading])

	// добавляем слушатель на смену экрана. До загрузки срабатывает. Позволяет обновлять данные на странице
	useEffect(() => {
		const willFocuceSub = props.navigation.addListener('willFocus', loadProducts)

		return () => {
			willFocuceSub.remove()
		}
	}, [loadProducts])

	useEffect(() => {
		loadProducts()
	}, [dispatch, loadProducts])

	const selectItemHandler = (id, title) => {
		props.navigation.navigate('ProductDetail', {
			productId: id,
			productTitle: title,
		})
	}

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title='Try again' onPress={loadProducts} color={Colors.primary} />
			</View>
		)
	}
	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size='large' color={Colors.primary} />
			</View>
		)
	}

	if (!isLoading && products.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No product found. Maybe start add again!</Text>
			</View>
		)
	}
	return (
		<FlatList
			data={products}
			renderItem={itemData => (
				<ProductItem
					uri={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onSelectItem={() => selectItemHandler(itemData.item.id, itemData.item.title)}>
					<Button
						color={Colors.primary}
						title='View Details'
						onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
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
ProductsOverviewScreen.navigationOptions = navData => {
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
const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
export default ProductsOverviewScreen
