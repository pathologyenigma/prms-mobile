import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/MessagePage.style'
import { GenProps } from '../../../utils/StackProps'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import {
	Text,
	View,
	Image,
	StatusBar,
	TextInput,
	DeviceEventEmitter,
	FlatList,
	Keyboard,
	ActivityIndicator,
	Pressable,
} from 'react-native'
import NextPressable from '../../components/NextPressable'
import GradientButton from '../../components/GradientButton'
import LinearGradient from 'react-native-linear-gradient'
import { gradienRightGreenColor, greenColor } from '../../../utils/constant'
import { ScrollView } from 'react-native-gesture-handler'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import SystemHelper from '../../../utils/system'
import JobCell from '../../components/JobCell'
import AlertContentModal from '../../components/AlertContentModal'
import WhiteContentModal from '../../components/WhiteContentModal'
import HTAuthManager from '~/common/auth/common/model/HTAuthManager'
import HTAppStateManager from '~/common/appstate/HTAppStateManager'

type IProps = GenProps<'MessagePage'> &
	ReturnType<typeof mapStateToProps> &
	ReturnType<typeof mapDispatchToProps>
interface IState {
	targetItem: any
	page: number
	pageSize: number
	listDataSource: any
	dataSource: any
	refreshState: RefreshState
	content: string
	showCommonWord: boolean
	showMediaView: boolean
	showSendBtn: boolean
	commonWordData: any
	alertModalVisible: boolean
	alertType: number
	inappropriateVisible: boolean
	selectReason: string
	operateModalVisible: boolean
	rejectReason: string
	rejectModalVisible: boolean
	isLoadMoreData: boolean
}

const inappropriateArray = [
	'职位不匹配',
	'公司不合适',
	'行业不感兴趣',
	'工作地点太远',
	'薪资不满意',
	'暂无求职意向',
	'已找到工作',
	'其他原因',
]

const PARSE = value => {
	try {
		return JSON.parse(value)
	} catch (e) {}
}

class MessagePage extends Component<IProps, IState> {
	private inputRef: any
	private newMessaheListner: any
	private messageListRef: any
	private messageListKey: any = {}
	constructor(props: IProps) {
		super(props)
		const {
			route: {
				params: { targetItem },
			},
			navigation,
		} = props
		if (!targetItem) {
			Toast.show('数据异常请重试')
			navigation.goBack()
			return
		}
		this.state = {
			targetItem,
			userInfo: null,
			userIsEnterprice: HTAuthManager.keyValueList.userRole == 'EnterpriseUser',
			page: 0,
			pageSize: 10,
			content: '',
			listDataSource: [],
			dataSource: [],
			refreshState: 1,
			isLoadMoreData: false,
			showCommonWord: false,
			showMediaView: false,
			showSendBtn: false,
			alertModalVisible: false,
			alertType: 0,
			inappropriateVisible: false,
			operateModalVisible: false,
			rejectReason: '',
			rejectModalVisible: false,
			selectReason: '',
			commonWordData: [
				{
					id: 1,
					content: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。',
				},
				{
					id: 2,
					content: '你好，我可以把我的个人简历发给你看看吗？',
				},
				{
					id: 1,
					content: '你好，我的姓名是,方便沟通么?',
				},
			],
		}
		this.reformNewMessage = this.reformNewMessage.bind(this)
		this.newMessageListner = DeviceEventEmitter.addListener(
			HTAuthManager.kHTSocketMessageDidReceiveNotice,
			this.reformNewMessage,
		)
		this.appStateListener = HTAppStateManager.addListener(isActive => {
			if (isActive) {
				this.state.page = 0
				this.loadData()
			}
		})
	}

	componentDidMount() {
		Promise.all([
			HTAPI.UserGetUsernameAndLogoWithId({
				user_id: this?.state?.targetItem?.id,
			}),
			HTAPI.UserGetBasicInfo(),
		]).then(([targetItemInfo, userInfo]) => {
			this.setState(
				{
					targetItem: { ...this.state.targetItem, ...targetItemInfo },
					userInfo,
				},
				this.loadData,
			)
		})
		this.listener = DeviceEventEmitter.addListener(
			global.kHTKeyboardHeightWillChange,
			event => {
				global.KEYBOARD_ANIMATION(event)
				this.setState(this.state, () => {
					this.scrollToEnd()
				})
			},
		)
	}

