import React, { Component } from 'react'
import { View, Keyboard, DeviceEventEmitter, LayoutAnimation, Platform, PixelRatio } from 'react-native'
// import RNCommon from 'react-native-common'
// import DeviceInfo from 'react-native-device-info'

global.KEYBOARD_HEIGHT = 0

global.kHTKeyboardHeightWillChange = 'kHTKeyboardHeightWillChange'

global.KEYBOARD_ANIMATION = (event) => {
	HTKeyboardManager.animation(event)
}

export default class HTKeyboardManager {

	static init() {
		if (Platform.OS == 'ios') {
			this.keyboardWillChangeFrameListener = Keyboard.addListener('keyboardWillChangeFrame', this._keyboardWillChangeFrame)
		} else {
			this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardWillChangeFrame)
			this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardWillChangeFrame)
		}
	}

	static animation = (event) => {
		let animationTitle = Platform.select({
			ios: 'keyboard',
			android: 'easeInEaseOut'
		})
		let duration = Platform.select({
			ios: event.duration,
			android: 250,
		})
		let propertyTitle = Platform.select({
			ios: 'opacity',
			android: 'scaleY'
		})
		LayoutAnimation.configureNext({
			duration: duration,
			create: {
		        type: LayoutAnimation.Types[animationTitle],
		        property: LayoutAnimation.Properties[propertyTitle],
		    },
		    update: {
		        type: animationTitle,
		    }
		})
	}

	static _keyboardWillChangeFrame = (event) => {

		// android 返回来的 screenY 总是乱的
		let keyboardHeight = Platform.select({
			ios: global.SCREEN_HEIGHT - event.endCoordinates.screenY,
			android: event.endCoordinates.height > 0 ? global.SCREEN_HEIGHT - event.endCoordinates.screenY + STATUS_BAR_HEIGHT + 50 : 0,
		})
		
		if (keyboardHeight <= 1) {
			keyboardHeight = 0
		}
		// 键盘高度包含 HOME 的高度
		if (keyboardHeight > 0 && Platform.OS == 'android') {
			// keyboardHeight = SCREEN_HEIGHT - event?.endCoordinates?.screenY
			// let brandName = DeviceInfo.getBrand()
			// keyboardHeight += STATUS_BAR_HEIGHT
		// 	// 没有华为的 增加一个高度
		// 	if (['HUAWEI'].findIndex(item => eval(`/${item}/ig`).test(brandName)) == -1) {
		// 		keyboardHeight += RNCommon?.tabbarHeight(true, false) / PixelRatio.get()
		// 	}
		}
		if (global.KEYBOARD_HEIGHT == keyboardHeight) {
			return
		}
		global.KEYBOARD_HEIGHT = keyboardHeight
		DeviceEventEmitter.emit(kHTKeyboardHeightWillChange, event)
	}

}