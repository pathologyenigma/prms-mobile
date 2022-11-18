import React, { Component } from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import HTShadowView from '~/common/view/HTShadowView'

const imageList = [
	'https://img.freepik.com/free-vector/hand-drawn-hello-spring-illustration_1188-459.jpg?t=st=1648118348~exp=1648118948~hmac=27414c7963326a2b1f6f25cda2fb2ef682f8b4550ce2bc4c191e45768c8e564b&w=1060',
	'https://img.freepik.com/free-vector/watercolor-spring-illustration_23-2149283727.jpg?t=st=1648118477~exp=1648119077~hmac=df19f1bdb4a150e8882d7485ec39f8c5271faa484355ea9fc5aaca872d27f83d&w=1060',
	'https://img.freepik.com/free-vector/flat-spring-illustration_23-2149281781.jpg?w=1060',
	'https://img.freepik.com/free-vector/watercolor-spring-illustration_23-2149283722.jpg?t=st=1648118348~exp=1648118948~hmac=33f10f97f893419876cac5bd3090cd8f0ccd843f015f423b59309e2ac405aaae&w=1060',
	'https://img.freepik.com/free-vector/hand-drawn-spring-illustration_23-2149285248.jpg?w=1060',
].sort(() => Math.random() - 0.5)

export default class HTCompanyContentPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			itemList: []
		}
	}

	componentDidMount() {
		if (this?.props?.initData) {
			this._onRefresh()
		}
	}

	_onRefresh = () => {
		this.setState({ itemList: new Array(10).fill(0) })
	}

	_renderItem = (item, index) => {
		let imageUrl = imageList[index % imageList.length]
		return (
			<Pressable key={index} onPress={() => this.props.navigation.push('HTCompanyProjectDetailPage')}>
				<HTShadowView style={styleList.itemContainer}>
					<CacheImage style={styleList.itemImage} source={{ uri: imageUrl }} />
					<View style={styleList.itemContent}>
						<Text style={styleList.itemTitle}>趁早找</Text>
						<Text style={styleList.itemDetail}>行业: 企业服务</Text>
						<Text style={styleList.itemDescription}>项目简短描述, 项目简短描述, 项目简短描述, 项目简短描述, 项目简短描述, 项目简短描述, </Text>
						<Text style={styleList.itemPriceTitle}>融资金额: 2000万元</Text>
						<Text style={styleList.itemPriceDetail}>融资轮次: 天使轮</Text>
					</View>
				</HTShadowView>
			</Pressable>
		)
	}

	render() {
		return (
			<View style={styleList.container}>
			{
				this.state.itemList.map((item, index) => {
					return this._renderItem(item, index)
				})
			}
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		marginTop: 15,
	},
	itemContainer: {
		marginHorizontal: 15,
		marginBottom: 15,
		padding: 15,
		backgroundColor: 'white',
		borderRadius: 10,
		flexDirection: 'row',
		shadowOpacity: 0.07,
		shadowRadius: 10
	},
	itemImage: {
		width: 120,
		borderRadius: 5,
		height: '100%',
		// backgroundColor: '#54D693'
	},
	itemContent: {
		flex: 1,
		marginLeft: 15,
	},
	itemTitle: {
		fontSize: 15,
		color: '#191919',
		fontWeight: '500',
	},
	itemDetail: {
		marginTop: 5,
		fontSize: 13,
		color: '#191919',
		fontWeight: '500',
	},
	itemDescription: {
		marginTop: 10,
		fontSize: 12,
		lineHeight: 14,
		color: '#666',
	},
	itemPriceTitle: {
		marginTop: 10,
		fontSize: 12,
		color: '#FF6F41',
	},
	itemPriceDetail: {
		marginTop: 4,
		fontSize: 11,
		color: '#333',
	}
})