	scrollToEnd = (animated = true) => {
		setTimeout(() => {
			this?.scrollView?.scrollToEnd &&
				this?.scrollView?.scrollToEnd({ animated })
		}, 50)
	}

	componentWillUnmount() {
		if (this.newMessageListner) {
			this.newMessageListner.remove()
		}
		this.appStateListener.remove()
	}

	reformNewMessage(message: any) {
		const { listDataSource } = this.state
		if (
			message &&
			[message.to, message.from].find(
				item => item == this?.state?.targetItem?.id,
			)
		) {
			const newMessage: any = []
			if (!this.messageListKey[message.uuid]) {
				this.messageListKey[message.uuid] = true
				newMessage.push(message)
			}
			this.setState(
				{
					listDataSource: newMessage.concat(listDataSource),
				},
				() => {
					// 此处需要判断当前是否滑动到顶部查看历史消息,如果在查看历史消息,则不进行滚动到底部操作
					// this.messageListRef && this.messageListRef.scrollsToTop({ animated: true })
				},
			)
		}
	}

	listScrollToEnd() {
		if (!this.messageListRef) {
			setTimeout(() => {
				this.listScrollToEnd()
			}, 300)
		} else {
			setTimeout(() => {
				this.messageListRef.scrollToOffset({ animated: true, offset: 0 })
			}, 100)
		}
	}

	loadData() {
		const { targetItem, pageSize, page, listDataSource } = this.state
		const { navigation } = this.props
		HTAPI.UserGetMessages({
			targetId: targetItem.id,
			page: page,
			pageSize: pageSize,
		}).then(response => {
			// response.messages.map(item => {
			// 	const info = PARSE(item.messageContent)
			// 	if (info?.type == 'job') {
			// 		HTAPI.UserGetJob({
			// 			jobid: info?.value,
			// 		}).then(response => {
			// 			console.log('😲', response)
			// 			item.detail = response
			// 			this.setState(this.state)
			// 		})
			// 	}
			// })
			const newsList = [...response.messages]
			const nextList: any = []
			newsList.forEach(e => {
				if (!this.messageListKey[e.uuid]) {
					this.messageListKey[e.uuid] = true
					nextList.push(e)
				}
			})
			this.setState(
				{
					listDataSource: listDataSource.concat(nextList),
				},
				() => {
					if (page === 0) {
						this.setState({
							refreshState: newsList.length === pageSize ? 0 : 6,
						})
					} else {
						this.setState({
							refreshState: newsList.length === pageSize ? 0 : 6,
						})
						setTimeout(() => {}, 1000)
					}
				},
			)
		})
		// this.setState({
		//   dataSource: [{
		//     id: 1,
		//     type: 'jianli',
		//     name: '项目经理',
		//     company: '深圳市酷魅科技有限公司',
		//     financing: '融资未公开',
		//     staffAmount: '1-49人',
		//     experience: '3-4年',
		//     education: '大专及以上',
		//     location: '深圳·宝安区',
		//     salary: '15K-30K',
		//     interviewer: '李女士·产品线HRBP',
		//     time: '6月25日  20:40  ',
		//     launch: '李女士'
		//   }, {
		//     id: 2,
		//     type: 'message',
		//     content: '这是我的资料，希望能成为贵团队的一员。',
		//     time: '6月25日  20:40  ',
		//     launch: '李女士'
		//   }, {
		//     id: 3,
		//     type: 'message',
		//     content: '请问有相关作品和个人简历吗？麻烦发送一份给我。',
		//     time: '6月25日  20:40  ',
		//     launch: '王经理'
		//   }, {
		//     id: 4,
		//     type: 'requestResume',
		//     content: '我想要一份您的附件简历到我的邮箱，您是否同意',
		//     time: '6月25日  20:40  ',
		//     launch: '王经理'
		//   }, {
		//     id: 5,
		//     type: 'inviteInterview',
		//     content: '领航新时代向您发出面试邀请，点击查看详情',
		//     time: '6月25日  20:40  ',
		//     launch: '李女士'
		//   }, {
		//     id: 6,
		//     type: 'acceptInterview',
		//     content: '接受了面试邀请',
		//     time: '6月25日  20:40  ',
		//     launch: '李女士'
		//   }, {
		//     id: 7,
		//     type: 'rejectInterview',
		//     content: '您已拒绝面试邀请',
		//     detail: '已找到合适的公司，暂时不打算跳槽。',
		//     time: '6月25日  20:40  ',
		//     launch: '李女士'
		//   },]
		// })
	}

