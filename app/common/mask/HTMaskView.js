import React, { Component } from 'react'
import { View, Pressable, LayoutAnimation, BackHandler, Platform, Keyboard, InteractionManager } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'


export default class HTMaskView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			backgroundOpacity: new Animated.Value(0),
		}
	}

	static animation = (key, value, duration, delay, easing = Easing.inOut(Easing.ease), complete) => {
		// InteractionManager.runAfterInteractions(() => {
			Animated.timing(key, {
				toValue: value,
				duration: duration,
				delay: delay,
				easing: easing,
				useNativeDriver: true,
			}).start(complete)
		// })
	}

	static switchAndroidHardwareTextureEnable = (contentRef, shouldEnabled = false) => {
		if (Platform.OS != 'android') {
			return
		}
		let propList = {
			renderToHardwareTextureAndroid: (typeof(shouldEnabled) == 'boolean') ? shouldEnabled : false,
		}
		contentRef && contentRef.setNativeProps(propList)
	}

	static layoutAnimation = (duration, create = 'opacity') => {
		if (duration <= 10) {
			return
		}
		LayoutAnimation.configureNext({
			duration: duration,
			create: {
		        type: LayoutAnimation.Types.easeInEaseOut,
		        property: LayoutAnimation.Properties[create],
		    },
		    update: {
		        type: 'easeInEaseOut',
		    }
		})
	}

	static stopLayoutAnimation = (create = 'opacity') => {
		LayoutAnimation.configureNext({
			duration: 11,
			create: {
		        type: LayoutAnimation.Types.easeInEaseOut,
		        property: LayoutAnimation.Properties[create],
		    },
		    update: {
		        type: 'easeInEaseOut',
		    }
		})
	}

	_backgroundDidTouch = () => {
		this.props?.backgroundDidTouch()
	}

	_nativeProps = (enable) => {
		return {
			pointerEvents: enable ? null : 'none'
		}
	}

	listenAndroidBack = (shouldListen) => {
		if (Platform.OS == 'android') {
			let methodName = shouldListen ? 'addEventListener' : 'removeEventListener'
			BackHandler[methodName]('hardwareBackPress', this.handlerAndroidBack)
		}
	}

	handlerAndroidBack = () => {
		// this.close()
		this?.props?.handlerAndroidBack && this.props.handlerAndroidBack()
		return true
	}

	open(duration = 350, animationStart, animationEnd) {
		this.listenAndroidBack(true)
		this.container.setNativeProps(this._nativeProps(true))
		animationStart && animationStart()
		this.constructor.animation(this.state.backgroundOpacity, 1, duration, 0, undefined, () => {
			animationEnd && animationEnd()
		})
	}

	close(duration = 350, animationStart, animationEnd) {
		if (this.props.dismissKeyboard ?? true) {
			Keyboard.dismiss()
		}
		this.listenAndroidBack(false)
		this.container.setNativeProps(this._nativeProps(false))
		animationStart && animationStart()
		this.constructor.animation(this.state.backgroundOpacity, 0, duration, 0, undefined, () => {
			animationEnd && animationEnd()
		})
	}

	render() {
		return (
			<View ref={ref => this.container = ref} {...this._nativeProps(false)} style={[styleList.container, StyleSheet.absoluteFill, this.props?.style]}>
				<Pressable activeOpacity={1} style={StyleSheet.absoluteFill} onPress={() => {
					this._backgroundDidTouch()
				}} >
					<Animated.View style={[
						StyleSheet.absoluteFill,
						styleList.maskBackgroundTransparent,
						{ opacity: this.state.backgroundOpacity },
						this?.props?.backgroundStyle,
					]}>
					</Animated.View>
				</Pressable>
				<View pointerEvents={'box-none'} style={[StyleSheet.absoluteFill, styleList.maskContentContainer, this?.props?.contentStyle]}>
					{
						this.props?.children
					}
				</View>
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		
	},
	maskBackgroundTransparent: {
		backgroundColor: 'rgba(0, 0, 0, 0.6)'
	},
	maskContentContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	}
})