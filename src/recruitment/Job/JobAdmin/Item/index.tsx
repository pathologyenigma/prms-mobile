import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'

export interface ItemProps {
  title: string
  tags: { text: string; color: string }[]
  labels: string[]
  status: string
}

export default function Item({ title, tags, labels, status }: ItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        {tags.map(({ text, color }) => (
          <Text style={[styles.tag, { color: color, borderColor: color }]}>
            {text}
          </Text>
        ))}
        <Text style={styles.status}>{status}</Text>
      </View>
      <View style={styles.labelRow}>
        {labels.map(label => (
          <Text style={styles.label}>{label}</Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    justifyContent: 'center',
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleRow: {
    flexDirection: 'row',
    marginHorizontal: 11,
    alignItems: 'center',
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 14,
  },
  tag: {
    marginRight: 9,
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    lineHeight: 17,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#666666',
    overflow: 'hidden',
  },
  status: {
    position: 'absolute',
    right: 0,
    color: '#888888',
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelRow: {
    flexDirection: 'row',
    marginHorizontal: 11,
    marginTop: 14,
  },
  label: {
    marginRight: 8,
    lineHeight: 18,
    borderRadius: 3,
    color: '#888888',
    fontSize: 11,
    paddingHorizontal: 7,
    backgroundColor: '#F0F0F0',
    overflow: 'hidden',
  },
})
