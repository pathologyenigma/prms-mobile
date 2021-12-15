import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/MessagePage.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import RootLoading from '../../../utils/rootLoading'
import { IStoreState } from '../../../reducer'
import { Text, View, Image, StatusBar, TextInput, DeviceEventEmitter, FlatList } from 'react-native'
import { versionCode } from '../../../utils/config'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import GradientButton from '../../components/GradientButton'
import LinearGradient from 'react-native-linear-gradient'
import { gradienRightGreenColor, greenColor, Receive_Message } from '../../../utils/constant'
import { ScrollView } from 'react-native-gesture-handler'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import SystemHelper from '../../../utils/system'
import JobCell from '../../components/JobCell'
import AlertContentModal from '../../components/AlertContentModal'
import WhiteContentModal from '../../components/WhiteContentModal'
import * as actions from '../../../action/newsAction'

type IProps = GenProps<'MessagePage'> & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
interface IState {
  targetId: number,
  page: number,
  pageSize: number,
  listDataSource: any,
  dataSource: any,
  refreshState: RefreshState,
  content: string,
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
}

const inappropriateArray = [
  '职位不匹配',
  '公司不合适',
  '行业不感兴趣',
  '工作地点太远',
  '薪资不满意',
  '暂无求职意向',
  '已找到工作',
  '其他原因'
]

class MessagePage extends Component<IProps, IState> {
  private inputRef: any
  private newMessaheListner: any
  private messageListRef: any
  constructor(props: IProps) {
    super(props)
    const { route: { params: { targetId } } } = props
    console.log('targetId: ', targetId)
    this.state = {
      targetId: 1,
      page: 0,
      pageSize: 10,
      content: '',
      listDataSource: [],
      dataSource: [],
      RefreshState: 1,
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
      commonWordData: [{
        id: 1,
        content: '你好，对贵司该职位很感兴趣，这是我的简历，期待你的回复。'
      }, {
        id: 2,
        content: '你好，我可以把我的个人简历发给你看看吗？'
      }, {
        id: 1,
        content: '你好，我的姓名是,方便沟通么?'
      }]
    }
    this.reformNewMessage = this.reformNewMessage.bind(this)
    this.newMessaheListner = DeviceEventEmitter.addListener(Receive_Message, this.reformNewMessage)
  }

  componentDidMount() {
    this.loadData()
  }

  componentWillUnmount() {
    if (this.newMessaheListner) {
      this.newMessaheListner.remove()
    }
  }

  reformNewMessage(message: any) {
    console.log('message: ', message)
    if (message) {
      this.setState({
        listDataSource: this.state.listDataSource.concat(message.newMessage)
      }, () => {
        console.log('this.messageListRef: ', this.messageListRef)
        this.messageListRef && this.messageListRef.scrollToEnd({ animated: true })
      })
    }
  }

  listScrollToEnd() {
    console.log('11111111111')
    if (!this.messageListRef) {
      console.log('111111111112')
      setTimeout(() => {
        this.listScrollToEnd()
      }, 300);
    } else {
      console.log('111111111113')
      setTimeout(() => {
        this.messageListRef.scrollToEnd({ animated: true })
      }, 300);
    }
  }

  loadData() {
    const { targetId, pageSize, page, listDataSource } = this.state
    if (targetId === undefined) {
      RootLoading.fail('参数获取失败,请重启或联系客服')
      return
    }
    this.props.userGetMessages(targetId, page, pageSize, (error, result) => {
      console.log('userGetMessages: ', error, result)
      if (!error && result) {
        if (result.UserGetMessages
          && result.UserGetMessages.messages
          && result.UserGetMessages.messages.length > 0) {
          const newsList = [...result.UserGetMessages.messages]
          this.setState({ listDataSource: listDataSource.concat(newsList.reverse()) }, () => this.listScrollToEnd())
        }
      }
    })
    this.setState({
      dataSource: [{
        id: 1,
        type: 'jianli',
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '李女士·产品线HRBP',
        time: '6月25日  20:40  ',
        launch: '李女士'
      }, {
        id: 2,
        type: 'message',
        content: '这是我的资料，希望能成为贵团队的一员。',
        time: '6月25日  20:40  ',
        launch: '李女士'
      }, {
        id: 3,
        type: 'message',
        content: '请问有相关作品和个人简历吗？麻烦发送一份给我。',
        time: '6月25日  20:40  ',
        launch: '王经理'
      }, {
        id: 4,
        type: 'requestResume',
        content: '我想要一份您的附件简历到我的邮箱，您是否同意',
        time: '6月25日  20:40  ',
        launch: '王经理'
      }, {
        id: 5,
        type: 'inviteInterview',
        content: '领航新时代向您发出面试邀请，点击查看详情',
        time: '6月25日  20:40  ',
        launch: '李女士'
      }, {
        id: 6,
        type: 'acceptInterview',
        content: '接受了面试邀请',
        time: '6月25日  20:40  ',
        launch: '李女士'
      }, {
        id: 7,
        type: 'rejectInterview',
        content: '您已拒绝面试邀请',
        detail: '已找到合适的公司，暂时不打算跳槽。',
        time: '6月25日  20:40  ',
        launch: '李女士'
      },]
    })
  }

