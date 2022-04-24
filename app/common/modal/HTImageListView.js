import React, { Component } from 'react'
import { View, Text, Platform } from 'react-native'
import PhotoView from 'react-native-photo-viewer'

export default class HTImageListView extends Component {

	constructor(props) {
		super(props)
		this.optionList = {}
		this.state = {
			visible: false,
			initIndex: 0,
			itemList: [],
		}
	}

	_backgroundDidTouch = () => {
		this.close()
	}

	open(optionList) {
		this.optionList = optionList
		this.setState({
			visible: true,
			initIndex: optionList.initIndex ?? 0,
			itemList: optionList.itemList
		})
	}

	close() {
		this.setState({ 
			visible: false,
			itemList: []
		})
	}

	render() {
		return (
			<PhotoView
				visible={this.state.visible}
				data={this.state.itemList}
				hideStatusBar={Platform.OS == 'ios'}
				initial={this.state.initIndex}
				onPhotoDismiss={() => {
					this.close()
				}}
			/>
		)
	}

}
