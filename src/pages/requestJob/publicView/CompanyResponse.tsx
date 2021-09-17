import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/CompanyResponse.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GradientButton from '../../components/GradientButton'
import CompanyQuestionCell from './CompanyQuestionCell'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

type IProps = GenProps<'CompanyResponse'> & {

}

interface IState {
  refreshState: RefreshState.HeaderRefreshing,
  content: string,
  anonymous: boolean
}

export default class CompanyResponse extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      content: '',
      anonymous: false
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {

  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title="回答问题"
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  handleRefresh() {

  }

  handleEndReached() {

  }

  renderItem(item: any) {
    const { navigation } = this.props
    return (
      <CompanyQuestionCell
        cellItem={item}
        isWhiteMode={true}
        cellStyle={styles.cellStyle}
        likePress={() => {
          RootLoading.info('点赞了~')
        }}
        onPress={() => {
          navigation.push('JobDetail')
        }}
      />
    )
  }

  renderList() {
    const { dataSource, refreshState } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={dataSource}
        renderItem={({ item }: any) => this.renderItem(item)}
        onFooterRefresh={() => this.handleEndReached}
        keyExtractor={(item: any) => item.id.toString()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  renderTitle() {
    return (
      <View style={styles.titleView}>
        <Text style={styles.title}>你如何看待智慧网络的企业发展？</Text>
      </View>
    )
  }

  renderInput() {
    const { content } = this.state
    return (
      <View style={styles.inputView}>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          multiline={true}
          style={styles.contentInput}
          placeholder="有何高见，展开讲讲…"
          placeholderTextColor="#AAAAAA"
          value={content}
          onChangeText={(value) => {
            this.setState({ content: value })
          }}
        />
      </View>
    )
  }

  renderFooterBtn() {
    const { navigation } = this.props
    const { anonymous } = this.state
    return (
      <View
        style={styles.bottomContainer}
      >
        <GradientButton
          text="发布"
          containerStyle={styles.btnContainer}
          onPress={() => {
            RootLoading.info('发布成功')
            navigation.goBack()
          }}
        />
        <View style={styles.tipsView}>
          <View style={styles.tipsTextView}>
            <Text style={styles.tipsText}>你的回答需遵守</Text>
            <NextTouchableOpacity
              onPress={() => {
                RootLoading.info('趁早找社区管理规范')
              }}
            >
              <Text style={styles.tipsGuifan}>
                《趁早找社区管理规范》
              </Text>
            </NextTouchableOpacity>
          </View>
          <NextTouchableOpacity
            style={styles.checkBtn}
            onPress={() => {
              this.setState({ anonymous: !anonymous })
            }}
          >
            <View style={styles.checkView}>
              {anonymous && (
                <Image
                  style={styles.checkIcon}
                  resizeMode="center"
                  source={require('../../../assets/requestJobs/green-check.png')}
                />
              )}
            </View>
            <Text style={styles.anonymousText}>匿名</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>
          {this.renderTitle()}
          {this.renderInput()}
          {this.renderFooterBtn()}
        </ScrollView>
      </View>
    )
  }
}