import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native'

const labels = ['创业公司', '少于50人', '计算机软件']

export default function CompanyInfo() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>公司信息</Text>
      <View style={styles.meta}>
        <Image source={require('./company_default.png')} style={styles.logo} />
        <Text style={styles.name}>深圳智慧网络有限公司</Text>
        <Image style={styles.authn} source={require('./authn.png')} />
        <Image style={styles.indicator} source={require('./indicator.png')} />
      </View>
      <View style={styles.labels}>
        {labels.map(label => (
          <Text key={label} style={styles.label}>
            {label}
          </Text>
        ))}
      </View>
      <View style={styles.map}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 11,
    marginBottom: 21,
    paddingHorizontal: 11,
    paddingBottom: 25,
  },
  title: {
    marginTop: 22,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  meta: {
    flexDirection: 'row',
    marginTop: 14,
    height: 50,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  name: {
    marginLeft: 18,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  authn: {
    marginLeft: 16,
    marginRight: 16,
  },
  indicator: {
    position: 'absolute',
    right: 0,
  },
  labels: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    color: '#666666',
    fontSize: 13,
    marginRight: 27,
    marginBottom: 16,
  },
  map: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    aspectRatio: 333 / 180,
    width: '100%',
  },
})
