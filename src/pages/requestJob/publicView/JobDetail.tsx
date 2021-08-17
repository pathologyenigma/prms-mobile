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

type IProps = GenProps<'JobDetail'> & {

}

interface IState {
  dataSource: any
}

export default class JobDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: undefined
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
    return null
  }

  renderJobInfo() {
    return null
  }

  renderCompanyInfo() {
    return null
  }

  renderGuessJobs() {
    return null
  }

  rendeJobrTips() {
    return null
  }

  renderInterviewerFooter() {
    const { dataSource } = this.state
    if (!dataSource) {
      return null
    }
    return <View style={{ width: 200, height: 200, backgroundColor: 'red', }} />
  }

  render() {
    const { dataSource } = this.state
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            animated
            barStyle={'dark-content'}
          />
          {this.renderNavBar()}
          {dataSource ? (
            <View>
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