	renderNavBar() {
		const { navigation } = this.props
		const { targetItem } = this.state
		let userTitle = ''
		if (targetItem?.ent && targetItem?.pos) {
			userTitle = `${targetItem.ent}·${targetItem.pos}`
		} else if (targetItem?.job_category_expectation) {
			userTitle =
				targetItem.job_category_expectation[
					targetItem.job_category_expectation.length - 1
				]
		}
		return (
			<View style={styles.navBar}>
				<View style={styles.navBarContent}>
					<NextPressable
						style={styles.barLeftView}
						onPress={() => {
							navigation.goBack()
						}}>
						<Image
							source={require('../../../assets/requestJobs/message-back.png')}
							style={styles.backIcon}
						/>
						<Text style={{}}></Text>
					</NextPressable>
					<View style={styles.barTitleView}>
						<Text style={styles.barTitle}>{targetItem.name}</Text>
						<Text style={styles.barDetail}>{userTitle}</Text>
					</View>
					<NextPressable
						style={styles.editBtbn}
						onPress={() => {
							this.setState({ operateModalVisible: true })
						}}>
						<Image
							source={require('../../../assets/requestJobs/message-edit.png')}
							style={styles.editIcon}
						/>
					</NextPressable>
				</View>
			</View>
		)
	}

	renderOperateView() {
		return (
			<View style={styles.operateVeiw}>
				<NextPressable
					style={styles.operateBtn}
					onPress={() => {
						global.TODO_TOAST()
						// this.setState({
						//   alertModalVisible: true,
						//   alertType: 1
						// })
					}}>
					<Image
						source={require('../../../assets/requestJobs/message-phone.png')}
						style={styles.operateIcon}
						resizeMode="center"
					/>
					<Text style={styles.operateText}>发电话</Text>
				</NextPressable>
				<NextPressable
					style={styles.operateBtn}
					onPress={() => {
						// global.TODO_TOAST()
						if (this.state.userIsEnterprice) {
							this.props.navigation.push('InterviewInvite', { user: this.state.targetItem, job: this?.state?.targetItem?.job })
							return
						}
						this.setState({
							alertModalVisible: true,
							alertType: 2,
						})
					}}>
					<Image
						source={require('../../../assets/requestJobs/message-jianli.png')}
						style={styles.operateIcon}
						resizeMode="center"
					/>
					<Text style={styles.operateText}>
						{this.state.userIsEnterprice ? '邀面试' : '发简历'}
					</Text>
				</NextPressable>
				<NextPressable
					style={styles.operateBtn}
					onPress={() => {
						global.TODO_TOAST()
						// this.setState({
						//   alertModalVisible: true,
						//   alertType: 4
						// })
					}}>
					<Image
						source={require('../../../assets/requestJobs/message-weixin.png')}
						style={styles.operateIcon}
						resizeMode="center"
					/>
					<Text style={styles.operateText}>换微信</Text>
				</NextPressable>
				<NextPressable
					style={styles.operateBtn}
					onPress={() => {
						global.TODO_TOAST()
						// this.setState({
						//   inappropriateVisible: true,
						//   selectReason: '',
						// })
					}}>
					<Image
						source={require('../../../assets/requestJobs/message-close.png')}
						style={styles.operateIcon}
						resizeMode="center"
					/>
					<Text style={styles.operateText}>不合适</Text>
				</NextPressable>
			</View>
		)
	}

	renderTextMessage(item: any) {
		let isSendFromSelf = this?.state?.targetItem?.id == item.to.toString()
		let avatarUrl = isSendFromSelf
			? this?.state?.userInfo?.image_url
			: this?.state?.targetItem?.logo
		avatarUrl = global.AVATAR_IMAGE(avatarUrl)
		if (isSendFromSelf) {
			// 发送方
			return (
				<View key={item.uuid.toString()} style={styles.cellSendMessage}>
					<Text style={styles.cellSendContent} selectable={true}>
						{item.messageContent}
					</Text>
					<CacheImage source={avatarUrl} style={styles.icon} />
				</View>
			)
		}
		// 接收方
		return (
			<View key={item.uuid.toString()} style={styles.cellReceiveMessage}>
				<CacheImage source={avatarUrl} style={styles.icon} />
				<Text style={styles.cellReceiveContent} selectable={true}>
					{item.messageContent}
				</Text>
			</View>
		)
	}

