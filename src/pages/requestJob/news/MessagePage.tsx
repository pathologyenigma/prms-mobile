import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/MessagePage.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import RootLoading from '../../../utils/rootLoading'
import { IStoreState } from '../../../reducer'
import { Text, View, Image, StatusBar, TextInput } from 'react-native'
import { versionCode } from '../../../utils/config'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import GradientButton from '../../components/GradientButton'
import LinearGradient from 'react-native-linear-gradient'
import { gradienRightGreenColor, greenColor } from '../../../utils/constant'
import { ScrollView } from 'react-native-gesture-handler'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import SystemHelper from '../../../utils/system'
import JobCell from '../../components/JobCell'

type IProps = GenProps<'MessagePage'> & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
interface IState {
  dataSource: any,
  refreshState: RefreshState,
  content: string,
  showCommonWord: boolean
  showMediaView: boolean
  showSendBtn: boolean
  commonWordData: any
}

class MessagePage extends Component<IProps, IState> {
  private inputRef: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      content: '',
      dataSource: [],
      RefreshState: 1,
      showCommonWord: false,
      showMediaView: false,
      showSendBtn: false,
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
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
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
      }]
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
    if (isSend) {
      return (
        <View style={styles.cellSendMessage}>
          <Text style={styles.cellSendContent}>
            {item.content}
          </Text>
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

  renderCellItem(item: any) {
    const { userInfo } = this.props
    if (item.type === 'jianli') {
      // 打招呼简历
      return (
        <JobCell
          key={item.id.toString()}
          cellItem={item}
          showCellTime={true}
          launchText={userInfo.userInfo.username === item.launch ? '由招聘官发起的通知' : '由你发起的通知'}
        />
      )
    }
    if (item.type === 'message') {
      // 文字消息
      return this.renderTextMessage(item)
    }
    if (item.type === 'requestResume') {
      // 请求简历
      return this.renderRequestResume(item)
    }
    return null
  }

  renderList() {
    const { dataSource } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        contentContainerStyle={{ paddingBottom: 100, }}
        // onHeaderRefresh={() => this.handleRefresh()}
        // refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={dataSource}
        renderItem={({ item }: any) => this.renderCellItem(item)}
        // onFooterRefresh={() => this.handleEndReached}
        keyExtractor={item => item.id.toString()}
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

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage)