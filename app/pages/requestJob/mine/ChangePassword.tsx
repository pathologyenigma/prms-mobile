import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/ChangePassword.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { Text, View, StatusBar, TextInput } from 'react-native'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { ScrollView } from 'react-native-gesture-handler'

type IProps = GenProps<'ChangePassword'> & {

}

interface IState {
  oldPassword: string
  newPassword: string,
  confirmPassword: string,
}

export default class ChangePassword extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {

  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
        }}
        title="修改密码"
        left={{
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  renderOldPassword() {
    const { oldPassword } = this.state
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.cellTitle}>旧密码</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="ascii-capable"
          style={styles.accountLoginInput}
          placeholder="请输入当前密码"
          value={oldPassword}
          onChangeText={(value) => {
            this.setState({ oldPassword: value })
          }}
        />
      </View>
    )
  }

  renderNewPassword() {
    const { newPassword } = this.state
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.cellTitle}>新密码</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="ascii-capable"
          style={styles.accountLoginInput}
          placeholder="请输入新密码"
          value={newPassword}
          onChangeText={(value) => {
            this.setState({ newPassword: value })
          }}
        />
      </View>
    )
  }

  renderConfirmPassword() {
    const { confirmPassword } = this.state
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.cellTitle}>新密码</Text>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="ascii-capable"
          style={styles.accountLoginInput}
          placeholder="请再次输入新密码"
          value={confirmPassword}
          onChangeText={(value) => {
            this.setState({ confirmPassword: value })
          }}
        />
      </View>
    )
  }

  renderBtn() {
    const { oldPassword, newPassword, confirmPassword } = this.state
    const { navigation } = this.props
    const btnAbled = oldPassword && newPassword && confirmPassword
    return (
      <NextTouchableOpacity
        style={[styles.submitBtn, !btnAbled && { opacity: 0.6, }]}
        disabled={!btnAbled}
        onPress={() => {
          Toast.show('修改密码')
        }}
      >
        <Text style={styles.selectText}>
          完成
        </Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          animated
          barStyle={'dark-content'}
        />
        {this.renderNavBar()}
        <ScrollView>
          {this.renderOldPassword()}
          {this.renderNewPassword()}
          {this.renderConfirmPassword()}
          {this.renderBtn()}
        </ScrollView>
      </View>
    )
  }
}