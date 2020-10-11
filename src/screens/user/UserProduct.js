import React from 'react'
import { View, StyleSheet } from 'react-native'

const UserProduct = (props) => {
	return (
		<View style={{ ...styles.STYLENAME, ...props.style }}>
			<Text>UserProduct</Text>
		</View>
	)
}

const styles = StyleSheet.create({ STYLENAME: {} })

export default UserProduct
