import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { JobItem } from '../useJobDetail'
interface JobIntroProps {
  job: JobItem
}

export default function JobIntro({
  job: { description, tags },
}: JobIntroProps) {
  const [truncated, setTruncated] = useState(description.length > 300)
  const renderDetail = () => {
    if (truncated) {
      return (
        <Text style={styles.detail}>
          {truncated ? description.substr(0, 300) : description}...
          <Text
            suppressHighlighting
            style={styles.more}
            onPress={() => setTruncated(false)}>
            查看全部
          </Text>
        </Text>
      )
    }
    return <Text style={styles.detail}>{description}</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>职位介绍</Text>
      <View style={styles.labels}>
        {tags.map(label => (
          <Text key={label} style={styles.label}>
            {label}
          </Text>
        ))}
      </View>
      {renderDetail()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 11,
    marginBottom: 12,
    paddingHorizontal: 11,
  },
  title: {
    marginTop: 18,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  labels: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    color: '#888888',
    fontSize: 11,
    lineHeight: 18,
    paddingHorizontal: 9,
    marginRight: 9,
    marginBottom: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
  },
  detail: {
    marginTop: 10,
    marginBottom: 24,
    color: '#333333',
    fontSize: 13,
    lineHeight: 18,
  },
  more: {
    color: '#57DE9E',
  },
})
