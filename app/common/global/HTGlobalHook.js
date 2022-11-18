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
import { View, Text, Image, TextInput, ScrollView, VirtualizedList, Platform, ActivityIndicator } from 'react-native'

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

const TEXT_RELOAD_PROPS = (props) => {
	let fontSize = StyleSheet.flatten(props?.style)?.fontSize ?? 12
	fontSize += 1
	let lineHeight = StyleSheet.flatten(props?.style)?.lineHeight
	if (lineHeight) {
		lineHeight += 2
	}
	return { style: { fontSize, lineHeight } }
}

hook(Text, TEXT_DEFAULT_PROPS, TEXT_RELOAD_PROPS)

hook(TextInput, TEXT_DEFAULT_PROPS, TEXT_RELOAD_PROPS)

import { SmartRefreshControl, MJRefreshHeader, SwipeRefreshHeader } from 'react-native-smartrefreshlayout'

const SCROLL_RELOAD_PROPS = (props) => {
	const onRefresh = props?.onRefresh
	let children = props?.children ?? []
	if (props?.onEndReachedThreshold != 0.1 && props?.onEndReached && (props?.data ?? props.sections ?? []).length > 0) {
		let allLoaded = (props?.allLoaded ?? props?.refreshManager?.allLoaded) ?? false
		children.push((
			<View key={'_ht_footer'} style={{ height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
				{
					!allLoaded && <ActivityIndicator style={{ marginRight: 15 }} size={'small'} color={'#888'} />
				}
				<Text style={{ fontSize: 14, color: '#555' }}>{allLoaded ? '已加载全部数据' : '数据加载中请稍后…'}</Text>
			</View>
		))
	}
	return { 
		refreshControl: onRefresh && Platform.select({
			ios: (
				<MJRefreshHeader
					onRefresh={onRefresh}
				/>
			),
			android: (
				<SwipeRefreshHeader 
					colors={['#FF6249', '#FE4261']}
					onRefresh={onRefresh}
				/>
			)
		}),
		children: children
	}
}

hook(ScrollView, {
	overScrollMode: 'always', 
	keyboardDismissMode: 'on-drag', 
	keyboardShouldPersistTaps: 'handled',
	removeClippedSubviews: Platform.OS == 'ios' ? null : false
}, SCROLL_RELOAD_PROPS)

hook(VirtualizedList, { refreshing: false, keyExtractor: (item, index) => `${index}`, onEndReachedThreshold: 0 })

