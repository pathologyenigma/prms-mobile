import React from 'react'
import { DeviceEventEmitter } from 'react-native'
import StorageManager from '~/common/storage/StorageManager'

const SERVER_LIST = [
	{ base: 'http://be.chenzaozhao.com:4000', detail: 'ws://be.chenzaozhao.com:4000/ws', wap: '', selected: true },
	{ base: 'https://be.chenzaozhao.com', detail: 'wss://be.chenzaozhao.com/ws', wap: '' },
]

const kHTServerStorageKey = 'kHTServerStorageKey'

export default class HTServerManager {

	static kHTServerDidChangeKey = 'kHTServerDidChangeKey'

	static currentServer = null

	static selectedServer = async (index) => {
		let serverList = await this.serverList()
		serverList.map(item => item.selected = false)
		serverList[index].selected = true
		await StorageManager.write(kHTServerStorageKey, serverList)
		this.reload()
		DeviceEventEmitter.emit(this.kHTServerDidChangeKey)
	}

	static appendServer = async (item) => {
		let serverList = await this.serverList()
		serverList.push(item)
		await StorageManager.write(kHTServerStorageKey, serverList)
	}

	static serverList = async () => {
		let { value: serverList = SERVER_LIST } = await StorageManager.read(kHTServerStorageKey)
		await StorageManager.write(kHTServerStorageKey, serverList)
		return serverList
	}

	static syncServerList = () => {
		let { value: serverList = SERVER_LIST } = StorageManager.syncRead(kHTServerStorageKey)
		return serverList
	}

	static reload = () => {
		let serverList = this.syncServerList()
		let selectedServer = serverList.find(item => item.selected == true)
		selectedServer = JSON.parse(JSON.stringify(selectedServer))
		this.currentServer = selectedServer
	}

}