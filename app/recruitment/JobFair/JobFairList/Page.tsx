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
import JobFairListItem from '../JobFairListItem'

interface PageProps {
  tab: string
}

const data = ['a', 'b', 'c']

export default function JobFairListPage({ tab }: PageProps) {
  const renderItem: ListRenderItem<string> = ({ index, item }) => {
    return <JobFairListItem />
  }

  return (
    <View style={StyleSheet.absoluteFillObject} collapsable={false}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.content}
        data={data}
        keyExtractor={item => item}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
})
