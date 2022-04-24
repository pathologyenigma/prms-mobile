/*
	Style
*/

global.CONTAINER = {
	flex: 1
}

global.COLOR = (red, green, blue, alpha = 1) => {
	let colorConvert = (color) => {
		return color * 255
	}
	return `rgba(${colorConvert(red)}, ${colorConvert(green)}, ${colorConvert(blue)}, ${alpha})`
}

import { processColor, PixelRatio } from 'react-native'

global.COLOR_ALPHA = (color, alpha = 1) => {
	let intColor = processColor(color)
	let red = ((intColor >> 16) & 0xff) / 255.0
	let green = ((intColor >> 8) & 0xff) / 255.0
	let blue = ((intColor) & 0xff) / 255.0
	return COLOR(red, green, blue, alpha)
}


/*
	Screen
*/

import React from 'react'
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native'

const { width, height } = Dimensions.get('window')

global.View = View

global.StyleSheet = StyleSheet

global.SCREEN_WIDTH = width

global.SCREEN_HEIGHT = height

global.SEPARATOR_HEIGHT = 1 / PixelRatio.get()


import HTNavigationBar from '~/common/navigation/HTNavigationBar'
HTNavigationBar.defaultProps = {
	titleStyle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333333'
	},
	backgroundColor: 'white'
}

global.STATUS_BAR_HEIGHT = HTNavigationBar.STATUS_BAR_HEIGHT
global.HOME_BAR_HEIGHT = HTNavigationBar.HOME_BAR_HEIGHT
global.TAB_BAR_HEIGHT = global.HOME_BAR_HEIGHT + Platform.select({
	ios: 49,
	android: 66
})

import { Image } from 'react-native'
import FastImage from 'react-native-fast-image'
global.CacheImage = Platform.OS == 'ios' ? FastImage : Image





/*
	Request
*/

import HTAPI from '~/common/request/HTAPI'
global.HTAPI = HTAPI




