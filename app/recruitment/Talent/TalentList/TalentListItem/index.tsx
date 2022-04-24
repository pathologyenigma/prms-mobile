import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import Avatar from '../../components/Avatar'

export default function TalentListItem({
  name,
  online,
  onlineDesc,
  advantage,
  experience,
  education,
  salary,
  job,
  skills,
  gender,
  avatar,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.row, styles.nameRow]}>
          <Text style={styles.name}>{name}</Text>
          <View
            style={[
              styles.activeState,
              online ? undefined : styles.inactiveState,
            ]}
          />
          <Text
            style={[
              styles.activeTime,
              online ? undefined : styles.inactiveTime,
            ]}>
            {onlineDesc}
          </Text>
        </View>
        <View style={[styles.row, styles.experienceRow]}>
          <Text style={styles.experience}>{experience}</Text>
          <View style={styles.experienceDivider} />
          <Text style={styles.experience}>{education}</Text>
          <View style={styles.experienceDivider} />
          <Text style={styles.experience}>{salary}</Text>
        </View>
        <Text style={styles.expected}>{job}</Text>
        <View style={[styles.row, styles.jobRow]}>
          <Image style={styles.jobIcon} source={require('./zhiwei.png')} />
          <Text style={styles.jobName}>{skills}</Text>
        </View>
        <Text style={styles.advantage} ellipsizeMode="tail" numberOfLines={2}>
          {advantage}
        </Text>
      </View>
      <Avatar style={styles.avatar} gender={gender} uri={avatar} />
      <View style={styles.divider}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 185,
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    paddingLeft: 11,
  },
  name: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 22,
  },
  nameRow: {
    marginTop: 12,
  },
  activeState: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7BD69C',
    marginLeft: 13,
  },
  inactiveState: {
    backgroundColor: '#AAAAAA',
  },
  activeTime: {
    color: '#7BD69C',
    fontSize: 10,
    marginLeft: 5.5,
  },
  inactiveTime: {
    color: '#AAAAAA',
  },
  experienceRow: {
    marginTop: 9,
    alignItems: 'center',
  },
  experience: {
    color: '#333333',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '500',
  },
  experienceDivider: {
    backgroundColor: '#888888',
    width: 0.5,
    height: 9,
    marginHorizontal: 8,
  },
  expected: {
    backgroundColor: '#F3F3F3',
    height: 19,
    lineHeight: 19,
    borderRadius: 2,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    color: '#666666',
    paddingHorizontal: 8,
    marginTop: 10,
  },
  jobRow: {
    marginTop: 10,
  },
  jobName: {
    fontSize: 15,
    lineHeight: 21,
    color: '#333333',
    marginLeft: 11.5,
    fontWeight: '500',
  },
  jobIcon: {},
  advantage: {
    marginTop: 9,
    color: '#888888',
    fontSize: 14,
    lineHeight: 18,
    marginRight: 44,
  },
  avatar: {
    width: 48,
    height: 48,
    position: 'absolute',
    top: 21.5,
    right: 12.5,
  },
  divider: {
    height: 5,
    backgroundColor: '#F3F3F3',
  },
})
