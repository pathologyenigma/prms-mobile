import React, { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { UIActivityIndicator } from 'react-native-indicators'
import SecondaryButton from '../SecondaryButton'

interface LoadingAnErrorProps {
  style?: StyleProp<ViewStyle>
  loadingStyle?: StyleProp<ViewStyle>
  collapsable?: boolean
  loading: boolean
  error?: Error
  refetch?: Function
}

export default function LoadingAndError({
  style,
  loadingStyle,
  loading,
  error,
  refetch,
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
      <View
        style={[styles.container, styles.error, style]}
        collapsable={collapsable}>
        <Text style={styles.message}>{error.message}</Text>
        <SecondaryButton
          style={styles.retry}
          title="点击重试"
          onPress={() => refetch?.()}
        />
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
  error: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  retry: {
    width: 120,
    marginTop: 12,
  },
  message: {},
})
