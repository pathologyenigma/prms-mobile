import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import GradientButton from '../../../components/GradientButton'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import styles from './styles'

interface ICell {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  target?: any
  source?: ImageSourcePropType
  cellItem: any
  index: number
}

export default class CourseCell extends PureComponent<ICell> {
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

  renderDetail() {
    const { cellItem } = this.props
    return (
      <View style={styles.detailView}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleView}>
            <View style={styles.titleTagView}>
              <Text style={styles.titleTag}>
                {`  ${cellItem.tag}  `}
              </Text>
            </View>
            <Text style={styles.titleDetail}>
              {`   ${cellItem.name}`}
            </Text>
          </Text>
          <Text style={styles.platform}>{cellItem.platform}</Text>
        </View>
        <View style={styles.priceView}>
          <Text style={styles.priceText}>
            {Number(cellItem.price) === 0 ? '免费' : `¥${cellItem.price}`}
          </Text>
          <GradientButton
            containerStyle={styles.gradientButton}
            textStyle={styles.gradientText}
            text={cellItem.price === 0 ? '立即学习' : ' 立即报名'}
          />
        </View>
      </View>
    )
  }

  renderIcon(cellItem: any, index: number) {
    if (index === 0) {
      return (
        <Image
          style={styles.rankIcon}
          source={require('../../../../assets/requestJobs/learn-first.png')}
        />
      )
    }
    if (index === 1) {
      return (
        <Image
          style={styles.rankIcon}
          source={require('../../../../assets/requestJobs/learn-second.png')}
        />
      )
    }
    if (index === 2) {
      return (
        <Image
          style={styles.rankIcon}
          source={require('../../../../assets/requestJobs/learn-third.png')}
        />
      )
    }
    return (
      <View style={[styles.rankIcon, { backgroundColor: greenColor, }]} />
    )
  }

  renderRightView() {
    const { cellItem: { watchedAmount } } = this.props
    return (
      <View style={styles.watchedView}>
        <Text style={styles.watchedText}>
          {`${watchedAmount}人已观看`}
        </Text>
      </View>
    )
  }

  render() {
    const { onPress, cellItem, index } = this.props
    return (
      <NextTouchableOpacity
        style={styles.cell}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
      >
        {this.renderIcon(cellItem, index)}
        {this.renderDetail()}
        {this.renderRightView()}
      </NextTouchableOpacity>
    )
  }
}