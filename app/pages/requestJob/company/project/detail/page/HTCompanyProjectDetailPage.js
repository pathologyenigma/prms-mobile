import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
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

export default class HTCompanyProjectDetailPage extends Component {

	_renderNavigationBar = () => {
		return (
			<HTNavigationBar
				title={'项目详情'}
				titleStyle={{
					fontSize: 15,
					color: 'white',
					fontWeight: 'bold'
				}}
				backgroundColor={'#54D693'}
				leftItemList={[
					<TouchableOpacity style={{ height: '100%', justifyContent: 'center', paddingRight: 20 }} onPress={this.props.navigation.goBack}>
						<Image source={require('~/assets/requestJobs/white-back.png')} />
					</TouchableOpacity>
				]}
				rightItemList={[
					<TouchableOpacity>
						<Text style={styleList.navigationItemTitle}>更多</Text>
					</TouchableOpacity>
				]}
			/>
		)
	}

	_renderBackground = () => {
		return (
			<View style={styleList.backgroundContainer}>
			</View>
		)
	}

	_renderHeader = () => {
		return (
			<HTShadowView style={styleList.headerContainer}>
				<View style={styleList.headerContent}>
					<View style={styleList.headerLeftContainer}>
						<Text style={styleList.headerTitle}>趁早找</Text>
						<Text style={styleList.headerDetail}>项目解决的行业方向</Text>
						{
							this._renderHeaderTagList([{ title: '企业服务' }, { title: '企业服务' }])
						}
						<View style={styleList.headerCenterContainer}>
						{
							[{'title': '2021年'}, {'title': '江西南昌'}].map((item, index) => {
								return (
									<View style={styleList.headerCenterItemContainer}>
										<Text style={styleList.headerCenterItemTitle}>{item.title}</Text>
									</View>
								)
							})
						}
						</View>
						<View style={styleList.headerNumberContainer}>
						{
							[{'title': '上轮融资情况', detail: 'A轮 6000万'}, {'title': '热度值(近一周)', detail: '35 23%'}].map((item, index) => {
								return (
									<View style={[styleList.headerNumberItemContainer, index != 0 && { paddingLeft: 15, borderLeftWidth: 1, borderLeftColor: '#eee' }]}>
										<Text style={styleList.headerNumberItemTitle}>{item.title}</Text>
										<Text style={styleList.headerNumberItemDetail}>{item.detail}</Text>
									</View>
								)
							})
						}
						</View>
					</View>
					<View style={styleList.headerRightContainer}>
						<CacheImage style={styleList.headerImage} source={imageList[0]} />
						<View style={styleList.headerSureContainer}>
							<Text style={styleList.headerSureTitle}>认领</Text>
						</View>
					</View>
				</View>
				<View style={styleList.headerBottomContainer}>
					{
						this._renderHeaderTagList([{ title: '企业服务' }, { title: '企业服务' }, { title: '企业服务' }, { title: '企业服务' }])
					}
				</View>
			</HTShadowView>
		)
	}

	_renderHeaderTagList = (itemList) => {
		return (
			<View style={styleList.headerTagContainer}>
			{
				itemList.map((item, index) => {
					return (
						<View key={index} style={styleList.headerTagItemContainer}>
							<Text style={styleList.headerTagItemTitle}>{item.title}</Text>
						</View>
					)
				})
			}
			</View>
		)
	}

