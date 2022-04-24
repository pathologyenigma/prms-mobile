import React from 'react'
import DefaultPreference from 'react-native-default-preference'


export default class StorageManager {

	static async write(key, value, complete) {
		let error = null
		try {
			let reloadValue = ""
			try {
				reloadValue = JSON.stringify(value)
			} catch(e) {
			}
			await DefaultPreference.set(key, reloadValue)
		} catch (e) {
			error = e
		}
		let response = { error }
		complete && complete(response)
		return response
	}

	static async read(key, complete) {
		let error = null
		let value = null
		try {
			value = await DefaultPreference.get(key)
			value = JSON.parse(value)
		} catch (e) {
			error = e
		}
		if (value == null || value == '') {
			value = undefined
		}
		let response = { value, error }
		complete && complete(response)
		return response
	}

	static syncRead(key) {
		let error = null
		let value = null
		try {
			value = DefaultPreference.syncGet(key)
			value = JSON.parse(value)
		} catch (e) {
			error = e
		}
		if (value == null || value == '') {
			value = undefined
		}
		let response = { value, error }
		return response
	}

}