	renderRequestResume(item: any) {
		const isSend = true
		if (isSend) {
			return <Text>正在请求简历中</Text>
		}
		return (
			<View style={styles.cellReceiveMessage}>
				<Image
					source={{
						uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg',
					}}
					style={styles.icon}
				/>
				<View style={styles.requestResume}>
					<View style={styles.requestResumeTop}>
						<View style={styles.requestResumeDocIcon} />
						<Text style={styles.requestResumeDocText}>{item.content}</Text>
					</View>
					<View style={styles.requestResumeBtn}>
						<NextPressable
							style={styles.requestResumeBtnItem}
							onPress={() => {
								this.setState({ rejectModalVisible: true })
							}}>
							<Text style={styles.requestResumeBtnRegect}>拒绝</Text>
						</NextPressable>
						<View style={styles.requestResumeBtnLine} />
						<NextPressable style={styles.requestResumeBtnItem}>
							<Text
								style={[styles.requestResumeBtnRegect, { color: '#7DD49C' }]}>
								同意
							</Text>
						</NextPressable>
					</View>
				</View>
			</View>
		)
	}

	renderInviteInterview(item: any, data: any) {
		return (
			<View style={styles.cellReceiveMessage}>
				<CacheImage
					source={global.AVATAR_IMAGE(this?.state?.targetItem?.logo)}
					style={styles.icon}
				/>
				<View style={styles.requestResume}>
					<Pressable style={styles.requestResumeTop} onPress={() => {
						// HTAPI.CommoncancelInterview({
						// 	interviewId: data?.body?.id
						// }).then(response => {
						// 	console.log(response)
						// })
					}}>
						<Image
							source={require('../../../assets/requestJobs/message-invite.png')}
							style={styles.inviteIcon}
						/>
						<Text style={styles.requestResumeDocText}>{data.title}</Text>
					</Pressable>
					{/* <NextPressable
            style={styles.inviteBtn}
          >
            <Text style={[styles.requestResumeBtnRegect, { color: '#7DD49C' }]}>立即查看</Text>
          </NextPressable> */}
					<View style={styles.requestResumeBtn}>
						<NextPressable
							style={styles.requestResumeBtnItem}
							onPress={() => {
								// this.setState({ rejectModalVisible: true })
								HTAPI.CandidateAcceptOrRejectInterview({
									interviewId: data?.body?.id,
									accept: false,
								}).then(() => {
									this.setState({ rejectModalVisible: false })
									Toast.show('拒绝面试成功!')
								})
							}}>
							<Text style={styles.requestResumeBtnRegect}>拒绝</Text>
						</NextPressable>
						<View style={styles.requestResumeBtnLine} />
						<NextPressable style={styles.requestResumeBtnItem} onPress={() => {
							HTAPI.CandidateAcceptOrRejectInterview({
								interviewId: data?.body?.id,
								accept: true,
							}).then((result) => {
								console.log(result)
								Toast.show('接受面试成功!')
							})
						}}>
							<Text
								style={[styles.requestResumeBtnRegect, { color: '#7DD49C' }]}>
								接受
							</Text>
						</NextPressable>
					</View>
				</View>
			</View>
		)
	}

	renderAcceptInterview(item: any) {
		const isSend = true
		if (isSend) {
			return (
				<View style={styles.cellSendMessage}>
					<View style={[styles.cellSendContent, { flexDirection: 'row' }]}>
						<Text style={styles.cellSendText}>{item.content}</Text>
						<Image
							source={require('../../../assets/requestJobs/message-accpet-interview.png')}
							style={styles.accpetIcon}
						/>
					</View>
					<Image
						source={{
							uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg',
						}}
						style={styles.icon}
					/>
				</View>
			)
		}
		return (
			<View style={styles.cellReceiveMessage}>
				<Image
					source={{
						uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg',
					}}
					style={styles.icon}
				/>
				<Text style={styles.cellReceiveContent}>{item.content}</Text>
			</View>
		)
	}

	renderRejectInterview(item: any) {
		const isSend = true
		if (isSend) {
			return (
				<View style={styles.cellSendMessage}>
					<View style={[styles.cellSendContent]}>
						<View
							style={{
								flexDirection: 'row',
								paddingBottom: 5,
								borderBottomWidth: 1,
								borderBottomColor: '#fff',
							}}>
							<Text style={styles.cellSendText}>{item.content}</Text>
							<Image
								source={require('../../../assets/requestJobs/message-reject-interview.png')}
								style={styles.rejectIcon}
							/>
						</View>
						<Text style={styles.detailText}>{`“${item.detail}”`}</Text>
					</View>
					<Image
						source={{
							uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg',
						}}
						style={styles.icon}
					/>
				</View>
			)
		}
		return (
			<View style={styles.cellReceiveMessage}>
				<Image
					source={{
						uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg',
					}}
					style={styles.icon}
				/>
				<Text style={styles.cellReceiveContent}>{item.content}</Text>
			</View>
		)
	}

