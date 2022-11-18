import React, { Component } from 'react'
import { View, Image, StatusBar } from 'react-native'
import styles from './styles/MapNavigation.style'
import { GenProps } from '../../../utils/StackProps'
import SystemHelper from '../../../utils/system'
import { greenColor } from '../../../utils/constant'
import GradientButton from '../../components/GradientButton'
import NextPressable from '../../components/NextPressable'
import MapView, { LatLng, MoveEvent } from '~/common/location/MapView'

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
      <NextPressable
        style={styles.leftBtn}
        onPress={() => {
          navigation.pop()
        }}
      >
        <Image
          source={require('../../../assets/black_back.png')}
          style={styles.leftIcon}
        />
      </NextPressable>
    )
  }

  renderMap() {
  	let location = this.props.navigation.getParam('location')
  	let centerLatLng = location ? { latitude: location[1], longitude: location[0] } : null 
    return (
      <View style={styles.mapWrapper}>
	      <MapView
	        style={styles.map}
	        zoomLevel={15}
	        centerLatLng={centerLatLng}
	      />
	      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
	        <View style={styles.mapMarkerBox}>
	          <Image source={require('~/recruitment/Job/SearchJobAddress/images/marker.png')} />
	        </View>
	        <View style={styles.mapMarkerBox}></View>
	      </View>
	    </View>
    )
  }

  renderBottom() {
    return (
      <View
        style={styles.bottomContainer}
      >
        <GradientButton
          containerStyle={styles.btnContainer}
          onPress={global.TODO_TOAST}
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