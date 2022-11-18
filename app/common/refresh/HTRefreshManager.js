import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class HTRefreshManager {

	constructor() {
		this.allLoaded = true
		this.pageIndex = 0
		this.pageCount = 10
		this.footerLock = true
	}

	reloadPageIndex = (isHeaderRefresh) => {
		if (isHeaderRefresh) {
			this.pageIndex = 0
		}
		if (this.cantHandlerRefresh(isHeaderRefresh)) {
			return -1
		}
		this.footerLock = true
		return this.pageIndex
	}

	cantHandlerRefresh = (isHeaderRefresh) => {
		if (!isHeaderRefresh && this.footerLock) {
			return true
		}
		if (!isHeaderRefresh && this.allLoaded) {
			return true
		}
		return false
	}

	reloadItemList = (itemList, existItemList, isHeaderRefresh) => {
		let reloadItemList = itemList ?? []
		let reloadExistItemList = existItemList ?? []
		this.allLoaded = reloadItemList.length < this.pageCount
		this.footerLock = false
		if (isHeaderRefresh) {
			this.pageIndex = 1
			return reloadItemList
		} else {
			this.pageIndex += 1
			return [...reloadExistItemList, ...reloadItemList]
		}
	}

}