	renderCellItem(item: any) {
		const { userInfo } = this.state
		const { targetItem } = this.state
		const showItem = []
		// if (item.type === 'jianli') {
		//   // 打招呼简历

		// }
		let data = PARSE(item.messageContent)
		if (!data) {
			showItem.push(this.renderTextMessage(item))
		} else {
			if (data?.type == 'job') {
				// if (item?.detail?.job) {
				// 	showItem.push(
				// 		<JobCell
				// 			cellItem={item?.detail?.job}
				// 			showCellTime={true}
				// 			launchText={true ? '由招聘官发起的通知' : '由你发起的通知'}
				// 		/>,
				// 	)
				// }
				showItem.push(
					<Pressable
						onPress={() => {
							this.props.navigation.push('JobDetail', { jobid: data.value })
						}}>
						<Text style={styles.changeJobText}>{`${
							item.to == this.state.targetItem.id ? '你' : '对方'
						}切换了职位: ${data?.info?.title}`}</Text>
					</Pressable>,
				)
			} else if (data.type == 'InterviewInvitation') {
				let title = data.title
				let result = null
				if (data.type == 'InterviewInvitation') {
					if (this.state.userIsEnterprice) {
						title = title.replace(this.state.userIsEnterprice ? '向你' : '', '')
						title = title.replace(this.state.userIsEnterprice ? '，点击查看详情' : '', '')
					} else {
						result = this.renderInviteInterview(item, data)
					}
				}
				if (result == null) {
					result = (
						<Pressable
							onPress={() => {
								// HTAPI.CommoncancelInterview({
								// 	interviewId: data?.body?.id
								// }).then(response => {
								// 	console.log(response)
								// })

								// HTAPI.HREndInterview({
								// 	interviewId: data?.body?.id,
								// 	ispassed: true,
								// 	description: 'show me the code'
								// })

								// if (this.state.userIsEnterprice) {
								// 	this.props.navigation.push('EmployerInterviewDetail', { id: data?.body?.id })
								// } else {
								//// 	this.props.navigation.push('InterviewDetail', { id: data?.body?.id })
								// }
							}}>
							<Text style={styles.changeJobText}>{title}</Text>
						</Pressable>
					)
				}
				
				showItem.push(result)
			}
		}
		if (item.type === 'requestResume') {
			// 请求简历
			showItem.push(this.renderRequestResume(item))
		}
		if (item.type === 'inviteInterview') {
			showItem.push(this.renderInviteInterview(item))
		}
		if (item.type === 'acceptInterview') {
			showItem.push(this.renderAcceptInterview(item))
		}
		if (item.type === 'rejectInterview') {
			showItem.push(this.renderRejectInterview(item))
		}
		if (item.messageType == 'Other') {
		}
		return (
			<View>
				{showItem.map((item, index) => {
					return <View key={index}>{item}</View>
				})}
			</View>
		)
	}

	handleRefresh() {
		this.setState(
			{
				refreshState: 1,
				page: this.state.page + 1,
			},
			() => {
				this.loadData()
			},
		)
	}

	sendTextMessage() {
		HTAPI.UserSendMessage({
			info: {
				messageType: 'Normal',
				messageContent: this.state.content,
				to: this.state.targetItem.id,
			},
		}).then(response => {
			Toast.show('发送成功!')
			this.setState({ content: '' })
		})
	}

	renderHeader() {
		if (this.state.refreshState === 6) {
			return <Text style={styles.noMoreText}>没有更多记录了</Text>
		}
		if (this.state.refreshState !== 1) {
			return null
		}
		return (
			<ActivityIndicator
				color="#999"
				style={{
					alignSelf: 'center',
					marginTop: 10,
					height: 15,
				}}
				size={'small'}
			/>
		)
	}

