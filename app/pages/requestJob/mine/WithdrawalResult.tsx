import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles/WithdrawalResult.style'
import { GenProps } from '../../../utils/StackProps'
import NavBar, { EButtonType } from '../../components/NavBar'
import GradientButton from '../../components/GradientButton'

type IProps = GenProps<'WithdrawalResult'> & {

}

interface IState {

}

export default class WithdrawalResult extends Component<IProps, IState> {
  private getCodeTimeout: any
  constructor(props: IProps) {
    super(props)
    this.state = {

    }
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NavBar
        statusBarTheme="dark-content"
        barStyle={{
          borderBottomWidth: 1,
          borderBottomColor: '#ECECEC',
          elevation: 0,
        }}
        title="提现成功"
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/navbar-back.png'),
          act: () => {
            navigation.pop()
          },
        }}
      />
    )
  }

  renderContent() {
    return (
      <View style={styles.content}>
        <Image
          style={styles.successIcon}
          source={require('../../../assets/requestJobs/withdraw-succee.png')}
        />
        <Text style={styles.successTitle}>提现成功</Text>
        <Text style={styles.successDetail}>我们将在三个工作日内处理您的提现申请</Text>
      </View>
    )
  }

  renderSubmitBtn() {
    return (
      <GradientButton
        text="完成"
        containerStyle={styles.countTimeBtn}
        textStyle={styles.countTimeBtnTitle}
        onPress={() => {
          const { navigation } = this.props
          navigation.goBack()
        }}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderContent()}
        {this.renderSubmitBtn()}
      </View>
    )
  }
}