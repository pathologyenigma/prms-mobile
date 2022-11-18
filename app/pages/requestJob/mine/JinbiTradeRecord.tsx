import React, { Component } from 'react'
import styles from './styles/JinbiTradeRecord.style'
import { GenProps } from '../../../utils/StackProps'
import NextPressable from '../../components/NextPressable'
import { Text, View, Image, StatusBar, SectionList, RefreshControl } from 'react-native'
import NavBar, { EButtonType } from '../../components/NavBar'
import SystemHelper from '../../../utils/system'
import CompanyCell from '../find/CompanyCell'
import ListEmptyComponent from '../../components/ListEmptyComponent'
import DatePickerModal from '../../components/DatePickerModal'

type IProps = GenProps<'JinbiTradeRecord'> & {

}

interface IState {
  incomeDataSource: any,
  companyDataSource: any,
  searchValue: string,
  selectTabs: number
  incomeRefreshState: boolean,
  datePickVisible: boolean,
  localDateOfBirth: string,
}

export default class JinbiTradeRecord extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      incomeRefreshState: true,
      searchValue: '',
      incomeDataSource: [],
      companyDataSource: [],
      selectTabs: 0,
      datePickVisible: false,
      localDateOfBirth: '',
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadJobListData() {

  }

  loadData() {
    setTimeout(() => {
      this.setState({
        incomeRefreshState: false,
        incomeDataSource: [{
          id: 1,
          month: '2019年05月',
          data: [{
            id: 1,
            type: 1,
            time: '05-24 21:10',
            name: '充值',
            money: 60,
            isZhuanru: true,
            title: '充值成功',
            payType: '支付宝充值',
            orderId: '78622378478234236',
          },
          {
            id: 2,
            type: 2,
            time: '05-23 20:10',
            name: '签到',
            money: 1,
            isZhuanru: true,
            title: '充值成功',
            payType: '个人签到'
          },
          {
            id: 3,
            type: 3,
            time: '05-20 11:10',
            name: '消费',
            money: 3,
            isZhuanru: false,
            title: '支付成功',
            commodity: '简历模板',
            shopName: '趁早找线上服务机构',
            payType: '金币',
            orderId: '598568478234236',
          },]
        }, {
          id: 2,
          month: '2019年04月',
          data: [{
            id: 1,
            type: 2,
            time: '04-24 21:10',
            name: '签到',
            money: 1,
            isZhuanru: true,
            title: '充值成功',
            payType: '个人签到'
          }]
        }, {
          id: 3,
          month: '2019年01月',
          data: [{
            id: 1,
            time: '01-14 21:10',
            name: '充值',
            type: 1,
            money: 5,
            isZhuanru: true,
            title: '充值成功',
            payType: '支付宝充值',
            orderId: '78622378478234236',
          }]
        }],
      })
    }, 1000);
  }

  renderSectionHeader(section: any) {
    const {
      id,
      title,
      company,
      welfare,
      industry,
      years,
      tag,
      score,
      onlineJobs,
      location,
      financing,
      staffAmount,
      feature,
      isOfficial,
      isBestEmployer,
    } = section
    const item = {
      id,
      title,
      company,
      welfare,
      industry,
      years,
      tag,
      score,
      onlineJobs,
      location,
      financing,
      staffAmount,
      feature,
      isOfficial,
      isBestEmployer,
    }
    return (
      <CompanyCell
        cellStyle={{
          marginTop: 0,
          borderRadius: 0,
          borderBottomWidth: 5,
          borderBottomColor: '#F7F7F7',
        }}
        cellItem={item}
      />
    )
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
        title="交易记录"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/calendar.png'),
          style: styles.riliBtnIcon,
          act: () => {
            this.setState({ datePickVisible: true })
          }
        }}
      />
    )
  }

  renderItemSeparatorComponent() {
    return (
      <View style={{
        marginLeft: 21,
        width: SystemHelper.width - 42,
        height: 10,
        backgroundColor: '#F0F0F0',
      }} />
    )
  }

  renderIncomeMonth(section: any) {
    console.log('section: ', section)
    return (
      <View style={styles.incomeMonthHeader}>
        <Text style={styles.incomeMonthHeaderText}>{section.month}</Text>
      </View>
    )
  }

  renderIncomeCell(item: any) {
    return (
      <NextPressable
        style={styles.incomeCell}
        onPress={() => {
          const { navigation } = this.props
          navigation.push('JinbiTradeRecordDetail', {
            recordeDetail: item
          })
        }}
      >
        <Image
          style={styles.hongbaoIcon}
          source={item.isZhuanru
            ? require('../../../assets/requestJobs/jinbi-zhuanru.png')
            : require('../../../assets/requestJobs/jinbi-zhuanchu.png')
          }
        />
        <View style={styles.cellValue}>
          <Text style={styles.cellName}>{item.name}</Text>
          <Text style={styles.cellDate}>{item.time}</Text>
        </View>
        <Text style={styles.cellMoney}>{`${item.isZhuanru ? '+' : '-'}${item.money}`}</Text>
        <Image
          style={styles.jinbiIcon}
          source={require('../../../assets/requestJobs/qiandao-jinbi.png')}
        />
      </NextPressable>
    )
  }

  loadMore() {
    // const { dataSource = [], more } = this.state
    // if (this.isRequesting || !more) {
    //   return
    // }
    // this.setState({ isRequest: true })
  }

  renderIncomeList() {
    const {
      incomeRefreshState,
      incomeDataSource,
    } = this.state
    return (
      <SectionList
        style={styles.listView}
        sections={incomeDataSource}
        ListEmptyComponent={
          incomeRefreshState ? (
            <ListEmptyComponent
              emptyText="暂无收益"
              emptyImage={require('../../../assets/requestJobs/no-collection.png')}
            />
          ) : null
        }
        stickySectionHeadersEnabled={false}
        onEndReached={() => this.loadMore()}
        onRefresh={() => this.loadData()}
        renderSectionHeader={({ section }) => this.renderIncomeMonth(section)}
        renderItem={({ item }: any) => this.renderIncomeCell(item)}
        keyExtractor={item => item.id.toString()}
      />
    )
  }

  render() {
    const { datePickVisible, localDateOfBirth } = this.state
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        {this.renderIncomeList()}
        <DatePickerModal
          visible={datePickVisible}
          currentDate={localDateOfBirth}
          leftPress={() => {
            this.setState({ datePickVisible: false })
          }}
          rightPress={(newDate) => {
            const newYears = newDate.getFullYear()
            const newMonth = newDate.getMonth() + 1 < 10 ? `0${newDate.getMonth() + 1}` : newDate.getMonth() + 1
            this.setState({
              localDateOfBirth: `${newYears}-${newMonth}-01T00:00:00.000Z`,
              datePickVisible: false,
            })
          }}
        />
      </View>
    )
  }
}