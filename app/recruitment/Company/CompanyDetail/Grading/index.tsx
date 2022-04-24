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
import LinearGradient from 'react-native-linear-gradient'

interface GradingProps {
  label: string
  limit?: number
  score: number
}

export default function Grading({ label, limit = 10, score }: GradingProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.gradingContainer} collapsable={false}>
        <View style={[styles.grading, { width: `${(score * 100) / limit}%` }]}>
          <LinearGradient
            style={{ flex: 1, height: '100%', borderRadius: 3 }}
            colors={['#FFB932', '#FECB50']}
            locations={[0, 1.0]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  label: {
    width: 70,
    color: '#DDDDDD',
    fontSize: 13,
    fontWeight: 'bold',
  },
  gradingContainer: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DDDDDD',
  },
  grading: {
    height: 6,
  },
})
