import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import TextButton from '../../components/TextButton'
import NavBar from '../../components/NavBar'
import { StackScreenProps } from '@react-navigation/stack'
import { HrParamList } from '../typings'
import RootLoading from '../../../utils/rootLoading'
import useEditTitle from './useEditTitle'

export default function EditHrTitle({
  navigation,
  route,
}: StackScreenProps<HrParamList, 'EditHrTitle'>) {
  const { title } = route.params

  const editTitle = useEditTitle()

  return (
    <View style={styles.container}>
      <NavBar
        title="当前职位"
        headerRight={() => (
          <TextButton
            title="保存"
            onPress={async () => {
              if (!title) {
                RootLoading.info('职位名称不能为空')
                return
              }

              try {
                RootLoading.loading('请稍后...')
                await editTitle(title)
                RootLoading.info('职位修改成功')
                navigation.navigate('HrProfile', { title })
              } catch (e) {
                RootLoading.info(e.message)
              }
            }}
          />
        )}
      />
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={text =>
          navigation.setParams({
            title: text,
          })
        }
        placeholderTextColor="#BBBBBB"
        placeholder="请填写职位名称"
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
