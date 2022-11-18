import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import TextButton from '../../components/TextButton'
import NavBar from '../../components/NavBar'
import { StackScreenProps } from '@react-navigation/stack'
import { HrParamList } from '../typings'

export default function EditHrName({
  navigation,
  route,
}: StackScreenProps<HrParamList, 'EditHrName'>) {
  const { username, callback } = route.params

  return (
    <View style={styles.container}>
      <NavBar
        title="姓名"
        headerRight={() => (
          <TextButton
            title="保存"
            onPress={async () => {
              if (!username) {
                Toast.show('姓名不能为空')
                return
              }

              HTAPI.UserEditBasicInfo({
              	info: { username }
              }).then(response => {
              	Toast.show('姓名修改成功')
              	navigation.pop()
              	callback(navigation, username)
              })             
            }}
          />
        )}
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={text =>
          navigation.setParams({
            username: text,
          })
        }
        placeholderTextColor="#BBBBBB"
        placeholder="请填写姓名"
        multiline={false}
        returnKeyType="done"
        returnKeyLabel="保存"
        autoCapitalize="none"
        autoCompleteType="off"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