	_renderCenter = () => {
		return (
			<View style={styleList.centerContainer}>
				<Text style={styleList.centerTitle}>基本信息</Text>
				<Text style={styleList.centerDetail}>纠错</Text>
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

	

	_rendreTeamList = () => {
		return (
			<View style={styleList.teamItemContainer}>
				<CacheImage style={styleList.teamItemImage} source={imageList[1]} />
				<View style={styleList.teamItemContent}>
					<View style={styleList.teamItemMain}>
						<Text style={styleList.teamItemTitle}>李女士</Text>
						<Text style={styleList.teamItemDetail}>董事长</Text>
					</View>
					<Text style={styleList.teamItemInfo}>美国哈佛商学院经济学博士，联合创始人</Text>
				</View>
				<View>
					<Text style={styleList.teamItemChat}>在线沟通</Text>
				</View>
			</View>
		)
	}

	_renderMoneyList = () => {
		let itemList = [
			{ title: '融资需求', detail: '2021年4月13日更新', money: '天使轮 2000万美元', now: '现估值 未披露', book: 'BP/商业计划书' },
			{ title: '历史融资', detail: '2020年9月13日更新', money: '种子轮 金额：未披露', now: '当前估值：未披露' },
		]
		return (
			<View style={styleList.moneyContainer}>
			{
				itemList.map((item, index) => {
					return (
						<HTShadowView style={styleList.moneyItemContainer}>
							<View style={styleList.moneyItemLeftContainer}>
								<View style={styleList.moneyItemLeftMain}>
									<Text style={styleList.moneyItemTitle}>{item.title}</Text>
									<Text style={styleList.moneyItemDetail}>{item.detail}</Text>
								</View>
								<Text style={styleList.moneyItemMoney}>{item.money}</Text>
								<Text style={styleList.moneyItemNow}>{item.now}</Text>
							</View>
							{
								item.book && (
									<View style={styleList.moneyItemRightContainer}>
										<Text style={styleList.moneyItemBookTitle}>{item.book}</Text>
										<View style={styleList.moneyItemButtonContainer}>
											<Text style={styleList.moneyItemButtonTitle}>立即申请</Text>
										</View>
									</View>
								)
							}
						</HTShadowView>
					)
				})
			}
			</View>
		)
	}

	_renderToolBar = () => {
		let itemList = [
			{ title: '收藏', color: '#333', backgroundColor: 'white', flex: 1 },
			{ title: 'BP', color: 'white', backgroundColor: '#85C89E', flex: 1 },
			{ title: '联系项目方', color: 'white', backgroundColor: '#54D693', flex: 1 },
		]
		return (
			<HTShadowView style={styleList.toolContainer}>
			{
				itemList.map((item, index) => {
					return (
						<View style={[styleList.toolItemContainer, { flex: item.flex,  backgroundColor: item.backgroundColor }]}>
							<Text style={[styleList.toolItemTitle, { color: item.color }]}>{item.title}</Text>
						</View>
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
				{
					this._renderBackground()
				}
				<View style={[StyleSheet.absoluteFill, styleList.scrollContainer]}>
				<ScrollView contentContainerStyle={styleList.scrollContent}>
				{
					this._renderHeader()
				}
				<View style={styleList.content}>
					{
						this._renderCenter()
					}
					{
						this._renderSection('项目介绍', '项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍项目介绍')
					}
					{
						this._renderSection('公司信息', '趁早找（北京）信息科技股份有限公司')
					}
					{
						this._renderSection('公司信息', null, this._rendreTeamList())
					}
					{
						this._renderSection('融资信息', null, this._renderMoneyList())
					}
				</View>
				</ScrollView>
				{
					this._renderToolBar()
				}
				</View>
			</View>
		)
	}

}

const styleList = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	backgroundContainer: {
		backgroundColor: '#54D693',
		height: global.STATUS_BAR_HEIGHT + 100,
	},
	navigationItemTitle: {
		fontSize: 14,
		color: 'white'
	},
	scrollContainer: {
		top: global.STATUS_BAR_HEIGHT + 44,
	},
	scrollContent: {
		paddingVertical: 15,
	},
	content: {
		paddingHorizontal: 15,
		backgroundColor: 'white'
	},
	headerContainer: {
		marginHorizontal: 15,
		marginBottom: 15,
		backgroundColor: 'white',
		borderRadius: 15,
		paddingLeft: 15,
		paddingVertical: 20,
		shadowOpacity: 0.07,
		shadowRadius: 10,
	},
	headerContent: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#eee',
		borderBottomWidth: SEPARATOR_HEIGHT
	},
	headerLeftContainer: {
		flex: 1,
	},
	headerTitle: {
		fontSize: 18,
		color: '#333',
		fontWeight: 'bold'
	},
	headerDetail: {
		marginTop: 5,
		fontSize: 13,
		color: '#666',
		fontWeight: '500',
		marginBottom: 10,
	},
	headerCenterContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 5,
	},
	headerCenterItemContainer: {
		paddingRight: 15,
	},
	headerCenterItemTitle: {
		fontSize: 11,
		color: '#666'
	},
	headerTagContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	headerTagItemContainer: {
		borderWidth: 1,
		borderColor: '#54D693',
		borderRadius: 5,
		paddingVertical: 2,
		paddingHorizontal: 5,
		marginRight: 5,
		marginBottom: 5
	},
	headerTagItemTitle: {
		fontSize: 11,
		color: '#54D693',
	},
	headerBottomContainer: {
		paddingTop: 20,
	},
	headerNumberContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	headerNumberItemContainer: {
		paddingRight: 15,
		marginBottom: 10,
	},
	headerNumberItemTitle: {
		fontSize: 11,
		color: '#666'
	},
	headerNumberItemDetail: {
		fontSize: 11,
		color: '#54D693'
	},
	headerImage: {
		marginRight: 15,
		width: 50,
		height: 50,
		borderRadius: 50 / 2.0,
		backgroundColor: '#54D693',
	},
	headerSureContainer: {
		marginTop: 20,
		backgroundColor: '#54D693',
		height: 30,
		borderTopLeftRadius: 15,
		borderBottomLeftRadius: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerSureTitle: {
		color: 'white',
		fontSize: 11,
		fontWeight: '500'
	},






	centerContainer: {
		paddingTop: 15,
		flexDirection: 'row',
		alignItems: 'center',
	},
	centerTitle: {
		flex: 1,
		fontSize: 15,
		color: '#333',
		fontWeight: 'bold'
	},
	centerDetail: {
		fontSize: 15,
		color: '#54D693',
	},
	sectionTitle: {
		marginTop: 25,
		fontSize: 14,
		color: '#333',
		fontWeight: '500'
	},
	sectionDetail: {
		marginTop: 10,
		fontSize: 12,
		lineHeight: 18,
		color: '#333',
	},

	teamItemContainer: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	teamItemImage: {
		width: 50,
		height: 50,
		borderRadius: 50 / 2.0,
		backgroundColor: '#54D693'
	},
	teamItemContent: {
		flex: 1,
		marginLeft: 15,
	},
	teamItemMain: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	teamItemTitle: {
		fontSize: 13,
		color: '#333',
		fontWeight: '500'
	},
	teamItemDetail: {
		marginLeft: 10,
		fontSize: 11,
		color: '#666'
	},
	teamItemInfo: {
		marginTop: 10,
		fontSize: 11,
		color: '#666'
	},
	teamItemChat: {
		fontSize: 11,
		color: '#666'
	},

	moneyContainer: {
		marginTop: 15,
	},
	moneyItemContainer: {
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 20,
		marginVertical: 10,
		backgroundColor: 'white',
		shadowOpacity: 0.07,
		shadowRadius: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	moneyItemLeftContainer: {
		flex: 1,
	},
	moneyItemLeftMain: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	moneyItemTitle: {
		fontSize: 15,
		color: '#333'
	},
	moneyItemDetail: {
		marginLeft: 10,
		fontSize: 11,
		color: '#54D693'
	},
	moneyItemMoney: {
		marginTop: 10,
		fontSize: 11,
		color: '#444'
	},
	moneyItemNow: {
		marginTop: 10,
		fontSize: 11,
		color: '#444'
	},
	moneyItemRightContainer: {
		alignItems: 'center'
	},
	moneyItemBookTitle: {
		fontSize: 11,
		color: '#444'
	},
	moneyItemButtonContainer: {
		marginTop: 10,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: '#54D693',
		paddingVertical: 2,
		paddingHorizontal: 7,
	},
	moneyItemButtonTitle: {
		fontSize: 11,
		color: '#54D693'
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