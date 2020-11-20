import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Platform, ActivityIndicator, View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as ordersActions from '../../store/actions/order'
import Colors from '../../constants/Colors'

const OrdersScreen = props => {
	const [isLoading, setIsLoading] = useState(false)

	const orders = useSelector(state => state.orders.orders)
	const dispatch = useDispatch()

	useEffect(() => {
		setIsLoading(true)
		// это вариант c then() вмест asinc awate
		dispatch(ordersActions.fetchOrders()).then(() => {
			setIsLoading(false)
		})
	}, [dispatch])

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size='large' color={Colors.primary} />
			</View>
		)
	}
	if (orders.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No orders found. Maybe start ordering some?</Text>
			</View>
		)
	}

	return (
		<FlatList
			data={orders}
			keyExtractor={item => item.id}
			renderItem={itemData => (
				<OrderItem
					amount={itemData.item.totalAmount}
					date={itemData.item.readableDate}
					items={itemData.item.items}
				/>
			)}
		/>
	)
}

export const screenOptions = navData => {
	return {
		headerTitle: 'Your Orders',
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
	}
}

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default OrdersScreen
