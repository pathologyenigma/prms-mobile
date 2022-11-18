import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/SubmitCompanyQuestion.style'
import { GenProps } from '../../../utils/StackProps'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import GradientButton from '../../components/GradientButton'
import NextPressable from '../../components/NextPressable'
import ListEmptyComponent from '../../components/ListEmptyComponent'

type IProps = GenProps<'SubmitCompanyQuestion'> & {

}

interface IState {
  refreshState: RefreshState.HeaderRefreshing,
  dataSource: any
}

export default class SubmitCompanyQuestion extends Component<IProps, IState> {
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
      icon: '',
      name: '匿名用户',
      answer: '公司发展前景不错，会定期组织员工团建和培训。',
      dianzan: 12,
    }, {
      id: 2,
      icon: '',
      name: '李晓（招聘主管）',
      answer: '公司发展前景不错，会定期组织员工团建和培训。',
      dianzan: 12, focus: 2,
    }, {
      id: 3,
      icon: '',
      name: '匿名用户',
      answer: '公司发展前景不错，会定期组织员工团建和培训。公司发展前景不错，会定期组织员工团建和培训。公司发展前景不错，会定期组织员工团建和培训。',
      dianzan: 12,
    }, {
      id: 4,
      icon: '',
      name: '匿名用户',
      answer: '公司发展前景不错，会定期组织员工团建和培训。',
      dianzan: 12,
    }, {
      id: 5,
      icon: '',
      name: '匿名用户',
      answer: '公司发展前景不错，会定期组织员工团建和培训。公司发展前景不错，会定期组织员工团建和培训。公司发展前景不错，会定期组织员工团建和培训。',
      dianzan: 12,
    }, {
      id: 6,
      icon: '',
      name: '匿名用户',
      answer: '公司发展前景不错，会定期组织员工团建和培训。',
      dianzan: 12,
    }, {
      id: 7,
      icon: '',
      name: '匿名用户',
      answer: '公司发展前景不错，会定期组织员工团建和培训。',
      dianzan: 12,
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
        title="问题"
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

  renderInfo() {
    return (
      <View style={styles.headerInfo}>
        <View style={styles.companyInfo}>
          <View style={styles.headerInfoIcon} />
          <View style={styles.headerInfoView}>
            <Text style={styles.headerInfoName}>深圳智慧网络有限公司</Text>
            <Text style={styles.headerInfoTime}>发布时间：2020年3月12日</Text>
          </View>
        </View>
        <Text style={styles.question}>你如何看待智慧网络的企业发展？</Text>
        <Text style={styles.detail}>公司内部机制怎么样？可以去么？</Text>
        <View style={styles.line} />
        <Text style={styles.listTitle}>全部回答</Text>
      </View>
    )
  }

  handleRefresh() {

  }

  handleEndReached() {

  }

  renderItem(item: any) {
    const { navigation } = this.props
    return (
      <View key={item.id.toString()} style={styles.cellStyle}>
        <CacheImage
          style={styles.userIcon}
          resizeMode="contain"
          source={global.AVATAR_IMAGE()}
        />
        <View style={styles.cellInfo}>
          <Text style={styles.cellName}>{item.name}</Text>
          <Text style={styles.cellAnswer}>{item.answer}</Text>
          <NextPressable style={styles.cellDianzan}
            onPress={() => {
              Toast.show('点赞了~')
            }}
          >
            <Image
              style={styles.dianzanIcon}
              resizeMode="contain"
              source={require('../../../assets/requestJobs/dianzan.png')}
            />
            <Text style={styles.cellDianzanText}>{item.dianzan}</Text>
          </NextPressable>
        </View>
      </View >
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
        ListHeaderComponent={this.renderInfo}
        ListEmptyComponent={
          <ListEmptyComponent
            emptyText="暂无其他回答"
          />
        }
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
          text="我要回答"
          containerStyle={styles.btnContainer}
          textStyle={styles.askText}
          onPress={() => {
            navigation.push('CompanyResponse')
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