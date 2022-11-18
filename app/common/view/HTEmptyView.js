import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default class HTEmptyView extends Component {

	render() {
		return (
			<View style={[styleList.container, {
				height: SCREEN_HEIGHT / 2,
			}, this.props.style]}>
				<Image source={require('~/recruitment/components/Empty/404.png')} />
				<Text style={styleList.title}>这儿什么也没有哦～</Text>
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		marginTop: 20,
		fontSize: 16,
		color: '#666',
	},
})