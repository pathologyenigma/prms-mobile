import { useFocusEffect, useNavigation } from '@react-navigation/core'
import React, { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'

function Me() {
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      console.log(`--- 我的`)
      navigation.setOptions({
        title: '我的',
      })
    }, [navigation]),
  )

  return (
    <View style={styles.container}>
      <Text style={styles.text}>我的</Text>
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

export default Me
