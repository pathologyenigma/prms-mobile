import React from 'react'
import { LogBox, processColor, Platform, NativeModules, DeviceEventEmitter } from 'react-native'
import HTGlobalHook from '~/common/global/HTGlobalHook'
import HTGlobalStatic from '~/common/global/HTGlobalStatic'
import HTKeyboardManager from '~/common/keyboard/HTKeyboardManager'
import HTServerManager from '~/common/debug/HTServerManager'
import HTRequest from '~/common/request/HTRequest'
import HTAuthManager from '~/common/auth/common/model/HTAuthManager'

export default class HTInitManager {

	static init = () => {
		LogBox.ignoreLogs([
		    'Require cycle',
		    'Possible Unhandled Promise',
		    `Can't perform a React state update on an unmounted`,
		    'Non-serializable values were found',
		    'was called with a non-null argument without the required'
		])
		global.APPLICATION_VERSION = 27
		HTServerManager.reload()
		HTAuthManager.init()
		HTRequest.initSocket()
		HTKeyboardManager.init()
	}

}