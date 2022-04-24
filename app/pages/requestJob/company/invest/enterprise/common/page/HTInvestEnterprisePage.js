import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native'
import HTInvestPersonCell from '../../../person/common/view/HTInvestPersonCell'

export default class HTInvestEnterprisePage extends Component {

	_renderItem = ({ item, index }) => {
		return (
			<HTInvestPersonCell item={item} index={index} showChat={false} navigation={this.props.navigation} />
		)
	}

	render() {
		return (
			<FlatList
				data={new Array(20).fill(0)}
				renderItem={this._renderItem}
				contentContainerStyle={styleList.container}
			/>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		paddingBottom: HOME_BAR_HEIGHT + 15
	},

})