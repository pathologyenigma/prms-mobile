import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar } from 'react-native'
import styles from './styles/EditOnlineResume.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import GradientButton from '../../components/GradientButton'
import RootLoading from '../../../utils/rootLoading'
import { greenColor } from '../../../utils/constant'

type IProps = GenProps<'EditOnlineResume'> & {

}

interface IState {
  expectJobs: any,
  workExperience: any,
  projectExperience: any,
  educationExperience: any,
  personalGoods: string
}

export default class EditOnlineResume extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      expectJobs: [{
        id: 1,
        type: 'UI/界面设计',
        salary: '15-20K',
        location: '深圳',
        status: '在职找工作·随时入职'
      }],
      workExperience: [{
        id: 1,
        company: '广东智慧网络有限公司11',
        apartment: '设计部',
        beginTime: '2017.3',
        endTime: '至今',
        job: 'UI设计师  技术部',
        content: '内容：1、负责线上APP的改版功能，更新迭代；2、根据产品及产品需求，独立完成项目设计，建立产品的界面设计规范；3、根据原型图完成出色的设计稿,交付给开发人员使用'
      }, {
        id: 2,
        company: '广东智慧科技有限公司22',
        apartment: '设计部',
        beginTime: '2017.3',
        endTime: '至今',
        job: 'UI设计师  技术部',
        content: '内容：1、负责线上APP的改版功能，更新迭代；2、根据产品及产品需求，独立完成项目设计，建立产品的界面设计规范；3、根据原型图完成出色的设计稿,交付给开发人员使用'
      }],
      projectExperience: [{
        id: 1,
        project: '广东智慧网络公司官网',
        role: '设计师',
        beginTime: '2017.3',
        endTime: '至今',
        job: '网页设计师',
        content: '内容：1、负责线上APP的改版功能，更新迭代；2、根据产品及产品需求，独立完成项目设计，建立产品的界面设计规范；3、根据原型图完成出色的设计稿,交付给开发人员使用',
        performance: '优先二等奖'
      }],
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
      personalGoods: '自信、爱心、责任感、强迫症'
    }
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
    return (
      <View style={styles.iconView}>
        <View>
          <View style={styles.nameView}>
            <Text style={styles.iconText}>李小冉</Text>
            <Image style={styles.editNameIcon}
              source={require('../../../assets/requestJobs/edit-gray.png')}
            />
          </View>
          <Text style={styles.userInfo}>5年工作经验/本科/25岁</Text>
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
                <Text style={styles.expectJobsText}>{`${item.type}   ${item.salary}`}</Text>
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
    const { navigation } = this.props
    return (
      <View style={styles.cellView}>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('EditWorkExperience', {
              workItemCallback: (workItem: any) => {
                workExperience.push({ ...workItem })
                this.setState({ workExperience })
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
                  workItemCallback: (workItem: any) => {
                    console.log('workItem222: ', workItem)
                    for (let i = 0; i < workExperience.length; i++) {
                      if (i === workItem.index) {
                        if (workItem.deleteItem) {
                          workExperience.splice(i, 1)
                        } else {
                          workExperience.splice(i, 1, workItem)
                        }
                        break
                      }
                    }
                    this.setState({ workExperience })
                  }
                })
              }}
              style={styles.workExperienceView}>
              <View style={styles.companyInfo}>
                <Text style={styles.workExperienceCompany}>{item.company}</Text>
                <Text style={styles.workExperienceTime}>{`${item.beginTime}~${item.endTime}`}</Text>
                <Image
                  source={require('../../../assets/requestJobs/next-gray.png')}
                  style={styles.nextIcon}
                />
              </View>
              <View>
                <Text style={styles.workExperienceText}>{item.job}</Text>
                <Text numberOfLines={2} style={styles.workExperienceLocation}>{item.content}</Text>
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
              projectItemCallback: (projectItem: any) => {
                projectExperience.push({ ...projectItem })
                this.setState({ projectExperience })
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
                  projectItemCallback: (projectItem: any) => {
                    for (let i = 0; i < projectExperience.length; i++) {
                      if (i === projectItem.index) {
                        if (projectItem.deleteItem) {
                          projectExperience.splice(i, 1)
                        } else {
                          projectExperience.splice(i, 1, projectItem)
                        }
                        break
                      }
                    }
                    this.setState({ projectExperience })
                  }
                })
              }}
              style={styles.workExperienceView}
            >
              <View style={styles.companyInfo}>
                <Text style={styles.workExperienceCompany}>{item.project}</Text>
                <Text style={styles.workExperienceTime}>{`${item.beginTime}~${item.endTime}`}</Text>
                <Image
                  source={require('../../../assets/requestJobs/next-gray.png')}
                  style={styles.nextIcon}
                />
              </View>
              <View>
                <Text style={styles.workExperienceText}>{item.role}</Text>
                <Text numberOfLines={2} style={styles.workExperienceLocation}>{item.content}</Text>
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
                  educationItemCallback: (educationItem: any) => {
                    for (let i = 0; i < educationExperience.length; i++) {
                      if (i === educationItem.index) {
                        if (educationItem.deleteItem) {
                          educationExperience.splice(i, 1)
                        } else {
                          educationExperience.splice(i, 1, educationItem)
                        }
                        break
                      }
                    }
                    this.setState({ educationExperience })
                  }
                })
              }}
              style={styles.workExperienceView}
            >
              <View style={styles.companyInfo}>
                <Text style={styles.workExperienceCompany}>{item.name}</Text>
                <Text style={styles.workExperienceTime}>{`${item.beginTime}-${item.endTime}`}</Text>
                <Image
                  source={require('../../../assets/requestJobs/next-gray.png')}
                  style={styles.nextIcon}
                />
              </View>
              <View>
                <Text style={styles.workExperienceText}>{`${item.education}·${item.professional}`}</Text>
                <Text numberOfLines={2} style={styles.workExperienceLocation}>{item.schoolExperience}</Text>
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
              personalGoodsCallback: (editContents: string) => {
                this.setState({ personalGoods: editContents })
              }
            })
          }}
          style={styles.titleView}>
          <Text style={styles.titleText}>个人优势</Text>
          <View style={styles.editPersonalView}>
            <Text style={styles.editPersonalText}>待完善</Text>
            <Image
              style={styles.editIcon}
              source={require('../../../assets/requestJobs/edit-gray.png')}
            />
          </View>
        </NextTouchableOpacity>
        <Text style={styles.editPersonalDetail}>{personalGoods}</Text>
      </View>
    )
  }

  renderSaveBtn() {
    return (
      <View
        style={styles.bottomContainer}
      >
        <GradientButton
          text="保存"
          containerStyle={styles.btnContainer}
        />
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
        >
          {this.renderIcon()}
          {this.renderRequestJobs()}
          {this.renderPersonalGoods()}
          {this.renderWorkExperience()}
          {this.renderProjectExperience()}
          {this.renderEducationExperience()}
        </ScrollView>
        {this.renderSaveBtn()}
      </View>
    )
  }
}