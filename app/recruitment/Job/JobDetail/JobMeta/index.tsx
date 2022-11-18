import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { JobItem } from '../useJobDetail'
import moment from 'moment'

interface JobMetaProps {
  job: JobItem
}

export default function JobMeta({
  job: { title, salary, jobNature, headcount, experience, education, address, updated_at  },
}: JobMetaProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.salary}>{salary}</Text>
      </View>
      <View style={styles.conditionRow}>
        <Text style={styles.condition}>{jobNature}</Text>
        <Text style={styles.condition}>{headcount}</Text>
        <Text style={styles.condition}>{experience}</Text>
        <Text style={styles.condition}>{education}</Text>
      </View>
      <View style={styles.addressRow}>
        <Image style={styles.addressIcon} source={require('./dizhi.png')} />
        <Text style={styles.address}>{address}</Text>
      </View>
      <View style={styles.addressRow}>
      <Text style={styles.address}>最后更新时间: {moment(updated_at).format('YYYY-MM-DD HH:mm')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // height: 110,
    marginHorizontal: 11,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingVertical: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 18,
  },
  title: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 18,
  },
  salary: {
    color: '#57DE9E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  conditionRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  condition: {
    color: '#666666',
    fontSize: 13,
    marginRight: 22,
  },
  addressRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressIcon: {
    marginRight: 8,
  },
  address: {
  	flex: 1,
    color: '#333333',
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 18,
  },
})
