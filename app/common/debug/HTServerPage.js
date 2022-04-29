import React, { Component } from 'react'
import { View, Text, Image, ScrollView, Pressable } from 'react-native'
import HTServerManager from './HTServerManager'
import HTAuthManager from '~/common/auth/common/model/HTAuthManager'
import HTNavigationBar from '~/common/navigation/HTNavigationBar'


export default class HTServerPage extends Component {

	static navigationOptions = {
		headerShown: false
	}

	constructor(props) {
		super(props)
		this.state = {
			itemList: []
		}
	}

	componentDidMount = () => {
		this._reloadItemList()
	}

	componentDidAppear = ({ isSecondAppear }) => {
		if (isSecondAppear) {
			this._reloadItemList()
		}
	}

	_reloadItemList = async () => {
		Hud.show()
		let serverList = await HTServerManager.serverList()
		this.setState({
			itemList: serverList
		}, () => {
			Hud.hidden()
		})
	}

	_itemDidTouch = async (item, index) => {
		if (item.selected) {
			return
		}
		await HTServerManager.selectedServer(index)
		await this._reloadItemList()
		HTAuthManager.clearLoginInfo()
	}

	_footerDidTouch = () => {
		this.props.navigation.push('HTServerAppendPage')
	}

	_renderItem = (item, index) => {
		let title = `${item.base}\n\n${item.detail}\n\n${item.wap}`
		let image = item.selected ? require('~/assets/requestJobs/green-check.png') : null
		return (
			<Pressable key={index} style={styleList.itemContaienr} onPress={() => this._itemDidTouch(item, index)}>
				<View style={styleList.itemContent}>
					<Text style={styleList.itemTitle}>{title}</Text>
					<Image source={image} />
				</View>
				<View style={styleList.itemSeparatorLine}></View>
			</Pressable>
		)
	}

	_renderFooter = () => {
		return (
			<Pressable style={styleList.footerContainer} onPress={this._footerDidTouch}>
				<Text style={styleList.footerTitle}>添加服务器</Text>
			</Pressable>
		)
	}

	render() {
		return (
			<View style={CONTAINER}>
				<HTNavigationBar title={'服务器管理'} leftItemList={[
					<Pressable style={{ height: '100%', justifyContent: 'center', paddingRight: 20 }} onPress={this.props.navigation.goBack}>
						<Image source={require('~/assets/black_back.png')} />
					</Pressable>
				]} />
				<ScrollView style={styleList.itemListContainer}>
					{
						this.state.itemList.map((item, index) => {
							return this._renderItem(item, index)
						})
					}
				</ScrollView>
				{
					this._renderFooter()
				}
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	itemListContainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	versionContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderBottomColor: '#F5F5F5',
		borderBottomWidth: SEPARATOR_HEIGHT
	},
	versionTitle: {
		flex: 1,
		fontSize: 14,
		color: '#2C2C2C',
	},
	versionDetail: {
		fontSize: 14,
		color: '#2C2C2C',
	},
	itemContainer: {
		
	},
	itemContent: {
		padding: 15,
		flexDirection: 'row',
		alignItems: 'center'
	},
	itemSeparatorLine: {
		height: 1,
		backgroundColor: '#F5F5F5'
	},
	itemTitle: {
		flex: 1,
		fontSize: 14,
		lineHeight: 20,
		color: '#2C2C2C',
		marginRight: 15,
	},
	footerContainer: {
    	height: 49,
    	margin: 10,
    	marginBottom: HOME_BAR_HEIGHT + 50,
    	justifyContent: 'center',
    	alignItems: 'center',
    	backgroundColor: '#404454',
    	borderRadius: 5,
    },
    footerTitle: {
    	fontSize: 15,
    	color: 'white',
    	fontWeight: 'bold'
    }
})