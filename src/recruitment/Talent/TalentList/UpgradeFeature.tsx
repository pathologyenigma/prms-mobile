import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import GradientButton from '../../components/GradientButton'

export default function UpgradeFeature() {
  return (
    <View style={styles.container}>
      <Text style={styles.slogan}>好人才聊出来！</Text>
      <Text style={styles.detail}>
        今日免费剩余<Text style={styles.count}>20</Text>次
      </Text>
      <GradientButton
        hitSlop={{ top: 8, bottom: 8, left: 0, right: 0 }}
        style={styles.button}
        textStyle={styles.buttonText}
        linearGradientStyle={styles.buttonLinearGradient}
        colors={['#FFEFC0', '#FFD56F']}
        text="升级"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 46,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  slogan: {
    flexGrow: 1,
    color: '#333333',
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 11,
  },
  detail: {
    color: '#333333',
    fontSize: 13,
  },
  count: {
    color: '#83E3AE',
    fontSize: 13,
    backgroundColor: '#E7FEF1',
    borderRadius: 2,
  },
  button: {
    height: 24,
    width: 45,
    marginLeft: 5,
    marginRight: 11,
  },
  buttonText: {
    color: '#E9AD1F',
    fontSize: 13,
    fontWeight: '500',
  },
  buttonLinearGradient: {
    borderRadius: 12,
  },
})
