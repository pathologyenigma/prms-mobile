import React, { Component } from 'react'
import { View, Image, StatusBar } from 'react-native'
import styles from './styles/MapNavigation.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import SystemHelper from '../../../utils/system'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

type IProps = GenProps<'MapNavigation'> & {

}

interface IState {

}

export default class MapNavigation extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {

    }
  }

  renderNavBar() {
    const { navigation } = this.props
    return (
      <NextTouchableOpacity
        style={styles.leftBtn}
        onPress={() => {
          navigation.pop()
        }}
      >
        <Image
          source={require('../../../assets/black_back.png')}
          style={styles.leftIcon}
        />
      </NextTouchableOpacity>
    )
  }

  renderMap() {
    return (
      <View style={{
        width: SystemHelper.width,
        height: SystemHelper.height - 54 - SystemHelper.safeBottom - SystemHelper.safeTop,
        backgroundColor: greenColor,
        marginTop: -SystemHelper.safeTop
      }} />
    )
  }

  renderBottom() {
    return (
      <View
        style={styles.bottomContainer}
      >
        <GradientButton
          containerStyle={styles.btnContainer}

          text="使用其他地图导航"
        />
      </View>
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
        {this.renderMap()}
        {this.renderBottom()}
      </View>
    )
  }
}