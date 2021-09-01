import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList, StatusBar } from 'react-native'
import styles from './styles/CompanyDetail.style'
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

type IProps = GenProps<'CompanyDetail'> & {

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

export default class CompanyDetail extends Component<IProps, IState> {
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
          name: '项目经理1',
          salary: '15K-30K',
          jobNature: '全职',
          jobQuantity: 2,
          experience: '5-10年',
          education: '本科及以上',
          location: '深圳·宝安区·大学城1号楼',
          company: '深圳市创意智慧有限公司',
          financing: '不需要融资',
          staffAmount: '0-20人',
          feature: '计算机软件',
          jobTime: '8:00-17:00',
          jobRest: '周末双休',
          isFlexibleWork: '弹性工作',
          isWuxianyijin: true,
          isNianzhongjiang: true,
          isCanbu: true,
          isJiaotongbuzhu: true,
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
            resizeMode="center"
            source={require('../../../assets/requestJobs/white-back.png')}
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
            <Image resizeMode="center" style={styles.shoucang} source={require('../../../assets/requestJobs/shoucang-white.png')} />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.rightItem}
            onPress={() => {
              RootLoading.info('举报')
            }}
          >
            <Image resizeMode="center" style={styles.jubao} source={require('../../../assets/requestJobs/jubao-white.png')} />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.rightItem}
            onPress={() => {
              RootLoading.info('加入黑名单')
            }}
          >
            <Image resizeMode="center" style={styles.fenxiang} source={require('../../../assets/requestJobs/blacklist.png')} />
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderCompayRules() {
    const { dataSource } = this.state
    return (
      <View
        style={styles.compayRulesView}
      >
        <View style={styles.rulesContainer}>
          <View style={styles.rulesInfoContainer}>
            <View style={styles.rulesView}>
              <Image
                style={styles.rulesIcon}
                resizeMode="center"
                source={require('../../../assets/requestJobs/shijian.png')}
              />
              <Text style={styles.rulesDetail}>
                {dataSource.jobTime}
              </Text>
            </View>
            <View style={styles.rulesView}>
              <Image
                style={styles.rulesIcon}
                resizeMode="center"
                source={require('../../../assets/requestJobs/shuangxiu.png')}
              />
              <Text style={styles.rulesDetail}>
                {dataSource.jobRest}
              </Text>
            </View>
            <View style={styles.rulesView}>
              <Image
                style={styles.rulesIcon}
                resizeMode="center"
                source={require('../../../assets/requestJobs/tanxinggongzuo.png')}
              />
              <Text style={styles.rulesDetail}>
                {dataSource.isFlexibleWork}
              </Text>
            </View>
          </View>
          <NextTouchableOpacity
            style={styles.nextBtn}
            onPress={() => {
              RootLoading.info('公司制度')
            }}
          >
            <Image
              style={styles.nextIcon}
              resizeMode="center"
              source={require('../../../assets/requestJobs/white-next.png')}
            />
          </NextTouchableOpacity>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.jobFuliScrollview}
        >
          {dataSource.isWuxianyijin && (
            <View style={styles.fuliView}>
              <Image
                style={styles.fuliIcon}
                resizeMode="center"
                source={require('../../../assets/requestJobs/wuxianyijin.png')}
              />
              <Text style={styles.fuliDetail}>
                五险一金
              </Text>
            </View>
          )}
          {dataSource.isNianzhongjiang && (
            <View style={styles.fuliView}>
              <Image
                style={styles.fuliIcon}
                resizeMode="center"
                source={require('../../../assets/requestJobs/nianzhongjiang.png')}
              />
              <Text style={styles.fuliDetail}>
                年终奖
              </Text>
            </View>
          )}
          {dataSource.isCanbu && (
            <View style={styles.fuliView}>
              <Image
                style={styles.fuliIcon}
                resizeMode="center"
                source={require('../../../assets/requestJobs/canbu.png')}
              />
              <Text style={styles.fuliDetail}>
                餐补
              </Text>
            </View>
          )}
          {dataSource.isJiaotongbuzhu && (
            <View style={styles.fuliView}>
              <Image
                style={styles.fuliIcon}
                resizeMode="center"
                source={require('../../../assets/requestJobs/jiaotong.png')}
              />
              <Text style={styles.fuliDetail}>
                交通补助
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    )
  }

  renderCompany() {
    const { dataSource } = this.state
    return (
      <View style={styles.companyXinxi}>
        <Text style={styles.companyXinxiTitle}>公司介绍</Text>
        <Text
          style={styles.companyXinxiDetail}
          numberOfLines={4}
        >
          深圳智慧网络有限公司是一家新兴崛起的高科技企业，专为通信、互联网、电子商务、移动平台等领域的客户提供计算机软件技术的开发、测试、维护和咨询服务。总部位于环境优美、交通便捷的深圳科技园区内，在上海设有分公司,可以远程办公,薪资丰厚,欢迎加入呀!
        </Text>
        <Text style={styles.showMore}>查看展开</Text>
        <View style={styles.companyXinxiView}>
          <Text style={styles.companyXinxiTitle}>
            公司地址
          </Text>
          <View style={styles.companyXinxiLocaView}>
            <View style={styles.companyXinxiLocaViewLeft}>
              <Image
                style={styles.locationIcon}
                source={require('../../../assets/requestJobs/conpany-question.png')}
              />
              <Text style={styles.companyXinxiCompany}>{dataSource.location}</Text>
            </View>
            <Image
              style={styles.nextIcon}
              source={require('../../../assets/requestJobs/white-next.png')}
            />
          </View>
        </View>
      </View>
    )
  }

  renderCompanyInfo() {
    const { dataSource } = this.state
    return (
      <View>
        <View style={styles.companyInfo}>
          <View style={styles.companyTitleView}>
            <View style={styles.companyTitle}>
              <Text style={styles.companyName}>{dataSource.company}</Text>
              <Image style={styles.jobRenzheng}
                source={require('../../../assets/requestJobs/job-renzheng.png')}
              />
            </View>
            <Text style={styles.companySummary}>{`${dataSource.financing}·${dataSource.staffAmount}·${dataSource.feature}`}</Text>
          </View>
          <View style={styles.companyIcon} />
        </View>
      </View>
    )
  }

  renderCompanyFooter() {
    const { dataSource } = this.state
    if (!dataSource) {
      return null
    }
    return (
      <Text>在招职位</Text>
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
          barStyle={'light-content'}
        />
        {this.renderNavBar()}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {dataSource ? (
            <View style={{ flex: 1, }}>
              {this.renderCompanyInfo()}
              {this.renderCompayRules()}
              {this.renderCompany()}
            </View>
          ) : null}
        </ScrollView>
        {this.renderCompanyFooter()}
      </View>
    )
  }
}