import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Msg() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>消息</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 36,
  },
})

export default Msg
