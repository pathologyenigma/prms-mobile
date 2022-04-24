import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

export default class Hud extends Component {

	show = () => {
		this.indicator.setNativeProps({
			animating: true
		})
	}

	hidden = () => {
		this.indicator.setNativeProps({
			animating: false
		})
	}

	render() {
		return (
			<View pointerEvents={'none'} style={[StyleSheet.absoluteFill, styleList.container]}>
				<ActivityIndicator animating={false} color='gray' size="small" ref={ref => this.indicator = ref} />
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center'
	}
})