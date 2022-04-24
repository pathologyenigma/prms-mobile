import React, { Component } from 'react'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'

export default class HTActionSheet extends Component {

	constructor(props) {
		super(props)
		this.state = {
			itemList: []
		}
	}

	static heightFromOptionList = (optionList) => {
		return (optionList?.itemList?.length || 0) * (50 + 0.5) + HOME_BAR_HEIGHT + 50 + 5
	}

	_cancelDidTouch = () => {
		this.props.close()
	}

	_itemDidTouch = (item, index) => {
		if (item.selected) {
			return
		}
		if (item?.onPress) {
			item.onPress(() => {
				this.setState(this.state)
			})
		} else {
			this._cancelDidTouch()
		}
	}

	_renderItem = (item, index) => {
		return (
			<Pressable style={styleList.itemContainer} onPress={() => {
				this._itemDidTouch(item, index)
			}}>
				<View style={styleList.itemContent}>
					<Text style={[styleList.itemTitle, !item.selected ? styleList.itemTitleNormal : styleList.itemTitleSelected]}>{item.title}</Text>
				</View>
				{
					this._renderSeparatorLine()
				}
			</Pressable>
		)
	}

	_renderSeparatorLine = () => {
		return (
			<View style={styleList.separatorLine}></View>
		)
	}

	_renderSpaceLine = () => {
		return (
			<View style={styleList.spaceLine}></View>
		)
	}

	_renderCancel = () => {
		return (
			<View style={styleList.cancelContainer}>
				{
					this._renderSpaceLine()
				}
				<Pressable style={styleList.cancelContent} onPress={() => {
					this._cancelDidTouch()
				}}>
					<Text style={styleList.cancelTitle}>取消</Text>
				</Pressable>
			</View>
		)
	}

	render() {
		return (
			<View style={styleList.container}>
				<FlatList
					extraData={this.state}
					data={this.state?.itemList}
					bounces={false}
					renderItem={({item, index}) => this._renderItem(item, index)}
				/>
				{
					this._renderCancel()
				}
				<View style={{ height: HOME_BAR_HEIGHT }} />
			</View>
		)
	}

}


const styleList = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	separatorLine: {
		backgroundColor: '#F5F5F9',
		paddingLeft: 5,
		paddingRight: 5,
		height: SEPARATOR_HEIGHT,
	},
	spaceLine: {
		backgroundColor: '#F5F5F9',
		height: 5,
	},
	itemContainer: {
		
	},
	itemContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
	},
	itemTitle: {
		fontSize: 16,
		fontWeight: '600',
	},
	itemTitleNormal: {
		color: '#2C2E33',
	},
	itemTitleSelected: {
		color: '#222',
	},
	cancelContent: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cancelTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#2C2E33',
	}
})