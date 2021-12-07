import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ListRenderItem,
} from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import InterviewAssessment from './InterviewAssessment'

interface GradingPageProps {
  tab: string
}

const data = ['1', '2', '3']

export default function GradingPage({}: GradingPageProps) {
  const renderItem: ListRenderItem<string> = ({ item, index }) => {
    return <InterviewAssessment />
  }

  return (
    <View style={StyleSheet.absoluteFillObject} collapsable={false}>
      <FlatList
        contentContainerStyle={styles.content}
        keyExtractor={item => item}
        data={data}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: isIphoneX() ? 44 : 20,
  },
})
