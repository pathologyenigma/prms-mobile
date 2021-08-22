import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList, StatusBar } from 'react-native'
import styles from './styles/JobDetail.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'
import { Tabs } from '@ant-design/react-native'
import JobCell from '../../components/JobCell'
import SystemHelper from '../../../utils/system'
import InterviewerFooter from '../../components/InterviewerFooter'

type IProps = GenProps<'JobDetail'> & {

}

interface IState {
  dataSource: any,
  showAddScore: boolean,
  selectLikesTabs: number
}

const recommendListData = [
  {
    id: 1,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '李女士·产品线HRBP'
  }, {
    id: 2,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '陈先生·技术总监'
  }, {
    id: 3,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '陈先生·技术总监'
  }, {
    id: 4,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '陈先生·技术总监'
  },
  {
    id: 5,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '李女士·产品线HRBP'
  }, {
    id: 6,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '陈先生·技术总监'
  }, {
    id: 7,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '陈先生·技术总监'
  }, {
    id: 8,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '陈先生·技术总监'
  },
  {
    id: 9,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '李女士·产品线HRBP'
  }, {
    id: 10,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '陈先生·技术总监'
  }, {
    id: 11,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '陈先生·技术总监'
  }, {
    id: 12,
    name: '项目经理',
    company: '深圳市酷魅科技有限公司',
    financing: '融资未公开',
    staffAmount: '1-49人',
    experience: '3-4年',
    education: '大专及以上',
    location: '深圳·宝安区',
    salary: '15K-30K',
    interviewer: '陈先生·技术总监'
  },
]

