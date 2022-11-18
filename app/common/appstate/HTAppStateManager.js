import React, { Component } from 'react'
import { AppState, DeviceEventEmitter } from 'react-native'

export default class HTAppStateManager {

	static kHTAppStateDidChangeKey = 'kHTAppStateDidChangeKey'

	static kHTLastAppState = 'active'

	static init = () => {
		AppState.addEventListener('change', (nextState) => {
			this._handleAppStateChange(nextState)
		})
	}

	static addListener = (callback) => {
		return DeviceEventEmitter.addListener(this.kHTAppStateDidChangeKey, callback)
	}

	static _handleAppStateChange = (nextState) => {
		if (this.kHTLastAppState == nextState) {
			return
		}
		this.kHTLastAppState = nextState
		let isActive = nextState == 'active'
		DeviceEventEmitter.emit(this.kHTAppStateDidChangeKey, isActive)
	}

}