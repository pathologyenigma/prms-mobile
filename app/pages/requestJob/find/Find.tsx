import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar } from 'react-native'
import { Tabs } from '@ant-design/react-native'
import { GenProps } from '../../../utils/StackProps'
import NavBar from '../../components/NavBar'
import styles from './styles/Find.style'
import NextPressable from '../../components/NextPressable'
import LinearGradient from 'react-native-linear-gradient'
import FindCompany from './findCompany'
import Jobfair from './jobfair'

type TProps = GenProps<'Find'>

interface IState {
  selectTabs: number,
}

export default class Find extends Component<TProps, IState> {
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
        barStyle={{ elevation: 0, borderBottomWidth: 0 }}
        title="发现"
      />
    )
  }

  renderTabBar(tabProps: any) {
    const { selectTabs } = this.state
    const tabs = [{
      title: '找公司',
    }, {
      title: '招聘会',
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
                  <>
                    <Text style={[styles.tabsTitle, tabProps.activeTab === i && styles.selectedTitle]}>
                      {e.title}
                    </Text>
                    {tabProps.activeTab === i && (
                      <LinearGradient
                        start={start}
                        end={end}
                        colors={['#54D693', '#5AE5A8']}
                        style={styles.tabsLine}
                      />
                    )}
                  </>
                </NextPressable>
              )
            })
          }
        </View>
        {/* <NextPressable
        // v1版本适配
          style={styles.searchBtn}
          onPress={() => {
            const { navigation } = this.props
            navigation.push('FindSearch', {
              searchType: selectTabs
            })
          }}
        >
          <Image
            style={styles.searchImage}
            resizeMode="center"
            source={require('../../../assets/requestJobs/find-search.png')}
          />
        </NextPressable> */}
      </View>
    )
  }

  render() {
    const { selectTabs } = this.state
    const { navigation, route } = this.props
    return (
      <View style={{ flex: 1, paddingBottom: global.TAB_BAR_HEIGHT }}>
        {this.renderNavBar()}
        <View style={{ flex: 1 }} >
          <Tabs
            styles={{
              topTabBarSplitLine: {
                borderBottomWidth: 0,
              },
            }}
            tabs={[{ title: '找公司' }, { title: '招聘会' }]}
            page={selectTabs}
            swipeable={false}
            usePaged={false}
            renderTabBar={(tabProps) => this.renderTabBar(tabProps)}
            onChange={(tab, index) => {
              this.setState({ selectTabs: index })
            }}
          >
            <FindCompany route={route} navigation={navigation} />
            <Jobfair route={route} navigation={navigation} />
          </Tabs>
        </View>
      </View>
    )
  }
}
