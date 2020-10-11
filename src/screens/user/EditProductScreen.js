import React from 'react'
import { View, StyleSheet } from 'react-native'

const EditProductScreen = (props) => {
	return (
		<View style={{ ...styles.STYLENAME, ...props.style }}>
			<Text>EditProductScreen</Text>
		</View>
	)
}

const styles = StyleSheet.create({ STYLENAME: {} })

export default EditProductScreen
