import React, { Component, useCallback, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import IconButton from '../../components/IconButton'
import Avatar from './Avatar'
import Tab from './Tab'
import Cell from './Cell'

export default class Me extends Component {

	constructor(props) {
		super(props)
		this.state = {
			userInfo: null
		}
	}

	componentDidMount() {
		this._reloadItemList()
	}

	componentDidAppear({ isSecondAppear }) {
		if (isSecondAppear) {
			this._reloadItemList()
		}
	}

	_reloadItemList = () => {
		Promise.all([
	  		HTAPI.UserGetBasicInfo(),
	  		HTAPI.UserGetEnterpriseDetail_EntInfo(),
	  		HTAPI.ENTGetAccountInfo(),

	  		HTAPI.UserGetContractList(),
	  		HTAPI.ENTSearchCandidates({
	  			filter: {
	  				interview_status: "Waiting"
	  			}
	  		}),
	  		HTAPI.HRGetResumeDeliveryRecord(),
	  		HTAPI.UserGetJobListByEntId({ 'status': 'InRecruitment' })
	  		
	  	]).then(([userInfo, companyInfo, identityInfo, contractList, waitingList, resumeList, jobList]) => {
	  		this.setState({
	  			userInfo: {
	  				...companyInfo,
		  			...identityInfo,
			        ...userInfo,

			        contractCount: (contractList?.length ?? 0),
			        waitingCount: (waitingList?.count ?? 0),
			        resumeCount: (resumeList?.count ?? 0),
			        
			        onlineJobCount: (jobList?.count ?? 0)
	  			},
	  		})
	  	})
	}

	render() {
		const { navigation } = this.props
		const { userInfo } = this.state
		const renderHeader = () => {
		    return (
		      <View style={styles.header}>
		        {/*<FocusAwareStatusBar barStyle={'light-content'} />*/}
		        <Image
		          style={styles.bg}
		          source={require('./images/bg.png')}
		          resizeMode="cover"
		        />
		        <View style={styles.head}>
		          <IconButton
		            style={styles.scan}
		            icon={require('./images/scan.png')}
		            onPress={global.TODO_TOAST}
		          />
		          {renderProfile()}
		          {renderBar()}
		          <View style={styles.corner}></View>
		        </View>
		      </View>
		    )
		  }

		  const renderProfile = () => {
		    return (
		      <TouchableWithoutFeedback
		        onPress={() => navigation.navigate('HrProfile')}>
		        <View style={styles.hr}>
		          <Avatar url={userInfo?.image_url} />
		          <View style={styles.meta}>
		            <Text style={styles.name}>{userInfo?.username}</Text>
		            <Text style={styles.company}>{userInfo?.enterprise_name}</Text>
		            <Text style={styles.job}>{userInfo?.pos}</Text>
		          </View>
		          <Image
		            style={styles.indicator}
		            source={require('./images/indicator.png')}
		          />
		        </View>
		      </TouchableWithoutFeedback>
		    )
		  }

		  const renderBar = () => {
		    return (
		      <View style={styles.bar}>
		        <Tab
		          count={userInfo?.contractCount}
		          category="沟通过"
		          onPress={() => {
		          	// global.TODO_TOAST()
		          	navigation.navigate('TalentListWithTalks')
		          }}
		        />
		        <View style={styles.hdivider} />
		        <Tab
		          count={userInfo?.waitingCount}
		          category="待面试"
		          onPress={() => {
		          	// global.TODO_TOAST()
		          	navigation.navigate('InterviewSchedule')
		          }}
		        />
		        <View style={styles.hdivider} />
		        <Tab count={userInfo?.resumeCount} category="新简历" onPress={() => {
		        	// global.TODO_TOAST()
		        	navigation.navigate('InterviewResume')
		        }} />
		        <View style={styles.hdivider} />
		        <Tab
		          count={userInfo?.onlineJobCount ?? 0}
		          category="在线职位"
		          onPress={() => {
		          	navigation.navigate('JobAdmin')
		          }}
		        />
		      </View>
		    )
		  }

		  return (
		    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
		      {renderHeader()}
		      <View style={styles.cells}>
		        <Cell
		          icon={require('./images/woshou.png')}
		          title="线下招聘会"
		          onPress={() => {
		          	global.TODO_TOAST()
		          	// navigation.navigate('JobFairList')
		          }}
		        />
		        <Cell
		          icon={require('./images/company.png')}
		          title="我的公司"
		          onPress={() => {
		          	global.TODO_TOAST()
		          	// navigation.navigate('EmployerCompanyDetail')
		          }}
		        />
		        <Cell icon={require('./images/invite.png')} title="邀请同事" />
		        <Cell
		          icon={require('./images/switch.png')}
		          title="切换身份"
		          onPress={() => navigation.navigate('ChooseRole')}
		        />
		        <Cell icon={require('./images/feekback.png')} title="帮助与反馈" onPress={() => {
		        	navigation.push('FeedbackAndHelp')
		        }} />
		        <Cell icon={require('./images/about.png')} title="关于我们" onPress={() => {
		        	navigation.push('About')
		        }} />
		        <Cell
		          icon={require('./images/settings.png')}
		          title="设置"
		          onPress={() => {
		          	navigation.push('Setting')
		          	// navigation.navigate('SettingMain')
		          }}
		        />
		      </View>
		    </ScrollView>
		  )
	}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
  	paddingBottom: TAB_BAR_HEIGHT + 100
  },
  header: {
    aspectRatio: 375 / 278,
  },
  bg: {
    position: 'absolute',
    width: '110%',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  head: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scan: {
    position: 'absolute',
    top: 55,
    right: 11,
  },
  hr: {
    marginTop: 86,
    flexDirection: 'row',
    marginHorizontal: 11,
    alignItems: 'center',
  },
  meta: {
    justifyContent: 'center',
    marginLeft: 14,
  },
  name: {
    color: '#FDFDFD',
    fontSize: 21,
    fontWeight: 'bold',
  },
  company: {
    color: '#FDFDFD',
    fontSize: 16,
  },
  job: {
    color: '#FDFDFD',
    fontSize: 14,
  },
  indicator: {
    position: 'absolute',
    right: 0,
  },
  bar: {
    marginTop: 34,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hdivider: {
    width: 1,
    height: 22,
    backgroundColor: '#FFFFFF',
  },
  corner: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    height: 27,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cells: {},
})
