const hook = (component, defaultProps, reloadPropsFunction) => {
	const componentRender = component.render
	if (component.__render) {
		return
	}
	component.__render = componentRender

	const initalizeProps = component.defaultProps
	component.defaultProps = {
		...initalizeProps,
		...defaultProps,
		style: [
			initalizeProps?.style,
			defaultProps?.style, 
		]
	}

	if (reloadPropsFunction == null) {
		return
	}
	
	component.render = (props, ref) => {
		let reloadProps = reloadPropsFunction.call(this, props)
		let propsList = { 
			...defaultProps, 
			...props, 
			...reloadProps,
			style: [
				defaultProps?.style, 
				StyleSheet.flatten(props?.style),
				reloadProps?.style,
			] 
		}
		return componentRender.call(this, propsList, ref)
	}
}

import React from 'react'
import { Text, Image, TextInput, ScrollView, FlatList, Platform } from 'react-native'

hook(Image, { fadeDuration: 0 })

const TEXT_DEFAULT_PROPS = {
	allowFontScaling: false,
	autoCapitalize: 'none',
	autoComplete: 'off',
	autoCorrect: false,
	autoFocus: false,
	blurOnSubmit: true,
	enablesReturnKeyAutomatically: false,
	keyboardAppearance: 'dark',
	placeholderTextColor: '#999999',
	padding: 0
}

hook(Text, TEXT_DEFAULT_PROPS)

hook(TextInput, TEXT_DEFAULT_PROPS)

import { SmartRefreshControl, MJRefreshHeader, SwipeRefreshHeader } from 'react-native-smartrefreshlayout'

const SCROLL_RENDER_PROPS_FUNCTION = (props) => {
	let onRefresh = props?.onRefresh
	if (onRefresh == null) {
		return {}
	}
	let refreshControl = null
	if (Platform.OS == 'ios') {
		refreshControl = (
			<MJRefreshHeader
				onRefresh={onRefresh}
			/>
		)
	} else if (Platform.OS == 'android') {
		refreshControl = (
			<SwipeRefreshHeader 
				colors={['#FF6249', '#FE4261']}
				onRefresh={onRefresh}
			/>
		)
	}
	return { refreshControl }
}

hook(ScrollView, {
	overScrollMode: 'always', 
	keyboardDismissMode: 'on-drag', 
	keyboardShouldPersistTaps: 'handled',
	keyExtractor: (item, index) => `${index}`, 
	removeClippedSubviews: Platform.OS == 'ios' ? null : false
}, SCROLL_RENDER_PROPS_FUNCTION)

hook(FlatList, { refreshing: false })

