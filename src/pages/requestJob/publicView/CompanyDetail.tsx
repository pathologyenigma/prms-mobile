import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar, ImageSourcePropType, Modal, ActivityIndicator, RefreshControl } from 'react-native'
import styles from './styles/CompanyDetail.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import RootLoading from '../../../utils/rootLoading'
// @ts-ignore
import RefreshListView, { RefreshState } from 'react-native-refresh-list-view'
import LinearGradient from 'react-native-linear-gradient'
import CompanyCommentCell from './CompanyCommentCell'
import CompanyQuestionCell from './CompanyQuestionCell'
import AlertContentModal from '../../components/AlertContentModal'
import BottomContentModal from '../../components/BottomContentModal'
// @ts-ignore
import Video from 'react-native-video'
import ImageViewer from 'react-native-image-zoom-viewer'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { IStoreState } from '../../../reducer'
import * as jobActions from '../../../action/jobsAction'
import { connect } from 'react-redux'
import { reformComFinancing, reformCompanySize } from '../../../utils/utils'

type IProps = GenProps<'CompanyDetail'> & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

interface IState {
  dataSource: any,
  showAddScore: boolean,
  selectLikesTabs: number,
  progressWidth: undefined | number,
  commentRefresh: RefreshState,
  showAllComment: boolean,
  shieldVisible: boolean,
  welfareVisible: boolean
  videoPlaying: boolean
  isFirstLoadVideo: boolean
  imageModalVisible: boolean
  imageSelectIndex: number
  basicData: any
  refreshing: boolean
  hrList: any
  recommentList: any
  qaList: any
  showMoreDetail: boolean
}

const commentList = [
  {
    id: 1,
    name: '莫春婷',
    job: 'UI设计师',
    tag: '面试官人很好 面试效率高 环境高大上',
    score: 4,
    content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
    time: '2021年12月24日',
    like: 10,
    isLike: false,
  }, {
    id: 2,
    name: '莫春婷',
    job: 'UI设计师',
    tag: '面试官人很好 面试效率高 环境高大上',
    score: 1,
    content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
    time: '2021年12月24日',
    like: 1,
    isLike: true,
  }, {
    id: 3,
    name: '莫春婷',
    job: 'UI设计师',
    tag: '面试官人很好 面试效率高 环境高大上',
    score: 3,
    content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
    time: '2021年12月24日',
    like: 10,
    isLike: false,
  }, {
    id: 4,
    name: '莫春婷',
    job: 'UI设计师',
    tag: '面试官人很好 面试效率高 环境高大上',
    score: 4,
    content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
    time: '2021年12月24日',
    like: 10,
    isLike: false,
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
    name: '莫春婷',
    job: 'UI设计师',
    tag: '面试官人很好 面试效率高 环境高大上',
    score: 4,
    content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
    time: '2021年12月24日',
    like: 10,
    isLike: false,
  }, {
    id: 7,
    name: '莫春婷',
    job: 'UI设计师',
    tag: '面试官人很好 面试效率高 环境高大上',
    score: 4,
    content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
    time: '2021年12月24日',
    like: 10,
    isLike: false,
  }, {
    id: 8,
    name: '莫春婷',
    job: 'UI设计师',
    tag: '面试官人很好 面试效率高 环境高大上',
    score: 4,
    content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
    time: '2021年12月24日',
    like: 10,
    isLike: false,
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
    name: '莫春婷',
    job: 'UI设计师',
    tag: '面试官人很好 面试效率高 环境高大上',
    score: 4,
    content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
    time: '2021年12月24日',
    like: 10,
    isLike: false,
  }, {
    id: 11,
    name: '莫春婷',
    job: 'UI设计师',
    tag: '面试官人很好 面试效率高 环境高大上',
    score: 4,
    content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
    time: '2021年12月24日',
    like: 10,
    isLike: false,
  }, {
    id: 12,
    name: '莫春婷',
    job: 'UI设计师',
    tag: '面试官人很好 面试效率高 环境高大上',
    score: 4,
    content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
    time: '2021年12月24日',
    like: 10,
    isLike: false,
  },
]

class CompanyDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      basicData: undefined,
      dataSource: undefined,
      showAddScore: false,
      selectLikesTabs: 0,
      progressWidth: undefined,
      commentRefresh: RefreshState.HeaderRefreshing,
      showAllComment: false,
      shieldVisible: false,
      welfareVisible: false,
      videoPlaying: true,
      isFirstLoadVideo: true,
      imageModalVisible: false,
      imageSelectIndex: 0,
      refreshing: true,
      hrList: undefined,
      recommentList: undefined,
      qaList: undefined,
      showMoreDetail: false
    }
  }

  componentDidMount() {
    this.loadData()
  }

  componentDidUpdate() {
    const { videoPlaying, isFirstLoadVideo } = this.state
    // 从后面页面返回的时候,视频播放组件会重新渲染(#TODO)
    if (!videoPlaying && isFirstLoadVideo) {
      this.setState({ videoPlaying: true })
    }
  }

  loadData() {
    this.getHrListData()
    this.loadtRecommentListData()
    this.loadQaData()
    console.log('11111111111')
    this.props.getCandidateGetEnterpriseDetail_EntInfo(1, (error, result) => {
      console.log('getCandidateGetEnterpriseDetail_EntInfo: ', error, result)
      if (!error && result) {
        this.setState({
          basicData: result.UserGetEnterpriseDetail_EntInfo,
          refreshing: false
        })
      } else {
        this.setState({ refreshing: false })
        RootLoading.fail('公司信息获取失败,请重试')
      }
    })
    return

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
          commentRefresh: RefreshState.Idle,
          commentList: commentList,
          companyQuestion: [{
            id: 1,
            question: '你如何看待智慧网络的企业发展/前景？',
            answer: '公司发展前景不错，会定期组织员工团建和培训。',
            answerAmount: 1,
            focus: 1,
          }],
          onlineJobs: 18,
          imageList: [{
            url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
          }, {
            url: 'https://search-operate.cdn.bcebos.com/166bf3b072119c9ce60cc33c551369bc.jpg',
          }, {
            url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cubui.com%2Fwp-content%2Fuploads%2F2018%2F01%2Freact-native-lesson.png&refer=http%3A%2F%2Fwww.cubui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638094787&t=3043e6ae76d0b9fc72c97f4a96d02ef5',
          }, {
            url: 'https://alifei03.cfp.cn/creative/vcg/veer/800/new/VCG41N113145561.jpg',
          }, {
            url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cubui.com%2Fwp-content%2Fuploads%2F2018%2F01%2Freact-native-lesson.png&refer=http%3A%2F%2Fwww.cubui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638094787&t=3043e6ae76d0b9fc72c97f4a96d02ef5',
          }]
        },
      })
    }, 300);
  }

  getHrListData() {
    this.props.getCandidateGetEnterpriseDetail_HRList(1, (error, result) => {
      console.log('getCandidateGetEnterpriseDetail_HRList ', error, result)
      if (!error && result) {
        this.setState({
          hrList: result.CandidateGetEnterpriseDetail_HRList,
          refreshing: false
        })
      } else {
        this.setState({ refreshing: false })
        RootLoading.fail('热门招聘官信息获取失败,请重试')
      }
    })
  }

  loadtRecommentListData() {
    this.props.getCandidateGetEnterpriseDetail_InterviewRecomment(1, (error, result) => {
      console.log('getCandidateGetEnterpriseDetail_InterviewRecomment ', error, result)
      if (!error && result) {
        this.setState({
          recommentList: result.CandidateGetEnterpriseDetail_InterviewRecomment,
          refreshing: false
        })
      } else {
        this.setState({ refreshing: false })
        RootLoading.fail('面试评价信息获取失败,请重试')
      }
    })
  }

  loadQaData() {
    this.props.getCandidateGetEnterpriseDetail_QA(1, (error, result) => {
      console.log('getCandidateGetEnterpriseDetail_QA ', error, result)
      if (!error && result) {
        this.setState({
          qaList: result.CandidateGetEnterpriseDetail_QA,
          refreshing: false
        })
      } else {
        this.setState({ refreshing: false })
        RootLoading.fail('公司问答获取失败,请重试')
      }
    })
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
              navigation.push('ReportComplaints')
            }}
          >
            <Image resizeMode="center" style={styles.jubao} source={require('../../../assets/requestJobs/jubao-white.png')} />
          </NextTouchableOpacity>
          <NextTouchableOpacity
            style={styles.rightItem}
            onPress={() => {
              this.setState({ shieldVisible: true })
            }}
          >
            <Image resizeMode="center" style={styles.fenxiang} source={require('../../../assets/requestJobs/blacklist.png')} />
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  renderCompayRules() {
    const { basicData } = this.state
    return (
      <View
        style={styles.compayRulesView}
      >
        {(basicData.rest_rule
          || basicData.work_time
          || basicData.overtime_work_degree
        ) && (
            <View style={styles.rulesContainer}>
              <NextTouchableOpacity
                style={styles.rulesInfoContainer}
                onPress={() => {
                  this.setState({ welfareVisible: true })
                }}
              >
                {basicData.work_time && (
                  <View style={styles.rulesView}>
                    <Image
                      style={styles.rulesIcon}
                      resizeMode="center"
                      source={require('../../../assets/requestJobs/shijian.png')}
                    />
                    <Text style={styles.rulesDetail}>
                      {basicData.work_time}
                    </Text>
                  </View>
                )}
                {basicData.overtime_work_degree && (
                  // 
                  <View style={styles.rulesView}>
                    <Image
                      style={styles.rulesIcon}
                      resizeMode="center"
                      source={require('../../../assets/requestJobs/shuangxiu.png')}
                    />
                    <Text style={styles.rulesDetail}>
                      {basicData.jobRest}
                    </Text>
                  </View>
                )}
                {basicData.rest_rule && (
                  <View style={styles.rulesView}>
                    <Image
                      style={styles.rulesIcon}
                      resizeMode="center"
                      source={require('../../../assets/requestJobs/shuangxiu.png')}
                    />
                    <Text style={styles.rulesDetail}>
                      {basicData.rest_rule}
                    </Text>
                  </View>
                )}
                <View style={styles.rulesView}>
                  <Image
                    style={styles.rulesIcon}
                    resizeMode="center"
                    source={require('../../../assets/requestJobs/tanxinggongzuo.png')}
                  />
                  <Text style={styles.rulesDetail}>
                    {basicData.isFlexibleWork}
                  </Text>
                </View>
              </NextTouchableOpacity>
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
          )}
        {basicData.enterprise_welfare && (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.jobFuliScrollview}
          >
            {basicData.isWuxianyijin && (
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
            {basicData.isNianzhongjiang && (
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
            {basicData.isCanbu && (
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
            {basicData.isJiaotongbuzhu && (
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
        )}
      </View >
    )
  }

  renderCompany() {
    const { showMoreDetail, basicData } = this.state
    const detail = basicData.extra_attribute || '深圳'
    return (
      <View style={styles.companyXinxi}>
        <Text style={styles.companyXinxiTitle}>公司介绍</Text>
        <Text style={styles.companyXinxiDetail}>
          {showMoreDetail ? detail : detail.substring(0, 90)}
          {detail.length > 100 && !showMoreDetail && (
            <NextTouchableOpacity
              onPress={() => {
                this.setState({ showMoreDetail: true })
              }}
            >
              <Text style={styles.showMoreText}> ...查看展开</Text>
            </NextTouchableOpacity>
          )}
        </Text>
        {/* <Text
          style={styles.companyXinxiDetail}
          numberOfLines={4}
        >
          {basicData.extra_attribute || '深圳智慧网络有限公司是一家新兴崛起的高科技企业，专为通信、互联网、电子商务、移动平台等领域的客户提供计算机软件技术的开发、测试、维护和咨询服务。总部位于环境优美、交通便捷的深圳科技园区内，在上海设有分公司,而且卡商贷就奥斯卡阿萨德静安寺按实际的按商家等客户阿机审打回按实际的看按时接电话按理说肯德基回案例时间肯定爱空间'}
        </Text>
        <Text style={styles.showMore}>查看展开</Text> */}
        <NextTouchableOpacity
          onPress={() => {
            const { navigation } = this.props
            navigation.push('MapNavigation')
          }}
          style={styles.companyXinxiView}>
          <Text style={styles.companyXinxiTitle}>
            公司地址
          </Text>
          <View style={styles.companyXinxiLocaView}>
            <View style={styles.companyXinxiLocaViewLeft}>
              <Image
                style={styles.locationIcon}
                source={require('../../../assets/requestJobs/company-location.png')}
              />
              <Text style={styles.companyXinxiCompany}>{basicData.enterprise_loc_detail && basicData.enterprise_loc_detail[0] || '- -'}</Text>
            </View>
            <Image
              style={styles.nextIcon}
              source={require('../../../assets/requestJobs/white-next.png')}
            />
          </View>
        </NextTouchableOpacity>
      </View >
    )
  }

  renderCompanyInfo() {
    const { basicData } = this.state
    const showFinancing = basicData.industry_involved.length > 0 ? basicData.industry_involved[basicData.industry_involved.length - 1] : ''
    return (
      <View>
        <View style={styles.companyInfo}>
          <View style={styles.companyTitleView}>
            <View style={styles.companyTitle}>
              <Text style={styles.companyName}>{basicData.enterprise_name}</Text>
              <Image style={styles.jobRenzheng}
                source={require('../../../assets/requestJobs/job-renzheng.png')}
              />
            </View>
            <Text style={styles.companySummary}>{
              `${reformComFinancing(basicData.enterprise_financing)}·${reformCompanySize(basicData.enterprise_size)}·${showFinancing}`}</Text>
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
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    const title = `在招职位（${dataSource.onlineJobs}）`
    return (
      <LinearGradient
        start={start}
        end={end}
        colors={['#57DE9E', '#81E3AE']}
        style={styles.onlineView}
      >
        <NextTouchableOpacity
          style={styles.onlineViewBtn}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('OnlineRequestJobs', { title })
          }}
        >
          <Text style={styles.onlineText}>{title}</Text>
        </NextTouchableOpacity>
      </LinearGradient>
    )
  }

  renderCompanyPhoto() {
    const { navigation } = this.props
    const { videoPlaying, basicData: { enterprise_logo } } = this.state
    if (!enterprise_logo) {
      return null
    }
    return (
      <View style={styles.companyPhotoView}>
        <Text style={styles.companyPhotoText}>公司相册</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.companyPhotoScrollview}
        >
          <NextTouchableOpacity
            onPress={() => {
              navigation.push('VideoComponent',
                {
                  videoUri: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
                  closeCallback: () => {
                    this.setState({ videoPlaying: true })
                  }
                },
              )
            }}
            style={styles.companyPhotoItem}
          >
            <Image
              style={styles.videroPlayIcon}
              source={require('../../../assets/requestJobs/video-play-btn.png')}
            />
            <Video
              style={{
                width: '100%',
                height: '100%',
              }}
              source={{ uri: encodeURI('http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4') }}   // 可以是一个 URL 或者 本地文件 // 对空格进行转义,否则无法播放
              resizeMode="cover"
              controls={false}
              autoPlay={false}
              paused={!videoPlaying}
              onProgress={(currentTime: number) => {

              }}
              onLoad={() => {
                setTimeout(() => {
                  this.setState({
                    videoPlaying: false,
                    isFirstLoadVideo: false
                  })
                }, 1000);
              }}
            />
          </NextTouchableOpacity>
          {enterprise_logo.map((e: any, index: number) => {
            return (
              <NextTouchableOpacity
                onPress={() => {
                  this.setState({
                    imageModalVisible: true,
                    imageSelectIndex: index
                  })
                }}
                style={styles.companyPhotoItem}
              >
                <Image
                  source={{ uri: e.url }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  renderHotReviewer() {
    const { hrList } = this.state
    return (
      <View style={styles.companyPhotoView}>
        <Text style={styles.companyPhotoText}>热门招聘官</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.reviewerScrollview}
        >
          {hrList.map((item: any, index: number) => {
            return (
              <NextTouchableOpacity
                key={index.toString()}
                style={styles.reviewerItem}
              >
                <View style={styles.reviewerIcon} />
                <Text style={styles.reviewerName}>{item.name}</Text>
                <Text style={styles.reviewerJob} numberOfLines={1}>{item.pos}</Text>

              </NextTouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  renderStar(star: number = 0) {
    let showStarArray = []
    for (let i = 0; i < 5; i++) {
      if (i < star) {
        showStarArray.push(require('../../../assets/requestJobs/star.png'))
      } else {
        showStarArray.push(require('../../../assets/requestJobs/star-gray.png'))
      }
    }
    return (
      <View style={styles.starView}>
        {showStarArray.map((value: string, index: number) => {
          return (
            <Image
              style={styles.starItem}
              key={index.toString()}
              source={value as ImageSourcePropType}
            />
          )
        })}
      </View>
    )
  }

  renderLinearGradient(text: string, progress: number) {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    const { progressWidth } = this.state
    if (progress < 0 || progress > 1) {
      return null
    }
    return (
      <View style={[styles.reviewerContainerRightItem,]}>
        <Text style={styles.scoreTitle}>{text}</Text>
        <View onLayout={(event: any) => {
          if (!progressWidth) {
            this.setState({ progressWidth: event.nativeEvent.layout.width })
          }
        }} style={[styles.linearView]}>
          {progressWidth && (
            <LinearGradient
              start={start}
              end={end}
              colors={['#FECB50', '#FFB932']}
              style={[styles.linearItem, { width: progressWidth * progress }]}
            />
          )}
        </View>
      </View>
    )
  }

  renderReviewerEvaluation() {
    const { recommentList } = this.state
    return (
      <View style={styles.interviewView}>
        <Text style={styles.companyPhotoText}>面试评价</Text>
        <View style={styles.reviewerContainer}>
          <View style={styles.reviewerContainerLeft}>
            <View style={styles.scoreView}>
              <Text style={styles.scoreText}>{recommentList.total}</Text>
              <Text style={styles.scoreUnit}>分</Text>
            </View>
            {this.renderStar(Number(recommentList.total))}
          </View>
          <View style={styles.line} />
          <View style={styles.reviewerContainerRight}>
            {this.renderLinearGradient('职位描述：', recommentList.description / 5)}
            {this.renderLinearGradient('公司情况：', recommentList.comp_env / 5)}
            {this.renderLinearGradient('面试官：', recommentList.HR / 5)}
          </View>
        </View>
      </View>
    )
  }

  renderCommetCell(item: any, index: number) {
    return (
      <CompanyCommentCell
        key={index.toString()}
        cellItem={item}
        likePress={() => {
          RootLoading.info('点赞了~')
        }}
      />
    )
  }

  renderFooterView(showAllComment: boolean, allComment: number) {
    if (showAllComment) {
      return <Text style={styles.noMoreText}>没有更多了</Text>
    }
    return (
      <NextTouchableOpacity
        style={styles.showMoreBtn}
        onPress={() => {
          // this.setState({
          //   showAllComment: true
          // })
          const { navigation } = this.props
          navigation.push('InterviewEvaluation')
        }}
      >
        <Text style={styles.showMoreCommentText}>
          {`全部${allComment}条面试评价`}
        </Text>
      </NextTouchableOpacity>
    )
  }

  renderCommentList() {
    const { commentRefresh, showAllComment, recommentList } = this.state
    if (!recommentList) {
      return null
    }
    let showDs = recommentList.recommends
    if (recommentList.recommends.length > 2) {
      if (!showAllComment) {
        showDs.push(recommentList.recommends[0])
        showDs.push(recommentList.recommends[1])
      }
    }
    return (
      <RefreshListView
        style={styles.commentList}
        refreshState={commentRefresh}
        automaticallyAdjustContentInsets={false}
        data={showDs}
        renderItem={({ item, index }: any) => this.renderCommetCell(item, index)}
        ListFooterComponent={this.renderFooterView(showAllComment, recommentList.recommends.length)}
        keyExtractor={(item: any, index: number) => index.toString()}
        footerNoMoreDataText="没有更多了"
      />
    )
  }

  renderCompanyQuestion() {
    const { qaList } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.interviewView}>
        <NextTouchableOpacity
          onPress={() => {
            const { navigation } = this.props
            navigation.push('CompanyAsk')
          }}
        >
          <Text style={styles.companyPhotoText}>公司问答</Text>
        </NextTouchableOpacity>
        <CompanyQuestionCell
          // key={index.toString()}
          cellItem={qaList}
          onPress={() => {
            navigation.push('SubmitCompanyQuestion')
          }}
        />
        {/* {dataSource.companyQuestion.map((item: any, index: number) => {
          return (
            <CompanyQuestionCell
              key={index.toString()}
              cellItem={item}
              onPress={() => {
                navigation.push('SubmitCompanyQuestion')
              }}
            />
          )
        })} */}
        <NextTouchableOpacity
          style={styles.askQuestionBtn}
          onPress={() => {
            navigation.push('CompanySubQuestion')
          }}
        >
          <Text style={styles.askQuestionText}>我来提问</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  renderWelfare() {
    const { dataSource } = this.state
    if (!dataSource) {
      return null
    }
    const fullArray = [
      { id: 1, name: '五险一金', img: require('../../../assets/requestJobs/wxyj-gray.png') },
      { id: 2, name: '年终奖', img: require('../../../assets/requestJobs/nzj-gray.png') },
      { id: 3, name: '餐补', img: require('../../../assets/requestJobs/ycbz-gray.png') },
      { id: 4, name: '交通补助', img: require('../../../assets/requestJobs/jtbz-gray.png') },
      { id: 5, name: '技能培训', img: require('../../../assets/requestJobs/jnpx-gray.png') },
      { id: 6, name: '带薪年假', img: require('../../../assets/requestJobs/dxnj-gray.png') },
      { id: 7, name: '免费零食', img: require('../../../assets/requestJobs/mfls-gray.png') },
      { id: 8, name: '免费体检', img: require('../../../assets/requestJobs/mftj-gray.png') },
    ]
    return (
      <View style={styles.bottomView}>
        <NextTouchableOpacity
          style={styles.closeBtn}
          onPress={() => {
            this.setState({ welfareVisible: false })
          }}
        >
          <Image
            style={styles.closeIcon}
            source={require('../../../assets/requestJobs/close_circle.png')}
          />
        </NextTouchableOpacity>
        <Text style={styles.bottomViewWorkTime}>
          工作时间
        </Text>
        <View style={styles.bottomViewTimeView}>
          <Image
            style={styles.bottomViewTimeIcon}
            source={require('../../../assets/requestJobs/shijian-gray.png')}
          />
          <Text style={styles.bottomViewTimeText}>
            周末双休
          </Text>
        </View>
        <Text style={styles.bottomViewWorkTime}>
          企业福利
        </Text>
        <View style={styles.bottomViewFuliView}>
          {fullArray.map((item: any, index: number) => {
            return (
              <View
                key={index.toString()}
                style={styles.bottomViewFuliItem}
              >
                <Image
                  style={styles.bottomViewFuliIcon}
                  source={item.img}
                  resizeMode="center"
                />
                <Text style={styles.bottomViewFuliText}>
                  {item.name}
                </Text>
              </View>
            )
          })}
        </View>
        <Text style={styles.bottomViewDetail}>
          工作时间和福利信息由企业提供，每个岗位可能实际情况略有不同，具体内容可与企业招聘方确认
        </Text>
      </View >
    )
  }

  renderImageModal() {
    const { imageModalVisible, dataSource, imageSelectIndex } = this.state
    return (
      <Modal
        visible={imageModalVisible}
        transparent={true}
        onRequestClose={() => this.setState({ imageModalVisible: false })}
      >
        <ImageViewer
          style={{ paddingTop: -200 }}
          imageUrls={dataSource.imageList}
          index={imageSelectIndex}
          onSwipeDown={() => {
            console.log('onSwipeDown');
            this.setState({ imageModalVisible: false })
          }}
          enableSwipeDown={true}
          saveToLocalByLongPress={false}
          renderIndicator={(currentIndex?: number, allSize?: number) => {
            return (
              <Text style={styles.modalIndex}>
                {`${currentIndex}/${allSize}`}
              </Text>
            )
          }}
          renderHeader={() => {
            return (
              <NextTouchableOpacity
                style={styles.imageCloseBtn}
                onPress={() => {
                  this.setState({ imageModalVisible: false })
                }}
              >
                <Image
                  style={styles.imageCloseBtnIcon}
                  resizeMode="center"
                  source={require('../../../assets/requestJobs/close-white.png')}
                />
              </NextTouchableOpacity>
            )
          }}
          loadingRender={() => {
            return (
              <ActivityIndicator
                size="large"
                color="#888888"
              />
            )
          }}
        />
      </Modal>
    )
  }

  render() {
    const { hrList, shieldVisible, welfareVisible, qaList,
      refreshing, basicData, recommentList } = this.state
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
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => this.loadData()
              }
            />
          )}
        >
          {/* {(dataSource && basicData) ? ( */}
          <View style={{ flex: 1, }}>
            {basicData && (
              <>
                {this.renderCompanyInfo()}
                {this.renderCompayRules()}
                {this.renderCompany()}
                {this.renderCompanyPhoto()}
              </>
            )}
            {hrList && (
              this.renderHotReviewer()
            )}
            {recommentList && (
              <>
                {this.renderReviewerEvaluation()}
                {this.renderCommentList()}
              </>
            )}
            {qaList && (
              this.renderCompanyQuestion()
            )}
          </View>
          {/* {this.renderImageModal()} */}
          {/* ) : null} */}
        </ScrollView>
        {this.renderCompanyFooter()}
        <AlertContentModal
          visible={shieldVisible}
          title="屏蔽公司"
          detail="屏蔽该公司后，趁早找将不再向您推荐该公司的相关职位，也不再主动将您推给对方"
          bottomStyle={{ marginTop: 37 }}
          leftBtn={{
            title: '我再想想',
            act: () => this.setState({ shieldVisible: false }),
          }}
          rightBtn={{
            title: '添加屏蔽',
            act: () => this.setState({ shieldVisible: false }),
          }}
        />
        <BottomContentModal
          visible={welfareVisible}
        >
          {this.renderWelfare()}
        </BottomContentModal>
      </View >
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
    getCandidateGetEnterpriseDetail_EntInfo: jobActions.getCandidateGetEnterpriseDetail_EntInfo,
    getCandidateGetEnterpriseDetail_HRList: jobActions.getCandidateGetEnterpriseDetail_HRList,
    getCandidateGetEnterpriseDetail_InterviewRecomment: jobActions.getCandidateGetEnterpriseDetail_InterviewRecomment,
    getCandidateGetEnterpriseDetail_QA: jobActions.getCandidateGetEnterpriseDetail_QA
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetail)