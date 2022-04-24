import React, { Component } from 'react'
import { View } from 'react-native'
import styles from './styles'
// @ts-ignore
import Video from 'react-native-video'
import { GenProps } from '../../../navigator/requestJob/stack'
import NavBar, { EButtonType } from '../../components/NavBar'

type IProps = GenProps<'VideoComponent'> & {

}

interface IVideoComponentState {
  videoUri: string
  palyStatus: boolean
}

export default class VideoComponent extends Component<IProps, IVideoComponentState> {
  private player: any
  constructor(props: IProps) {
    super(props)
    const { route: { params: { videoUri } } } = props
    this.state = {
      videoUri,
      palyStatus: true
    }
  }

  componentDidMount() {
    Hud.show()
  }

  componentWillUnmount() {
    this.setState({ palyStatus: false })
  }

  renderContent() {
    const { videoUri, palyStatus } = this.state
    return (
      <View style={[{
        flex: 1,
        justifyContent: 'center',
      }]}>
        <Video
          source={{ uri: encodeURI(videoUri) }}   // 可以是一个 URL 或者 本地文件 // 对空格进行转义,否则无法播放
          style={styles.videoView}
          resizeMode="contain"
          controls={true}
          autoPlay={false}
          paused={!palyStatus}
          onLoad={() => {
            setTimeout(() => {
              Hud.hidden()
            }, 100);
          }}
        />
      </View>
    )
  }

  renderNavBar() {
    const { navigation, route: { params } } = this.props
    
    return (
      <NavBar
        statusBarTheme="light-content"
        barStyle={{
          borderBottomWidth: 0,
          elevation: 0,
          backgroundColor: '#000000',
        }}
        title=""
        left={{
          style: styles.closeIcon,
          type: EButtonType.IMAGE,
          value: require('../../../assets/requestJobs/close-white.png'),
          act: () => {
            if (params.closeCallback) {
              params.closeCallback()
            }
            navigation.pop()
          },
        }}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavBar()}
        {this.renderContent()}
      </View>
    )
  }
}
