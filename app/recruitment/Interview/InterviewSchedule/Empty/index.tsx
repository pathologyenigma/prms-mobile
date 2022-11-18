import React, { useState } from 'react'
import {
	ViewStyle,
	StyleProp,
	TextStyle,
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native'

export default function Empty() {
	return (
		<View style={styles.container}>
			<Text style={styles.description}>今日暂无面试安排</Text>
			<Image style={styles.image} source={require('./404.png')} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	description: {
		color: '#666666',
		fontSize: 15,
	},
	image: {
		marginTop: 32,
		marginBottom: 80,
	},
})
