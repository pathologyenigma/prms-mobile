import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar } from 'react-native'
import styles from './styles/UserInfo.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import GradientButton from '../../components/GradientButton'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import { EducationType, reformEducation, selectEducation } from '../../../utils/utils'
import ActionSheet from '../../../recruitment/components/ActionSheet'
import DatePickerModal from '../../components/DatePickerModal'
import AvatarPickerModal from '../../../recruitment/Hr/AvatarViewer/AvatarPickerMomal'

type IProps = GenProps<'UserInfo'> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

interface IState {
  dataSource: any,
  selectGender: any,
  genderActionVisible: boolean,
  datePickVisible: boolean
  localDateOfBirth: any,
  userName: string
  phoneNumber: string
  education: any
  first_time_working: any
  first_time_working_pick: boolean
  current_city: string,
  logo: string,
  avatarModalVisible: boolean
}

const listData = [
  {
    id: 1,
    title: '散播违法/敏感言论',
    description: '招聘者发布的信息包含违法、政治敏感内容'
  }, {
    id: 2,
    title: '人身攻击',
    description: '招聘者存在辱骂、骚扰等语言或肢体上的不当行为'
  }, {
    id: 3,
    title: '色情骚扰',
    description: '招聘者发布的信息包含色情低俗内容或存在性骚扰行为'
  }, {
    id: 4,
    title: '职位虚假',
    description: '招聘者发布的职位信息与实际沟通职位不符'
  }, {
    id: 5,
    title: '招聘者身份虚假',
    description: '招聘者不是其认证公司的员工'
  }, {
    id: 6,
    title: '收取求职者费用',
    description: '招聘者以各种名义或变相收取求职者费用'
  }, {
    id: 7,
    title: '违法/欺诈行为',
    description: '招聘者存在引诱求职者从事不法活动或欺诈求职者'
  }, {
    id: 8,
    title: '其他违规行为',
    description: '招聘者或公司存在以上列举类型之外的违规行为'
  }
]

