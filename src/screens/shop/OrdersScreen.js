import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const OrdersScreen = (props) => {
	return (
		<View style={styles.content}>
			<Text>OrdersScreen</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})

export default OrdersScreen
