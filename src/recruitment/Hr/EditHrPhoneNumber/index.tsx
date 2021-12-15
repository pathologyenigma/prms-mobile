import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import TextButton from '../../components/TextButton'
import NavBar from '../../components/NavBar'

export default function EditHrPhoneNumber() {
  return (
    <View style={styles.container}>
      <NavBar
        title="手机号码"
        headerRight={() => (
          <TextButton title="保存" textStyle={styles.buttonTextStyle} />
        )}
      />
      <TextInput
        style={styles.input}
        placeholderTextColor="#BBBBBB"
        placeholder="请填写联系人手机号码"
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
