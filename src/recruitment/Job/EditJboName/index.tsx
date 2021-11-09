import React from 'react'
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import { TextInput } from 'react-native-gesture-handler'

export const EditJobNameOptions: StackNavigationOptions = {
  title: '职位名称',
}

export default function EditJobName() {
  const handleSubmit = () => {
    console.log('提交')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="请填写您要招聘的职位（最多30字）"
        placeholderTextColor="#CCCCCC"
        textAlignVertical="top"
        maxLength={30}
        autoFocus={true}
        multiline={true}
        enablesReturnKeyAutomatically={true}
        onSubmitEditing={handleSubmit}
        returnKeyLabel="发送"
        returnKeyType="done"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    margin: 16,
    padding: 0,
    lineHeight: 21,
  },
})
