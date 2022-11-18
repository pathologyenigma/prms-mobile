import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar } from 'react-native'
import { Tabs } from '@ant-design/react-native'
import { GenProps } from '../../../utils/StackProps'
import NavBar from '../../components/NavBar'
import styles from './styles/Learn.style'
import NextPressable from '../../components/NextPressable'
import LinearGradient from 'react-native-linear-gradient'
import FindCourse from './findCourse'
import Jobfair from './jobfair'

type TProps = GenProps<'Learn'>

interface IState {
  selectTabs: number,
}

export default class Learn extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props)
    const { route } = this.props
    this.state = {
      selectTabs: 0,
    }
  }

  componentDidAppear() {
  	StatusBar.setBarStyle('dark-content', true)
  }

  componentDidMount() {
    
  }

  renderNavBar() {
    return (
      <NavBar
        barStyle={{ elevation: 0, borderBottomWidth: 0, }}
        statusBarTheme="dark-content"
        title="学习"
      />
    )
  }

  renderTabBar(tabProps: any) {
    const tabs = [{
      title: '找课',
    }, {
      title: '课程表',
    }]
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
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
                    this.setState({ selectTabs: i })
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
          }}
        >
          <Image
            style={styles.searchImage}
            resizeMode="center"
            source={require('../../../assets/requestJobs/find-search.png')}
          />
        </NextPressable>
      </View>
    )
  }

  render() {
    const { selectTabs } = this.state
    const { navigation, route } = this.props
    return (
      <View style={{ flex: 1 }}>
        {this.renderNavBar()}
        <View style={{ flex: 1 }} >
          <Tabs
            styles={{
              topTabBarSplitLine: {
                borderBottomWidth: 0,
              },
            }}
            tabs={[{ title: '找课' }, { title: '课程表' }]}
            page={selectTabs}
            swipeable={false}
            usePaged={false}
            renderTabBar={(tabProps) => this.renderTabBar(tabProps)}
            onChange={(tab, index) => {
              this.setState({ selectTabs: index })
            }}
          >
            <FindCourse route={route} navigation={navigation} />
            <FindCourse route={route} navigation={navigation} />
          </Tabs>
        </View>
      </View>
    )
  }
}
