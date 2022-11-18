import React, { Component } from 'react'
import { View, Text, Pressable, StyleSheet, Image, ScrollView } from 'react-native'
import HTNavigationBar from '~/common/navigation/HTNavigationBar'
import HTMaskView from '~/common/mask/HTMaskView'
import Animated, { Easing } from 'react-native-reanimated'
import HTShadowView from '~/common/view/HTShadowView'

let imageList = [
	require('~/assets/debug/avatar_1.png'),
	require('~/assets/debug/avatar_2.png'),
	require('~/assets/debug/avatar_3.png'),
	require('~/assets/debug/avatar_4.png'),
	require('~/assets/debug/avatar_5.png'),
	require('~/assets/debug/avatar_6.png'),
].sort(() => Math.random() - 0.5)

export default class HTInvestEnterpriseDetailPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			segmentedList: [
				{ title: '领域分布', selected: true },
				{ title: '轮次分布' },
				{ title: '投资趋势' },
			],
			chartList: [
				{ title: '企业服务', detail: 200 },
				{ title: '医疗健康', detail: 168 },
				{ title: '文娱传媒', detail: 88 },
				{ title: '金融', detail: 180 },
				{ title: '消费生活', detail: 160 },
				{ title: '电商', detail: 140 },
				{ title: '汽车交通', detail: 120 },
				{ title: '人工智能', detail: 100 },
			]
		}
		this.state.chartList.map((item) => {
			item.value = new Animated.Value(0)
		})
	}

	_renderNavigationBar = () => {
		return (
			<HTNavigationBar
				title={'企业/机构介绍'}
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
		let itemList = [
			{ title: '投资管理资本总量', detail: '¥5000亿' },
			{ title: '微信公众号', detail: 'Venture-capital' },
		]
		return (
			<View style={styleList.headerContainer}>
				<View style={styleList.headerContent}>
					<Text style={styleList.headerTitle}>某某创投（Venture capital）</Text>
					<View style={styleList.headerInfoContainer}>
					{
						itemList.map((item, index) => {
							return (
								<View key={index} style={styleList.headerInfoItemContainer}>
									<Text style={styleList.headerInfoItemTitle}>{item.title}</Text>
									<Text style={styleList.headerInfoItemDetail}>{item.detail}</Text>
								</View>
							)
						})
					}
					</View>
					<Text style={styleList.headerDetail}>官网: https://www.abd.com</Text>
				</View>
				<CacheImage style={styleList.headerImage} source={imageList[0]} />
			</View>
		)
	}

	_renderNumber = () => {
		let itemList = [
			{ title: '退出率', detail: '16.33%' },
			{ title: '再融率', detail: '33.56%' },
		]
		return (
			<View style={styleList.numberContainer}>
			{
				itemList.map((item, index) => {
					return (
						<View key={index} style={styleList.numberItemContainer}>
							<Text style={styleList.numberItemTitle}>{item.title}</Text>
							<Text style={styleList.numberItemDetail}>{item.detail}</Text>
						</View>
					)
				})
			}
			</View>
		)
	}

	_renderSection = (title, detail, content, rightTitle) => {
		return (
			<View style={styleList.sectionContainer}>
				<View style={styleList.sectionHeaderContainer}>
					<Text style={styleList.sectionTitle}>{title}</Text>
					{
						rightTitle ? (
							<Pressable onPress={global.TODO_TOAST}>
								<Text style={styleList.sectionRightTitle}>{rightTitle}</Text>
							</Pressable>
						) : null
					}
				</View>
				{ 
					detail ? (
						<Text style={styleList.sectionDetail}>{detail}</Text>
					) : null
				}
				{
					content
				}
			</View>
		)
	}

	_renderUser = () => {
		let itemList = [
			{ title: '', image: imageList[1] },
			{ title: '', image: imageList[2]},
		]
		return (
			<View style={styleList.userContainer}>
			{
				itemList.map((item, index) => {
					return (
						<View key={index} style={styleList.userItemContainer}>
							<CacheImage style={styleList.userItemImage} source={item.image} />
							<View style={styleList.userItemContent}>
								<View style={styleList.userItemMain}>
									<Text style={styleList.userItemTitle}>某先生</Text>
									<Text style={styleList.userItemDetail}>合伙人</Text>
									<Text style={styleList.userItemStatus}>在职</Text>
								</View>
								<Text style={styleList.userItemIntro}>自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍</Text>
								<View style={styleList.userItemSeparator}></View>
							</View>
						</View>
					)
				})
			}
			</View>
		)
	}

	_renderSegmented = () => {
		return (
			<View style={styleList.segmentContiner}>
			{
				this.state.segmentedList.map((item, index) => {
					let selected = item.selected
					let continerStyle = [
						styleList.segmentItemContainer,
						selected ? styleList.segmentItemContainerSelected : styleList.segmentItemContainerNormal
					]
					let titleStyle = [
						styleList.segmentItemTitle,
						selected ? styleList.segmentItemTitleSelected : styleList.segmentItemTitleNormal
					]
					return (
						<Pressable key={index} style={continerStyle} onPress={() => {
							this.state.segmentedList.map((item) => {
								item.selected = false
							})
							item.selected = true
							this.setState(this.state)
						}}>
							<Text style={titleStyle}>{item.title}</Text>
						</Pressable>
					)
				})
			}
			</View>
		)
	}

	_renderChart = () => {
		let maxValue = Math.max(...this.state.chartList.map(item => item.detail))
		return (
			<View style={styleList.chartContainer}>
			{
				this.state.chartList.map((item, index) => {
					let translateX = item.value
					let initValue = -(SCREEN_WIDTH - 15 - 15 - styleList.chartItemTitle.width - styleList.chartItemContent.marginLeft)
					let reloadValue = initValue * (1 - (item.detail / maxValue))
					translateX.setValue(initValue)
					HTMaskView.animation(translateX, reloadValue, 250)
					return (
						<View key={index} style={styleList.chartItemContainer}>
							<Text style={styleList.chartItemTitle}>{item.title}</Text>
							<View style={styleList.chartItemContent}>
								<Animated.View style={[styleList.chartItemAnimatedView, { transform: [{ translateX }] }]}>
									<Text style={styleList.chartItemDetail}>{item.detail}</Text>
								</Animated.View>
							</View>
						</View>
					)
				})
			}
			</View>
		)
	}

	_renderToolBar = () => {
		let itemList = [
			{ title: '立即入驻投资企业/机构', color: 'white', backgroundColor: '#54D693', flex: 1 },
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
				{
					this._renderNumber()
				}
				<View style={styleList.spaceContainer}></View>
				<View style={styleList.content}>
					{
						this._renderSection('基本介绍', '自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍自我介绍')
					}
					{
						this._renderSection('团队成员', null, this._renderUser(), '更多')
					}
					{
						this._renderSection('投资偏好', '', (
							<View>
							{
								this._renderSegmented()
							}
							{
								this._renderChart()
							}
							</View>
						))
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
		paddingHorizontal: 15,
		paddingVertical: 20,
		backgroundColor: '#54D693',
		flexDirection: 'row',
		alignItems: 'center',
	},
	headerContent: {
		flex: 1,
	},
	headerTitle: {
		fontSize: 17,
		color: 'white',
		fontWeight: '500'
	},
	headerInfoContainer: {
		flexDirection: 'row',
		marginTop: 15
	},
	headerInfoItemContainer: {
		marginRight: 10,
	},
	headerInfoItemTitle: {
		fontSize: 11,
		color: 'rgba(255, 255, 255, 0.9)'
	},
	headerInfoItemDetail: {
		marginTop: 3,
		fontSize: 12,
		color: 'white'	
	},
	headerDetail: {
		marginTop: 15,
		fontSize: 11,
		color: 'rgba(255, 255, 255, 0.9)',
	},
	headerImage: {
		width: 70,
		height: 70,
		borderRadius: 10,
		backgroundColor: 'white'
	},

	numberContainer: {
		flexDirection: 'row',
		paddingVertical: 15,
	},
	numberItemContainer: {
		flex: 1,
		alignItems: 'center'
	},
	numberItemTitle: {
		fontSize: 14,
		color: '#333',
		fontWeight: 'bold'
	},
	numberItemDetail: {
		marginTop: 5,
		fontSize: 12,
		color: '#54D693'
	},
	spaceContainer: {
		height: 10,
		backgroundColor: '#f5f5f5'
	},



	sectionHeaderContainer: {
		marginTop: 25,
		flexDirection: 'row',
		alignItems: 'center'
	},
	sectionTitle: {
		flex: 1,
		fontSize: 14,
		color: '#333',
		fontWeight: 'bold'
	},
	sectionRightTitle: {
		fontSize: 11,
		color: '#666'
	},
	sectionDetail: {
		marginTop: 10,
		fontSize: 12,
		lineHeight: 18,
		color: '#333',
	},

	userContainer: {
		marginTop: 15
	},
	userItemContainer: {
		paddingTop: 15,
		flexDirection: 'row',
	},
	userItemImage: {
		width: 50,
		height: 50,
		borderRadius: 50 / 2.0,
		backgroundColor: '#54D693'
	},
	userItemContent: {
		marginLeft: 15,
		flex: 1,
	},
	userItemMain: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	userItemTitle: {
		fontSize: 14,
		color: '#333',
		fontWeight: 'bold'
	},
	userItemDetail: {
		flex: 1,
		marginLeft: 10,
		fontSize: 11,
		color: '#666'
	},
	userItemStatus: {
		fontSize: 11,
		color: '#666',
	},
	userItemIntro: {
		marginTop: 10,
		fontSize: 11,
		color: '#666'
	},
	userItemSeparator: {
		marginTop: 15,
		width: '100%',
		backgroundColor: '#eee',
		height: SEPARATOR_HEIGHT,
	},

	segmentContiner: {
		marginTop: 15,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#f9f9f9',
		borderRadius: 5,
		height: 40,
	},
	segmentItemContainer: {
		flex: 1,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	segmentItemContainerNormal: {

	},
	segmentItemContainerSelected: {
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#54D693'
	},
	segmentItemTitle: {
		fontSize: 13,
	},
	segmentItemTitleNormal: {
		color: '#666'
	},
	segmentItemTitleSelected: {
		color: '#54D693'
	},

	chartContainer: {
		marginTop: 10,
	},
	chartItemContainer: {
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	chartItemTitle: {
		fontSize: 12,
		color: '#333',
		width: 50,
	},
	chartItemContent: {
		flex: 1,
		overflow: 'hidden',
		marginLeft: 15,
		paddingVertical: 0,
	},
	chartItemAnimatedView: {
		backgroundColor: '#81DFB2',
		justifyContent: 'center',
		alignItems: 'flex-end'
	},
	chartItemDetail: {
		marginRight: 10,
		fontSize: 10,
		color: 'white',
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