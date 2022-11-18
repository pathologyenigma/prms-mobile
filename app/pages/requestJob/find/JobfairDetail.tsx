import React, { Component } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import { Tabs } from '@ant-design/react-native'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/JobfairDetail.style'
import NextPressable from '../../components/NextPressable'
import LinearGradient from 'react-native-linear-gradient'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import Jobfair from './jobfair'
import CompanyCell from './CompanyCell'
import AlertContentModal from '../../components/AlertContentModal'
import ShareModal from '../../components/ShareModal'

type TProps = GenProps<'JobfairDetail'>

interface IState {
  selectTabs: number,
  dataSource: any,
  resumeTipsVisible: boolean
  shareVisible: boolean
}

export default class JobfairDetail extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    const { route } = this.props
    this.state = {
      selectTabs: 0,
      dataSource: undefined,
      resumeTipsVisible: false,
      shareVisible: false
    }
  }

  componentDidMount() {
    Hud.show()
    setTimeout(() => {
      this.setState({
        dataSource: {
          title: '2021年宝安区“就业365”秋季线下招聘会',
          time: '2021.09.20 8:00-2021.09.31 18:30',
          sponsor: '宝安区就业促进中心',
          coOrganizer: '宝安区人才市场联合协会',
          undertaker: '深圳市南方工厂创业文化有限公司',
          jobAmount: 1000,
          jobSeekerAmount: 892,
          location: '深圳市南山区创智云城（建设中）创智云城A2栋8楼',
          endLineTime: '2021年9月15日 20:00',
          detail: {
            title: '招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情',
            image: '',
            detail: '招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情招聘详情',
          },
          company: [{
            id: 1,
            company: '华为技术有限公司',
            welfare: '六险一金',
            industry: '计算机软件',
            years: '成立34年',
            tag: '火热招聘',
            score: 4,
            onlineJobs: '在招职位545',
            location: '深圳·龙岗',
            financing: '不需要融资',
            staffAmount: '2000人以上',
            feature: '硬件智能, IT服务'
          }, {
            id: 2,
            company: '贝壳找房（深圳）科技有限公司',
            welfare: '',
            industry: '计算机软件',
            years: '成立34年',
            tag: '火热招聘',
            score: 4,
            onlineJobs: '在招职位545',
            location: '深圳·龙岗',
            financing: '上市公司',
            staffAmount: '2000人以上',
            feature: '居住服务'
          }, {
            id: 3,
            company: '金蝶',
            welfare: '',
            industry: '计算机软件',
            years: '成立34年',
            tag: '火热招聘',
            score: 3,
            onlineJobs: '在招职位545',
            location: '深圳·龙岗',
            financing: '不需要融资',
            staffAmount: '2000人以上',
            feature: '硬件智能, IT服务'
          }],
          askAnswer: [
            {
              id: 1,
              name: '莫春婷',
              job: 'UI设计师',
              location: '深圳',
              time: '2021年12月24日'
            },
            {
              id: 2,
              name: '莫春婷',
              job: 'UI设计师',
              location: '深圳',
              time: '2021年12月24日',
              answer: {
                id: 1,
                name: '梁晓梦',
                job: '招聘经理',
                content: '谢谢用心评价，为了避免人才流失，我们的面试官肯定要是很专业的，这才是对面试者负责，也是对公司负责。'
              }
            },
          ]
        }
      }, () => {
        Hud.hidden()
      })
    }, 500);
  }

  submit() {
    Hud.show()
    setTimeout(() => {
      ActionToast.show('报名成功')
      const { navigation } = this.props
      navigation.push('JobfairSubmitSuccess')
    }, 1000);
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        barStyle={{ elevation: 0, borderBottomWidth: 0, }}
        statusBarTheme="dark-content"
        title="线下招聘会"
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      // right={{
      // v1版本适配
      //   style: { width: 16, height: 16, },
      //   type: EButtonType.IMAGE,
      //   value: require('../../../assets/requestJobs/job-fenxiang.png'),
      //   act: () => {
      //     this.setState({ shareVisible: true })
      //   },
      // }}
      />
    )
  }

  renderTabBar() {
    const tabs = [{
      title: '招聘会详情',
    }, {
      title: '参与企业',
    },
      // {
      // v1版本适配
      //   title: '招聘会问答',
      // }
    ]
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    const { selectTabs } = this.state
    return (
      <View style={styles.tabsView}>
        <View style={styles.tabLeft}>
          {
            tabs.map((e, i) => {
              return (
                <NextPressable
                  style={styles.tabsBtn}
                  key={i.toString()}
                  onPress={() => {
                    this.setState({ selectTabs: i })
                  }}
                >
                  <>
                    <Text style={[styles.tabsTitle, selectTabs === i && styles.selectedTitle]}>
                      {e.title}
                    </Text>
                    {selectTabs === i && (
                      <LinearGradient
                        start={start}
                        end={end}
                        colors={['#54D693', '#5AE5A8']}
                        style={styles.tabsLine}
                      />
                    )}
                  </>
                </NextPressable>
              )
            })
          }
        </View>
      </View>
    )
  }

  renderTopView() {
    const { dataSource } = this.state
    return (
      <View>
        <Image
          source={require('../../../assets/requestJobs/jobfair-detail-bg.png')}
          style={styles.topBg}
        />
        <Text style={styles.title}>{dataSource.title}</Text>
        <View style={styles.timeView}>
          <Image
            style={styles.timeIcon}
            source={require('../../../assets/requestJobs/jobFail-shijian.png')}
          />
          <Text style={styles.time}>
            {dataSource.time}
          </Text>
        </View>
        <Text style={styles.roleText}>
          {`主办方：${dataSource.sponsor}`}
        </Text>
        <Text style={styles.roleText}>
          {`协办方：${dataSource.coOrganizer}`}
        </Text>
        <Text style={styles.roleText}>
          {`承办方：${dataSource.undertaker}`}
        </Text>
        <View style={styles.amountView}>
          <View style={styles.gangwei}>
            <Image
              style={styles.qiyeIcon}
              source={require('../../../assets/requestJobs/jobfair-detail-qiye.png')}
            />
            <Text style={styles.amountText}>{`招聘岗位：${dataSource.jobAmount}个`}</Text>
          </View>
          <View style={styles.gangwei}>
            <Image
              style={styles.jobSeekerAmountIcon}
              source={require('../../../assets/requestJobs/jobfair-detail-renyuan.png')}
            />
            <Text style={styles.amountText}>{`求职者：${dataSource.jobSeekerAmount}个`}</Text>
          </View>
        </View>
        <View style={styles.timeView}>
          <Image
            style={styles.locationIcon}
            source={require('../../../assets/requestJobs/location.png')}
          />
          <Text style={styles.locationTitle}>
            招聘会地址
          </Text>
        </View>
        <Text style={styles.locationValue}>
          {dataSource.location}
        </Text>
        <View
          style={styles.mapView}
        />
      </View>
    )
  }

  renderDetail() {
    const { dataSource } = this.state
    return (
      <View style={styles.detailView}>
        <Text style={styles.detailViewTitle}>{dataSource.detail.title}</Text>
        <View
          style={styles.detailIcon}
        />
        <Text style={styles.detailViewTitle}>{dataSource.detail.detail}</Text>
      </View>
    )
  }

  renderCompanyItem(item: any) {
    return (
      <CompanyCell
        cellItem={item}
        cellStyle={{
          borderBottomColor: '#F0F0F0',
          borderBottomWidth: 1,
          paddingHorizontal: 11,
        }}
        onPress={() => {
          Toast.show('click company')
        }}
      />
    )
  }

  renderCompany() {
    const { dataSource } = this.state
    return (
      <RefreshListView
        style={styles.listView}
        // onHeaderRefresh={() => this.handleRefresh()}
        // refreshState={refreshState}
        automaticallyAdjustContentInsets={false}
        data={dataSource.company}
        renderItem={({ item }: any) => this.renderCompanyItem(item)}
        // onFooterRefresh={() => this.handleEndReached}
        keyExtractor={item => item.id.toString()}
        footerRefreshingText="加载更多"
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  renderAsk() {
    const { dataSource } = this.state
    // askAnswer
    return (
      <ScrollView>
        {dataSource.askAnswer.map((item: any, index: number) => {
          return (
            <View style={styles.askView}>
              <View style={styles.cellTitleView}>
                <CacheImage
                  style={styles.iconImage}
                  source={global.AVATAR_IMAGE()}
                />
                <View style={styles.commentInfo}>
                  <Text style={styles.cellTitle}>
                    {item.name}
                  </Text>
                  <Text style={styles.cellJob}>
                    {`${item.location}·${item.job}`}
                  </Text>
                </View>
              </View>
              {item.answer && (
                <View style={styles.answerView}>
                  <View style={styles.answerViewPerson}>
                    <CacheImage
                      style={styles.answerViewPersonIcon}
                      source={global.AVATAR_IMAGE()}
                    />
                    <Text style={styles.answerViewTitle}>
                      {`${item.answer.name}·${item.answer.job}`}
                    </Text>
                  </View>
                  <Text style={styles.answerViewContent}>{`回复：${item.answer.content}`}</Text>
                </View>
              )}
            </View>
          )
        })}
      </ScrollView>
    )
  }

  renderFooterBtn() {
    const { dataSource } = this.state
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.footerBtnView}>
        <LinearGradient
          start={start}
          end={end}
          colors={['#57DE9E', '#81E3AE']}
          style={styles.footerBtnContainer}
        >
          <NextPressable
            style={styles.footerBtn}
            onPress={() => {
              this.setState({ resumeTipsVisible: true })
            }}
          >
            <Text style={styles.footerBtnTitle}>立即报名</Text>
            <Text style={styles.footerBtnDetail}>{`报名截止时间：${dataSource.endLineTime}`}</Text>
          </NextPressable>
        </LinearGradient>
      </View>
    )
  }

  renderQuestion() {
    return (
      <NextPressable
        style={styles.questionView}
        onPress={() => {
          const { navigation } = this.props
          navigation.push('JobfairQuestion')
        }}
      >
        <Image
          source={require('../../../assets/requestJobs/jobFail-Ask.png')}
          style={styles.askBtnIcon}
        />
      </NextPressable>
    )
  }

  render() {
    const { dataSource, selectTabs, resumeTipsVisible, shareVisible } = this.state
    if (!dataSource) {
      return (
        <View style={styles.container}>
          {this.renderNavBar()}
          <Image
            source={require('../../../assets/requestJobs/jobfair-detail-bg.png')}
            style={styles.topBg}
          />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>
          {this.renderTopView()}
          {this.renderTabBar()}
          {selectTabs === 0 && this.renderDetail()}
          {selectTabs === 1 && this.renderCompany()}
          {/* {selectTabs === 2 && this.renderAsk()} */}
        </ScrollView>
        {/* {this.renderFooterBtn()} */}
        {/* {selectTabs === 2 && this.renderQuestion()} */}
        <AlertContentModal
          visible={resumeTipsVisible}
          title="友情提示"
          detail="您的个人简历信息未完善，请先填写 个人简历，再参加招聘会报名"
          leftBtn={{
            title: '取消',
            act: () => this.setState({
              resumeTipsVisible: false,
            }),
          }}
          rightBtn={{
            title: '确定',
            act: () => {
              this.setState({
                resumeTipsVisible: false
              }, () => {
                // const { navigation } = this.props
                // navigation.push('EditOnlineResume')
                this.submit()
              })
            },
          }}
        />
        <ShareModal
          visible={shareVisible}
          shareLink={true}
          cancelOnpress={() => {
            this.setState({ shareVisible: false })
          }}
        />
      </View>
    )
  }
}
