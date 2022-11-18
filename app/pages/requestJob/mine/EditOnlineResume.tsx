import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar, RefreshControl } from 'react-native'
import styles from './styles/EditOnlineResume.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextPressable from '../../components/NextPressable'
import GradientButton from '../../components/GradientButton'
import { greenColor } from '../../../utils/constant'
import { reformDistanceYears, reformEducation, reformSalary, selectEducation } from '../../../utils/utils'
import { format } from 'date-fns'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { stringForFullTime } from '~/recruitment/utils/JobHelper'

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
  eduExperienceRefresh: boolean,
  isPreview: boolean
}

export default class EditOnlineResume extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { isPreview } } } = props
    this.state = {
      userInfo: {},
      isPreview,
      workExperienceRefresh: true,
      basicInfoRefresh: true,
      projectExperienceRefresh: true,
      eduExperienceRefresh: true,
      workExperience: [],
      expectJobs: [],
      educationExperience: [],
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
      Promise.all([
      	HTAPI.UserGetBasicInfo(),
      	HTAPI.CandidateGetAllJobExpectations(),
      	HTAPI.CandidateGetWorkExps(),
      	HTAPI.CandidateGetOnlineResumeBasicInfo(null, { showError: false }),
      	HTAPI.CandidateGetProjectExps(),
      	HTAPI.CandidateGetEduExps()
      ]).then(([
      	userInfo, 
      	expectJobs = [],
      	{ data: workExperience = [] }, 
      	baseInfo = {},
      	{ data: projectExperience = [] },
      	{ data: educationExperience = [] }
      ]) => {
      	this.setState({ 
      		userInfo, expectJobs, workExperience, personalGoods: baseInfo?.personal_advantage, personalSkills: baseInfo?.skills ?? [], projectExperience, educationExperience,
      		workExperienceRefresh: false,
      		basicInfoRefresh: false,
      		projectExperienceRefresh: false,
      		eduExperienceRefresh: false
      	})
      })
    })
  }

  saveGrade() {
    const { expectJobs, workExperience, educationExperience, personalSkills, projectExperience, personalGoods } = this.state
    let i = 0
    if (expectJobs.length > 0) {
      i += 1
    }
    if (workExperience.length > 0) {
      i += 1
    }
    if (educationExperience.length > 0) {
      i += 1
    }
    if (personalSkills.length > 0) {
      i += 1
    }
    if (projectExperience.length > 0) {
      i += 1
    }
    if (personalGoods) {
      i += 1
    }
    var grade = i / 6 * 100
    grade = parseInt(grade)
    HTAPI.CandidateEditOnlineResumeGrade({
    	grade
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
        title={this.state.isPreview ? '预览在线简历' : '编辑在线简历'}
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/black_back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: this.state.isPreview ? '' : '预览',
          style: { color: greenColor, fontSize: 15 },
          act: () => {
            // TODO 此处需要修改保存时机
            this.saveGrade()
            navigation.push('EditOnlineResume', { isPreview: true })
          }
        }}
      />
    )
  }

  renderIcon() {
    const { userInfo, isPreview } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.iconView}>
        <View>
          <View style={styles.nameView}>
            <Text style={styles.iconText}>{userInfo.username}</Text>
            {!isPreview && (

              <NextPressable
                onPress={() => {
                  navigation.push('UserInfo')
                }}
              >
                <Image style={styles.editNameIcon}
                  source={require('../../../assets/requestJobs/edit-gray.png')}
                />
              </NextPressable>
            )}
          </View>
          <Text style={styles.userInfo}>
            {`${reformDistanceYears(userInfo.first_time_working)}年工作经验/${selectEducation(userInfo.education)}/${reformDistanceYears(userInfo.birth_date)}岁`}
          </Text>
        </View>
        <View>
          <CacheImage
            source={global.AVATAR_IMAGE(this?.state?.userInfo?.image_url)}
            style={styles.iconStyle}
          />
          <Image
            style={styles.gender}
            source={userInfo.gender ? require('../../../assets/requestJobs/man-icon.png')  : require('../../../assets/requestJobs/women-icon.png') }
          />
        </View>
      </View>
    )
  }

  renderRequestJobs() {
    const { expectJobs, isPreview } = this.state
    const { navigation } = this.props
    return (
      <View style={[styles.cellView, {
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
        paddingBottom: 12
      }]}>
        <NextPressable
          disabled={isPreview}
          onPress={() => {
            navigation.push('JobExpectations')
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>求职意向</Text>
          {!isPreview && (
            <Image
              style={styles.addIcon}
              source={require('../../../assets/requestJobs/add-gray.png')}
            />
          )}
        </NextPressable>
        {expectJobs.map((item: any, index: number) => {
          return (
            <NextPressable
              key={index.toString()}
              disabled={isPreview}
              onPress={() => {
                navigation.push('JobExpectations')
              }}
              style={styles.expectJobsView}
            >
              <View>
                <Text style={styles.expectJobsText}>{`${item.job_category}   ${reformSalary([item.min_salary_expectation, item.max_salary_expectation])}`}</Text>
                <Text style={styles.expectJobsLocation}>{`${item.aimed_city}   ${stringForFullTime(item.full_time_job)}`}</Text>
              </View>
              {!isPreview && (
                <Image
                  source={require('../../../assets/requestJobs/next-gray.png')}
                  style={styles.nextIcon}
                />
              )}
            </NextPressable>
          )
        })}
      </View>
    )
  }

  renderCell(title: string, detail: string, arrow: boolean, onPress?: () => {}) {
    return (
      <NextPressable
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
      </NextPressable>
    )
  }

  renderWorkExperience() {
    const { workExperience, isPreview } = this.state
    const { navigation } = this.props
    if (!workExperience) {
      return null
    }
    return (
      <View style={styles.cellView}>
        <NextPressable
          disabled={isPreview}
          onPress={() => {
            navigation.push('EditWorkExperience', {
              workItemCallback: () => {
                this.loadOnlineResumeInfo()
              }
            })
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>工作经验</Text>
          {!isPreview && (
            <Image
              style={styles.addIcon}
              source={require('../../../assets/requestJobs/add-gray.png')}
            />
          )}
        </NextPressable>
        {workExperience.map((item: any, index: number) => {
          return (
            <NextPressable
              key={index.toString()}
              disabled={isPreview}
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
                {!isPreview && (
                  <Image
                    source={require('../../../assets/requestJobs/next-gray.png')}
                    style={styles.nextIcon}
                  />
                )}
              </View>
              <View>
                <Text style={styles.workExperienceText}>{`${item.pos_name} ${item.department}`}</Text>
                <Text numberOfLines={2} style={styles.workExperienceLocation}>{item.working_detail}</Text>
              </View>
            </NextPressable>
          )
        })}
      </View>
    )
  }

  renderProjectExperience() {
    const { projectExperience, isPreview } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.cellView}>
        <NextPressable
          disabled={isPreview}
          onPress={() => {
            navigation.push('EditProjectExperience', {
              projectItemCallback: () => {
                this.loadOnlineResumeInfo()
              }
            })
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>项目经历</Text>
          {!isPreview && (
            <Image
              style={styles.addIcon}
              source={require('../../../assets/requestJobs/add-gray.png')}
            />
          )}
        </NextPressable>
        {projectExperience.map((item: any, index: number) => {
          return (
            <NextPressable
              key={index.toString()}
              disabled={isPreview}
              onPress={() => {
                navigation.push('EditProjectExperience', {
                  projectItem: { ...item, index },
                  projectItemCallback: () => {
                    this.loadOnlineResumeInfo()
                  }
                })
              }}
              style={styles.workExperienceView}
            >
              <View style={styles.companyInfo}>
                <Text style={styles.workExperienceCompany}>{item.project_name}</Text>
                <Text style={styles.workExperienceTime}>
                  {
                    `${format(new Date(item.start_at), 'yyyy-MM')}~${format(new Date(item.end_at), 'yyyy-MM')}`
                  }</Text>
                {!isPreview && (
                  <Image
                    source={require('../../../assets/requestJobs/next-gray.png')}
                    style={styles.nextIcon}
                  />
                )}
              </View>
              <View>
                <Text style={styles.workExperienceText}>{item.role}</Text>
                <Text numberOfLines={2} style={styles.workExperienceLocation}>{item.project_description}</Text>
              </View>
            </NextPressable>
          )
        })}
      </View>
    )
  }

  renderEducationExperience() {
    const { educationExperience, isPreview } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.cellView}>
        <NextPressable
          disabled={isPreview}
          onPress={() => {
            navigation.push('EditEducation', {
              educationItemCallback: () => {
                this.loadOnlineResumeInfo()
              }
            })
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>教育经历</Text>
          {!isPreview && (
            <Image
              style={styles.addIcon}
              source={require('../../../assets/requestJobs/add-gray.png')}
            />
          )}
        </NextPressable>
        {educationExperience.map((item: any, index: number) => {
          return (
            <NextPressable
              key={index.toString()}
              disabled={isPreview}
              onPress={() => {
                navigation.push('EditEducation', {
                  educationItem: { ...item, index },
                  educationItemCallback: () => {
                    this.loadOnlineResumeInfo()
                  }
                })
              }}
              style={styles.workExperienceView}
            >
              <View style={styles.companyInfo}>
                <Text style={styles.workExperienceCompany}>{item.school_name}</Text>
                <Text style={styles.workExperienceTime}>{item.time}</Text>
                {!isPreview && (
                  <Image
                    source={require('../../../assets/requestJobs/next-gray.png')}
                    style={styles.nextIcon}
                  />
                )}
              </View>
              <View>
                <Text style={styles.workExperienceText}>{`${selectEducation(item.education)}·${item.major}`}</Text>
                <Text numberOfLines={2} style={styles.workExperienceLocation}>{item.exp_at_school}</Text>
              </View>
            </NextPressable>
          )
        })}
      </View>
    )
  }

  renderPersonalGoods() {
    const { personalGoods, isPreview } = this.state
    const { navigation } = this.props
    return (
      <View style={[styles.cellView, {
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
        paddingBottom: 12
      }]}>
        <NextPressable
          disabled={isPreview}
          onPress={() => {
            navigation.push('EditPersonalGoods', {
              personalGoods,
              personalGoodsCallback: () => {
                // 加载个人优势信息
                this.loadOnlineResumeInfo()
              }
            })
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>个人优势</Text>
          <View style={styles.editPersonalView}>
            {(!personalGoods || personalGoods?.length === 0) &&
              < Text style={styles.editPersonalText}>待完善</Text>
            }
            {!isPreview && (
              <Image
                style={styles.editIcon}
                source={require('../../../assets/requestJobs/edit-gray.png')}
              />
            )}
          </View>
        </NextPressable >
        <Text style={
          [styles.editPersonalDetail, personalGoods?.length === 0 && { color: '#999' }]}
        >{personalGoods || '如: 自信、爱心、责任感、强迫症'}</Text>
      </View >
    )
  }

  renderPersonalSkills() {
    const { personalSkills, isPreview } = this.state
    const { navigation } = this.props
    return (
      <View style={[styles.cellView, {
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
        paddingBottom: 12,
        minHeight: 60,
      }]}>
        <NextPressable
          disabled={isPreview}
          onPress={() => {
            navigation.push('EditPersonalSkills', {
              personalSkills,
              personalSkillsCallback: () => {
                // 加载技能标签
                this.loadOnlineResumeInfo()
              }
            })
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>技能标签</Text>
          {!isPreview && (
            <View style={styles.editPersonalView}>
              <Image
                style={styles.editIcon}
                source={require('../../../assets/requestJobs/edit-gray.png')}
              />
            </View>
          )}
        </NextPressable>
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
          onRefresh={() => this.loadOnlineResumeInfo()}
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