import React, { useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { View, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import NavBar from '../../components/NavBar'
import TextButton from '../../components/TextButton'
import { JobParamList } from '../typings'

type Props = StackScreenProps<JobParamList, 'EditJobName'>

export default function EditJobName({ navigation, route }: Props) {
  const { initialName, callback } = route.params
  const [name, setName] = useState(initialName || '')

  return (
    <View style={styles.container}>
      <NavBar
        title="职位名称"
        headerRight={() => (
          <TextButton
            title="保存"
            onPress={() => {
            	callback(navigation, name)
            	navigation.pop()
            }}
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
        autoFocus={false}
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
    // height: 42,
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})
