import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from 'react-native'
import { StackNavigationOptions } from '@react-navigation/stack'
import TextButton from '../../components/TextButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const CompanyFullNameOptions: StackNavigationOptions = {
  title: '公司全称',
  headerRight: () => (
    <TextButton
      title="保存"
      style={styles.rightButton}
      textStyle={{ color: '#54D693' }}
    />
  ),
}

export default function CompanyFullName() {
  return (
    <KeyboardAwareScrollView
      automaticallyAdjustContentInsets={false}
      keyboardShouldPersistTaps="never"
      keyboardDismissMode={'on-drag'}
      enableResetScrollToCoords={false}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="请输入公司全称"
          placeholderTextColor="#CCCCCC"
          autoCapitalize="none"
        />
      </View>
      <Text style={styles.hint}>
        *公司全称必须与营业执照名称一致，否则审核将不予通过
      </Text>
      <Image style={styles.license} source={require('./license.png')} />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  rightButton: {
    marginRight: 11,
  },
  inputContainer: {
    height: 70,
    borderBottomColor: '#ECECEC',
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'flex-end',
    paddingHorizontal: 11,
  },
  input: {
    padding: 0,
    margin: 0,
    height: 42,
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  hint: {
    color: '#F36B6B',
    fontSize: 11,
    marginHorizontal: 11,
    marginTop: 11,
  },
  license: {
    marginTop: 24,
    marginHorizontal: 11,
    aspectRatio: 707 / 449.0,
  },
})
