import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

interface TabProps {
  count: number
  category: string
  onPress?: () => void
}

export default function Tab({ count, category, onPress }: TabProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  count: {
    color: '#FDFDFD',
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    color: '#FDFDFD',
    fontSize: 12,
    marginTop: 8,
  },
})
