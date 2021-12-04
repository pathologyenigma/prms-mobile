import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
} from 'react-native'
import WebView from 'react-native-webview'

export default function DetailWebView() {
  return (
    <View style={StyleSheet.absoluteFillObject} collapsable={false}>
      <WebView
        scrollEnabled={Platform.OS === 'android'}
        originWhitelist={['*']}
        source={{ uri: 'https://www.todoit.tech' }}
        cacheEnabled={false}
        style={styles.webview}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
})
