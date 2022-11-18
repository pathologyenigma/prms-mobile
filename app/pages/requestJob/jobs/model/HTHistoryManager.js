import React, { Component } from 'react'
import { View, Text } from 'react-native'
import StorageManager from '~/common/storage/StorageManager'

export default class HTHistoryManager {

	static kHTHistoryManagerKey = 'kHTHistoryManagerKey'

	static insertValue = async (value) => {
		if ((value?.length ?? 0) <= 0) {
			return
		}
		let valueList = await this.readValueList()
		valueList = [value, ...valueList]
		valueList = Array.from(new Set(valueList))
		await StorageManager.write(this.kHTHistoryManagerKey, valueList)
	}

	static readValueList = async () => {
		let { value = [] } = await StorageManager.read(this.kHTHistoryManagerKey)
		return value
	}

	static clearValueList = async () => {
		await StorageManager.write(this.kHTHistoryManagerKey, [])
	}

}