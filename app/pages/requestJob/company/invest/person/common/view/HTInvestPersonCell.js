import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

let imageList = [
	require('~/assets/debug/avatar_1.png'),
	require('~/assets/debug/avatar_2.png'),
	require('~/assets/debug/avatar_3.png'),
	require('~/assets/debug/avatar_4.png'),
	require('~/assets/debug/avatar_5.png'),
	require('~/assets/debug/avatar_6.png'),
].sort(() => Math.random() - 0.5)

export default class HTInvestPersonCell extends Component {

	render() {
		const { item, index, showChat } = this.props
		let imageUrl = imageList[index % imageList.length]
		return (
			<TouchableOpacity style={styleList.itemContainer} onPress={() => {
				this.props.navigation.push(showChat ? 'HTInvestPersonDetailPage' : 'HTInvestEnterpriseDetailPage')
			}}>
				<CacheImage style={styleList.itemImage} source={imageUrl} />
				<View style={styleList.itemContent}>
					<View style={styleList.itemMain}>
						<Text style={styleList.itemTitle}>{ showChat ? '某先生' : '某机构' }</Text>
						{
							showChat && (
								<Text style={styleList.itemAddress}>德兴</Text>
							)
						}
					</View>
					{
						showChat && (
							<Text style={styleList.itemDetail}>所属机构：某某创投</Text>
						)
					}
					<Text style={styleList.itemIntro}>自我介绍自我介绍</Text>
					<View style={styleList.tagContainer}>
					{
						new Array(4).fill(0).map((item, index) => {
							return (
								<View style={styleList.tagItemContainer}>
									<Text style={styleList.tagItemTitle}>企业服务</Text>
								</View>
							)
						})
					}
					</View>
				</View>
				{
					showChat && (
						<Text style={styleList.itemChatTitle}>在线沟通</Text>
					)
				}
			</TouchableOpacity>
		)
	}

}

const styleList = StyleSheet.create({
	itemContainer: {
		marginHorizontal: 15,
		marginTop: 15,
		padding: 15,
		borderRadius: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
	},
	itemImage: {
		width: 50,
		height: 50,
		borderRadius: 50 / 2.0,
		backgroundColor: '#54D693'
	},
	itemContent: {
		marginLeft: 15,
		flex: 1,
	},
	itemMain: {
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	itemTitle: {
		fontSize: 15,
		color: '#333',
		fontWeight: '500'
	},
	itemAddress: {
		marginLeft: 10,
		fontSize: 11,
		color: '#666'
	},
	itemDetail: {
		marginTop: 10,
		fontSize: 12,
		color: '#666'	
	},
	itemIntro: {
		marginTop: 10,
		fontSize: 12,
		color: '#666'	
	},
	tagContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	tagItemContainer: {
		marginTop: 10,
		marginRight: 10,
		paddingHorizontal: 2,
		paddingVertical: 1,
		borderRadius: 2,
		borderWidth: SEPARATOR_HEIGHT,
		borderColor: '#54D693'
	},
	tagItemTitle: {
		fontSize: 11,
		color: '#666'
	},
	itemChatTitle: {
		marginTop: 10,
		fontSize: 12,
		color: '#333'
	}


})