import React, { Component } from 'react'
import { Text, View, Image, ScrollView, StatusBar } from 'react-native'
import styles from './styles/ReportComplaints.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import NextPressable from '../../components/NextPressable'

type IProps = GenProps<'ReportComplaints'> & {

}

interface IState {
  dataSource: any,
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

export default class JobDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      dataSource: listData,
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
        title="举报投诉"
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

  renderList() {
    const { navigation } = this.props
    const { dataSource } = this.state
    return (
      <View style={[styles.listView]}>
        {dataSource.map((item: any, index: number) => {
          return (
            <NextPressable
              key={index.toString()}
              style={styles.cell}
              onPress={() => {
                navigation.push('ReportComplaintsDetail', {
                  type: item.title
                })
              }}
            >
              <View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <Image
                style={styles.nextIcon}
                source={require('../../../assets/requestJobs/next-gray.png')}
              />
            </NextPressable>
          )
        })}
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
          {this.renderList()}
        </ScrollView>
      </View>
    )
  }
}