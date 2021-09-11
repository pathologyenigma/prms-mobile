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
  selectGender: number | undefined
}

export default class EditOnlineResume extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      selectGender: undefined,
      expectJobs: [{
        id: 1,
        type: 'UI/界面设计',
        salary: '15-20K',
        location: '深圳',
        status: '在职找工作·随时入职'
      }]
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
      <View style={styles.cellView}>
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
          {this.renderRequestJobs()}
        </ScrollView>
        {this.renderSaveBtn()}
      </View>
    )
  }
}