export default class JobDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: undefined,
      showAddScore: false,
      selectLikesTabs: 0
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    RootLoading.loading()
    setTimeout(() => {
      RootLoading.hide()
      this.setState({
        dataSource: {
          id: 1,
          name: '项目经理',
          salary: '15K-30K',
          jobNature: '全职',
          jobQuantity: 2,
          experience: '5-10年',
          education: '本科及以上',
          location: '深圳·宝安区·大学城',
          company: '深圳市创意智慧有限公司',
          interviewer: '廖女士·人事经理',
          onlineTime: '1小时前在线',
          companyTag: '技术管理,硬件设施,产品设计,需求采集,产品开发,产品验收,产品内部评审',
          jobContent: '1、项目管理:统筹并管理项目，规划和跟踪项目范围、成本、质量、风险等;组织项目各关键节点评审，总结和评定项目阶段性成果，优化项目流程和方法，提升团队工作效率和执行力;\n2、预研阶段:评估项目可行性，选择更优的组配件降低成本，制定和执行项目预算和项目计划;\n3、研发阶段:沟通和实现需求，跟进项目进度确保迭代顺利\n4、打样阶段:确认产品结构、电路等可行性和产品总体成本分析核对;\n5、量产阶段:督促供应商按时按量完成预定生产计划，跟进和解决项目量产后的技术问题，优化升级产品并总结经验。',
          jobRequire: '1、统招本科及以上学历，2~5年以上工作经验;\n2、2年以上智能硬件/智能家居等项目管理经验;',
          jobAddPoints: '1、从事过区块链相关行业;\n2、从事过软件开发行业',
          companyXingzhi: '创业公司',
          companyAmount: '少于50人',
          companyIndustry: '计算机软件',
          recommendList: recommendListData,
        },
      })
    }, 300);
  }

  renderNavBar() {
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
            source={require('../../../assets/requestJobs/navbar-back.png')}
          />
        </NextTouchableOpacity>
        <View
          style={styles.rightView}
        >
          <NextTouchableOpacity
            style={styles.rightItem}
            onPress={() => {
              RootLoading.info('收藏')
            }}
          >
            <Image resizeMode="center" style={styles.shoucang} source={require('../../../assets/requestJobs/shoucang.png')} />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.rightItem}
            onPress={() => {
              RootLoading.info('举报')
            }}
          >
            <Image resizeMode="center" style={styles.jubao} source={require('../../../assets/requestJobs/jubao.png')} />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.rightItem}
            onPress={() => {
              RootLoading.info('分享')
            }}
          >
            <Image resizeMode="center" style={styles.fenxiang} source={require('../../../assets/requestJobs/job-fenxiang.png')} />
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderItem(item: any, section: any) {
    const { selectFilter } = this.state
    const sectionKey = section.key
    const selectItem = selectFilter && selectFilter[sectionKey] === item.id
    return (
      <NextTouchableOpacity
        style={[styles.jobSalaryBtn,
        selectItem && { backgroundColor: '#E2FFF0', }
        ]}
        onPress={() => {
          const nextSelectFilter = selectFilter
          nextSelectFilter[sectionKey] = item.id
          this.setState({ selectFilter: nextSelectFilter })
        }}
      >
        <Text style={[styles.jobSalaryText,
        selectItem && { backgroundColor: '#E2FFF0', } && { color: greenColor, fontWeight: 'bold' }]}>
          {item.label}
        </Text>
      </NextTouchableOpacity>
    )
  }

  renderHeader() {
    const { dataSource } = this.state
    return (
      <View
        style={styles.headerView}
      >
        <View style={styles.headerTitleView}>
          <Text style={styles.headerTitle}>
            {dataSource.name}
          </Text>
          <Text style={styles.headerSalary}>
            {dataSource.salary}
          </Text>
        </View>
        <View style={styles.headerCompanyView}>
          <Text style={styles.headerCompany}>
            {dataSource.jobNature}
          </Text>
          <Text style={styles.headerCompany}>
            {`招${dataSource.jobQuantity}人`}
          </Text>
          <Text style={styles.headerCompany}>
            {dataSource.experience}
          </Text>
          <Text style={styles.headerCompany}>
            {dataSource.education}
          </Text>
        </View>
        <View style={styles.headerJobView}>
          <Image style={styles.location} source={require('../../../assets/requestJobs/location-icon.png')} />
          <Text style={styles.locationText}>
            {dataSource.location}
          </Text>
        </View>
      </View>
    )
  }

  renderInterviewer() {
    const { dataSource } = this.state
    return (
      <View style={styles.interviewerView}>
        <View style={styles.interviewerIcon} />
        <View style={styles.interviewerInfo}>
          <View style={styles.interviewerTitleView}>
            <Text style={styles.interviewerTitle}>
              {dataSource.interviewer}
            </Text>
            <View style={styles.dot} />
            <Text style={styles.interviewerOnline}>
              {dataSource.onlineTime}
            </Text>
          </View>
          <Text style={styles.interviewerCompany}>{dataSource.company}</Text>
        </View>
        <Image
          style={styles.nextBtn}
          source={require('../../../assets/requestJobs/next-gray.png')}
        />
      </View>
    )
  }

  renderJobInfo() {
    const { dataSource, showAddScore } = this.state
    const tagArray = (dataSource.companyTag && dataSource.companyTag.split(',')) || []
    return (
      <View style={[styles.headerView, { minHeight: 100 }]}>
        <Text style={styles.jobInfoTitle}>职位介绍</Text>
        <View style={styles.jobInfoTagView}>
          {tagArray.map((item: any, index: number) => {
            return (
              <Text key={index.toString()} style={styles.jobInfoTagItem}>
                {item}
              </Text>
            )
          })}
        </View>
        <Text style={styles.jobInfoDetail}>岗位职责</Text>
        <Text style={styles.jobContent}>{dataSource.jobContent}</Text>
        <Text style={styles.jobInfoDetail}>任职资格</Text>
        <Text style={styles.jobContent}>{dataSource.jobRequire}</Text>
        {showAddScore ? (
          <View style={{ marginTop: 22 }}>
            <Text style={styles.addScoreText}>加分项</Text>
            <Text style={styles.jobContent}>{dataSource.jobAddPoints}</Text>
          </View>
        ) : (
          <NextTouchableOpacity
            style={styles.addScoreBtn}
            onPress={() => {
              this.setState({ showAddScore: true })
            }}
          >
            <Text style={styles.addScoreText}>加分项</Text>
            <Text style={styles.showAddScoreText}>...查看全部</Text>
          </NextTouchableOpacity>
        )}
      </View>
    )
  }

  renderCompanyInfo() {
    const { dataSource } = this.state
    return (
      <View
        style={styles.headerView}
      >
        <Text style={styles.jobInfoTitle}>公司信息</Text>
        <View style={styles.companyInfo}>
          <View style={styles.companyIcon} />
          <View style={styles.companyTitle}>
            <Text style={styles.companyName}>{dataSource.company}</Text>
            <Image style={styles.jobRenzheng}
              source={require('../../../assets/requestJobs/job-renzheng.png')}
            />
          </View>
          <Image
            style={styles.nextBtn}
            source={require('../../../assets/requestJobs/next-gray.png')}
          />
        </View>
        <View style={styles.companyTag}>
          <Text style={styles.companyTagItem}>
            {dataSource.companyXingzhi}
          </Text>
          <Text style={styles.companyTagItem}>
            {dataSource.companyAmount}
          </Text>
          <Text style={styles.companyTagItem}>
            {dataSource.companyIndustry}
          </Text>
        </View>
        <View style={styles.map} />
      </View>
    )
  }

  renderTabBar() {
    return (
      <Text>猜你喜欢</Text>
    )
  }

  renderLikeList(dataSource: any) {
    if (!dataSource) {
      return null
    }
    if (dataSource.length === 0) {
      return (
        <Text>没有更多推荐啦</Text>
      )
    }
    const { navigation } = this.props
    return (
      <View style={[styles.listView]}>
        {dataSource.map((item: any, index: number) => {
          return (
            <JobCell
              cellStyle={styles.cellStyle}
              key={index.toString()}
              cellItem={item}
              onPress={() => {
                navigation.push('JobDetail')
              }}
            />
          )
        })}
      </View>
    )
  }

  renderGuessJobs() {
    const { selectLikesTabs, dataSource } = this.state
    if (!dataSource) {
      return null
    }
    if (dataSource.length === 0
      || !dataSource.recommendList
      || dataSource.recommendList.length === 0
    ) {
      return (
        <View style={styles.headerView}>
          {this.renderTabBar()}
          <Text>没有更多推荐啦</Text>
        </View>
      )
    }
    const listData = dataSource.recommendList
    let showList: any = [[], [], []]
    for (let i = 0; i < listData.length; i++) {
      if (i < 4) {
        showList[0].push(listData[i])
      } else if (i < 8) {
        showList[1].push(listData[i])
      } else {
        showList[2].push(listData[i])
      }
    }
    return (
      <View style={[styles.headerView, {
        paddingHorizontal: 0,
        minHeight: listData.length > 4
          ? 640
          : (listData.length * 125 + 110),
      }]}>
        <Tabs
          styles={{
            topTabBarSplitLine: {
              borderBottomWidth: 0,
            },
          }}
          tabs={[{ title: 'list1' }, { title: 'list2' }, { title: 'list3' }]}
          page={selectLikesTabs}
          swipeable={true}
          usePaged={false}
          renderTabBar={(tabProps) => this.renderTabBar()}
          onChange={(tab, index) => {
            this.setState({ selectLikesTabs: index })
          }}
        >
          {showList.map((item: any, index: number) => {
            return (
              this.renderLikeList(item)
            )
          })}
        </Tabs>
        <View style={styles.dotContainer}>
          <View style={[styles.dotView, selectLikesTabs === 0 && styles.selectDot]} />
          <View style={[styles.dotView, selectLikesTabs === 1 && styles.selectDot]} />
          <View style={[styles.dotView, selectLikesTabs === 2 && styles.selectDot]} />
        </View>
      </View >
    )
  }

  rendeJobrTips() {
    const tips = '趁早找温馨提示:如您发现用人单位或其招聘人员存在以下违规行为的，请提高警惕\n1、扣押您的身份证或者其它证件;\n2、要求您提供担保人、担保金或者以其它名义向您收取财物(如培训费、体检费、资料费、置装费、押金等) ;\n3、强迫您入股或者向您集资;\n4、以招聘名义牟取不正当利益:\n5、发布虚假招聘广告信息;\n6、其它损害您的合法权益的行为;'
    return (
      <ImageBackground
        style={styles.tipsView}
        source={require('../../../assets/requestJobs/job-tip-bg.png')}
      >
        <Image
          style={styles.zhuyiIcon}
          source={require('../../../assets/requestJobs/zhuyi.png')}
        />
        <Text style={styles.zhuyiText}>
          {tips}
        </Text>
      </ImageBackground>
    )
  }

  renderInterviewerFooter() {
    const { dataSource } = this.state
    if (!dataSource) {
      return null
    }
    return (
      <InterviewerFooter
        name="廖女士"
        job="人事经理"
        clickChat={() => {
          RootLoading.info('聊一聊')
        }}
        clickDelivery={() => {
          RootLoading.info('投递')
        }}
      />
    )
  }

  render() {
    const { dataSource } = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {dataSource ? (
            <View style={{ flex: 1, }}>
              {this.renderHeader()}
              {this.renderInterviewer()}
              {this.renderJobInfo()}
              {this.renderCompanyInfo()}
              {this.renderGuessJobs()}
              {this.rendeJobrTips()}
            </View>
          ) : null}
        </ScrollView>
        {this.renderInterviewerFooter()}
      </View>
    )
  }
}