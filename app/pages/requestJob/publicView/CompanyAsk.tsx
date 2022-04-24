import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/CompanyAsk.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GradientButton from '../../components/GradientButton'
import CompanyQuestionCell from './CompanyQuestionCell'

type IProps = GenProps<'CompanyAsk'> & {

}

interface IState {
  refreshState: RefreshState.HeaderRefreshing,
  dataSource: any
}

export default class CompanyAsk extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      dataSource: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const localDataSource = [{
      id: 1,
      question: '你如何看待智慧网络的企业发展/前景？',
      answer: '这五张来自我们的不同电商团队。图一是客服团队，图二是商品数据团队，图三图四是运营团队，图五是设计团队。双十一当天，全棉电商人走到哪里都能被认出来，因为我们有不',
      answerAmount: 1,
      focus: 1,
    }, {
      id: 2,
      question: '你如何看待智慧网络的企业发展/前景1？',
      answer: '这五张来自我们的不同电商团队。图一是客服团队，图二是商品数据团队，图三图四是运营团队，图五是设计团队。双十一当天，全棉电商人走到哪里都能被认出来，因为我们有不',
      answerAmount: 1,
      focus: 2,
    }, {
      id: 3,
      question: '你如何看待智慧网络的企业发展/前景2？',
      answer: '这五张来自我们的不同电商团队。图一是客服团队，图二是商品数据团队，图三图四是运营团队，图五是设计团队。双十一当天，全棉电商人走到哪里都能被认出来，因为我们有不',
      answerAmount: 1,
      focus: 4,
    }, {
      id: 4,
      question: '你如何看待智慧网络的企业发展/前景3？',
      answer: '公司发展前景不错，会定期组织员工团建和培训。',
      answerAmount: 1,
      focus: 1,
    }, {
      id: 5,
      question: '你如何看待智慧网络的企业发展/前景4？',
      answer: '公司发展前景不错，会定期组织员工团建和培训。',
      answerAmount: 1,
      focus: 1,
    }, {
      id: 6,
      question: '你如何看待智慧网络的企业发展/前景4？',
      answer: '公司发展前景不错，会定期组织员工团建和培训。',
      answerAmount: 1,
      focus: 1,
    }, {
      id: 7,
      question: '你如何看待智慧网络的企业发展/前景4？',
      answer: '公司发展前景不错，会定期组织员工团建和培训。',
      answerAmount: 1,
      focus: 1,
    }]
    setTimeout(() => {
      this.setState({
        dataSource: localDataSource,
        refreshState: RefreshState.Idle
      })
    }, 300);
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
        title="公司问答"
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
          Toast.show('点赞了~')
        }}
        onPress={() => {
          navigation.push('SubmitCompanyQuestion')
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

  renderFooterBtn() {
    const { navigation } = this.props
    return (
      <View
        style={styles.bottomContainer}
      >
        <GradientButton
          text="我要提问"
          containerStyle={styles.btnContainer}
          textStyle={styles.askText}
          onPress={() => {
            navigation.push('CompanySubQuestion')
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {this.renderNavBar()}
          {this.renderList()}
        </View>
        {this.renderFooterBtn()}
      </View>
    )
  }
}