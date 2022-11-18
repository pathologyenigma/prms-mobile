import React, { Component } from 'react'
import {
	View,
	Text,
	Image,
	FlatList,
	Pressable,
	StyleSheet,
} from 'react-native'
import { HTNavigationBar } from 'react-native-route'
import HTRefreshManager from '~/common/refresh/HTRefreshManager'
import moment from 'moment'

export default class InterviewResume extends Component {
	constructor(props) {
		super(props)
		this.state = {}
		// this.refreshManager = new HTRefreshManager()
		// this.refreshManager.pageCount = 100
	}

	componentDidMount() {
		this.onRefresh(true, true)
	}

	onRefresh = (isHeaderRefresh = true, showLoading = true) => {
		// if (this.refreshManager.cantHandlerRefresh(isHeaderRefresh)) {
		//   		return
		//   	}
		HTAPI.HRGetResumeDeliveryRecord({}, { showLoading })
			.then(response => {
				this.state.itemList = response.rows
			})
			.finally(() => this.setState(this.state))
	}

	_itemDidTouch = (item, index) => {
		this.props.navigation.push('TalentDetail', { id: item?.user_id })
	}

	_renderItem = ({ item, index }) => {
		return (
			<View style={styleList.itemContainer}>
				<Pressable
					style={styleList.itemContent}
					onPress={() => this._itemDidTouch(item, index)}>
					<Image source={require('~/assets/requestJobs/jianli-pdf.png')} />
					<View style={styleList.itemMain}>
						<Text style={styleList.itemTitle}>
							{item?.User?.real_name ?? item?.User?.username}个人简历
						</Text>
						<Text style={styleList.itemTitle}>{item?.Job?.title}</Text>
						<Text style={styleList.itemDetail}>
							{moment(new Date(item.createdAt)).format('YYYY-MM-DD')}
						</Text>
					</View>
					<Text style={styleList.itemPreview}>预览</Text>
					<Image source={require('~/assets/requestJobs/item_more.png')} />
				</Pressable>
				<View style={styleList.itemFooterContainer}>
					<Pressable
						style={styleList.itemFooterActionContainer}
						onPress={() => {
							console.log(item?.job_id)
							this.props.navigation.push('EmployerJobDetail', {
								jobId: item?.job_id,
							})
						}}>
						<Text style={styleList.itemFooterActionTitle}>查看职位</Text>
					</Pressable>
				</View>
			</View>
		)
	}

	render() {
		return (
			<View style={styleList.container}>
				<HTNavigationBar
					title={'收到简历'}
					leftItemList={[
						<HTRouteView
							routeData={this.props.navigation.createRouteData('pop')}>
							<Image source={require('~/assets/requestJobs/navbar-back.png')} />
						</HTRouteView>,
					]}
				/>
				<FlatList
					data={this.state.itemList}
					renderItem={this._renderItem}
					onRefresh={this.onRefresh}
					{...BIND_EMPTY_VIEW()}
				/>
			</View>
		)
	}
}

const styleList = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	itemContainer: {
		borderColor: '#CECECE',
		borderWidth: 1,
		borderRadius: 8,
		marginHorizontal: 10,
		marginVertical: 10,
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 10,
	},
	itemContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemMain: {
		flex: 1,
		marginLeft: 20,
		marginRight: 10,
	},
	itemTitle: {
		fontSize: 14.4424,
		color: '#333333',
		fontWeight: '500',
	},
	itemDetail: {
		marginTop: 5,
		fontSize: 10.19465,
		color: '#666666',
	},
	itemPreview: {
		fontSize: 11.0442,
		color: '#666666',
		marginRight: 9.5,
	},
	itemMore: {},
	itemFooterContainer: {
		marginTop: 15,
		paddingTop: 10,
		width: '100%',
		borderTopColor: '#eee',
		borderTopWidth: 1,
		alignItems: 'flex-end',
	},
	itemFooterActionContainer: {
		paddingVertical: 7,
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: '#54D693',
	},
	itemFooterActionTitle: {
		color: 'white',
		fontSize: 11,
	},
})
