import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import TextButton from '../../components/TextButton'
import NavBar from '../../components/NavBar'
import { StackScreenProps } from '@react-navigation/stack'
import { HrParamList } from '../typings'
import RootLoading from '../../../utils/rootLoading'
import useEditProfile from '../HrProfile/useEditProfile'

export default function EditHrName({
  navigation,
  route,
}: StackScreenProps<HrParamList, 'EditHrName'>) {
  const { username } = route.params

  const editProfile = useEditProfile()

  return (
    <View style={styles.container}>
      <NavBar
        title="姓名"
        headerRight={() => (
          <TextButton
            title="保存"
            onPress={async () => {
              if (!username) {
                RootLoading.info('姓名不能为空')
                return
              }

              try {
                RootLoading.loading('请稍后...')
                await editProfile({
                  username: username,
                })
                RootLoading.info('姓名修改成功')
                navigation.navigate('HrProfile', { username })
              } catch (e) {
                RootLoading.info(e.message)
              }
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
