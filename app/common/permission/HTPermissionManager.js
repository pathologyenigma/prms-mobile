import React from 'react'
import { Linking } from 'react-native'
import { check, requestMultiple, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions'

export default class HTPermissionManager {

	static PERMISSIONS = PERMISSIONS

	static request = (itemList, allowBlock) => {
		requestMultiple(itemList).then((statusList) => {
			if (itemList.find(item => statusList[item] == RESULTS.GRANTED) != null) {
				allowBlock && allowBlock()
				return
			}
			if (itemList.find(item => statusList[item] == RESULTS.UNAVAILABLE) != null) {
				global.Alert.openTitleAction('This feature is not available (on this device / in this context)')
				return
			}
			if (itemList.find(item => (statusList[item] == RESULTS.DENIED || statusList[item] == RESULTS.BLOCKED)) != null) {
				global.Alert.openTitleAction('The permission is denied. open setting?', () => {
					Linking.openSettings()
				})
				return
			}
			if (itemList.find(item => statusList[item] == RESULTS.LIMITED) != null) {
				global.Alert.openTitleAction('The permission is limited: some actions are possible. open setting?', () => {
					Linking.openSettings()
				})
				return
			}
		}).catch(e => console.log(e))
	}

}