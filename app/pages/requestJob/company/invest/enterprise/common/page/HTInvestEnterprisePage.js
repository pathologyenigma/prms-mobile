import React, { Component } from 'react'
import { View, Text, Pressable, StyleSheet, FlatList, Image } from 'react-native'
import HTInvestPersonCell from '../../../person/common/view/HTInvestPersonCell'

export default class HTInvestEnterprisePage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			itemList: []
		}
	}

	_onRefresh = () => {
		this.setState({ itemList: new Array(20).fill(0)})
	}

	_renderItem = ({ item, index }) => {
		return (
			<HTInvestPersonCell item={item} index={index} showChat={false} navigation={this.props.navigation} />
		)
	}

	render() {
		return (
			<FlatList
				data={this.state.itemList}
				renderItem={this._renderItem}
				contentContainerStyle={styleList.container}
				onRefresh={() => this._onRefresh()}
				{...this.props}
			/>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		paddingBottom: HOME_BAR_HEIGHT + 15
	},

})