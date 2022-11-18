import { format } from 'date-fns'
import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import NextPressable from '../../../components/NextPressable'
import styles from './styles'

interface ICell {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  target?: any
  source?: ImageSourcePropType
  cellItem: any
}

export default class JobfairCell extends PureComponent<ICell> {
  private press(onPress: any, delay = 300, e: object) {
    let { target = 'self' } = this.props
    if (target === 'self') {
      target = this
    } else {
      target = global
    }
    if (target.didPress) {
      return
    }
    target.didPress = true
    onPress(e)
    setTimeout(() => {
      target.didPress = false
    }, delay)
  }

  renderVideoTag() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.videoTagContainer}>
        <LinearGradient
          start={start}
          end={end}
          colors={['#FF5A00', '#FF8C05']}
          style={styles.videoTagView}
        >
          <Image
            style={styles.videoTable}
            source={require('../../../../assets/requestJobs/video-table.png')}
          />
          <Text style={styles.videoTagTitle}>
            直播
          </Text>
        </LinearGradient>
        <Text style={styles.videoAccount}>280人</Text>
      </View>
    )
  }

  renderOfflineView(cellItem: any) {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.offlineView}>
        <Text style={styles.organizersText}>{`主办方：${cellItem.co_organizer}`}</Text>
        <Text style={styles.organizersText}>{`承办方：${cellItem.contractor}`}</Text>
        <Text style={styles.offlineTime}>{`时间：${format(new Date(cellItem.updatedAt), 'yyyy-MM-dd HH:mm')}`}</Text>
        <View style={styles.locationView}>
          <Image style={styles.locationIcon} source={require('../../../../assets/requestJobs/location.png')} />
          <Text style={styles.locationText}>{`${cellItem.address_description[0] || ''} ${cellItem.address_description[1] || ''} ${cellItem.address_description[2] || ''}`}</Text>
        </View>
        <View style={styles.offlineProgressView}>
          <Text style={styles.offlineProgressText}>
            线下招聘
          </Text>
          <LinearGradient
            start={start}
            end={end}
            colors={['#81E3AE', '#54D693']}
            style={styles.offlineProgressDetail}
          >
            <Text style={styles.offlineProgressDetailT}>
              {cellItem.process}
            </Text>
          </LinearGradient>
        </View>
      </View>
    )
  }

  renderOnlineView(cellItem: any) {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View style={styles.offlineView}>
        <View style={{ flex: 1 }}>
          {cellItem.tag ? (
            <View style={{ flexDirection: 'row' }}>
              <LinearGradient
                start={start}
                end={end}
                colors={['#302A26', '#2C2621']}
                style={styles.onlineTag}
              >
                <Text style={styles.tag}>{cellItem.tag}</Text>
              </LinearGradient>
              <View style={{ flex: 1 }} />
            </View>
          ) : null}
          {cellItem.detail ? (
            <Text style={styles.summary}>{cellItem.detail}</Text>
          ) : null}
          {cellItem.liveTime ? (
            <View style={styles.liveTimeView}>
              <Image style={styles.liveTimeIcon} source={require('../../../../assets/requestJobs/alarm-clock.png')} />
              <Text style={styles.liveTimeText}>{cellItem.liveTime}</Text>
            </View>
          ) : null}
        </View>
        <View style={[styles.offlineProgressView, { marginTop: 0 }]}>
          <Text style={styles.offlineProgressText}>
            线上招聘
          </Text>
          <LinearGradient
            start={start}
            end={end}
            colors={['#81E3AE', '#54D693']}
            style={styles.offlineProgressDetail}
          >
            <Text style={styles.offlineProgressDetailT}>
              {cellItem.process}
            </Text>
          </LinearGradient>
        </View>
      </View>
    )
  }

  render() {
    const { onPress, cellItem } = this.props
    return (
      <NextPressable
        style={styles.cell}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
      >
        <View style={styles.videoBtn}>
          {(cellItem.type === '2' && cellItem.isOnline === '1') ? (
            this.renderVideoTag()
          ) : null}
        </View>
        <View style={styles.cellInfo}>
          <View style={styles.titleView}>
            <Image style={styles.zhaoIcon} source={require('../../../../assets/requestJobs/zhao.png')} />
            <Text style={styles.nameText}>{cellItem.name}</Text>
          </View>
          {cellItem.seekers === 0 ? ( // 缺失该字段
            // 线下招聘
            this.renderOfflineView(cellItem)
          ) : (
            // 线上招聘
            this.renderOnlineView(cellItem)
          )}
        </View>
      </NextPressable>
    )
  }
}