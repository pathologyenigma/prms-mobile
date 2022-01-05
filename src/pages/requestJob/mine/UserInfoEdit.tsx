import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  StatusBar,
  TextInput,
} from 'react-native'
import NavBar, { EButtonType } from '../../components/NavBar'
import { GenProps } from '../../../navigator/requestJob/stack'

type IProps = GenProps<'UserInfoEdit'>

interface IState {
  title: any,
  inputText: string
}

export default class UserInfoEdit extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params: { title } } } = props
    this.state = {
      title,
      inputText: '',
    }
  }

  render() {
    const { navigation } = this.props
    const { route: { params: { inputCallback } } } = this.props
    const { title, inputText } = this.state
    let showPlaceHolder = ''

    switch (title) {
      case '姓名':
        showPlaceHolder = '请填写姓名'
        break
      case '手机号码':
        showPlaceHolder = '请填写手机号码'
        break
      default:
        break
    }
    return (
      <View style={styles.container}>
        <NavBar
          title={title || '修改信息'}
          left={{
            type: EButtonType.IMAGE,
            value: require('../../../assets/requestJobs/close-gray.png'),
            style: { width: 18, height: 18 },
            act: () => {
              navigation.pop()
            },
          }}
          right={{
            type: EButtonType.TEXT,
            value: '保存',
            style: styles.buttonTextStyle,
            act: () => {
              if (inputCallback) {
                inputCallback(inputText)
              }
              navigation.pop()
            },
          }}
        />
        <TextInput
          value={inputText}
          style={styles.input}
          placeholderTextColor="#BBBBBB"
          placeholder={showPlaceHolder}
          keyboardType={title === '手机号码' ? 'phone-pad' : 'default'}
          multiline={false}
          returnKeyType="done"
          returnKeyLabel="保存"
          selectionColor="#57D693"
          onChangeText={(value) => {
            this.setState({ inputText: value })
          }}
        />
      </View>
    )
  }
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
