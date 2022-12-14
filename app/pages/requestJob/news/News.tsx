import React, { Component } from 'react'
import { Text, View, Image, StatusBar } from 'react-native'
import { Tabs } from '@ant-design/react-native'
import { GenProps } from '../../../utils/StackProps'
import NextPressable from '../../components/NextPressable'
import styles from './styles/News.style'
import NavBar from '../../components/NavBar'
import NewsChat from './NewsChat'
import ChatCircle from './ChatCircle'
import {
  requestNotifications,
  checkNotifications
} from 'react-native-permissions'
import HTAuthManager from '~/common/auth/common/model/HTAuthManager'

type TProps = GenProps<'News'>

interface IState {
  selectTabs: number,
  showNotificationTips: boolean
}

export default class News extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    const { route } = this.props
    this.state = {
      selectTabs: 0,
      showNotificationTips: false,
    }
  }

  componentDidAppear() {
  	StatusBar.setBarStyle('dark-content', true)
  }

  componentDidMount() {
    this.getNotificationPermission()
  }

  getNotificationPermission() {
    checkNotifications()
      .then(({ status, settings }) => {
        // …
        // 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';
        if (status !== 'granted') {
          // 已经被拒绝或不可达,尝试再次申请
          this.setState({ showNotificationTips: true })
          // requestNotifications(['alert', 'sound'])
          //   .then(({ status: nextStatus, settings: nextSetting }) => {
          //     // …
          //     console.log('requestNotifications: ', nextStatus, nextSetting)
          //   })
          //   .catch((error) => {
          //     console.log('request-error: ', error)
          //   })
        }
      })
      .catch((error) => {

      })
  }

  renderTabBar(tabProps: any) {
    const tabs = [{
      title: '聊天',
    },
      // {
      // v1版本适配
      // title: '圈子',
      // }
    ]
    return (
      <View style={styles.tabsView}>
        <View style={styles.tabLeft}>
          {
            tabs.map((e, i) => {
              return (
                <NextPressable
                  style={styles.tabsBtn}
                  key={i.toString()}
                  onPress={() => {
                    if (i === 1) {
                      global.TODO_TOAST()
                    } else {
                      this.setState({ selectTabs: i })
                    }
                  }}
                >
                  <Text style={[styles.tabsTitle, tabProps.activeTab === i && styles.selectedTitle]}>
                    {e.title}
                  </Text>
                </NextPressable>
              )
            })
          }
        </View>
        <NextPressable
          style={styles.searchBtn}
          onPress={() => {
          	global.TODO_TOAST()
            // const { navigation } = this.props
            // navigation.push('AllMessages')
          }}
        >
          <Image
            style={styles.tongzhiImage}
            resizeMode="center"
            source={require('../../../assets/requestJobs/tongzhi.png')}
          />
          <Image
            style={styles.tongzhiDot}
            resizeMode="center"
            source={require('../../../assets/requestJobs/tongzhi-dot.png')}
          />
        </NextPressable>
      </View>
    )
  }

  render() {
    const { selectTabs, showNotificationTips } = this.state
    const { navigation, route } = this.props
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        <Tabs
          styles={{
            topTabBarSplitLine: {
              borderBottomWidth: 0,
            },
          }}
          tabs={[{ title: '聊天' }, { title: '圈子' }]}
          page={selectTabs}
          swipeable={false}
          usePaged={false}
          renderTabBar={(tabProps) => this.renderTabBar(tabProps)}
          onChange={(tab, index) => {
            this.setState({ selectTabs: index })
          }}
        >
          <NewsChat route={route} showNotificationTips={showNotificationTips} navigation={navigation} />
          <ChatCircle route={route} showNotificationTips={showNotificationTips} navigation={navigation} />
        </Tabs>
      </View>
    )
  }
}
