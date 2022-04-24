import React from 'react'
import { StyleSheet, View } from 'react-native'
import CancelableTag from '../../components/CancelableTag'

interface CancelableTagGroupProps {
  values?: string[]
  onValuesChange: (values: string[]) => void
}

export default function CancelableTagGroup({
  values = [],
  onValuesChange,
}: CancelableTagGroupProps) {
  return (
    <View style={styles.tags}>
      {values.map(value => (
        <CancelableTag
          style={styles.tag}
          textStyle={styles.tagText}
          iconStyle={styles.tagIcon}
          tag={value}
          key={value}
          onClose={() => onValuesChange(values.filter(v => v !== value))}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  tag: {
    marginRight: 9,
    marginBottom: 9,
    height: 30,
    paddingLeft: 12,
    paddingRight: 6,
  },
  tagText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  tagIcon: {
    marginLeft: 6,
  },
})
