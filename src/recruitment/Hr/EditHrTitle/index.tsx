import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import TextButton from '../../components/TextButton'
import IconButton from '../../components/IconButton'

export const EditHrTitleOptions: StackNavigationOptions = {
  title: '当前职位',
  headerRight: () => (
    <TextButton
      title="保存"
      style={styles.button}
      textStyle={styles.buttonTextStyle}
    />
  ),
  headerLeft: () => <IconButton icon={require('./guanbi.png')} />,
}

export default function EditHrTitle() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#BBBBBB"
        placeholder="请填写职位名称"
        multiline={false}
        returnKeyType="done"
        returnKeyLabel="保存"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginRight: 11,
  },
  buttonTextStyle: {
    color: '#7AD398',
    fontSize: 15,
  },
  input: {
    marginTop: 16,
    height: 48,
    padding: 0,
    marginHorizontal: 11,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
    borderBottomColor: '#ECECEC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})
