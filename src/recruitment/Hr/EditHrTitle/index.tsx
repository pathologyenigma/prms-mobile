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
import TextButton from '../../components/TextButton'
import IconButton from '../../components/IconButton'
import NavBar from '../../components/NavBar'

export default function EditHrTitle() {
  return (
    <View style={styles.container}>
      <NavBar
        title="当前职位"
        headerLeft={() => <IconButton icon={require('./guanbi.png')} />}
        headerRight={() => (
          <TextButton title="保存" textStyle={styles.buttonTextStyle} />
        )}
      />
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