	renderList() {
		const { refreshState, listDataSource, isLoadMoreData, page } = this.state
		return (
			<RefreshListView
				ref={ref => (this.scrollView = ref)}
				keyboardDismissMode={'on-drag'}
				onContentSizeChange={(width: number, height: number) => {}}
				showsVerticalScrollIndicator={false}
				listRef={(e: any) => {
					this.messageListRef = e
				}}
				style={styles.listView}
				// onHeaderRefresh={() => this.handleRefresh()}
				refreshState={refreshState}
				automaticallyAdjustContentInsets={false}
				data={listDataSource}
				renderItem={({ item }: any) => this.renderCellItem(item)}
				// ListFooterComponent={this.renderInput()}
				ListFooterComponent={() => this.renderHeader()}
				onFooterRefresh={() => this.handleRefresh()}
				keyExtractor={(item: any) =>
					(item.uuid && item.uuid.toString()) ||
					(item.messageContent && item.messageContent.toString())
				}
			/>
		)
	}

	showCommonWordView() {
		const { showCommonWord, commonWordData, content } = this.state
		if (!showCommonWord) {
			return null
		}
		return (
			<View style={styles.commonWordView}>
				<ScrollView keyboardShouldPersistTaps="handled">
					{commonWordData.map((e: any, index: number) => {
						return (
							<NextPressable
								style={styles.commonWordCell}
								key={index.toString()}
								onPress={() => {
									this.setState(
										{
											content: `${content}${e.content}`,
											showCommonWord: false,
											showSendBtn: !SystemHelper.iOS,
										},
										() => {
											if (this.inputRef) {
												this.inputRef.focus()
											}
										},
									)
								}}>
								<Text style={styles.commonWordCellTitle}>{e.content}</Text>
							</NextPressable>
						)
					})}
				</ScrollView>
				<NextPressable
					style={styles.commonWordSetting}
					onPress={() => {
						global.TODO_TOAST()
					}}>
					<Image
						source={require('../../../assets/requestJobs/common-setting.png')}
						style={styles.commonWordSettingIcon}
						resizeMode="center"
					/>
					<Text style={styles.commonWordSettingText}>招呼语设置</Text>
				</NextPressable>
			</View>
		)
	}

	showMediaView() {
		const { showMediaView } = this.state
		if (!showMediaView) {
			return null
		}
		return (
			<View style={styles.mediaVeiw}>
				<NextPressable style={styles.mediaBtn}>
					<Image
						source={require('../../../assets/requestJobs/message-image.png')}
						style={styles.mediaIcon}
						resizeMode="center"
					/>
					<Text style={styles.mediaText}>相册</Text>
				</NextPressable>
				<NextPressable style={styles.mediaBtn}>
					<Image
						source={require('../../../assets/requestJobs/message-camera.png')}
						style={styles.mediaIcon}
						resizeMode="center"
					/>
					<Text style={styles.mediaText}>拍照</Text>
				</NextPressable>
				<NextPressable
					style={styles.mediaBtn}
					onPress={() => {
						global.TODO_TOAST()
					}}>
					<Image
						source={require('../../../assets/requestJobs/message-sound.png')}
						style={styles.mediaIcon}
						resizeMode="center"
					/>
					<Text style={styles.mediaText}>语音</Text>
				</NextPressable>
				<NextPressable
					style={styles.mediaBtn}
					onPress={() => {
						global.TODO_TOAST()
					}}>
					<Image
						source={require('../../../assets/requestJobs/message-laba.png')}
						style={styles.mediaIcon}
						resizeMode="center"
					/>
					<Text style={styles.mediaText}>优先提醒</Text>
				</NextPressable>
			</View>
		)
	}

