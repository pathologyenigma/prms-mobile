import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import TextButton from '../../components/TextButton'
import JobInfoItem from '../PostJob/JobInfoItem'
import TextInputWithCounter from '../../components/TextInputWithCounter'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'

export const EditJobAddressOptions = ({}) => ({
  title: '上班地址',
  headerRight: () => <TextButton title="保存" style={styles.save} />,
})

export default function EditJobAddress() {
  const [text, setText] = useState<string>()

  const navigation = useNavigation<StackNavigationProp<any>>()

  return (
    <View style={styles.container}>
      <JobInfoItem
        title="上班地址（必填）"
        content="深圳市南山区创智云城（建设中）创智云城A218楼 302"
        onPress={() => navigation.navigate('SearchJobAddress')}
      />
      <Text style={styles.doors}>门牌号</Text>
      <TextInputWithCounter
        placeholder="例：C座12层2206室"
        maxLength={50}
        autoFocus={false}
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  save: {
    marginRight: 12,
  },
  doors: {
    color: '#666666',
    fontSize: 15,
    marginLeft: 11,
    marginTop: 25,
    marginBottom: 15,
  },
  input: {
    marginHorizontal: 11,
    height: 72,
  },
})
