import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

const CardScreen = (props) => {
	return (
		<View style={{ ...styles.content, ...props.style }}>
			<Text>CardScreen</Text>
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

export default CardScreen
