import React, { Component } from 'react'
import {
	View,
	Text,
	Image,
	StyleSheet,
	FlatList,
	Pressable,
} from 'react-native'
import { HTNavigationBar } from 'react-native-route'
import HTRefreshManager from '~/common/refresh/HTRefreshManager'
import {
  stringForEducation,
  stringForExperience,
  stringForFullTime,
  stirngForSalary
} from '~/recruitment/utils/JobHelper'
import HTShadowView from '~/common/view/HTShadowView'

export default class InterviewJobList extends Component {

	static navigationOption = {
		headerShown: false
	}

	constructor(props) {
		super(props)
		this.state = {
			itemList: [],
			id: this.props.navigation.getParam('id'),
		}
		this.refreshManager = new HTRefreshManager()
	}

	componentDidMount() {
		this.onRefresh(true, true)
	}

	onRefresh = (isHeaderRefresh = true, showLoading = false) => {
		if (this.refreshManager.cantHandlerRefresh(isHeaderRefresh)) {
			return
		}
		HTAPI.UserGetJobListByEntId({ 'status': 'InRecruitment' }).then(response => {
			this.state.itemList = this.refreshManager.reloadItemList(response.data, this.state.itemList, isHeaderRefresh)
		}).finally(() => this.setState(this.state))
	}

	_itemDidTouch = (item, index) => {
		const callback = this.props.navigation.getParam('callback')
		callback && callback(item)
	}

	_renderItem = ({ item, index }) => {
		const detail = `${stringForExperience(item.experience)} | ${stringForEducation(item.education)} | ${item?.address?.[4]}·${item?.address?.[5]}`
		const price = stirngForSalary(item.salary)
		const isSelected = this?.state?.id == item.id
		return (
			<HTShadowView style={styleList.itemContainer}>
				<Pressable style={styleList.itemContent} onPress={() => this._itemDidTouch(item, index)}>
					<View style={styleList.itemMainContainer}>
						<Text style={styleList.itemTitlte}>{item.title}</Text>
						<View style={styleList.itemFlagContainer}>
							<Text style={styleList.itemFlagTitle}>急聘</Text>
						</View>
						<View style={CONTAINER}></View>
						<Text style={styleList.itemPrice}>{price}</Text>
					</View>
					<Text style={styleList.itemDetail}>{detail}</Text>
					<View style={styleList.itemSeparator}></View>
				</Pressable>
				<View style={styleList.itemFooterContainer}>
					<Text style={styleList.itemFooterTitle}>{item.hr_name}</Text>
					<Image source={isSelected ? require('~/assets/interview_invite_job_selected.png') : require('~/assets/interview_invite_job_normal.png')} />
				</View>
			</HTShadowView>
		)
	}

	render() {
		return (
			<View style={styleList.container}>
				<HTNavigationBar 
					title={'面试职位'} 
					leftItemList={[
						<HTRouteView routeData={this.props.navigation.createRouteData('pop')}>
							<Image source={require('~/assets/requestJobs/navbar-back.png')} />
						</HTRouteView>
					]}
				/>
				<FlatList 
					data={this.state.itemList} 
					renderItem={this._renderItem} 
					onRefresh={() => this.onRefresh(true, false)}
					onEndReached={() => this.onRefresh(false, false)}
					refreshManager={this.refreshManager}
					{...BIND_EMPTY_VIEW()}
				/>
			</View>
		)
	}
}

const styleList = StyleSheet.create({
	container: {
		flex: 1,
	},
	itemContainer: {
		margin: 15,
		borderRadius: 8,
		backgroundColor: 'white',
		shadowColor: '#BBBBBB',
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 1
		},
	},
	itemContent: {
		paddingHorizontal: 16,
		paddingTop: 16,
	},
	itemMainContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemTitlte: {
		color: '#333',
		fontSize: 15,
		fontWeight: '500'
	},
	itemFlagContainer: {
		marginLeft: 15,
		borderColor: '#FF5754',
		borderWidth: 1,
		paddingHorizontal: 6,
		paddingVertical: 3,
		borderRadius: 3,
	},
	itemFlagTitle: {
		color: '#FF1B14',
		fontSize: 11,
		fontWeight: '500'
	},
	itemPrice: {
		color: '#57DE9E',
		fontWeight: '600',
		fontSize: 16,
	},
	itemDetail: {
		marginTop: 11,
		fontSize: 12,
		color: '#666666',
	},
	itemSeparator: {
		marginTop: 15,
		marginBottom: 10,
		backgroundColor: '#F0F0F0',
		width: '100%',
		height: 1,
	},
	itemFooterContainer: {
		marginLeft: 16,
		flexDirection: 'row',
		alignItems: 'flex-end',
	},
	itemFooterTitle: {
		flex: 1,
		fontSize: 12,
		color: '#666666',
		marginBottom: 10,
	},


})
