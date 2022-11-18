import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import Avatar from '../../components/Avatar'
import { ContractItem } from '../useContractList'

interface ItemProps {
  item: ContractItem
  onPress?: () => void
}

export default function ContractListItem({ item, onPress }: ItemProps) {
  const {
    job,
    time,
    name,
    age,
    experience,
    education,
    avatar,
    gender,
    expectation,
  } = item
  const { city, salary, jobCategory } = expectation

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.jobContainer}>
          {/*<Text style={styles.job}>沟通职位：{job}</Text>*/}
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.meta}>{age}</Text>
          <View style={styles.divider} />
          <Text style={styles.meta}>{experience}</Text>
          <View style={styles.divider} />
          <Text style={styles.meta}>{education}</Text>
        </View>
        <Text style={styles.title}>期望</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.meta}>{city}</Text>
          <View style={styles.divider} />
          <Text style={styles.meta}>{jobCategory}</Text>
          <View style={styles.divider} />
          <Text style={styles.meta}>{salary}</Text>
        </View>
        <Avatar style={styles.avatar} gender={gender} uri={avatar} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 136,
    flex: 1,
    paddingHorizontal: 11,
    justifyContent: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    position: 'absolute',
    top: 38,
    right: 11,
  },
  jobContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  job: {
    color: '#888888',
    fontSize: 12,
  },
  time: {
    color: '#888888',
    fontSize: 12,
  },
  name: {
    marginTop: 8,
    color: '#333333',
    fontSize: 13,
    fontWeight: 'bold',
  },
  metaContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  meta: {
    color: '#666666',
    fontSize: 12,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    height: 9,
    backgroundColor: '#666666',
    marginHorizontal: 8,
  },
  title: {
    marginTop: 8,
    color: '#333333',
    fontSize: 13,
    fontWeight: 'bold',
  },
  experience: {
    marginTop: 6,
    color: '#888888',
    fontSize: 12,
  },
})
