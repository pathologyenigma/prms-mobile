import React from 'react'
import { DeviceEventEmitter } from 'react-native'
import StorageManager from '~/common/storage/StorageManager'

export default class HTAuthManager {

	static kHTUserRoleDidChangeNotice = 'kHTUserRoleDidChangeNotice'

	static kHTUserTokenDidChangeNotice = 'kHTUserTokenDidChangeNotice'

	static kHTSocketMessageDidReceiveNotice = 'kHTSocketMessageDidReceiveNotice'

	static kHTAuthKeyValueStorageKey = 'kHTAuthKeyValueStorageKey'

	static keyValueList = {}

	static init = () => {
		this.syncReadKeyValueList()
	}

	static updateKeyValueList = (valueList) => {
		let updateValueList = valueList ?? {}
		let lastValueList = this.syncReadKeyValueList() ?? {}
		let reloadValueList = { ...lastValueList, ...updateValueList }
		this.keyValueList = reloadValueList
		StorageManager.write(this.kHTAuthKeyValueStorageKey, reloadValueList)
		if (lastValueList.userToken != reloadValueList.userToken) {
			DeviceEventEmitter.emit(this.kHTUserTokenDidChangeNotice)
		}
		if (lastValueList.userRole != reloadValueList.userRole) {
			DeviceEventEmitter.emit(this.kHTUserRoleDidChangeNotice)
		}
	}

	static syncReadKeyValueList = () => {
		let { value = {} } = StorageManager.syncRead(this.kHTAuthKeyValueStorageKey)
		this.keyValueList = value
		return value
	}

	static clearLoginInfo = () => {
		this.updateKeyValueList({ userToken: '', userRole: '', userId: '' })
	}

}