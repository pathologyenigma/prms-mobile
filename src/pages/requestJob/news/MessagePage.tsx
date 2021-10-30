import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/MessagePage.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
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

type IProps = GenProps<'MessagePage'> & {

}

interface IState {
  dataSource: any,
  content: string,
  showCommonWord: boolean
  showMediaView: boolean
  showSendBtn: boolean
  commonWordData: any
}

export default class MessagePage extends Component<IProps, IState> {
  private inputRef: any
  constructor(props: IProps) {
    super(props)
    this.state = {
      content: '',
      dataSource: undefined,
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
    this.setState({})
  }

  renderNavBar() {
    const { navigation } = this.props
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
          <Text style={styles.barTitle}>李慧敏</Text>
          <Text style={styles.barDetail}>领航新时代·人力总监</Text>
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

  renderCellItem(item: any) {
    return null
  }

  renderList() {
    const { dataSource } = this.state
    return (
      <RefreshListView
        style={styles.listView}
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