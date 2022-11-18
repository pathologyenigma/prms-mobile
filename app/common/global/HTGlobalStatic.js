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
	Route
*/

import { HTRouteView } from 'react-native-route'
global.HTRouteView = HTRouteView


/*
	Request
*/

import HTAPI from '~/common/request/HTAPI'
global.HTAPI = HTAPI


/*
	业务
*/

import HTEmptyView from '~/common/view/HTEmptyView'

global.BIND_EMPTY_VIEW = () => {
	return {
		ListEmptyComponent: <HTEmptyView />
	}
}

global.TODO_TOAST = () => {
	global.Toast.show('正在开发中敬请期待...')
}

global.AVATAR_IMAGE = (uri, placeholder) => {
	if ((uri?.length ?? 0) > 0 && uri != 'default_hr_logo') {
		return { uri }
	}
	return placeholder ?? require('~/assets/requestJobs/mine_avatar.png')
}


