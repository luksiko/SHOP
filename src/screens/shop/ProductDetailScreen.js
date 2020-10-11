import React from 'react'
import { View, StyleSheet } from 'react-native'

const ProductDetailScreen = (props) => {
	return <View style={{ ...styles.STYLENAME, ...props.style }}></View>
}

const styles = StyleSheet.create({ STYLENAME: {} })

export default ProductDetailScreen
