import React, { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { UIActivityIndicator } from 'react-native-indicators'

interface LoadingAnErrorProps {
  style?: StyleProp<ViewStyle>
  loadingStyle?: StyleProp<ViewStyle>
  collapsable?: boolean
  loading: boolean
  error?: any
}

export default function LoadingAndError({
  style,
  loadingStyle,
  loading,
  error,
  collapsable,
  children,
}: PropsWithChildren<LoadingAnErrorProps>) {
  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: '#FFFFFF' },
          style,
          loadingStyle,
        ]}
        collapsable={collapsable}>
        <UIActivityIndicator color="#7DDBA3" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={[styles.container, style]} collapsable={collapsable}>
        <Text>{error.message}</Text>
      </View>
    )
  }

  return (
    <View style={[styles.container, style]} collapsable={collapsable}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
