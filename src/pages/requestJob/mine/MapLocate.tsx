import React, { Component } from 'react'
import { View, Image, StatusBar } from 'react-native'
import styles from './styles/MapLocate.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import SystemHelper from '../../../utils/system'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'
import RootLoading from '../../../utils/rootLoading'

type IProps = GenProps<'MapLocate'> & {

}

interface IState {

}

export default class MapLocate extends Component<IProps, IState> {
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
          navigation.goBack()
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
        flex: 1,
        width: SystemHelper.width,
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
          text="使用该定位做为家的位置"
          onPress={() => {
            RootLoading.success()
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={[styles.container]}>
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