import React, { Component } from 'react'
import { Text, View, Image, StatusBar } from 'react-native'
import { Tabs } from '@ant-design/react-native'
import { GenProps } from '../../../navigator/requestJob/stack'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import styles from './styles/News.style'
import NavBar from '../../components/NavBar'
import NewsChat from './NewsChat'
import ChatCircle from './ChatCircle'

type TProps = GenProps<'News'>

interface IState {
  selectTabs: number,
}

export default class News extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    const { route } = this.props
    this.state = {
      selectTabs: 0,
    }
  }

  renderTabBar(tabProps: any) {
    const tabs = [{
      title: '聊天',
    }, {
      title: '圈子',
    }]
    return (
      <View style={styles.tabsView}>
        <View style={styles.tabLeft}>
          {
            tabs.map((e, i) => {
              return (
                <NextTouchableOpacity
                  style={styles.tabsBtn}
                  key={i.toString()}
                  onPress={() => {
                    this.setState({ selectTabs: i })
                  }}
                >
                  <Text style={[styles.tabsTitle, tabProps.activeTab === i && styles.selectedTitle]}>
                    {e.title}
                  </Text>
                </NextTouchableOpacity>
              )
            })
          }
        </View>
        <NextTouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            const { navigation } = this.props
            navigation.goBack()
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
        </NextTouchableOpacity>
      </View>
    )
  }

  renderNavBar() {
    return (
      <NavBar
        barStyle={{ elevation: 0, borderBottomWidth: 0, }}
        statusBarTheme="dark-content"
        title="消息"
      />
    )
  }

  render() {
    const { selectTabs } = this.state
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
          <NewsChat route={route} navigation={navigation} />
          <ChatCircle route={route} navigation={navigation} />
        </Tabs>
      </View>
    )
  }
}
