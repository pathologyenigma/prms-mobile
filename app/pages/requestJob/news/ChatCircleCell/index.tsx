import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import NextPressable from '../../../components/NextPressable'
import styles from './styles'

interface ICell {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  target?: any
  source?: ImageSourcePropType
  cellItem: any
}

export default class ChatCircleCell extends PureComponent<ICell> {
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
        <View style={styles.icon} />
        <View style={styles.titleView}>
          <View style={styles.contactInfo}>
            <View style={styles.contactDetail}>
              <Text style={styles.nameText}>{cellItem.name}</Text>
              <Image
                style={styles.genderIcon}
                source={cellItem.gender === 0
                  ? require('../../../../assets/requestJobs/women-icon.png')
                  : require('../../../../assets/requestJobs/man-icon.png')
                }
              />
            </View>
          </View>
          <Text style={styles.companyText}>{`${cellItem.company}    ${cellItem.experienceYears}`}</Text>
          <Text
            style={styles.messageText}
          >{cellItem.message}
          </Text>
          <View style={styles.messagePic} />
          {cellItem.topic ? (
            <Text style={styles.findCircleTopic}>{cellItem.topic}</Text>
          ) : null}
          <View style={styles.shareView}>
            <Image
              source={require('../../../../assets/requestJobs/fenxiang.png')}
              style={styles.shareIcon}
            />
            <Text style={styles.shareText}>分享</Text>
            <Image
              source={require('../../../../assets/requestJobs/comment.png')}
              style={styles.commentIcon}
            />
            <Text style={styles.shareText}>{cellItem.comment}</Text>
            <Image
              source={require('../../../../assets/requestJobs/dianzan.png')}
              style={styles.dianzanIcon}
            />
            <Text style={styles.shareText}>{cellItem.dianzan}</Text>
          </View>
        </View>
      </NextPressable>
    )
  }
}