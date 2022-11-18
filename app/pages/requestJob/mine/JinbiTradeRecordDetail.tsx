import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/JinbiTradeRecordDetail.style'
import { GenProps } from '../../../utils/StackProps'
import { Text, View, Image, StatusBar } from 'react-native'

type IProps = GenProps<'JinbiTradeRecordDetail'> & {

}

interface IState {
  recordInfo: any
}

export default class JinbiTradeRecordDetail extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { navigation, route: { params } } = props
    if (!params || !params.recordeDetail) {
      Toast.show('未获取到交易详情信息,请刷新重试')
      navigation.goBack()
      return
    }
    this.state = {
      recordInfo: params.recordeDetail
    }
  }

  componentDidMount() {

  }

  loadJobListData() {

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
        title="交易详情"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }



  renderCell(title: string, detail: string) {
    return (
      <View style={styles.cellView}>
        <Text style={styles.cellName}>{title}</Text>
        <Text style={styles.cellValue}>{detail}</Text>
      </View>
    )
  }

  renderContent() {
    const { recordInfo } = this.state
    console.log('recordInfo; ', recordInfo)
    // type : 1 - 充值 ; 2 - 签到 ; 3 - 消费
    return (
      <View style={styles.content}>
        <Text style={styles.title}>{recordInfo.title}</Text>
        <View style={[styles.cellView, { marginVertical: 15 }]}>
          <Text style={styles.cellTitle}>金币</Text>
          <Text style={styles.cellMoney}>{`${recordInfo.isZhuanru ? '+' : '-'}${recordInfo.money}`}</Text>
          <Image
            style={styles.jinbiIcon}
            source={require('../../../assets/requestJobs/qiandao-jinbi.png')}
          />
        </View>
        {recordInfo.type === 1 && (
          <View>
            {this.renderCell('充值类型', recordInfo.payType)}
            {this.renderCell('交易时间', recordInfo.time)}
            {this.renderCell('交易订单', recordInfo.orderId)}
          </View>
        )}
        {recordInfo.type === 2 && (
          <View>
            {this.renderCell('交易类型', recordInfo.payType)}
            {this.renderCell('交易时间', recordInfo.time)}
          </View>
        )}
        {recordInfo.type === 3 && (
          <View>
            {this.renderCell('商品', recordInfo.commodity)}
            {this.renderCell('商家名称', recordInfo.shopName)}
            {this.renderCell('支付方式', recordInfo.payType)}
            {this.renderCell('交易时间', recordInfo.time)}
            {this.renderCell('交易订单', recordInfo.orderId)}
          </View>
        )}
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
        {this.renderContent()}
      </View>
    )
  }
}