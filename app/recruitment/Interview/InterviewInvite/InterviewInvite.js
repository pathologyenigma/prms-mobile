import React, { Fragment, Component } from 'react'
import {
	View,
	Text,
	Image,
	FlatList,
	TextInput,
	StyleSheet,
	Pressable,
} from 'react-native'
import { HTNavigationBar } from 'react-native-route'
import { stirngForSalary } from '~/recruitment/utils/JobHelper'
import moment from 'moment'

class InterviewInviteType {

	static time = 0

	static job = 1

	static concact = 2

	static interview_type = 3

	static address = 4

	static note = 5

	static displayFromTypeValue = (type, value) => {
		switch(type) {
			case this.time: {
				if (!value) {
					return '请选择面试时间'
				}
				return moment(value).format('YYYY-MM-DD HH:mm')
			}
			case this.job: {
				if (!value) {
					return ''
				}
				return `${value?.title} ${value.salary ? stirngForSalary(value?.salary) : ''}`
			}
			default: {
				return value
			}
		}
	}

}

export default class InterviewInvite extends Component {

	constructor(props) {
		super(props)
		this.state = {
			itemList: [
				{ type: InterviewInviteType.time, title: '时间', detail: null, onPress: () => {
					global.TimePicker.open({
						date: this.state.itemList.find(item => item.type == InterviewInviteType.time)?.detail,
						onDateChange: (date) => {
							this.state.itemList.find(item => item.type == InterviewInviteType.time).detail = date
							this.setState(this.state)
						}
					})
				} },
				{ type: InterviewInviteType.job, title: '职位', detail: this.props.navigation.getParam('job'), onPress: () => {
					this.props.navigation.push('InterviewJobList', {
						id: this.state.itemList.find(item => item.type == InterviewInviteType.job)?.detail?.id,
						callback: (item) => {
							this.props.navigation.pop()
							this.state.itemList.find(item => item.type == InterviewInviteType.job).detail = item
							this.setState(this.state)
						}
					})
				} },
				// { type: InterviewInviteType.concact, title: '联系人', detail: '拉面，13458888888', onPress: () => {} },
				// { type: InterviewInviteType.interview_type, title: '面试形式', detail: '线下面试', onPress: () => {} },
				// {
				// 	type: InterviewInviteType.address,
				// 	title: '地址',
				// 	detail: '深圳市南山区创智云城（建设中）创智云…',
				// 	onPress: () => {},
				// },
				// { type: InterviewInviteType.note, title: '备注（选填）', showInput: true, detail: '' },
			],
		}
	}

	_footerDidTouch = () => {
		const userId = this.props.navigation.getParam('user')?.id
		const jobId = this.state.itemList.find(item => item.type == InterviewInviteType.job)?.detail?.id
		const time = this.state.itemList.find(item => item.type == InterviewInviteType.time)?.detail
		if (!jobId) {
			Toast.show('请选择工作职位')
			return
		}
		if (!time) {
			Toast.show('请选择面试时间')
			return
		}
		const timeList = [time.toISOString(), new Date(time.getTime() + 3600000).toISOString()]
		HTAPI.HRInviteInterview({
			userId: userId,
			jobId: jobId,
			time: timeList,
		}).then(response => {
			Toast.show('提交成功!')
			this.props.navigation.pop()
			// this.props.navigation.replace('InterviewDetail')
		})
	}

	_renderHeader = () => {
		const user = this.props.navigation.getParam('user')
		return (
			<View style={styleList.headerContainer}>
				<CacheImage style={styleList.headerImage} source={global.AVATAR_IMAGE(user?.logo)} />
				<View style={styleList.headerContent}>
					<Text style={styleList.headerTitle}>
						{user?.name ?? user?.username}
						<Text style={styleList.headerDetail}> 项目经理</Text>
					</Text>
					<Text style={styleList.headerDescription}>
						{user.age}岁 | 工作{user.exp}年 | 期望{stirngForSalary(user?.salary_expectations)}
					</Text>
				</View>
			</View>
		)
	}

	_renderItem = ({ item, index }) => {
		return (
			<View style={styleList.itemContainer}>
				<View style={styleList.itemSeparator}></View>
				<Pressable style={styleList.itemContent} onPress={item.onPress}>
					<Text style={styleList.itemTitle}>{item.title}</Text>
					{!item.showInput && (
						<Fragment>
							<Text style={styleList.itemDetail}>{InterviewInviteType.displayFromTypeValue(item.type, item.detail)}</Text>
							<Image source={require('~/assets/requestJobs/item_more.png')} />
						</Fragment>
					)}
				</Pressable>
				{item.showInput && (
					<View style={styleList.footerInputContainer}>
						<TextInput
							style={styleList.footerInput}
							placeholder={'特殊信息备注'}
							placeholderTextColor={'#888888'}
							multiline={true}
							textAlignVertical={'center'}
							value={item.detail}
							maxLength={200}
							onChangeText={text => {
								item.detail = text
								this.setState(this.state)
							}}
						/>
						<Text style={styleList.footerInputLimit}>
							{item.detail.length}/200
						</Text>
					</View>
				)}
			</View>
		)
	}

	_renderFooter = () => {
		return (
			<Pressable
				style={styleList.footerButtonContainer}
				onPress={() => {
					this._footerDidTouch()
				}}>
				<Text style={styleList.footerButtonTitle}>发出邀请</Text>
			</Pressable>
		)
	}

	render() {
		return (
			<View style={CONTAINER}>
				<HTNavigationBar
					title={'面试邀请'}
					leftItemList={[
						<HTRouteView
							routeData={this.props.navigation.createRouteData('pop')}>
							<Image source={require('~/assets/requestJobs/navbar-back.png')} />
						</HTRouteView>,
					]}
				/>
				<FlatList
					extraData={this.state}
					ListHeaderComponent={this._renderHeader}
					ListFooterComponent={this._renderFooter}
					data={this.state.itemList}
					renderItem={this._renderItem}
				/>
			</View>
		)
	}
}

const styleList = StyleSheet.create({
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 20,
	},
	headerImage: {
		width: 48,
		height: 48,
		borderRadius: 48 / 2.0,
	},
	headerContent: {
		flex: 1,
		marginLeft: 13,
	},
	headerTitle: {
		fontSize: 15,
		color: '#333333',
		fontWeight: '500',
	},
	headerDetail: {
		fontSize: 12,
		color: '#888',
	},
	headerDescription: {
		marginTop: 10,
		fontSize: 12,
		color: '#666',
	},
	itemContainer: {},
	itemSeparator: {
		width: '100%',
		height: SEPARATOR_HEIGHT,
		backgroundColor: '#ECECEC',
	},
	itemContent: {
		paddingHorizontal: 12,
		height: 55,
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemTitle: {
		flex: 1,
		fontSize: 15,
		color: '#333',
	},
	itemDetail: {
		fontSize: 12,
		color: '#333333',
		marginRight: 13,
	},
	footerInputContainer: {
		marginHorizontal: 22.5,
	},
	footerInput: {
		paddingHorizontal: 15,
		paddingTop: 15,
		paddingBottom: 15,
		backgroundColor: '#F7F7F7',
		borderRadius: 4,
		height: 90,
	},
	footerInputLimit: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		fontSize: 12,
		color: '#888',
	},
	footerButtonContainer: {
		marginHorizontal: 22.5,
		marginTop: 30,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#57DE9E',
		borderRadius: 4,
		paddingVertical: 14,
	},
	footerButtonTitle: {
		fontSize: 13,
		color: 'white',
		fontWeight: '500',
	},
})
