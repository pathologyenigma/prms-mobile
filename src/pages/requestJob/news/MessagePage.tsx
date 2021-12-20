import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/MessagePage.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import RootLoading from '../../../utils/rootLoading'
import { IStoreState } from '../../../reducer'
import { Text, View, Image, StatusBar, TextInput, DeviceEventEmitter, FlatList, Keyboard, ActivityIndicator } from 'react-native'
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
  targetItem: any,
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
  '其他原因'
]

class MessagePage extends Component<IProps, IState> {
  private inputRef: any
  private newMessaheListner: any
  private messageListRef: any
  private messageListKey: any = {}
  constructor(props: IProps) {
    super(props)
    const { route: { params: { targetItem } }, navigation } = props
    if (!targetItem) {
      RootLoading.fail('数据异常请重试')
      navigation.goBack()
      return
    }
    this.state = {
      targetItem,
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
    const { listDataSource } = this.state
    console.log('listDataSource: ', listDataSource)
    if (message) {
      const newMessage: any = []
      if (!this.messageListKey[message.newMessage.uuid]) {
        this.messageListKey[message.newMessage.uuid] = true
        console.log('this.messageListKey2: ', this.messageListKey)
        newMessage.push(message.newMessage)
      }
      this.setState({
        listDataSource: newMessage.concat(listDataSource)
      }, () => {
        console.log('this.messageListRef: ', this.messageListRef)
        // 此处需要判断当前是否滑动到顶部查看历史消息,如果在查看历史消息,则不进行滚动到底部操作
        // this.messageListRef && this.messageListRef.scrollsToTop({ animated: true })
      })
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
    this.props.userGetMessages(targetItem.id, page, pageSize, (error, result) => {
      if (!error && result) {
        if (result.UserGetMessages
          && result.UserGetMessages.messages) {
          const newsList = [...result.UserGetMessages.messages]
          const nextList: any = []
          newsList.forEach(e => {
            if (!this.messageListKey[e.uuid]) {
              this.messageListKey[e.uuid] = true
              nextList.push(e)
            }
          })
          this.setState({
            listDataSource: listDataSource.concat(nextList)
          }, () => {
            if (page === 0) {
              this.setState({
                refreshState: newsList.length === pageSize ? 0 : 6,
              })
            } else {
              this.setState({ refreshState: newsList.length === pageSize ? 0 : 6, })
              setTimeout(() => {
              }, 1000)
            }
          })
        }
      } else {
        this.setState({ refreshState: 0 })
      }
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
    return (
      <View style={styles.navBar}>
        <View style={styles.navBarContent} >
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
            <Text style={styles.barTitle}>{targetItem.name}</Text>
            <Text style={styles.barDetail}>{`${targetItem.ent}·${targetItem.pos}`}</Text>
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
          <Text style={styles.cellSendContent} selectable={true}>
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
        <Text style={styles.cellReceiveContent} selectable={true}>
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
    this.setState({
      refreshState: 1,
      page: this.state.page + 1
    }, () => {
      this.loadData()
    })
  }

  sendTextMessage() {
    const info = {
      messageType: 'Normal',
      messageContent: this.state.content,
      to: this.state.targetItem.id
    }
    this.props.userSendMessage(info, (error, result) => {
      if (!error) {
        this.setState({ content: '' })
      } else {
        RootLoading.fail(`消息发送失败: ${error.toString()}`)
      }
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
        keyboardDismissMode={'on-drag'}
        onContentSizeChange={(width: number, height: number) => {
          console.log('2222" ', width, height)
        }}
        showsVerticalScrollIndicator={false}
        listRef={(e: any) => { this.messageListRef = e }}
        style={styles.listView}
        // onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={listDataSource}
        renderItem={({ item }: any) => this.renderCellItem(item)}
        // ListFooterComponent={this.renderInput()}
        ListFooterComponent={() => this.renderHeader()}
        onFooterRefresh={() => this.handleRefresh()}
        keyExtractor={(item: any) => item.uuid && item.uuid.toString() || item.messageContent && item.messageContent.toString()}
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
      <View style={{ paddingBottom: SystemHelper.safeBottom + 10 }}>
        <View style={styles.footerContainer}>
          <NextTouchableOpacity
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
                  this.setState({
                    showCommonWord: !showCommonWord,
                    showMediaView: false,
                  }, () => {
                    this.listScrollToEnd()
                  })
                }, 100)
              }
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
              this.setState({
                showCommonWord: false,
                showMediaView: false
              }, () => {
                setTimeout(() => {
                  this.listScrollToEnd()
                }, 300)
              })
            }}
            onChangeText={(value) => {
              if (value) {
                this.setState({
                  content: value,
                  showSendBtn: true
                }, () => {
                  this.listScrollToEnd()
                })
              } else {
                this.setState({
                  content: value,
                  showSendBtn: false
                }, () => {
                  this.listScrollToEnd()
                })
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
          {/* <NextTouchableOpacity
            style={styles.emojeBtn}
          >
            <Image
              source={require('../../../assets/requestJobs/message-biaoqing.png')}
              style={styles.emojeIcon}
              resizeMode="center"
            />
          </NextTouchableOpacity> */}
          <NextTouchableOpacity
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
                    showCommonWord: false
                  })
                }, 100)
              }
            }}
          >
            {content ? (
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
        break
      case 2: // 发简历
        title = '确定向招聘者发送简历吗？'
        detail = '该附件简历将直接发送至对方邮箱?'
        break
      case 3: // 换微信
        detail = '确定与对方交换微信吗?'
        break
      case 4: // 不合适
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
                  key={index.toString()}
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

const mapStateToProps = (state: IStoreState) => {
  return {
    userInfo: state.userInfo
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators({
    userGetMessages: actions.userGetMessages,
    userSendMessage: actions.userSendMessage,
  }, dispatch)
}

// tslint:disable-next-line:max-file-line-count
export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)