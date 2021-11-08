import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Step from './Step'

export default function HeadcountItem() {
  const [count, setCount] = useState(1)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>招聘人数</Text>
      <Step value={count} onValueChange={setCount} />
      <View style={styles.diviver} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    justifyContent: 'space-between',
  },
  title: {
    color: '#333333',
    fontSize: 16,
  },
  diviver: {
    backgroundColor: '#ECECEC',
    height: 0.5,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
})
