import React, { Component } from 'react'
import { View, Text, FlatList, Image, Pressable } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import HTUpdateManager from '~/common/update/HTUpdateManager'
import HTServerManager from '~/common/debug/HTServerManager'
import HTNavigationBar from '~/common/navigation/HTNavigationBar'

export default class HTMineSettingPage extends Component {

	static navigationOptions = {
		headerShown: false
	}

	constructor(props) {
		super(props)
		this.state = {
			itemList: [
				{ title: '版本号', detail: `${DeviceInfo.getVersion()}_${DeviceInfo.getBuildNumber()}_${HTUpdateManager.APPLICATION_VERSION}`, onPress: this._versionDidTouch },
				{ title: '服务器管理', detail: `${HTServerManager.currentServer.base}`, onPress: this._serverDidTouch },
			]
		}
	}

	_versionDidTouch = () => {
		HTUpdateManager.update(true)
	}

	_serverDidTouch = () => {
		this.props.navigation.push('HTServerPage')
	}

	_renderItem = ({ item, index }) => {
		return (
			<View style={styleList.itemContainer}>
				<Pressable style={styleList.itemContent} onPress={item.onPress}>
					<Text style={styleList.itemTitle}>{item.title}</Text>
					<Text style={styleList.itemDetail}>{item.detail}</Text>
					<Image source={require('~/assets/requestJobs/item_more.png')} />
				</Pressable>
				<View style={styleList.itemSeparator}></View>
			</View>
		)
	}

	render() {
		return (
			<View style={styleList.container}>
				<HTNavigationBar title={'DEBUG'} leftItemList={[
					<Pressable style={{ height: '100%', justifyContent: 'center', paddingRight: 20 }} onPress={this.props.navigation.goBack}>
						<Image source={require('~/assets/black_back.png')} />
					</Pressable>
				]} />
				<FlatList
					data={this.state.itemList}
					renderItem={this._renderItem}
				/>
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingBottom: 23,
	},
	itemContainer: {
		marginLeft: 16,
	},
	itemContent: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 56,
		paddingRight: 16,
	},
	itemTitle: {
		flexGrow: 1,
		fontSize: 14,
		color: '#191919'
	},
	itemDetail: {
		textAlign: 'right',
		marginLeft: 20,
		flexShrink: 1,
		marginRight: 10,
		fontSize: 14,
		color: '#191919'
	},
	itemSeparator: {
		width: '100%',
		height: SEPARATOR_HEIGHT,
		backgroundColor: '#E7E7E7'
	}
})