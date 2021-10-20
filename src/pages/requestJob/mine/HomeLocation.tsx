import React, { Component } from 'react'
import { Text, View, TextInput, Image } from 'react-native'
import styles from './styles/HomeLocation.style'
import { GenProps } from '../../../navigator/requestJob/stack'
import RootLoading from '../../../utils/rootLoading'
import NavBar, { EButtonType } from '../../components/NavBar'
import SystemHelper from '../../../utils/system'
import NextTouchableOpacity from '../../components/NextTouchableOpacity'

type IProps = GenProps<'HomeLocation'> & {

}

interface IState {
  location: string
}

export default class HomeLocation extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      location: ''
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
          borderBottomWidth: 1,
          borderBottomColor: '#F3F3F3',
          elevation: 0,
        }}
        title="家的位置"
        left={{
          style: { width: 17, height: 17, },
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/close-gray.png'),
          act: () => {
            navigation.pop()
          },
        }}
        right={{
          type: EButtonType.TEXT,
          value: '保存',
          style: styles.saveBtn,
          act: () => {

          }
        }}
      />
    )
  }

  renderEdit() {
    const { location } = this.state
    return (
      <View>
        <View style={styles.inputView}>
          <TextInput
            underlineColorAndroid="transparent"
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            style={styles.contentInput}
            placeholder="输入家的位置，用于推荐您家附近的职位"
            placeholderTextColor="#AAAAAA"
            value={location}
            maxLength={100}
            onChangeText={(value) => {
              this.setState({ location: value })
            }}
          />
        </View>
      </View>
    )
  }

  renderBtn() {
    const { navigation } = this.props
    return (
      <View style={styles.locationView}>
        <NextTouchableOpacity style={styles.locationItem}>
          <Image
            style={styles.currentIcon}
            source={require('../../../assets/requestJobs/location-current.png')}
          />
          <Text style={styles.locationText}>当前定位</Text>
        </NextTouchableOpacity>
        <View style={styles.line} />
        <NextTouchableOpacity
          style={styles.locationItem}
          onPress={() => {
            navigation.push('MapLocate')
          }}
        >
          <Image
            style={styles.mapIcon}
            source={require('../../../assets/requestJobs/location-map.png')}
          />
          <Text style={styles.locationText}>地图选址</Text>
        </NextTouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderEdit()}
        {this.renderBtn()}
      </View>
    )
  }
}