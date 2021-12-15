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
import GradientButton from '../../components/GradientButton'

export default function JobFairListItem() {
  return (
    <View style={styles.container}>
      <Image style={styles.poster} source={require('./assets/poster.png')} />
      <View style={styles.column}>
        <View style={styles.titleRow}>
          <Image
            style={styles.titleDecorator}
            source={require('./assets/zhao.png')}
          />
          <Text style={styles.title}>小鹅通专场招聘会</Text>
        </View>
        <Text style={styles.sponsor}>主办方：深圳小鹅通技术有限公司</Text>
        <Text style={styles.organizer}>
          承办方：深圳南荔工坊创意文化有限公司
        </Text>
        <Text style={styles.time}>时间：2021-6-18</Text>
        <View style={styles.positionRow}>
          <Image
            style={styles.positionDecorator}
            source={require('./assets/dizhi.png')}
          />
          <Text style={styles.position}>
            {'      '}
            深圳市南山区科技园中区麻雀岭工工业区M-10栋1号厂房东北角101F
          </Text>
        </View>
        <View style={styles.operations}>
          <Text style={styles.tag}>线下招聘</Text>
          <GradientButton
            colors={['#79D398', '#98E0B2']}
            style={styles.button}
            titleStyle={styles.buttonText}
            title="正在招聘"
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 16,
    paddingLeft: 11,
    paddingRight: 18,
  },
  column: {
    marginLeft: 12,
    flex: 1,
  },
  poster: {
    width: 140,
    aspectRatio: 140 / 190.0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleDecorator: {
    marginRight: 6,
  },
  title: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  sponsor: {
    lineHeight: 18,
    fontSize: 13,
    color: '#333333',
    marginTop: 6,
  },
  organizer: {
    lineHeight: 18,
    fontSize: 13,
    color: '#333333',
    marginTop: 6,
  },
  time: {
    color: '#666666',
    lineHeight: 18,
    fontSize: 12,
    marginTop: 6,
  },
  positionRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  positionDecorator: {
    position: 'absolute',
  },
  position: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 18,
  },
  operations: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  tag: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#7AD398',
    lineHeight: 16,
    width: 63,
    color: '#7AD398',
    fontSize: 11,
    textAlign: 'center',
  },
  button: {
    width: 80,
    height: 23,
  },
  buttonText: {
    fontSize: 13,
  },
})
