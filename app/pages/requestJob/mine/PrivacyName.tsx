import React, { Component } from 'react'
import { Text, View, Image, ScrollView, } from 'react-native'
import styles from './styles/PrivacyName.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextPressable from '../../components/NextPressable'

type IProps = GenProps<'PrivacyName'> & {

}

interface IState {
  currentStatus: string
  nameList: any
}

export default class PrivacyName extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      currentStatus: '实名展示',
      nameList: [{
        id: 1,
        name: '李小冉',
        status: '实名展示',
      }, {
        id: 2,
        name: '李女士',
        status: '匿名展示',
      }]
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    const { currentStatus, nameList } = this.state
    setTimeout(() => {
      const nextNameList: any = []
      nameList.forEach((item: any) => {
        if (item.status === currentStatus) {
          nextNameList.push({
            ...item,
            selected: true
          })
        } else {
          nextNameList.push({
            ...item,
            selected: false
          })
        }
      })
      this.setState({ nameList: nextNameList })
    }, 300);
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 1,
          borderBottomColor: '#ececec',
          elevation: 0,
        }}
        title="姓名展示"
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  renderItem(nameList: any, item: any) {
    return (
      <NextPressable
        style={styles.cell}
        onPress={() => {
          // 此处应该做网络请求
          const nextNameList: any = []
          nameList.forEach((itemIndex: any) => {
            if (itemIndex.status === item.status) {
              nextNameList.push({
                ...itemIndex,
                selected: true
              })
            } else {
              nextNameList.push({
                ...itemIndex,
                selected: false
              })
            }
          })
          this.setState({ nameList: nextNameList })
        }}
      >
        <CacheImage
          style={styles.roleIcon}
          source={global.AVATAR_IMAGE()}
        />
        <Text style={styles.name}>{`${item.name}（${item.status}）`}</Text>
        {item.selected ? (
          <View style={styles.selectedView}>
            <View style={styles.selectedCircle} />
          </View>
        ) : (
          <View style={styles.unselectedView} />
        )}
      </NextPressable>
    )
  }

  render() {
    const { nameList, currentStatus } = this.state
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <Text style={styles.currentStatusText}>{`当前为${currentStatus}`}</Text>
        <ScrollView>
          {nameList.map((item: any, index: number) => {
            return (
              <View
                key={index.toString()}
              >
                {this.renderItem(nameList, item)}
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}