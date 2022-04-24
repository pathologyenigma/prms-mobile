import React from 'react'
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import GradientButton from '../../components/GradientButton'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { ScrollView } from 'react-native-gesture-handler'
import NavBar from '../../components/NavBar'

export default function RechargeExplain() {
  return (
    <View style={{ flex: 1 }}>
      <NavBar title="充值问题说明" />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>支付延迟问题</Text>
          <Text style={styles.content}>{content}</Text>
        </ScrollView>
        <GradientButton style={styles.button} title="我要反馈" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 13,
  },
  title: {
    color: '#333333',
    fontSize: 20,
    marginTop: 24,
    fontWeight: '500',
  },
  content: {
    marginTop: 24,
    color: '#333333',
    fontSize: 15,
    lineHeight: 21,
  },
  scrollView: {
    flex: 1,
  },
  button: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: getBottomSpace() + 10,
  },
})

const content = `1.由于网络原因可能导致金币延迟到账，滞后90分钟内属于正常现象，请耐心等候~

2.部分支付方式可能存在延迟生效情况，建议可关闭 趁早找 App并重新启动，耐心等待90分钟，如果超过90分钟仍未到账，请将以下截图提交至意见反馈

a.第三方支付平台(支付宝、微信等)充值账单截图(注意:截图需包含交易单号和交易时间哦)

b.苹果给出的收据截图; (可在 苹果收据邮件或在手 机[设置]→[iTunes store与App Store]→
[AppleID]→[查看AppleID] →[购买记录]中找到该笔订单，进入订单下方[账单总额]后进行截图)

工作人员会在收到反馈后的第一时间进行核实和补发哦,记得提供的截图一定要准确呢~`
