import React, { Component } from 'react'
import { Text, View, Image, } from 'react-native'
import styles from './styles/FeedbackAndHelp.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import LinearGradient from 'react-native-linear-gradient'

type IProps = GenProps<'FeedbackAndHelp'> & {

}

interface IState {
  refreshState: RefreshState.HeaderRefreshing,
  dataSource: any
}

export default class FeedbackAndHelp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      refreshState: RefreshState.HeaderRefreshing,
      dataSource: undefined
    }
  }

  componentDidMount() {
    RootLoading.loading()
    this.loadData()
  }

  loadData() {
    const localDataSource = [{
      id: 1,
      question: '找到工作了，如何删除我的简历？',
      answer: '1您可以登陆趁早找app，进入“简历”频道，点击右上角，选择“删除简历”，同时，为避免误删，当您确认删除最后一份简历时，请联系客服电话：400 885 9898'
    }, {
      id: 2,
      question: '如何让某些企业无法搜到我的简历？',
      answer: '2您可以登陆趁早找app，进入“简历”频道，点击右上角，选择“删除简历”，同时，为避免误删，当您确认删除最后一份简历时，请联系客服电话：400 885 9898'
    }, {
      id: 3,
      question: '我不想看见某企业发布的职位，怎么办？',
      answer: '3您可以登陆趁早找app，进入“简历”频道，点击右上角，选择“删除简历”，同时，为避免误删，当您确认删除最后一份简历时，请联系客服电话：400 885 9898'
    }, {
      id: 4,
      question: '如何修改邮箱？',
      answer: '4您可以登陆趁早找app，进入“简历”频道，点击右上角，选择“删除简历”，同时，为避免误删，当您确认删除最后一份简历时，请联系客服电话：400 885 9898'
    }, {
      id: 5,
      question: '如何修改手机号？',
      answer: '5您可以登陆趁早找app，进入“简历”频道，点击右上角，选择“删除简历”，同时，为避免误删，当您确认删除最后一份简历时，请联系客服电话：400 885 9898'
    }, {
      id: 6,
      question: '我的投递记录会被其他企业看到吗？',
      answer: '6您可以登陆趁早找app，进入“简历”频道，点击右上角，选择“删除简历”，同时，为避免误删，当您确认删除最后一份简历时，请联系客服电话：400 885 9898'
    }, {
      id: 7,
      question: '我是企业，如何在趁早找招人？',
      answer: '7您可以登陆趁早找app，进入“简历”频道，点击右上角，选择“删除简历”，同时，为避免误删，当您确认删除最后一份简历时，请联系客服电话：400 885 9898'
    }, {
      id: 8,
      question: '投出去的简历还能撤回吗？',
      answer: '8您可以登陆趁早找app，进入“简历”频道，点击右上角，选择“删除简历”，同时，为避免误删，当您确认删除最后一份简历时，请联系客服电话：400 885 9898'
    }, {
      id: 9,
      question: '我忘记密码该怎么办？',
      answer: '9您可以登陆趁早找app，进入“简历”频道，点击右上角，选择“删除简历”，同时，为避免误删，当您确认删除最后一份简历时，请联系客服电话：400 885 9898'
    }, {
      id: 10,
      question: '出现提示“此邮箱已被注册”',
      answer: '10您可以登陆趁早找app，进入“简历”频道，点击右上角，选择“删除简历”，同时，为避免误删，当您确认删除最后一份简历时，请联系客服电话：400 885 9898'
    }, {
      id: 11,
      question: '简历已填写完整，但投递时仍然提示不完整',
      answer: '11您可以登陆趁早找app，进入“简历”频道，点击右上角，选择“删除简历”，同时，为避免误删，当您确认删除最后一份简历时，请联系客服电话：400 885 9898'
    },]
    setTimeout(() => {
      RootLoading.hide()
      this.setState({
        dataSource: localDataSource,
        refreshState: 3
      })
    }, 300);
  }

  renderNavBar() {
    const { navigation } = this.props
    const { dataSource } = this.state
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 1,
          borderBottomColor: '#F3F3F3',
          elevation: 0,
        }}
        title="反馈与帮助"
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

  renderHeader() {
    return (
      <NextTouchableOpacity
        style={styles.headerView}
        onPress={() => {
          const { navigation } = this.props
          navigation.push('FeedbackAndHelpSubmit')
        }}
      >
        <Image
          style={styles.feedbackIcon}
          source={require('../../../assets/requestJobs/feedback-xinxi.png')}
        />
        <Text style={styles.headerTitle}>
          我要反馈
        </Text>
        <Image
          style={styles.nextImage}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextTouchableOpacity>
    )
  }

  handleRefresh() {

  }

  handleEndReached() {

  }

  renderItem(item: any) {
    return (
      <NextTouchableOpacity
        key={item.id.toString()}
        style={styles.cellStyle}
        onPress={() => {
          const { navigation } = this.props
          navigation.push('FeedbackAndHelpAnswer', {
            feedbackItem: item
          })
        }}
      >
        <Text style={styles.cellTitle}>{item.question}</Text>
        <Image
          style={styles.nextImage}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </NextTouchableOpacity>
    )
  }

  renderListHeader() {
    return (
      <View style={styles.listHeaderView}>
        <Image
          style={styles.xinxiIcon}
          source={require('../../../assets/requestJobs/feedback-wenti.png')}
        />
        <Text style={styles.listTitle}>
          常见问题解答
        </Text>
      </View>
    )
  }

  renderList() {
    const { dataSource, refreshState } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        ListHeaderComponent={this.renderListHeader}
        onHeaderRefresh={() => this.handleRefresh()}
        refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={dataSource}
        renderItem={({ item }: any) => this.renderItem(item)}
        onFooterRefresh={() => this.handleEndReached}
        keyExtractor={(item: any) => item.id.toString()}
        footerRefreshingText=""
        footerNoMoreDataText=""
      />
    )
  }

  render() {
    const { dataSource } = this.state
    if (!dataSource) {
      return <View style={{ backgroundColor: '#fff', }} />
    }
    return (
      <View style={[styles.container, dataSource && dataSource.length === 0 && { backgroundColor: '#fff', }]}>
        {this.renderNavBar()}
        {this.renderHeader()}
        {this.renderList()}
      </View>
    )
  }
}