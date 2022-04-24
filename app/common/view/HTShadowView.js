import React, { Component } from 'react'
import { View, Platform, StyleSheet } from 'react-native'
// import { Shadow } from 'react-native-shadow-2'
import ShadowView from 'react-native-simple-shadow-view'

export default class HTShadowView extends Component {

	render() {
		if (Platform.OS == 'android') {
			return (
				<ShadowView {...this.props} />
			)
			// let styleList = StyleSheet.flatten(this.props?.style)
			// let { 
			// 	shadowColor = 'clear', 
			// 	shadowOffset = {
			// 		width: 0,
			// 		height: 0
			// 	},
			// 	shadowOpacity = 1, 
			// 	shadowRadius = null,
			// 	borderRadius = null,
			// 	borderTopLeftRadius = 0,
			// 	borderTopRightRadius = 0,
			// 	borderBottomLeftRadius = 0,
			// 	borderBottomRightRadius = 0,
			// } = styleList
			// shadowColor = COLOR_ALPHA(shadowColor, shadowOpacity * 0.8)
			// if (shadowRadius != null) {
			// 	borderTopLeftRadius = shadowRadius
			// 	borderTopRightRadius = shadowRadius
			// 	borderBottomLeftRadius = shadowRadius
			// 	borderBottomRightRadius = shadowRadius
			// } else if (borderRadius != null) {
			// 	borderTopLeftRadius = borderRadius
			// 	borderTopRightRadius = borderRadius
			// 	borderBottomLeftRadius = borderRadius
			// 	borderBottomRightRadius = borderRadius
			// }
			// let { flex, zIndex, elevation, marginTop, marginLeft, marginBottom, marginRight, margin, ...otherStyle } = StyleSheet.flatten(this.props.style)
			// let containerViewStyle = { flex, zIndex, elevation, marginTop, marginLeft, marginBottom, marginRight, margin }
			// return (
			// 	<Shadow 
			// 		startColor={shadowColor}
			// 		radius={{ topLeft: borderTopLeftRadius, topRight: borderTopRightRadius, bottomLeft: borderBottomLeftRadius, bottomRight: borderBottomRightRadius }} 
			// 		offset={[shadowOffset.width, shadowOffset.height]} 
			// 		viewStyle={otherStyle}
			// 		containerViewStyle={containerViewStyle}
			// 	>
			// 	{
			// 		this.props.children
			// 	}
			// 	</Shadow>
			// )
		}
		return (
			<View {...this.props} />
		)
		
	}

}