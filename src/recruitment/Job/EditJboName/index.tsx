import React, { useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import NavBar from '../../components/NavBar'
import TextButton from '../../components/TextButton'
import { JobParamList } from '../typing'

type Props = StackScreenProps<JobParamList, 'EditJobName'>

export default function EditJobName({ navigation, route }: Props) {
  const { initialName } = route.params
  const [name, setName] = useState(initialName || '')

  return (
    <View style={styles.container}>
      <NavBar
        title="职位名称"
        headerRight={() => (
          <TextButton
            title="保存"
            onPress={() => navigation.navigate('PostJob', { jobName: name })}
          />
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="请填写您要招聘的职位（最多30字）"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#CCCCCC"
        maxLength={30}
        autoFocus={true}
        multiline={false}
        autoCapitalize="none"
        autoCompleteType="off"
        returnKeyType="done"
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
    height: 42,
    paddingVertical: 0,
    paddingHorizontal: 16,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})
