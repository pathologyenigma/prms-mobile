import React, { Component } from 'react'
import { Text, View, ScrollView, StatusBar, RefreshControl } from 'react-native'
import styles from './styles/OnlineRequestJobs.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { Tabs } from '@ant-design/react-native'
import GradientButton from '../../components/GradientButton'
import CompanyJobCell from './CompanyJobCell'

type IProps = GenProps<'OnlineRequestJobs'> & {

}

interface IState {
  dataSource: any,
  selectTabs: number,
  refreshing: boolean
}

const typeScrollviewRef = React.createRef()

const listData = [
  {
    id: 1,
    title: '技术',
    list: [
      {
        id: 1,
        name: '运营视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      },
      {
        id: 2,
        name: '运营视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      },
      {
        id: 3,
        name: '运营视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      }
    ]
  }, {
    id: 2,
    title: '产品',
    list: [
      {
        id: 1,
        name: '运营产品视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      },
      {
        id: 2,
        name: '运营视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      },
      {
        id: 3,
        name: '运营视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      }
    ]
  }, {
    id: 3,
    title: '设计',
    list: [
      {
        id: 1,
        name: '运营产品视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      },
      {
        id: 2,
        name: '运营视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      },
      {
        id: 3,
        name: '运营视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      }
    ]
  }, {
    id: 4,
    title: '运营',
    list: []
  }, {
    id: 5,
    title: '市场',
    list: [
      {
        id: 1,
        name: '运营产品视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      },
      {
        id: 2,
        name: '运营视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      },
      {
        id: 3,
        name: '运营视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      }
    ]
  }, {
    id: 6,
    title: '职称',
    list: [
      {
        id: 1,
        name: '运营产品视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      },
      {
        id: 2,
        name: '运营视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      },
      {
        id: 3,
        name: '运营视觉设计师',
        location: '深圳·南山区',
        experience: '3-5 年',
        education: '大专及以上',
        publishTime: '2021-08-03',
        salary: '15K-30K'
      }
    ]
  }
]

export default class OnlineRequestJobs extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: [],
      selectTabs: 0,
      refreshing: true
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.setState({ refreshing: true }, () => {
      setTimeout(() => {
        this.setState({
          dataSource: listData,
          refreshing: false
        })
      }, 500);
    })
  }

  renderNavBar() {
    const { navigation, route } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title={(route.params && route.params.title) || '在招职位'}
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

  renderList(list: any, index: number) {
    const { navigation } = this.props
    return (
      <ScrollView key={index.toString()}>
        {list.map((item: any, index: number) => {
          return (
            <CompanyJobCell
              cellStyle={styles.cellStyle}
              key={index.toString()}
              cellItem={item}
              onPress={() => {
                navigation.push('JobDetail')
              }}
            />
          )
        })}
        <Text style={styles.noMoreJobs}>没有更多职位啦</Text>
      </ScrollView>
    )
  }

  renderRefresh() {
    const { refreshing } = this.state
    return (
      <RefreshControl
        refreshing={refreshing}
        onRefresh={() => this.loadData()
        }
      />
    )
  }

  changeOffSet(i: number) {
    if (i < 3) {
      return 0
    }
    return 67 * (i - 1) + 11
  }

  renderTabBar(tabProps: any) {
    const { dataSource } = this.state
    return (
      <ScrollView
        ref={typeScrollviewRef}
        contentContainerStyle={styles.tabScrollview}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {dataSource.map((e: any, i: number) => {
          return (
            tabProps.activeTab === i ? (
              <GradientButton
                containerStyle={styles.containerType}
                text={e.title}
              />
            ) : (
              <NextTouchableOpacity
                style={styles.jobTypeBtn}
                onPress={() => {
                  this.setState({ selectTabs: i }, () => {
                    if (typeScrollviewRef.current) {
                      typeScrollviewRef.current.scrollTo({ x: this.changeOffSet(i), y: 0 })
                    }
                  })
                }}
              >
                <Text>{e.title}</Text>
              </NextTouchableOpacity>
            )
          )
        })}
      </ScrollView>
    )
  }

  renderTab() {
    const { dataSource, selectTabs } = this.state
    // 暂时处理,是否根据后面接口
    const tabsArray: any = []
    dataSource.forEach((e: any) => {
      tabsArray.push({
        id: e.id,
        title: e.title
      })
    })
    return (
      <ScrollView
        refreshControl={this.renderRefresh()}
        contentContainerStyle={styles.scrollView}
      >
        <Tabs
          styles={{
            topTabBarSplitLine: {
              borderBottomWidth: 0,
            },
          }}
          tabs={dataSource}
          page={selectTabs}
          swipeable={false}
          usePaged={false}
          renderTabBar={(tabProps) => this.renderTabBar(tabProps)}
          onChange={(tab, index) => {
            this.setState({ selectTabs: index })
          }}
        >
          {
            dataSource.map((e: any, i: number) => {
              return (
                this.renderList(e.list, i)
              )
            })
          }
        </Tabs>
      </ScrollView>
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
        {this.renderTab()}
      </View>
    )
  }
}