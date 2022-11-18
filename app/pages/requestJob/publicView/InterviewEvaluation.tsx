import React, { Component } from 'react'
import { Text, View, ScrollView, StatusBar, RefreshControl, Image } from 'react-native'
import styles from './styles/InterviewEvaluation.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextPressable from '../../components/NextPressable'
import { Tabs } from '@ant-design/react-native'
import GradientButton from '../../components/GradientButton'
import CompanyJobCell from './CompanyJobCell'
import LinearGradient from 'react-native-linear-gradient'
import CompanyCommentCell from './CompanyCommentCell'

type IProps = GenProps<'InterviewEvaluation'> & {

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
        name: '莫春婷',
        job: 'UI设计师',
        tag: '面试官人很好 面试效率高 环境高大上',
        score: 4,
        content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
        time: '2021年12月24日',
        like: 10,
        isLike: false,
      },
      {
        id: 2,
        name: '莫春婷',
        job: 'UI设计师',
        tag: '面试官人很好 面试效率高 环境高大上',
        score: 4,
        content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
        time: '2021年12月24日',
        like: 10,
        isLike: false,
      },
      {
        id: 3,
        name: '莫春婷',
        job: 'UI设计师',
        tag: '面试官人很好 面试效率高 环境高大上',
        score: 4,
        content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
        time: '2021年12月24日',
        like: 10,
        isLike: false,
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
        name: '莫春婷',
        job: 'UI设计师',
        tag: '面试官人很好 面试效率高 环境高大上',
        score: 4,
        content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
        time: '2021年12月24日',
        like: 10,
        isLike: false,
      },
      {
        id: 3,
        name: '莫春婷',
        job: 'UI设计师',
        tag: '面试官人很好 面试效率高 环境高大上',
        score: 4,
        content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
        time: '2021年12月24日',
        like: 10,
        isLike: false,
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
        name: '莫春婷',
        job: 'UI设计师',
        tag: '面试官人很好 面试效率高 环境高大上',
        score: 4,
        content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
        time: '2021年12月24日',
        like: 10,
        isLike: false,
      },
      {
        id: 3,
        name: '莫春婷',
        job: 'UI设计师',
        tag: '面试官人很好 面试效率高 环境高大上',
        score: 4,
        content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
        time: '2021年12月24日',
        like: 10,
        isLike: false,
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
        name: '莫春婷',
        job: 'UI设计师',
        tag: '面试官人很好 面试效率高 环境高大上',
        score: 4,
        content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
        time: '2021年12月24日',
        like: 10,
        isLike: false,
      },
      {
        id: 3,
        name: '莫春婷',
        job: 'UI设计师',
        tag: '面试官人很好 面试效率高 环境高大上',
        score: 4,
        content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
        time: '2021年12月24日',
        like: 10,
        isLike: false,
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
        name: '莫春婷',
        job: 'UI设计师',
        tag: '面试官人很好 面试效率高 环境高大上',
        score: 4,
        content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
        time: '2021年12月24日',
        like: 10,
        isLike: false,
      },
      {
        id: 3,
        name: '莫春婷',
        job: 'UI设计师',
        tag: '面试官人很好 面试效率高 环境高大上',
        score: 4,
        content: '各位主管和hr在面试的时候很贴心很专业，面试效率也很高，岗位的工作和我未来预期一致，希望能成为一起共事的同事，共同学习共同努力。',
        time: '2021年12月24日',
        like: 10,
        isLike: false,
      }
    ]
  }
]

export default class InterviewEvaluation extends Component<IProps, IState> {
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
        title="面试评价"
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
            <CompanyCommentCell
              isWhiteMode={true}
              cellItem={item}
              likePress={() => {
                Toast.show('点赞了~')
              }}
            />
          )
        })}
        <Text style={styles.noMoreJobs}>没有更多评价啦</Text>
      </ScrollView>
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
              <NextPressable
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
              </NextPressable>
            )
          )
        })}
      </ScrollView>
    )
  }

  renderStar(star: number = 0) {
    let showStarArray = []
    for (let i = 0; i < 5; i++) {
      if (i < star) {
        showStarArray.push(require('../../../assets/requestJobs/star.png'))
      } else {
        showStarArray.push(require('../../../assets/requestJobs/star-gray.png'))
      }
    }
    return (
      <View style={styles.starView}>
        {showStarArray.map((value: string, index: number) => {
          return (
            <Image
              style={styles.starItem}
              key={index.toString()}
              source={value as ImageSourcePropType}
            />
          )
        })}
      </View>
    )
  }

  renderLinearGradient(text: string, progress: number) {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    const { progressWidth } = this.state
    if (progress < 0 || progress > 1) {
      return null
    }
    return (
      <View style={[styles.reviewerContainerRightItem,]}>
        <Text style={styles.scoreTitle}>{text}</Text>
        <View onLayout={(event: any) => {
          if (!progressWidth) {
            this.setState({ progressWidth: event.nativeEvent.layout.width })
          }
        }} style={[styles.linearView]}>
          {progressWidth && (
            <LinearGradient
              start={start}
              end={end}
              colors={['#FECB50', '#FFB932']}
              style={[styles.linearItem, { width: progressWidth * progress }]}
            />
          )}
        </View>
      </View>
    )
  }

  renderReviewerEvaluation() {
    const score = 4.4
    const star = 4
    return (
      <View style={styles.interviewView}>
        <View style={styles.reviewerContainer}>
          <View style={styles.reviewerContainerLeft}>
            <View style={styles.scoreView}>
              <Text style={styles.scoreText}>{score}</Text>
              <Text style={styles.scoreUnit}>分</Text>
            </View>
            {this.renderStar(star)}
          </View>
          <View style={styles.line} />
          <View style={styles.reviewerContainerRight}>
            {this.renderLinearGradient('职位描述：', 0.8)}
            {this.renderLinearGradient('公司情况：', 0.7)}
            {this.renderLinearGradient('面试官：', 0.88)}
          </View>
        </View>
      </View>
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
        onRefresh={() => this.loadData()}
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

  renderGrayView() {
    return (
      <View style={styles.grayView} />
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
        {this.renderReviewerEvaluation()}
        {this.renderGrayView()}
        {this.renderTab()}
      </View>
    )
  }
}