	renderInput() {
		const { content, showSendBtn, showCommonWord, showMediaView } = this.state
		return (
			<View
				style={{
					paddingBottom:
						(KEYBOARD_HEIGHT ? KEYBOARD_HEIGHT : HOME_BAR_HEIGHT) + 15,
				}}>
				<View style={styles.footerContainer}>
					<NextPressable
						style={styles.commonWordsBtn}
						onPress={() => {
							if (showCommonWord) {
								// 切换为输入模式
								this.setState({
									showCommonWord: !showCommonWord,
									showMediaView: false,
								})
								this.inputRef.focus()
							} else {
								// 切换为常用语模式
								this.inputRef.blur()
								setTimeout(() => {
									this.setState(
										{
											showCommonWord: !showCommonWord,
											showMediaView: false,
										},
										() => {
											this.listScrollToEnd()
										},
									)
								}, 100)
							}
						}}>
						{showCommonWord ? (
							<Image
								source={require('../../../assets/requestJobs/common-words.png')}
								style={styles.commonWordIcon}
								resizeMode="center"
							/>
						) : (
							<Text style={styles.commonWordsText}>常用语</Text>
						)}
					</NextPressable>
					<TextInput
						ref={e => {
							this.inputRef = e
						}}
						underlineColorAndroid="transparent"
						returnKeyType="send"
						autoCorrect={false}
						autoCapitalize="none"
						multiline={true}
						numberOfLines={1}
						style={styles.contentInput}
						placeholder="新信息"
						placeholderTextColor="#AAAAAA"
						value={content}
						onFocus={() => {
							this.setState(
								{
									showCommonWord: false,
									showMediaView: false,
								},
								() => {
									setTimeout(() => {
										this.listScrollToEnd()
									}, 300)
								},
							)
						}}
						onChangeText={value => {
							if (value) {
								this.setState(
									{
										content: value,
										showSendBtn: true,
									},
									() => {
										this.listScrollToEnd()
									},
								)
							} else {
								this.setState(
									{
										content: value,
										showSendBtn: false,
									},
									() => {
										this.listScrollToEnd()
									},
								)
							}
							// if (value && !SystemHelper.iOS) {
							//   this.setState({
							//     content: value,
							//     showSendBtn: true
							//   }, () => {
							//     this.listScrollToEnd()
							//   })
							// } else {
							//   this.setState({
							//     content: value,
							//     showSendBtn: false
							//   }, () => {
							//     this.listScrollToEnd()
							//   })
							// }
						}}
						returnKeyLabel="发送"
					/>
					{/* <NextPressable
            style={styles.emojeBtn}
          >
            <Image
              source={require('../../../assets/requestJobs/message-biaoqing.png')}
              style={styles.emojeIcon}
              resizeMode="center"
            />
          </NextPressable> */}
					<NextPressable
						style={styles.addBtn}
						onPress={() => {
							if (content) {
								// 发送消息
								this.sendTextMessage()
							} else {
								this.inputRef.blur()
								setTimeout(() => {
									this.setState({
										showMediaView: !showMediaView,
										showCommonWord: false,
									})
								}, 100)
							}
						}}>
						{content ? (
							<Text style={styles.snedText}>发送</Text>
						) : (
							<Image
								source={require('../../../assets/requestJobs/message-add.png')}
								style={styles.addIcon}
								resizeMode="center"
							/>
						)}
					</NextPressable>
				</View>
				{this.showCommonWordView()}
				{this.showMediaView()}
			</View>
		)
	}

	renderModal() {
		const { alertModalVisible, alertType } = this.state
		let title = ''
		let detail = ''
		let action = null
		switch (alertType) {
			case 1: // 发电话
				detail = '确定与对方交换电话吗?'
				break
			case 2: // 发简历
				title = '确定向招聘者发送简历吗？'
				detail = '该附件简历将直接发送至对方邮箱?'
				action = () => {
					HTAPI.CandidateSendResume({
						jobId: this?.state?.targetItem?.job?.id,
						hrId: this?.state?.targetItem?.id,
						compId: 1,
					}).then(response => {
						Toast.show('投递成功')
					})
				}
				break
			case 3:
				title = '确定向招聘者发送面试邀请吗？'
				detail = '该面试邀请将发送至对方?'
				action = () => {
					// HTAPI.HRInviteInterview({
					// 		userId: this?.state?.targetItem?.id,
					// 		jobId: this?.state?.targetItem?.job?.id,
					// 		time: [new Date().toISOString(), new Date().toISOString()],
					// 	})
				}
				break
			case 4: // 换微信
				detail = '确定与对方交换微信吗?'
				break
			default:
				break
		}
		return (
			<AlertContentModal
				visible={alertModalVisible}
				title={title}
				detail={detail}
				leftBtn={{
					title: '取消',
					act: () => {
						this.setState({ alertModalVisible: false })
					},
				}}
				rightBtn={{
					title: '确定',
					act: () => {
						action && action()
						this.setState({ alertModalVisible: false })
					},
				}}
			/>
		)
	}

