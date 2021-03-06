import React, { useState, useEffect, useCallback } from 'react'
import { View, Platform, FlatList, Button, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import ProductItem from '../../components/shop/ProductItem'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'

const ProductsOverviewScreen = props => {
	const [isLoading, setIsLoading] = useState(false)
	const [isRefreshing, setIsRefreshing] = useState(false)
	const [error, setError] = useState()
	const [counting, setCounting] = useState(0)
	const products = useSelector(state => state.products.availableProducts)
	const dispatch = useDispatch()

	//обращаемся к базе Firebase
	const loadProducts = useCallback(async () => {
		setError(null)
		setIsRefreshing(true)
		try {
			await dispatch(productsActions.fetchProducts())
		} catch (err) {
			setError(err.message)
		}
		setIsRefreshing(false)
	}, [dispatch, setError, setIsLoading])

	// добавляем слушатель на смену экрана. До загрузки срабатывает. Позволяет обновлять данные на странице
	useEffect(() => {
		const willFocuceSub = props.navigation.addListener('willFocus', loadProducts)

		return () => {
			willFocuceSub.remove()
		}
	}, [loadProducts])

	useEffect(() => {
		setIsLoading(true)
		loadProducts().then(() => setIsLoading(false))
	}, [dispatch, loadProducts])

	useEffect(() => {
		props.navigation.setParams({ counting: counting })
	}, [counting])

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
			onRefresh={loadProducts}
			refreshing={isRefreshing}
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
						onPress={() => {
							setCounting(counting + 1)
							dispatch(cartActions.addToCart(itemData.item))
						}}
					/>
				</ProductItem>
			)}
		/>
	)
}

export const screenOptions = navData => {
	return {
		headerTitle: 'All Products',
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Menu'
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					onPress={() => {
						navData.navigation.toggleDrawer()
					}}
				/>
			</HeaderButtons>
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Cart'
					iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					onPress={() => {
						navData.navigation.navigate('Cart')
					}}
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
	number: {
		fontFamily: 'open-sans-bold',
		color: Colors.primary,
	},
	container: {
		position: 'absolute',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.accent,
		borderRadius: 8,
		width: 16,
		height: 16,
		zIndex: 9,
		left: 16,
		top: -6,
	},
})
export default ProductsOverviewScreen
