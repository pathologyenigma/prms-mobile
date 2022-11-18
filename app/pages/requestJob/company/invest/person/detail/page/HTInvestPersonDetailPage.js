import React, { Component } from 'react'
import { View, Text, Pressable, StyleSheet, Image, ScrollView } from 'react-native'
import HTNavigationBar from '~/common/navigation/HTNavigationBar'
import HTShadowView from '~/common/view/HTShadowView'

let imageList = [
	require('~/assets/debug/avatar_1.png'),
	require('~/assets/debug/avatar_2.png'),
	require('~/assets/debug/avatar_3.png'),
	require('~/assets/debug/avatar_4.png'),
	require('~/assets/debug/avatar_5.png'),
	require('~/assets/debug/avatar_6.png'),
].sort(() => Math.random() - 0.5)

export default class HTInvestPersonDetailPage extends Component {

	_renderNavigationBar = () => {
		return (
			<HTNavigationBar
				title={'投资人介绍'}
				titleStyle={{
					fontSize: 15,
					color: 'white',
					fontWeight: 'bold'
				}}
				backgroundColor={'#54D693'}
				leftItemList={[
					<Pressable style={{ height: '100%', justifyContent: 'center', paddingRight: 20 }} onPress={this.props.navigation.goBack}>
						<Image source={require('~/assets/requestJobs/white-back.png')} />
					</Pressable>
				]}
				rightItemList={[
					<Pressable onPress={global.TODO_TOAST}>
						<Text style={styleList.navigationItemTitle}>更多</Text>
					</Pressable>
				]}
			/>
		)
	}

	_renderHeader = () => {
		return (
			<View style={styleList.headerContainer}>
				<CacheImage style={styleList.headerImage} source={imageList[0]} />
				<Text style={styleList.headerTitle}>某先生（Venture capital）</Text>
				<Text style={styleList.headerDetail}>职务介绍</Text>
				<View style={styleList.headerFlagContainer}>
					<Text style={styleList.headerFlagTitle}>投资人认证</Text>
				</View>
			</View>
		)
	}

	_renderTagList = (itemList) => {
		return (
			<View style={styleList.tagContainer}>
			{
				itemList.map((item, index) => {
					return (
						<View key={index} style={styleList.tagItemContainer}>
							<Text style={styleList.tagItemTitle}>{item.title}</Text>
						</View>
					)
				})
			}
			</View>
		)
	}

	_renderSection = (title, detail, content) => {
		return (
			<View style={styleList.sectionContainer}>
				<Text style={styleList.sectionTitle}>{title}</Text>
				{ detail && <Text style={styleList.sectionDetail}>{detail}</Text> }
				{
					content
				}
			</View>
		)
	}

	_renderWork = () => {
		return (
			<View style={styleList.workContainer}>
				<Text style={styleList.workTitle}>某某创投</Text>
				<Text style={styleList.workDetail}>合伙人</Text>
				<Text style={styleList.workStatus}>在职</Text>
			</View>
		)
	}

	_renderToolBar = () => {
		let itemList = [
			{ title: '立即入驻成为投资人', color: 'white', backgroundColor: '#85C89E', flex: 1 },
			{ title: '在线沟通', color: 'white', backgroundColor: '#54D693', flex: 1 },
		]
		return (
			<HTShadowView style={styleList.toolContainer}>
			{
				itemList.map((item, index) => {
					return (
						<Pressable key={index} style={[styleList.toolItemContainer, { flex: item.flex,  backgroundColor: item.backgroundColor }]} onPress={global.TODO_TOAST}>
							<Text style={[styleList.toolItemTitle, { color: item.color }]}>{item.title}</Text>
						</Pressable>
					)
				})
			}
			</HTShadowView>
		)
	}

	render() {
		return (
			<View style={styleList.container}>
				{
					this._renderNavigationBar()
				}
				<ScrollView contentContainerStyle={styleList.scrollContent}>
				{
					this._renderHeader()
				}
				<View style={styleList.content}>
					{
						this._renderSection('基本介绍', '自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍')
					}
					{
						this._renderSection('关注行业', null, this._renderTagList([{ title: '企业服务' }, { title: '企业服务' }, { title: '企业服务' }]))
					}
					{
						this._renderSection('偏好轮次', null, this._renderTagList([{ title: '天使轮' }, { title: 'A轮' }]))
					}
					{
						this._renderSection('任职情况', null, this._renderWork())
					}
				</View>
				</ScrollView>
				{
					this._renderToolBar()
				}
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	navigationItemTitle: {
		fontSize: 14,
		color: 'white'
	},
	scrollContent: {
		paddingBottom: 15,
	},
	content: {
		paddingHorizontal: 15,
		backgroundColor: 'white'
	},
	headerContainer: {
		backgroundColor: '#54D693',
		alignItems: 'center',
	},
	headerImage: {
		marginTop: 20,
		width: 70,
		height: 70,
		borderRadius: 10,
		backgroundColor: 'white'
	},
	headerTitle: {
		marginTop: 15,
		fontSize: 17,
		color: 'white',
		fontWeight: '500'
	},
	headerDetail: {
		marginTop: 15,
		fontSize: 14,
		color: 'white',
	},
	headerFlagContainer: {
		marginTop: 15,
		marginBottom: 20,
		backgroundColor: '#85C89E',
		paddingHorizontal: 9,
		height: 22,
		borderRadius: 22 / 2.0,
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerFlagTitle: {
		color: 'white',
		fontSize: 11,
		fontWeight: '500'
	},

	tagContainer: {
		marginTop: 15,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	tagItemContainer: {
		borderWidth: 1,
		borderColor: '#54D693',
		borderRadius: 20 / 2.0,
		height: 20,
		justifyContent: 'center',
		paddingHorizontal: 8,
		marginRight: 5,
		marginBottom: 5
	},
	tagItemTitle: {
		fontSize: 11,
		color: '#54D693',
	},




	sectionTitle: {
		marginTop: 25,
		fontSize: 14,
		color: '#333',
		fontWeight: 'bold'
	},
	sectionDetail: {
		marginTop: 10,
		fontSize: 12,
		lineHeight: 18,
		color: '#333',
	},

	workContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 15,
	},
	workTitle: {
		fontSize: 14,
		color: '#333'
	},
	workDetail: {
		marginLeft: 15,
		flex: 1,
		fontSize: 11,
		color: '#666',
	},
	workStatus: {
		fontSize: 11,
		color: '#666',
	},


	toolContainer: {
		paddingBottom: HOME_BAR_HEIGHT,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		shadowOpacity: 0.05,
		shadowRadius: 10,
	},
	toolItemContainer: {
		height: 55,
		justifyContent: 'center',
		alignItems: 'center'
	},
	toolItemTitle: {
		fontSize: 13,
	}






})