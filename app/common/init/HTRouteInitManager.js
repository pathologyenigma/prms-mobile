import React, { Component } from 'react'
import { Image, processColor, StyleSheet } from 'react-native'
import { HTRouteManager, HTRouteComponent, HTRouteView, HTNavigationBar } from 'react-native-route'
import HTShadowView from '~/common/view/HTShadowView'

export default class HTRouteInitManager {

	static init = () => {
		HTNavigationBar.defaultProps = {
			backgroundColor: 'white',
			titleStyle: {
				fontSize: 18,
				color: '#333'
			},
			backgroundView: (
				<View style={StyleSheet.absoluteFill}>
					<HTShadowView style={styleList.navigationBackgroundView}>
					</HTShadowView>
				</View>
			),
		}

		const readComponentOptionsFromProps = (props) => {
			let componentClass = HTRouteManager.readRegisterFunction(props)()
			let navigationOptions = componentClass?.navigationOptions ?? {}
			if (typeof(navigationOptions) == 'function') {
				let _navigationOptions = navigationOptions(props) ?? {}
				navigationOptions = _navigationOptions
			}
			navigationOptions = { ...navigationOptions }
			return navigationOptions
		}

		HTRouteManager.defaultRouteOption = (props) => {
			let navigationOptions = readComponentOptionsFromProps(props)
			return {
				showLoading: navigationOptions?.showLoading,
				backgroundColor: processColor(navigationOptions.backgroundColor ?? 'white'),
				lazyRender: navigationOptions.lazyRender ?? false,
				gestureEnabled: navigationOptions?.gestureEnabled ?? true,
				pointerEvents: navigationOptions?.pointerEvents ?? null,
			}
		}

		HTRouteManager.defaultRouteNavigationRender = (props) => {
			return null
			
			// let navigationOptions = readComponentOptionsFromProps(props)

			// // header
			// if ((navigationOptions.hasOwnProperty('header') && navigationOptions.header == null) || navigationOptions.headerShown == false) {
			// 	return null
			// }

			// // header item
			// let leftItemList = [
			// 	<HTRouteView style={styleList.navigationItemContainer}
			// 		routeData={props.navigation.createRouteData('pop')}
			// 	>
			// 		<Image source={require('~/resource/image/back.png')} />
			// 	</HTRouteView>
			// ]
			// if (navigationOptions.header_left) {
			// 	leftItemList = [ navigationOptions.header_left ]
			// }

			// // title
			// if (!navigationOptions.title) {
			// 	navigationOptions.title = navigationOptions.headerTitle
			// }
			// navigationOptions.backgroundColor = navigationOptions.headerBackgroundColor
			

			// return (
			// 	<HTNavigationBar
			// 		leftItemList={leftItemList}
			// 		{...navigationOptions}
			// 	/>
			// )
		}
	}

}

const styleList = StyleSheet.create({
	navigationBackgroundView: {
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
    	shadowColor: 'black',
    	shadowOpacity: 0.05,
    	shadowRadius: 10,
    	shadowOffset: {
    		width: 0,
    		height: 2,
    	},
	},
	navigationItemContainer: {
		paddingLeft: 0, 
		paddingRight: 30, 
		height: '100%', 
		justifyContent: 'center'
	}
})