class UserInfo extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = { userInfo: null }
  }

  componentDidMount() {
  	this._reloadItemList()
  }

  _reloadItemList = () => {
  	HTAPI.UserGetBasicInfo().then(response => {
  		const { gender, birth_date, username, phone_number, education, first_time_working, current_city, logo, image_url } = response
  		this.setState({
	      userInfo: response,
	      dataSource: listData,
	      selectGender: gender,
	      genderActionVisible: false,
	      datePickVisible: false,
	      localDateOfBirth: birth_date || '',
	      userName: username || '',
	      phoneNumber: phone_number || '',
	      education: education || '',
	      first_time_working: first_time_working || '',
	      first_time_working_pick: false,
	      current_city: current_city || '',
	      logo: (logo ?? image_url) ?? '',
	      avatarModalVisible: false
	    })
    })
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title="个人信息"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/black_back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  renderIcon() {
  	const { logo } = this.state
    const { navigation } = this.props
    return (
      <View style={styles.iconView}>
        <Text style={styles.iconText}>头像</Text>
        <NextTouchableOpacity
          onPress={() => {
            navigation.push('AvatarViewer', { avatar: logo, targetRouteName: 'UserInfo' })
          }}>
          <CacheImage
            source={logo ? { uri: logo } : require('../../../assets/requestJobs/icon-example.png')}
            style={styles.iconStyle}
          />
        </NextTouchableOpacity>
      </View>
    )
  }

  renderCell(title: string, detail: string, arrow: boolean, onPress?: () => void) {
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

  renderGender() {
    const { selectGender } = this.state
    return (
      <View style={styles.genderView}>
        <Text style={styles.genderText}>性别</Text>
        <View style={styles.genderDetail}>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ selectGender: true })
            }}
            style={[
              styles.genderDetailBtn,
              selectGender === true && {
                backgroundColor: '#E9FFF0',
                borderColor: '#7AD398'
              }
            ]}
          >
            <Text style={[styles.genderDetailText,
            selectGender === true && {
              fontWeight: 'bold',
              color: '#7AD398'
            }
            ]}>男</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ selectGender: false })
            }}
            style={[
              styles.genderDetailBtn,
              selectGender === false && {
                backgroundColor: '#E9FFF0',
                borderColor: '#7AD398'
              }
            ]}
          >
            <Text style={[styles.genderDetailText,
            selectGender === false && {
              fontWeight: 'bold',
              color: '#7AD398'
            }
            ]}>女</Text>
          </NextTouchableOpacity>
        </View>
      </View>
    )
  }

  saveInfo() {
    const {
      logo,
      userName,
      localDateOfBirth,
      selectGender,
      current_city,
      education,
      first_time_working
    } = this.state
    const info: any = {
      username: userName,
      birthday: localDateOfBirth,
      gender: !!selectGender,
      currentCity: current_city,
      education,
      firstTimeWorking: first_time_working
    }
    if (logo) {
      info.logo = logo
    }
    HTAPI.UserEditBasicInfo({ info }).then(response => {
    	ActionToast.show('修改成功')
    	// this._reloadItemList()
    })
  }

  renderSaveBtn() {
    return (
      <View
        style={styles.bottomContainer}
      >
        <GradientButton
          text="保存"
          containerStyle={styles.btnContainer}
          onPress={() => {
            this.saveInfo()
          }}
        />
      </View>
    )
  }

  render() {
    const { userInfo } = this.state
    const { navigation } = this.props
    const { genderActionVisible, datePickVisible, localDateOfBirth, userName, current_city,
      phoneNumber, education, first_time_working, first_time_working_pick, avatarModalVisible } = this.state
    console.log('userInfo: ', userInfo)
    if (userInfo == null) {
    	return null
    }
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
          {this.renderCell('姓名', userName, true, () => {
            navigation.push('UserInfoEdit', {
              title: '姓名', 
              value: userName, 
              inputCallback: (value) => {
                this.setState({ userName: value })
              }
            })
          })}
          {this.renderCell('出生日期', localDateOfBirth, true, () => {
            this.setState({ datePickVisible: true })
          })}
          {this.renderGender()}
          {this.renderCell('所在城市', current_city, true, () => {
            navigation.push('JobSelectCity', {
              mode: 1,
              selectJobCityCallback: (value) => {
                console.log('value: ', value)
                const showValue = value[2].name
                this.setState({
                  // 设置城市
                  current_city: showValue
                })
              },
              mode: 1
            })
          })}
          {this.renderCell('手机号码', phoneNumber, true, () => {
            navigation.push('UserInfoEdit', {
              title: '手机号码', 
              value: phoneNumber,
              inputCallback: (value) => {
                this.setState({ phoneNumber: value })
              }
            })
          })}
          {this.renderCell('您的学历', selectEducation(education), true, () => {
            this.setState({ genderActionVisible: true })
          })}
          {this.renderCell('首次参加工作时间', first_time_working, true, () => {
            this.setState({ first_time_working_pick: true })
          })}
        </ScrollView>
        {this.renderSaveBtn()}
        <ActionSheet
          visible={genderActionVisible}
          onDismiss={() => this.setState({ genderActionVisible: false })}
          actions={[
            { title: '无', onPress: () => this.setState({ education: 'LessThanPrime' }) },
            { title: '小学', onPress: () => this.setState({ education: 'Primary' }) },
            { title: '初中', onPress: () => this.setState({ education: 'Junior' }) },
            { title: '高中', onPress: () => this.setState({ education: 'High' }) },
            { title: '大专', onPress: () => this.setState({ education: 'JuniorCollege' }) },
            { title: '本科', onPress: () => this.setState({ education: 'RegularCollege' }) },
            { title: '研究生', onPress: () => this.setState({ education: 'Postgraduate' }) },
            { title: '博士', onPress: () => this.setState({ education: 'Doctor' }) }
          ]}
        />
        <DatePickerModal
          visible={datePickVisible}
          currentDate={new Date(Date.parse(localDateOfBirth))}
          leftPress={() => {
            this.setState({ datePickVisible: false })
          }}
          rightPress={(newDate) => {
            this.setState({
              // localDateOfBirth: `${newDate.getFullYear()}-${newDate.getMonth()}-${newDate.getDay()}`,
              localDateOfBirth: newDate.toISOString().split('T')[0],
              datePickVisible: false,
            })
          }}
        />
        <DatePickerModal
          visible={first_time_working_pick}
          currentDate={new Date(Date.parse(first_time_working))}
          leftPress={() => {
            this.setState({ first_time_working_pick: false })
          }}
          rightPress={(newDate) => {
            this.setState({
              first_time_working: newDate.toISOString().split('T')[0],
              first_time_working_pick: false,
            })
          }}
        />
      </View>
    )
  }
}

export default UserInfo