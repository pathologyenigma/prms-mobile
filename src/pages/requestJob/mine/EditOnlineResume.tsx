import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar, RefreshControl } from 'react-native'
import styles from './styles/EditOnlineResume.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import GradientButton from '../../components/GradientButton'
import RootLoading from '../../../utils/rootLoading'
import { greenColor } from '../../../utils/constant'
import { reformDistanceYears, reformEducation, reformSalary, selectEducation } from '../../../utils/utils'
import { getCandidateGetOnlineResumeBasicInfo, getCandidateGetOnlineResumeBasicInfoExperience, getEduExperience, getProjectExperience, getWorkExperience } from '../../../action/mineAction'
import { format } from 'date-fns'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { IStoreState } from '../../../reducer'

type IProps = GenProps<'EditOnlineResume'> & ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

interface IState {
  expectJobs: any,
  workExperience: any,
  projectExperience: any,
  educationExperience: any,
  personalGoods: string,
  personalSkills: any  // 个人技能标签,
  workExperienceRefresh: boolean,
  basicInfoRefresh: boolean,
  projectExperienceRefresh: boolean,
  eduExperienceRefresh: boolean
}

class EditOnlineResume extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      workExperienceRefresh: true,
      basicInfoRefresh: true,
      projectExperienceRefresh: true,
      eduExperienceRefresh: true,
      workExperience: [],
      expectJobs: [{
        id: 1,
        type: 'UI/界面设计',
        salary: '15-20K',
        location: '深圳',
        status: '在职找工作·随时入职'
      }],
      // projectExperience: [{
      //   id: 1,
      //   project: '广东智慧网络公司官网',
      //   role: '设计师',
      //   beginTime: '2017.3',
      //   endTime: '至今',
      //   job: '网页设计师',
      //   content: '内容：1、负责线上APP的改版功能，更新迭代；2、根据产品及产品需求，独立完成项目设计，建立产品的界面设计规范；3、根据原型图完成出色的设计稿,交付给开发人员使用',
      //   performance: '优先二等奖'
      // }],
      educationExperience: [{
        id: 1,
        name: '广东白云学院',
        beginTime: '2017',
        endTime: '2019',
        education: '本科',
        fullTime: '全日制',
        professional: '视觉传达',
        schoolExperience: '内容：1、在校担任宣传部社长；获得XXXX荣誉称号'
      }],
      personalGoods: '',
      personalSkills: [],
      projectExperience: [],
    }
  }

  componentDidMount() {
    this.loadOnlineResumeInfo()
  }

  loadOnlineResumeInfo() {
    this.setState({
      workExperienceRefresh: true,
      basicInfoRefresh: true,
      projectExperienceRefresh: true,
      eduExperienceRefresh: true
    }, () => {
      this.loadWorkExperience()
      this.loadBasicInfo()
      this.loadProjectExperience()
      this.loadEduExperience()
    })
  }

  loadWorkExperience() {
    getWorkExperience((error, result) => {
      console.log('1111111111111111111error, result: ', error, result)
      if (!error && result) {
        this.setState({
          workExperience: result,
          workExperienceRefresh: false
        })
      } else {
        this.setState({ workExperienceRefresh: false })
        RootLoading.info('工作经验加载失败,请刷新重试')
      }
    })
  }

  loadBasicInfo() {
    getCandidateGetOnlineResumeBasicInfoExperience((error, result) => {
      console.log('getCandidateGetOnlineResumeBasicInfoExperience, result: ', error, result)
      if (!error && result) {
        this.setState({
          personalGoods: result.personal_advantage || '',
          personalSkills: result.skills || [],
          basicInfoRefresh: false
        })
      } else {
        this.setState({ basicInfoRefresh: false })
        RootLoading.info('个人优势加载失败,请刷新重试')
      }
    })
  }

  loadProjectExperience() {
    getProjectExperience((error, result) => {
      console.log('getCandidateGetOnlineResumeBasicInfoExperience, result: ', error, result)
      if (!error && result) {
        this.setState({
          projectExperience: result || [],
          projectExperienceRefresh: false
        })
      } else {
        this.setState({ projectExperienceRefresh: false })
        RootLoading.info('项目经历加载失败,请刷新重试')
      }
    })
  }

  loadEduExperience() {
    getEduExperience((error, result) => {
      console.log('loadEduExperience, result: ', error, result)
      if (!error && result) {
        this.setState({
          educationExperience: result || [],
          eduExperienceRefresh: false
        })
      } else {
        this.setState({ eduExperienceRefresh: false })
        RootLoading.info('项目经历加载失败,请刷新重试')
      }
    })
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          elevation: 0,
          borderBottomColor: '#ECECEC'
        }}
        title="编辑在线简历"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/black_back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: '预览',
          style: { color: greenColor, fontSize: 15 },
          act: () => {
            RootLoading.info('预览简历')
          }
        }}
      />
    )
  }

  renderIcon() {
    const { userInfo, navigation } = this.props
    return (
      <View style={styles.iconView}>
        <View>
          <View style={styles.nameView}>
            <Text style={styles.iconText}>{userInfo.username}</Text>
            <NextTouchableOpacity
              onPress={() => {
                navigation.push('UserInfo')
              }}
            >
              <Image style={styles.editNameIcon}
                source={require('../../../assets/requestJobs/edit-gray.png')}
              />
            </NextTouchableOpacity>
          </View>
          <Text style={styles.userInfo}>
            {`${reformDistanceYears(userInfo.first_time_working)}年工作经验/${selectEducation(userInfo.education)}/${reformDistanceYears(userInfo.birth_date)}岁`}
          </Text>
        </View>
        <View>
          <Image
            source={require('../../../assets/requestJobs/icon-example.png')}
            style={styles.iconStyle}
          />
          <Image
            style={styles.gender}
            source={require('../../../assets/requestJobs/women-icon.png')}
          />
        </View>
      </View>
    )
  }

  renderRequestJobs() {
    const { expectJobs } = this.state
    const { navigation } = this.props
    return (
      <View style={[styles.cellView, {
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
        paddingBottom: 12
      }]}>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('JobExpectations')
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>求职意向</Text>
          <Image
            style={styles.addIcon}
            source={require('../../../assets/requestJobs/add-gray.png')}
          />
        </NextTouchableOpacity>
        {expectJobs.map((item: any, index: number) => {
          return (
            <NextTouchableOpacity
              key={index.toString()}
              onPress={() => {
                navigation.push('JobExpectations')
              }}
              style={styles.expectJobsView}
            >
              <View>
                <Text style={styles.expectJobsText}>{`${item.type}   ${reformSalary(item.salary)}`}</Text>
                <Text style={styles.expectJobsLocation}>{`${item.location}   ${item.status}`}</Text>
              </View>
              <Image
                source={require('../../../assets/requestJobs/next-gray.png')}
                style={styles.nextIcon}
              />
            </NextTouchableOpacity>
          )
        })}
      </View>
    )
  }

  renderCell(title: string, detail: string, arrow: boolean, onPress?: () => {}) {
    return (
      <NextTouchableOpacity
        style={styles.cell}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
      >
        <Text style={styles.cellText}>{title}</Text>
        <View style={styles.valueView}>
          <Text style={styles.cellDetail}>{detail}</Text>
          {arrow && (
            <Image
              style={styles.nextIcon}
              source={require('../../../assets/requestJobs/next-gray.png')}
            />
          )}
        </View>
      </NextTouchableOpacity>
    )
  }

  renderWorkExperience() {
    const { workExperience } = this.state
    console.log('workExperience1: ', workExperience)
    const { navigation } = this.props
    if (!workExperience) {
      return null
    }
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('EditWorkExperience', {
              workItemCallback: () => {
                this.loadWorkExperience()
              }
            })
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>工作经验</Text>
          <Image
            style={styles.addIcon}
            source={require('../../../assets/requestJobs/add-gray.png')}
          />
        </NextTouchableOpacity>
        {workExperience.map((item: any, index: number) => {
          return (
            <NextTouchableOpacity
              key={index.toString()}
              onPress={() => {
                navigation.push('EditWorkExperience', {
                  workItem: { ...item, index },
                  workItemCallback: () => {
                    this.loadOnlineResumeInfo()
                  }
                })
              }}
              style={styles.workExperienceView}>
              <View style={styles.companyInfo}>
                <Text style={styles.workExperienceCompany}>{item.comp_name}</Text>
                <Text style={styles.workExperienceTime}>{`${format(new Date(item.start_at), 'yyyy.MM')}~${format(new Date(item.end_at), 'yyyy.MM')}`}</Text>
                <Image
                  source={require('../../../assets/requestJobs/next-gray.png')}
                  style={styles.nextIcon}
                />
              </View>
              <View>
                <Text style={styles.workExperienceText}>{`${item.pos_name} ${item.department}`}</Text>
                <Text numberOfLines={2} style={styles.workExperienceLocation}>{item.working_detail}</Text>
              </View>
            </NextTouchableOpacity>
          )
        })}
      </View>
    )
  }

  renderProjectExperience() {
    const { projectExperience } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('EditProjectExperience', {
              projectItemCallback: () => {
                this.loadProjectExperience()
              }
            })
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>项目经历</Text>
          <Image
            style={styles.addIcon}
            source={require('../../../assets/requestJobs/add-gray.png')}
          />
        </NextTouchableOpacity>
        {projectExperience.map((item: any, index: number) => {
          return (
            <NextTouchableOpacity
              key={index.toString()}
              onPress={() => {
                navigation.push('EditProjectExperience', {
                  projectItem: { ...item, index },
                  projectItemCallback: () => {
                    this.loadProjectExperience()
                  }
                })
              }}
              style={styles.workExperienceView}
            >
              <View style={styles.companyInfo}>
                <Text style={styles.workExperienceCompany}>{item.project_name}</Text>
                <Text style={styles.workExperienceTime}>
                  {
                    `${item.start_at}~${item.end_at}`
                  }</Text>
                <Image
                  source={require('../../../assets/requestJobs/next-gray.png')}
                  style={styles.nextIcon}
                />
              </View>
              <View>
                <Text style={styles.workExperienceText}>{item.role}</Text>
                <Text numberOfLines={2} style={styles.workExperienceLocation}>{item.project_description}</Text>
              </View>
            </NextTouchableOpacity>
          )
        })}
      </View>
    )
  }

  renderEducationExperience() {
    const { educationExperience } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('EditEducation', {
              educationItemCallback: (educationItem: any) => {
                educationExperience.push({ ...educationItem })
                this.setState({ educationExperience })
              }
            })
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>教育经历</Text>
          <Image
            style={styles.addIcon}
            source={require('../../../assets/requestJobs/add-gray.png')}
          />
        </NextTouchableOpacity>
        {educationExperience.map((item: any, index: number) => {
          return (
            <NextTouchableOpacity
              key={index.toString()}
              onPress={() => {
                navigation.push('EditEducation', {
                  educationItem: { ...item, index },
                  educationItemCallback: () => {
                    this.loadEduExperience()
                  }
                })
              }}
              style={styles.workExperienceView}
            >
              <View style={styles.companyInfo}>
                <Text style={styles.workExperienceCompany}>{item.school_name}</Text>
                <Text style={styles.workExperienceTime}>{item.time}</Text>
                <Image
                  source={require('../../../assets/requestJobs/next-gray.png')}
                  style={styles.nextIcon}
                />
              </View>
              <View>
                <Text style={styles.workExperienceText}>{`${selectEducation(item.education)}·${item.major}`}</Text>
                <Text numberOfLines={2} style={styles.workExperienceLocation}>{item.exp_at_school}</Text>
              </View>
            </NextTouchableOpacity>
          )
        })}
      </View>
    )
  }

  renderPersonalGoods() {
    const { personalGoods } = this.state
    const { navigation } = this.props
    return (
      <View style={[styles.cellView, {
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
        paddingBottom: 12
      }]}>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('EditPersonalGoods', {
              personalGoods,
              personalGoodsCallback: () => {
                // 加载个人优势信息
                this.loadBasicInfo()
              }
            })
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>个人优势</Text>
          <View style={styles.editPersonalView}>
            {(!personalGoods || personalGoods.length === 0) &&
              < Text style={styles.editPersonalText}>待完善</Text>
            }
            <Image
              style={styles.editIcon}
              source={require('../../../assets/requestJobs/edit-gray.png')}
            />
          </View>
        </NextTouchableOpacity >
        <Text style={
          [styles.editPersonalDetail, personalGoods.length === 0 && { color: '#999' }]}
        >{personalGoods || '如: 自信、爱心、责任感、强迫症'}</Text>
      </View >
    )
  }

  renderPersonalSkills() {
    const { personalSkills } = this.state
    const { navigation } = this.props
    return (
      <View style={[styles.cellView, {
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
        paddingBottom: 12,
        minHeight: 60,
      }]}>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('EditPersonalSkills', {
              personalSkills,
              personalSkillsCallback: () => {
                // 加载技能标签
                this.loadBasicInfo()
                // this.setState({ personalGoods: editContents })
              }
            })
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>技能标签</Text>
          <View style={styles.editPersonalView}>
            <Image
              style={styles.editIcon}
              source={require('../../../assets/requestJobs/edit-gray.png')}
            />
          </View>
        </NextTouchableOpacity>
        <View style={styles.jobInfoTagView}>
          {personalSkills && personalSkills.map((e: any, index: number) => {
            return (
              <Text key={index.toString()} style={styles.editPersonalSkills}>
                {e}
              </Text>
            )
          })}
        </View>
      </View>
    )
  }

  renderRefresh() {
    const {
      workExperienceRefresh,
      basicInfoRefresh,
      projectExperienceRefresh,
      eduExperienceRefresh
    } = this.state
    return (
      <RefreshControl
        refreshing={workExperienceRefresh || basicInfoRefresh || projectExperienceRefresh || eduExperienceRefresh}
        onRefresh={() => this.loadOnlineResumeInfo()
        }
      />
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
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={this.renderRefresh()}
        >
          {this.renderIcon()}
          {this.renderRequestJobs()}
          {this.renderPersonalGoods()}
          {this.renderPersonalSkills()}
          {this.renderWorkExperience()}
          {this.renderProjectExperience()}
          {this.renderEducationExperience()}
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    userInfo: state.userInfo.userInfo,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return bindActionCreators(
    {

    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditOnlineResume)