import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { greenColor } from '../../../../utils/constant'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import styles from './styles'

interface ICell {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  target?: any
  source?: ImageSourcePropType
  cellItem: any
}

export default class MessageCell extends PureComponent<ICell> {
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

  renderOfficialTag() {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <LinearGradient
        start={start}
        end={end}
        colors={['#63A6FB', '#2562FD']}
        style={styles.linear}
      >
        <Text style={styles.openText}>
          官方
        </Text>
      </LinearGradient>
    )
  }

  render() {
    const { onPress, cellItem } = this.props
    return (
      <NextTouchableOpacity
        style={styles.cell}
        activeOpacity={1}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
      >
        {cellItem.image ? (
          <Image
            source={typeof (cellItem.image) === 'string'
              ? { uri: cellItem.image }
              : cellItem.image
            }
            style={styles.icon}
          />
        ) : <View style={[styles.icon, { backgroundColor: greenColor, }]} />}
        <View style={styles.titleView}>
          <View style={styles.contactInfo}>
            <View style={styles.contactDetail}>
              <Text style={styles.nameText}>{cellItem.name}</Text>
              {cellItem.company === '官方' ? (
                this.renderOfficialTag()
              ) : (
                <Text style={styles.companyText}>{cellItem.company}</Text>
              )}
            </View>
            <Text style={styles.timeText}>{cellItem.time}</Text>
          </View>
          <Text
            style={styles.messageText}
            numberOfLines={1}
          >{cellItem.message}</Text>
        </View>
      </NextTouchableOpacity>
    )
  }
}