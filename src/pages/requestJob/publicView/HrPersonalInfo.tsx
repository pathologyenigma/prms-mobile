import React, { Component } from 'react'
import { SafeAreaView, StatusBar, ImageBackground, Image, ScrollView, View, Text } from 'react-native'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import styles from './styles/HrPersonalInfo.style'
import RootLoading from '../../../utils/rootLoading'
import { GenProps } from '../../../navigator/requestJob/stack'
import CompanyJobCell from './CompanyJobCell'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import ShareModal from '../../components/ShareModal'

type IProps = GenProps<'HrPersonalInfo'> & {

}

type IState = {
  moreJobs: any,
  shareVisible: boolean
}

export default class HrPersonalInfo extends Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    console.log('props: ', props)
    this.state = {
      moreJobs: undefined,
      shareVisible: false
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    setTimeout(() => {
      this.setState({
        moreJobs: [{
          id: 1,
          name: '运营视觉设计师',
          publishTime: '2021-08-03',
          experience: '3-4年',
          education: '大专及以上',
          location: '深圳·宝安区',
          salary: '15K-30K',
        }, {
          id: 2,
          name: '运营视觉设计师',
          publishTime: '2021-08-03',
          experience: '3-4年',
          education: '大专及以上',
          location: '深圳·宝安区',
          salary: '15K-30K',
        }, {
          id: 3,
          name: '运营视觉设计师',
          publishTime: '2021-08-03',
          experience: '3-4年',
          education: '大专及以上',
          location: '深圳·宝安区',
          salary: '15K-30K',
        }]
      })
    }, 500);
  }

  renderIconView() {
    return (
      <View style={styles.iconView}>
        <NextTouchableOpacity
          style={styles.avatar}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('UserInfo')
          }}
        >
          <Image
            style={styles.hrIcon}
            source={require('../../../assets/requestJobs/icon-example.png')}
          />
          <Image
            style={styles.gender}
            source={require('../../../assets/requestJobs/women-icon.png')}
          />
        </NextTouchableOpacity>
        <View style={styles.nameView}>
          <View style={styles.hrNameView}>
            <Text style={styles.nameTitle}>
              李小冉
            </Text>
            <Image
              source={require('../../../assets/requestJobs/hr-renzheng.png')}
              style={styles.hrRenzheng}
            />
            <NextTouchableOpacity
              style={styles.hrFocusBtn}
            >
              <Text style={styles.hrFocusText}>+关注</Text>
            </NextTouchableOpacity>
          </View>
          <Text style={styles.detailInfo}>
            产品经理·一小时活跃
          </Text>
          <Text style={styles.companyInfo}>
            认证公司：深圳智慧网络有限公司
          </Text>
        </View>
      </View>
    )
  }

  renderTopBar() {
    const { navigation } = this.props
    return (
      <View style={styles.navBar}>
        <NextTouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack()
          }}
        >
          <Image
            style={styles.backImage}
            source={require('../../../assets/requestJobs/white-back.png')}
          />
        </NextTouchableOpacity>
        <View
          style={styles.rightView}
        >
          <NextTouchableOpacity
            style={styles.rightItem}
            onPress={() => {
              navigation.push('ReportComplaints')
            }}
          >
            <Image resizeMode="center" style={styles.jubao} source={require('../../../assets/requestJobs/jubao-white.png')} />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.rightItem}
            onPress={() => {
              this.setState({ shareVisible: true })
            }}
          >
            <Image resizeMode="center" style={styles.fenxiang} source={require('../../../assets/requestJobs/fenxiang-white.png')} />
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderNavBar() {
    return (
      <ImageBackground
        style={styles.topImage}
        resizeMode="cover"
        source={require('../../../assets/requestJobs/me-beijing.png')}
      >
        {this.renderTopBar()}
        {this.renderIconView()}
      </ImageBackground>
    )
  }

  renderMatchView() {
    const item = {
      id: 1,
      name: '运营视觉设计师',
      publishTime: '2021-08-03',
      experience: '3-4年',
      education: '大专及以上',
      location: '深圳·宝安区',
      salary: '15K-30K',
    }
    return (
      <View style={styles.matchJobView}>
        <Text style={styles.matchTitle}>
          匹配职位
        </Text>
        <ImageBackground
          style={styles.hrMessageBg}
          source={require('../../../assets/requestJobs/hr-message-bg.png')}
        >
          <Image resizeMode="center" style={styles.hrMessageIcon} source={require('../../../assets/requestJobs/icon-example.png')} />
          <Text style={styles.hrMessageText}>
            我有一个职位适合你，快来聊聊吧～
          </Text>
        </ImageBackground>
        <View style={styles.matchJobTitleView}>
          <Text style={styles.matchJobTitleText}>
            和您匹配
          </Text>
        </View>
        <CompanyJobCell
          cellStyle={styles.matchJobCell}
          cellItem={item}
          onDeliveryPress={() => {
            RootLoading.info('投递')
          }}
          onPress={() => {

          }}
        />
      </View>
    )
  }

  renderJobCell(item: any) {
    return (
      <CompanyJobCell
        cellStyle={styles.moreJobCell}
        onDeliveryStyle={{ bottom: 20, }}
        cellItem={item}
        onDeliveryPress={() => {
          RootLoading.info('投递')
        }}
        onPress={() => {

        }}
      />
    )
  }

  renderList() {
    const { moreJobs } = this.state
    if (!moreJobs || moreJobs.length === 0) {
      return null
    }
    return (
      <View style={styles.moreJobView}>
        <Text style={styles.moreJobTitle}>更多职位</Text>
        <RefreshListView
          style={styles.listView}
          // onHeaderRefresh={() => this.handleJobListRefresh()}
          // refreshState={jobRefreshState}
          automaticallyAdjustContentInsets={false}
          data={moreJobs}
          renderItem={({ item }: any) => this.renderJobCell(item)}
          // onFooterRefresh={() => this.handleJobEndReached}
          keyExtractor={item => item.id.toString()}
          // ItemSeparatorComponent={() => this.renderItemSeparatorComponent()}
          footerRefreshingText="加载更多"
          footerNoMoreDataText="没有更多了"
        />
      </View>
    )
  }

  render() {
    const { shareVisible } = this.state
    console.log('shareVisible: ', shareVisible)
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent={true}
          barStyle="light-content"
          animated />
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.contentContainerStyle}
        >
          {this.renderNavBar()}
          {this.renderMatchView()}
          {this.renderList()}
        </ScrollView>
        <ShareModal
          visible={shareVisible}
          cancelOnpress={() => {
            this.setState({ shareVisible: false })
          }}
        />
      </SafeAreaView>
    )
  }
}