	renderInappropriateModal() {
		const { selectReason, inappropriateVisible } = this.state
		return (
			<WhiteContentModal
				visible={inappropriateVisible}
				showCloseBtn={false}
				modalStyle={{ justifyContent: 'flex-end' }}
				contextStyle={styles.contextStyle}>
				<View style={styles.modalContentView}>
					<Text style={styles.inappropriateTitle}>选择不合适原因</Text>
					<NextPressable
						style={styles.rightBtn}
						onPress={() => {
							this.setState({ inappropriateVisible: false })
						}}>
						<Image
							style={styles.inappropriateClose}
							source={require('../../../assets/requestJobs/inappropriate-close.png')}
						/>
					</NextPressable>
					<View style={styles.inappropriateView}>
						{inappropriateArray.map((e: any, index: number) => {
							return (
								<NextPressable
									key={index.toString()}
									style={[
										styles.inappropriateBtn,
										selectReason === e && { backgroundColor: '#E2FFF0' },
									]}
									onPress={() => {
										this.setState({ selectReason: e })
									}}>
									<Text
										style={[
											styles.inappropriateText,
											selectReason === e && {
												color: greenColor,
												fontWeight: 'bold',
											},
										]}>
										{e}
									</Text>
								</NextPressable>
							)
						})}
					</View>
					<GradientButton
						text="提交"
						containerStyle={styles.submitContainer}
						onPress={() => {}}
					/>
				</View>
			</WhiteContentModal>
		)
	}

	renderOperateModal() {
		const { operateModalVisible } = this.state
		return (
			<WhiteContentModal
				visible={operateModalVisible}
				showCloseBtn={false}
				modalStyle={{ justifyContent: 'flex-end' }}
				contextStyle={styles.operateBtnStyle}
				contextChildrenStyle={{ paddingTop: 0 }}>
				<View style={styles.modalContentView}>
					<NextPressable
						onPress={() => {
							this.setState({ operateModalVisible: false })
							global.TODO_TOAST()
						}}
						style={styles.operateBtnItem}>
						<Text style={styles.operateBtnText}>置顶聊天</Text>
					</NextPressable>
					<NextPressable
						onPress={() => {
							this.setState({ operateModalVisible: false })
							global.TODO_TOAST()
						}}
						style={styles.operateBtnItem}>
						<Text style={styles.operateBtnText}>拉黑对方</Text>
					</NextPressable>
					<NextPressable
						onPress={() => {
							this.setState({ operateModalVisible: false })
							global.TODO_TOAST()
						}}
						style={styles.complainBtnItem}>
						<Text style={[styles.operateBtnText, { color: '#F25C5C' }]}>
							举报投诉
						</Text>
					</NextPressable>
					<NextPressable
						onPress={() => {
							this.setState({ operateModalVisible: false })
						}}
						style={styles.operateCancelBtnItem}>
						<Text style={styles.operateBtnText}>取消</Text>
					</NextPressable>
				</View>
			</WhiteContentModal>
		)
	}

	renderRegectModal() {
		const { rejectModalVisible, rejectReason } = this.state
		return (
			<WhiteContentModal
				visible={rejectModalVisible}
				contextChildrenStyle={{ paddingTop: 0 }}>
				<View style={styles.regectContent}>
					<Text style={styles.regectViewTitle}>拒绝原因</Text>
					<View style={styles.inputView}>
						<TextInput
							underlineColorAndroid="transparent"
							returnKeyType="done"
							autoCorrect={false}
							autoCapitalize="none"
							multiline={true}
							style={styles.regectInput}
							placeholder="请填写拒绝面试原因"
							placeholderTextColor="#AAAAAA"
							value={rejectReason}
							maxLength={50}
							onChangeText={value => {
								this.setState({ rejectReason: value })
							}}
						/>
						<Text style={styles.regectAmount}>
							{`${rejectReason.length}/50`}
						</Text>
					</View>
					<NextPressable
						style={styles.rejectConfirmBtn}
						onPress={() => {
							// HTAPI.CandidateAcceptOrRejectInterview({
							// 	interviewId: data?.body?.id,
							// 	accept: false,
							// }).then(() => {
							// 	this.setState({ rejectModalVisible: false })
							// 	Toast.show('拒绝面试成功!')
							// })
						}}>
						<Text style={styles.rejectConfirmText}>确定</Text>
					</NextPressable>
				</View>
			</WhiteContentModal>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar
					translucent
					backgroundColor="transparent"
					animated
					barStyle={'dark-content'}
				/>
				<View style={{ flex: 1 }}>
					{this.renderNavBar()}
					{this.renderOperateView()}
					{this.renderList()}
					{this.renderInput()}
				</View>
				{this.renderModal()}
				{this.renderInappropriateModal()}
				{this.renderOperateModal()}
				{this.renderRegectModal()}
			</View>
		)
	}
}

// tslint:disable-next-line:max-file-line-count
export default MessagePage
