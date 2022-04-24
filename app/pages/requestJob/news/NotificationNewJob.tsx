import React, { Component } from 'react'
import { Text, View, ScrollView, StatusBar, RefreshControl, Image } from 'react-native'
import styles from './styles/NotificationNewJob.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { Tabs } from '@ant-design/react-native'
import GradientButton from '../../components/GradientButton'
// import CompanyJobCell from './CompanyJobCell'
import LinearGradient from 'react-native-linear-gradient'
// import CompanyCommentCell from './CompanyCommentCell'
import JobCell from '../../components/JobCell'

type IProps = GenProps<'NotificationNewJob'> & {

}

interface IState {
  dataSource: any,
  selectTabs: number,
  refreshing: boolean,
  progressWidth: undefined | number,
}

const typeScrollviewRef = React.createRef()

const listData = [
  {
    id: 1,
    title: '技术',
    list: [
      {
        id: 1,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '李女士·产品线HRBP'
      }, {
        id: 2,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
      }, {
        id: 3,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
      }
    ]
  }, {
    id: 2,
    title: '产品',
    list: [
      {
        id: 1,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '李女士·产品线HRBP'
      }, {
        id: 2,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
      }, {
        id: 3,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
      }
    ]
  }, {
    id: 3,
    title: '设计',
    list: [
      {
        id: 1,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '李女士·产品线HRBP'
      }, {
        id: 2,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
      }, {
        id: 3,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
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
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '李女士·产品线HRBP'
      }, {
        id: 2,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
      }, {
        id: 3,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
      }
    ]
  }, {
    id: 6,
    title: '职称',
    list: [
      {
        id: 1,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '李女士·产品线HRBP'
      }, {
        id: 2,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
      }, {
        id: 3,
        name: '项目经理',
        company: '深圳市酷魅科技有限公司',
        financing: '融资未公开',
        staffAmount: '1-49人',
        experience: '3-4年',
        education: '大专及以上',
        location: '深圳·宝安区',
        salary: '15K-30K',
        interviewer: '陈先生·技术总监'
      }
    ]
  }
]

export default class NotificationNewJob extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: [],
      selectTabs: 0,
      refreshing: true,
      progressWidth: undefined,
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
        title="新职位"
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
      <ScrollView style={styles.listScrollView} key={index.toString()}>
        {list.map((item: any, index: number) => {
          return (
            <JobCell
              key={item.id.toString()}
              cellItem={item}
              onPress={() => {
                navigation.push('JobDetail')
              }}
              showNewTag={true}
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