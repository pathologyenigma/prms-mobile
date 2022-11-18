import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Avatar from '../components/Avatar'

interface ProfileProps {}

export default function Profile({ data }) {
  let work = data ? data?.Resumes[0]?.ResumeWorkExps[0] : {}
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{data?.real_name ?? data?.username}</Text>
      <Text style={styles.title}>{`${work?.pos_name}·${work?.comp_name}`}</Text>
      <Avatar
      	uri={data?.image_url}
        style={styles.avatar}
        genderStyle={styles.genderStyle}
        gender={ data?.gender ? 'male' : "female"}
      />
      <View style={styles.divider} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 97,
    justifyContent: 'center',
  },
  name: { marginLeft: 11, color: '#333333', fontSize: 20, fontWeight: 'bold' },
  title: { marginLeft: 11, color: '#333333', fontSize: 13, marginTop: 5 },
  avatar: {
    position: 'absolute',
    right: 11,
    bottom: 16,
    height: 65,
    width: 65,
  },
  genderStyle: {
    width: 18,
    height: 18,
  },
  divider: {
    backgroundColor: '#ECECEC',
    height: 0.5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
})
