import React, { Component } from 'react'
import { Text, View, Image, ScrollView, ImageBackground, Platform, TextInput, DeviceEventEmitter, SectionList } from 'react-native'
import styles from './styles/JobfairSubmitSuccess.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import { bindActionCreators, Dispatch, AnyAction } from 'redux'
import NavBar, { EButtonType } from '../../components/NavBar'
// @ts-ignore
import GradientButton from '../../components/GradientButton'

type IProps = GenProps<'JobfairSubmitSuccess'> & {

}

interface IState {

}

export default class JobfairSubmitSuccess extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

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
        title="报名成功"
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


  renderTitle() {
    return (
      <View style={styles.titleView}>
        <Image
          style={styles.successIcon}
          source={require('../../../assets/requestJobs/jobfair-success.png')}
        />
        <Text style={styles.title}>报名成功</Text>
        <Text style={styles.detail}>请携带您的个人简历和绿码，准时到现场参加 招聘会。</Text>
      </View>
    )
  }

  renderFooterBtn() {
    const { navigation } = this.props
    return (
      <View style={styles.bottomContainer}>
        <GradientButton
          text="完成"
          containerStyle={styles.btnContainer}
          onPress={() => {
            navigation.popToTop()
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        <ScrollView>
          {this.renderTitle()}
          {this.renderFooterBtn()}
        </ScrollView>
      </View>
    )
  }
}