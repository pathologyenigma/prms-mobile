import React, { Component } from 'react'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import DatePicker from 'react-native-date-picker'

export default class HTTimePicker extends Component {

	constructor(props) {
		super(props)
		this.state = {
			date: null,
			itemList: [
				{ title: '选择日期', type: 'date', selected: true },
				{ title: '选择时间', type: 'time' },
			]
		}
	}

	static heightFromOptionList = (optionList) => {
		return 400
	}

	_itemDidTouch = (item, index) => {
		if (item.selected) {
			return
		}
		this.state.itemList.map(item => item.selected = false)
		item.selected = true
		this.setState(this.state)
	}

	_renderItem = ({ item, index }) => {
		return (
			<Pressable key={index} style={styleList.itemContainer} onPress={() => this._itemDidTouch(item, index)}>
				<View style={[styleList.itemSeparator, item.selected ? styleList.itemSeparatorSelected : item.itemSeparatorNormal]}></View>
				<Text style={[styleList.itemTitle, item.selected ? styleList.itemTitleSelected : styleList.itemTitleNormal]}>{item.title}</Text>
			</Pressable>
		)
	}

	render() {
		return (
			<View style={styleList.container}>
				<View style={styleList.listContainer}>
				{
					this.state.itemList.map((item, index) => {
						return this._renderItem({ item, index })
					})
				}
				</View>
				<DatePicker 
					mode={this.state.itemList.find(item => item.selected == true).type} 
					date={this.state.date ?? new Date()}
					minimumDate={new Date()}
					onDateChange={(date) => {
						this.state.date = date
						this?.state?.onDateChange && this.state.onDateChange(date)
					}}
				/>
				<View style={{ height: HOME_BAR_HEIGHT }} />
			</View>
		)
	}

}


const styleList = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		alignItems: 'center'
	},
	listContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 20,
	},
	itemContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	itemSeparator: {
		width: 40,
		height: 3,
	},
	itemSeparatorNormal: {
		backgroundColor: 'transparent',
	},
	itemSeparatorSelected: {
		backgroundColor: '#57DE9E'
	},
	itemTitle: {
		marginTop: 26,
		fontSize: 18,
	},
	itemTitleNormal: {
		color: '#888888',
		fontWeight: '400'
	},
	itemTitleSelected: {
		color: '#333333',
		fontWeight: '600'
		
	}
	
})