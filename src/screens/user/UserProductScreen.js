import React, { useState, useCallback, useEffect } from 'react'
import { FlatList, Platform, Button, Alert, View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as productsActions from '../../store/actions/products'

const UserProductScreen = props => {
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState()
	const userProducts = useSelector(state => state.products.userProducts)
	const dispatch = useDispatch()

	const editProductHandler = id => {
		props.navigation.navigate('EditProduct', { productId: id })
	}
	const delProducts = useCallback(
		async id => {
			setError(null)
			setIsLoading(true)
			try {
				await dispatch(productsActions.deleteProduct(id))
			} catch (err) {
				setError(err.message)
			}
			setIsLoading(false)
		},
		[dispatch, setError, setIsLoading],
	)

	useEffect(() => {
		if (error) {
			Alert.alert('An error occurred!', error, [{ text: 'Okay' }])
		}
	}, [error])

	const deleteHandler = id => {
		Alert.alert('Are you sure?', 'Do you really want delete this item?', [
			{ text: 'No', style: 'default' },
			{
				text: 'Yes',
				style: 'destructive',
				onPress: () => delProducts(id),
			},
		])
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size='large' color={Colors.primary} />
			</View>
		)
	}

	if (userProducts.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No products found. Maybe start creating some?</Text>
			</View>
		)
	}

	return (
		<FlatList
			data={userProducts}
			renderItem={itemData => (
				<ProductItem
					title={itemData.item.title}
					uri={itemData.item.imageUrl}
					price={itemData.item.price}
					onSelectItem={() => {}}>
					<Button color={Colors.primary} title='Edit' onPress={() => editProductHandler(itemData.item.id)} />
					<Button
						color={Colors.primary}
						title='Delete'
						onPress={() => {
							deleteHandler(itemData.item.id)
						}}
					/>
				</ProductItem>
			)}
		/>
	)
}
UserProductScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Your Products',
		headerLeft: () => (
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
					title='Menu'
					iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
					iconSize={27}
					onPress={() => {
						navData.navigation.navigate('EditProduct')
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
})

export default UserProductScreen
