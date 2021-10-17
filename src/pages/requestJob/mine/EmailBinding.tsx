import React, { Component } from 'react'
import NavBar, { EButtonType } from '../../components/NavBar'
import styles from './styles/EmailBinding.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import { Text, View, Image, StatusBar, TextInput } from 'react-native'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import { ScrollView } from 'react-native-gesture-handler'
import AlertContentModal from '../../components/AlertContentModal'

type IProps = GenProps<'EmailBinding'> & {

}

interface IState {
  bindedEmail: string,
  email: string,
  cancelBindVisible: boolean
}

export default class EmailBinding extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    const { route: { params } } = props
    this.state = {
      bindedEmail: params.email || '',
      email: '',
      cancelBindVisible: false
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
        title="邮箱绑定"
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

  renderInput() {
    const { email, bindedEmail } = this.state
    return (
      <View style={styles.inputContainer}>
        <TextInput
          underlineColorAndroid="transparent"
          returnKeyType="done"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.accountLoginInput}
          placeholder="请输入邮箱"
          value={bindedEmail || email}
          editable={!bindedEmail}
          onChangeText={(value) => {
            this.setState({ email: value })
          }}
        />
      </View>
    )
  }

  renderBtn() {
    const { bindedEmail, email } = this.state
    const { navigation } = this.props
    return (
      <NextTouchableOpacity
        style={[styles.submitBtn, !bindedEmail && !email && { opacity: 0.6, }]}
        disabled={!bindedEmail && !email}
        onPress={() => {
          if (bindedEmail) {
            this.setState({ cancelBindVisible: true })
          } else {
            RootLoading.info('绑定邮箱')
          }
        }}
      >
        <Text style={styles.selectText}>
          {bindedEmail ? '解除绑定' : '绑定'}
        </Text>
      </NextTouchableOpacity>
    )
  }

  render() {
    const { cancelBindVisible } = this.state
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
          {this.renderInput()}
          {this.renderBtn()}
        </ScrollView>
        <AlertContentModal
          visible={cancelBindVisible}
          title="友情提示"
          detail="解除邮箱绑定后，将无法接收公司面试邀请通知，确定要解除吗？"
          leftBtn={{
            title: '取消',
            act: () => this.setState({
              cancelBindVisible: false,
            }),
          }}
          rightBtn={{
            title: '确定',
            act: () => {
              this.setState({
                cancelBindVisible: false
              }, () => {
                RootLoading.info('解除绑定')
              })
            },
          }}
        />
      </View>
    )
  }
}