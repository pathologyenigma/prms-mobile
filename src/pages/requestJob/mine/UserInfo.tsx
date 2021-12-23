import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar } from 'react-native'
import styles from './styles/UserInfo.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import GradientButton from '../../components/GradientButton'
import { IStoreState } from '../../../reducer'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import { connect } from 'react-redux'
import { loginAction } from '../../../action'
import { reformEducation } from '../../../utils/utils'

type IProps = GenProps<'UserInfo'> &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

interface IState {
  dataSource: any,
  selectGender: number
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
    this.state = {
      dataSource: listData,
      selectGender: props.userInfo.gender ? 1 : 0
    }
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
    const { userInfo } = this.props
    return (
      <View style={styles.iconView}>
        <Text style={styles.iconText}>头像</Text>
        <Image
          source={userInfo.logo ? { uri: userInfo.logo } : require('../../../assets/requestJobs/icon-example.png')}
          style={styles.iconStyle}
        />
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

  renderGender() {
    const { selectGender } = this.state
    return (
      <View style={styles.genderView}>
        <Text style={styles.genderText}>性别</Text>
        <View style={styles.genderDetail}>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ selectGender: 0 })
            }}
            style={[
              styles.genderDetailBtn,
              selectGender === 0 && {
                backgroundColor: '#E9FFF0',
                borderColor: '#7AD398'
              }
            ]}
          >
            <Text style={[styles.genderDetailText,
            selectGender === 0 && {
              fontWeight: 'bold',
              color: '#7AD398'
            }
            ]}>男</Text>
          </NextTouchableOpacity>
          <NextTouchableOpacity
            onPress={() => {
              this.setState({ selectGender: 1 })
            }}
            style={[
              styles.genderDetailBtn,
              selectGender === 1 && {
                backgroundColor: '#E9FFF0',
                borderColor: '#7AD398'
              }
            ]}
          >
            <Text style={[styles.genderDetailText,
            selectGender === 1 && {
              fontWeight: 'bold',
              color: '#7AD398'
            }
            ]}>女</Text>
          </NextTouchableOpacity>
        </View>
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
    const { userInfo } = this.props
    console.log('userInfo: ', userInfo)
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
          {this.renderCell('姓名', userInfo.username, false)}
          {this.renderCell('出生日期', userInfo.birth_date, true)}
          {this.renderGender()}
          {this.renderCell('所在城市', userInfo.current_city, true)}
          {this.renderCell('手机号码', userInfo.phone_number, true)}
          {this.renderCell('您的学历', reformEducation(userInfo.education), true)}
          {this.renderCell('首次参加工作时间', userInfo.first_time_working, true)}
        </ScrollView>
        {this.renderSaveBtn()}
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
      setUserEditBasicInfo: loginAction.setUserEditBasicInfo
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)