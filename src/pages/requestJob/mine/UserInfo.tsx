import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar } from 'react-native'
import styles from './styles/UserInfo.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import GradientButton from '../../components/GradientButton'

type IProps = GenProps<'UserInfo'> & {

}

interface IState {
  dataSource: any,
  selectGender: number | undefined
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

export default class UserInfo extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: listData,
      selectGender: undefined
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
    return (
      <View style={styles.iconView}>
        <Text style={styles.iconText}>头像</Text>
        <Image
          source={require('../../../assets/requestJobs/icon-example.png')}
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
          {this.renderCell('姓名', '李小冉', false)}
          {this.renderCell('出生日期', '1995.11', true)}
          {this.renderGender()}
          {this.renderCell('所在城市', '深圳', true)}
          {this.renderCell('手机号码', '13100000000', true)}
          {this.renderCell('您的学历', '本科', true)}
          {this.renderCell('首次参加工作时间', '2016.12', true)}
        </ScrollView>
        {this.renderSaveBtn()}
      </View>
    )
  }
}