import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class HTRefreshManager {

	constructor() {
		this.allLoaded = true
		this.pageIndex = 1
		this.pageCount = 10
	}

	reloadPageIndex = (isHeaderRefresh) => {
		if (isHeaderRefresh) {
			this.pageIndex = 1
		}
		return this.pageIndex
	}

	reloadItemList = (itemList, existItemList, isHeaderRefresh) => {
		this.allLoaded = itemList.length < this.pageCount
		if (isHeaderRefresh) {
			this.pageIndex = 1 + 1
			return itemList
		} else {
			this.pageIndex += 1
			return [...existItemList, ...itemList]
		}
	}

}