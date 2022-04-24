import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'

export default function CompanyQA() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.icon} source={require('./wen.png')} />
        <Text style={styles.wen}>你如何看待智慧网络的企业发展/前景？</Text>
      </View>
      <View style={styles.row}>
        <Image style={styles.icon} source={require('./da.png')} />
        <Text style={styles.da}>
          公司发展前景不错，会定期组织员工团建和培训。
        </Text>
      </View>
      <Text style={styles.count}>1回答</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 11,
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  icon: {
    marginRight: 8,
  },
  wen: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  da: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  count: {
    color: '#AAAAAA',
    fontSize: 10,
    marginTop: 7,
  },
})
