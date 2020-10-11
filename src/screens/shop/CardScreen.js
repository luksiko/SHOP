import React from 'react'
import { View, StyleSheet } from 'react-native'

const CardScreen = (props) => {
	return <View style={{ ...styles.STYLENAME, ...props.style }}></View>
}

const styles = StyleSheet.create({ STYLENAME: {} })

export default CardScreen
