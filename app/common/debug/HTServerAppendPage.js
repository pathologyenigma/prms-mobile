import React, { Component } from 'react'
import { View, Text, Image, ScrollView, Pressable, TextInput } from 'react-native'
import HTServerManager from './HTServerManager'
import HTNavigationBar from '~/common/navigation/HTNavigationBar'

export default class HTServerAppendPage extends Component {

	static navigationOptions = {
		headerShown: false
	}

	constructor(props) {
		super(props)
		this.state = {
			itemList: [
				{ id: 'base', title: '域名', placeholder: '请输入域名' },
				{ id: 'detail', title: '详情域名', placeholder: '请输入详情域名' },
				{ id: 'wap', title: 'wap域名', placeholder: '请输入wap域名' },
			]
		}
	}

	_footerDidTouch = async () => {
		let server = {}
		for (let item of this.state.itemList) {
			if ((item?.value?.length ?? 0) <= 0) {
				Toast.show(item.placeholder)
				return
			}
			server[item.id] = item.value
		}
		await HTServerManager.appendServer(server)
		this.props.navigation.pop()
	}

	_renderItem = (item, index) => {
		return (
			<View key={index} style={styleList.itemContaienr} onPress={() => this._itemDidTouch(item, index)}>
				<View style={styleList.itemContent}>
					<Text style={styleList.itemTitle}>{item.title}</Text>
					<TextInput style={styleList.itemInput} placeholder={item.placeholder} value={item.value} onChangeText={(text) => {
						item.value = text
						this.setState(this.state)
					}} />
				</View>
				<View style={styleList.itemSeparatorLine}></View>
			</View>
		)
	}

	_renderFooter = () => {
		return (
			<Pressable style={styleList.footerContainer} onPress={this._footerDidTouch}>
				<Text style={styleList.footerTitle}>保存服务器</Text>
			</Pressable>
		)
	}

	render() {
		return (
			<View style={CONTAINER}>
				<HTNavigationBar title={'新增服务器'} leftItemList={[
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
	itemContainer: {
		
	},
	itemContent: {
		padding: 15,
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
	itemInput: {
		paddingTop: 15,
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