  renderNavBar() {
    const { navigation, userInfo } = this.props
    return (
      <View style={styles.navBar}>
        <NextTouchableOpacity
          style={styles.barLeftView}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image
            source={require('../../../assets/requestJobs/message-back.png')}
            style={styles.backIcon}
          />
          <Text style={styles.unreadText}>
            99+
          </Text>
        </NextTouchableOpacity>
        <View style={styles.barTitleView}>
          <Text style={styles.barTitle}>{userInfo.userInfo.username}</Text>
          <Text style={styles.barDetail}>{userInfo.userInfo.currentRole}</Text>
        </View>
        <NextTouchableOpacity
          style={styles.editBtbn}
          onPress={() => {
            this.setState({ operateModalVisible: true })
          }}
        >
          <Image
            source={require('../../../assets/requestJobs/message-edit.png')}
            style={styles.editIcon}
          />
        </NextTouchableOpacity>
      </View>
    )
  }

  renderOperateView() {
    return (
      <View style={styles.operateVeiw}>
        <NextTouchableOpacity
          style={styles.operateBtn}
          onPress={() => {
            this.setState({
              alertModalVisible: true,
              alertType: 1
            })
          }}
        >
          <Image
            source={require('../../../assets/requestJobs/message-phone.png')}
            style={styles.operateIcon}
            resizeMode="center"
          />
          <Text
            style={styles.operateText}
          >
            发电话
          </Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.operateBtn}
          onPress={() => {
            this.setState({
              alertModalVisible: true,
              alertType: 2
            })
          }}
        >
          <Image
            source={require('../../../assets/requestJobs/message-jianli.png')}
            style={styles.operateIcon}
            resizeMode="center"
          />
          <Text
            style={styles.operateText}
          >
            发简历
          </Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.operateBtn}
          onPress={() => {
            this.setState({
              alertModalVisible: true,
              alertType: 3
            })
          }}
        >
          <Image
            source={require('../../../assets/requestJobs/message-weixin.png')}
            style={styles.operateIcon}
            resizeMode="center"
          />
          <Text
            style={styles.operateText}
          >
            换微信
          </Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.operateBtn}
          onPress={() => {
            this.setState({
              inappropriateVisible: true,
              selectReason: '',
            })
          }}
        >
          <Image
            source={require('../../../assets/requestJobs/message-close.png')}
            style={styles.operateIcon}
            resizeMode="center"
          />
          <Text
            style={styles.operateText}
          >
            不合适
          </Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderTextMessage(item: any) {
    const { userInfo } = this.props
    const isSend = userInfo.userInfo.username !== item.launch
    if (userInfo.userInfo.id.toString() === item.from.toString()) {
      // 发送方
      return (
        <View key={item.uuid.toString()} style={styles.cellSendMessage}>
          <Text style={styles.cellSendContent}>
            {item.messageContent}
          </Text>
          <Image
            source={{ uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg' }}
            style={styles.icon}
          />
        </View >
      )
    }
    // 接收方
    return (
      <View key={item.uuid.toString()} style={styles.cellReceiveMessage}>
        <Image
          source={{ uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg' }}
          style={styles.icon}
        />
        <Text style={styles.cellReceiveContent}>
          {item.messageContent}
        </Text>
      </View>
    )
  }

  renderRequestResume(item: any) {
    const { userInfo } = this.props
    const isSend = userInfo.userInfo.username !== item.launch
    if (isSend) {
      return (
        <Text>正在请求简历中</Text>
      )
    }
    return (
      <View style={styles.cellReceiveMessage}>
        <Image
          source={{ uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg' }}
          style={styles.icon}
        />
        <View style={styles.requestResume}>
          <View style={styles.requestResumeTop}>
            <View style={styles.requestResumeDocIcon} />
            <Text style={styles.requestResumeDocText}>{item.content}</Text>
          </View>
          <View style={styles.requestResumeBtn}>
            <NextTouchableOpacity
              style={styles.requestResumeBtnItem}
              onPress={() => {
                this.setState({ rejectModalVisible: true })
              }}
            >
              <Text style={styles.requestResumeBtnRegect}>拒绝</Text>
            </NextTouchableOpacity>
            <View style={styles.requestResumeBtnLine} />
            <NextTouchableOpacity
              style={styles.requestResumeBtnItem}
            >
              <Text style={[styles.requestResumeBtnRegect, { color: '#7DD49C' }]}>同意</Text>
            </NextTouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderInviteInterview(item: any) {
    return (
      <View style={styles.cellReceiveMessage}>
        <Image
          source={{ uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg' }}
          style={styles.icon}
        />
        <View style={styles.requestResume}>
          <View style={styles.requestResumeTop}>
            <Image
              source={require('../../../assets/requestJobs/message-invite.png')}
              style={styles.inviteIcon}
            />
            <Text style={styles.requestResumeDocText}>{item.content}</Text>
          </View>
          {/* <NextTouchableOpacity
            style={styles.inviteBtn}
          >
            <Text style={[styles.requestResumeBtnRegect, { color: '#7DD49C' }]}>立即查看</Text>
          </NextTouchableOpacity> */}
          <View style={styles.requestResumeBtn}>
            <NextTouchableOpacity
              style={styles.requestResumeBtnItem}
              onPress={() => {
                this.setState({ rejectModalVisible: true })
              }}
            >
              <Text style={styles.requestResumeBtnRegect}>拒绝</Text>
            </NextTouchableOpacity>
            <View style={styles.requestResumeBtnLine} />
            <NextTouchableOpacity
              style={styles.requestResumeBtnItem}
            >
              <Text style={[styles.requestResumeBtnRegect, { color: '#7DD49C' }]}>接受</Text>
            </NextTouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  renderAcceptInterview(item: any) {
    const { userInfo } = this.props
    const isSend = userInfo.userInfo.username !== item.launch
    if (isSend) {
      return (
        <View style={styles.cellSendMessage}>
          <View style={[styles.cellSendContent, { flexDirection: 'row' }]}>
            <Text style={styles.cellSendText}>
              {item.content}
            </Text>
            <Image
              source={require('../../../assets/requestJobs/message-accpet-interview.png')}
              style={styles.accpetIcon}
            />
          </View>
          <Image
            source={{ uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg' }}
            style={styles.icon}
          />
        </View >
      )
    }
    return (
      <View style={styles.cellReceiveMessage}>
        <Image
          source={{ uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg' }}
          style={styles.icon}
        />
        <Text style={styles.cellReceiveContent}>
          {item.content}
        </Text>
      </View>
    )
  }

  renderRejectInterview(item: any) {
    const { userInfo } = this.props
    const isSend = userInfo.userInfo.username !== item.launch
    if (isSend) {
      return (
        <View style={styles.cellSendMessage}>
          <View style={[styles.cellSendContent]}>
            <View style={{ flexDirection: 'row', paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: '#fff' }}>
              <Text style={styles.cellSendText}>
                {item.content}
              </Text>
              <Image
                source={require('../../../assets/requestJobs/message-reject-interview.png')}
                style={styles.rejectIcon}
              />
            </View>
            <Text style={styles.detailText}>{`“${item.detail}”`}</Text>
          </View>
          <Image
            source={{ uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg' }}
            style={styles.icon}
          />
        </View >
      )
    }
    return (
      <View style={styles.cellReceiveMessage}>
        <Image
          source={{ uri: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg' }}
          style={styles.icon}
        />
        <Text style={styles.cellReceiveContent}>
          {item.content}
        </Text>
      </View>
    )
  }

  renderCellItem(item: any) {
    const { userInfo } = this.props
    if (item.type === 'jianli') {
      // 打招呼简历
      return (
        <JobCell
          key={item.uuid.toString()}
          cellItem={item}
          showCellTime={true}
          launchText={userInfo.userInfo.username === item.launch ? '由招聘官发起的通知' : '由你发起的通知'}
        />
      )
    }
    if (item.messageType === 'Normal') {
      // 文字消息
      return this.renderTextMessage(item)
    }
    if (item.type === 'requestResume') {
      // 请求简历
      return this.renderRequestResume(item)
    }
    if (item.type === 'inviteInterview') {
      return this.renderInviteInterview(item)
    }
    if (item.type === 'acceptInterview') {
      return this.renderAcceptInterview(item)
    }
    if (item.type === 'rejectInterview') {
      return this.renderRejectInterview(item)
    }
    return null
  }

  handleRefresh() {

  }

  renderList() {
    const { refreshState, listDataSource } = this.state
    return (
      <RefreshListView
        listRef={(e: any) => { this.messageListRef = e }}
        style={styles.listView}
        onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={listDataSource}
        renderItem={({ item }: any) => this.renderCellItem(item)}
        // onFooterRefresh={() => this.handleEndReached}
        keyExtractor={item => item.uuid.toString()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
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
        <ScrollView
          keyboardShouldPersistTaps="handled"
        >
          {commonWordData.map((e: any, index: number) => {
            return (
              <NextTouchableOpacity
                style={styles.commonWordCell}
                key={index.toString()}
                onPress={() => {
                  this.setState({
                    content: `${content}${e.content}`,
                    showCommonWord: false,
                    showSendBtn: !SystemHelper.iOS
                  }, () => {
                    if (this.inputRef) { this.inputRef.focus() }
                  })
                }}
              >
                <Text style={styles.commonWordCellTitle}>{e.content}</Text>
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
        <NextTouchableOpacity
          style={styles.commonWordSetting}
        >
          <Image
            source={require('../../../assets/requestJobs/common-setting.png')}
            style={styles.commonWordSettingIcon}
            resizeMode="center"
          />
          <Text style={styles.commonWordSettingText}>招呼语设置</Text>
        </NextTouchableOpacity>
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
        <NextTouchableOpacity
          style={styles.mediaBtn}
        >
          <Image
            source={require('../../../assets/requestJobs/message-image.png')}
            style={styles.mediaIcon}
            resizeMode="center"
          />
          <Text
            style={styles.mediaText}
          >
            相册
          </Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.mediaBtn}
        >
          <Image
            source={require('../../../assets/requestJobs/message-camera.png')}
            style={styles.mediaIcon}
            resizeMode="center"
          />
          <Text
            style={styles.mediaText}
          >
            拍照
          </Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.mediaBtn}
        >
          <Image
            source={require('../../../assets/requestJobs/message-sound.png')}
            style={styles.mediaIcon}
            resizeMode="center"
          />
          <Text
            style={styles.mediaText}
          >
            语音
          </Text>
        </NextTouchableOpacity>
        <NextTouchableOpacity
          style={styles.mediaBtn}
        >
          <Image
            source={require('../../../assets/requestJobs/message-laba.png')}
            style={styles.mediaIcon}
            resizeMode="center"
          />
          <Text
            style={styles.mediaText}
          >
            优先提醒
          </Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderInput() {
    const { content, showSendBtn, showCommonWord, showMediaView } = this.state
    return (
      <View>
        <View style={styles.footerContainer}>
          <NextTouchableOpacity
            style={styles.commonWordsBtn}
            onPress={() => {
              this.setState({
                showCommonWord: !showCommonWord,
                showMediaView: false
              })
            }}
          >
            {showCommonWord ? (
              <Image
                source={require('../../../assets/requestJobs/common-words.png')}
                style={styles.commonWordIcon}
                resizeMode="center"
              />
            ) : (
              <Text style={styles.commonWordsText}>常用语</Text>
            )}
          </NextTouchableOpacity>
          <TextInput
            ref={(e) => { this.inputRef = e }}
            underlineColorAndroid="transparent"
            returnKeyType='send'
            autoCorrect={false}
            autoCapitalize="none"
            multiline={true}
            numberOfLines={1}
            style={styles.contentInput}
            placeholder="新信息"
            placeholderTextColor="#AAAAAA"
            value={content}
            onFocus={() => {
              this.setState({
                showCommonWord: false,
                showMediaView: false
              })
            }}
            onChangeText={(value) => {
              if (value && !SystemHelper.iOS) {
                this.setState({
                  content: value,
                  showSendBtn: true
                })
              } else {
                this.setState({
                  content: value,
                  showSendBtn: false
                })
              }
            }}
            returnKeyLabel="发送"
          />
          <NextTouchableOpacity
            style={styles.emojeBtn}
          >
            <Image
              source={require('../../../assets/requestJobs/message-biaoqing.png')}
              style={styles.emojeIcon}
              resizeMode="center"
            />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              if (showSendBtn) {
                // 发送消息
              } else {
                this.setState({
                  showMediaView: !showMediaView,
                  showCommonWord: false
                })
              }
            }}
          >
            {showSendBtn ? (
              <Text style={styles.snedText}>发送</Text>
            ) : (
              <Image
                source={require('../../../assets/requestJobs/message-add.png')}
                style={styles.addIcon}
                resizeMode="center"
              />
            )}
          </NextTouchableOpacity>
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
    switch (alertType) {
      case 1: // 发电话
        detail = '确定与对方交换电话吗?'
        break;
      case 2: // 发简历
        title = '确定向招聘者发送简历吗？'
        detail = '该附件简历将直接发送至对方邮箱?'
        break;
      case 3: // 换微信
        detail = '确定与对方交换微信吗?'
        break;
      case 4: // 不合适
        detail = '确定与对方交换微信吗?'
        break;
      default:
        break;
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
        contextStyle={styles.contextStyle}
      >
        <View style={styles.modalContentView}>
          <Text style={styles.inappropriateTitle}>选择不合适原因</Text>
          <NextTouchableOpacity
            style={styles.rightBtn}
            onPress={() => {
              this.setState({ inappropriateVisible: false })
            }}
          >
            <Image
              style={styles.inappropriateClose}
              source={require('../../../assets/requestJobs/inappropriate-close.png')}
            />
          </NextTouchableOpacity>
          <View style={styles.inappropriateView}>
            {inappropriateArray.map((e: any, index: number) => {
              return (
                <NextTouchableOpacity
                  style={[styles.inappropriateBtn,
                  selectReason === e && { backgroundColor: '#E2FFF0', }
                  ]}
                  onPress={() => {
                    this.setState({ selectReason: e })
                  }}
                >
                  <Text style={[styles.inappropriateText,
                  selectReason === e && { color: greenColor, fontWeight: 'bold' }]}>
                    {e}
                  </Text>
                </NextTouchableOpacity>
              )
            })}
          </View>
          <GradientButton
            text="提交"
            containerStyle={styles.submitContainer}
            onPress={() => {

            }}
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
        contextChildrenStyle={{ paddingTop: 0 }}
      >
        <View style={styles.modalContentView}>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ operateModalVisible: false })
            }}
            style={styles.operateBtnItem}
          >
            <Text style={styles.operateBtnText}>置顶聊天</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ operateModalVisible: false })
            }}
            style={styles.operateBtnItem}
          >
            <Text style={styles.operateBtnText}>拉黑对方</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ operateModalVisible: false })
            }}
            style={styles.complainBtnItem}
          >
            <Text style={[styles.operateBtnText, { color: '#F25C5C' }]}>举报投诉</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ operateModalVisible: false })
            }}
            style={styles.operateCancelBtnItem}
          >
            <Text style={styles.operateBtnText}>取消</Text>
          </NextTouchableOpacity>
        </View>
      </WhiteContentModal>
    )
  }

  renderRegectModal() {
    const { rejectModalVisible, rejectReason } = this.state
    return (
      <WhiteContentModal
        visible={rejectModalVisible}
        contextChildrenStyle={{ paddingTop: 0 }}
      >
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
              onChangeText={(value) => {
                this.setState({ rejectReason: value })
              }}
            />
            <Text style={styles.regectAmount}>
              {`${rejectReason.length}/50`}
            </Text>
          </View>
          <NextTouchableOpacity
            style={styles.rejectConfirmBtn}
            onPress={() => {
              this.setState({ rejectModalVisible: false })
            }}
          >
            <Text style={styles.rejectConfirmText}>确定</Text>
          </NextTouchableOpacity>
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
        {this.renderNavBar()}
        {this.renderOperateView()}
        {this.renderList()}
        {this.renderInput()}
        {this.renderModal()}
        {this.renderInappropriateModal()}
        {this.renderOperateModal()}
        {this.renderRegectModal()}
      </View>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({
    userGetMessages: actions.userGetMessages,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)