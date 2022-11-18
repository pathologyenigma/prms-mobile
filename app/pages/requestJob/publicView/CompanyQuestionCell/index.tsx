import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import NextPressable from '../../../components/NextPressable'
import styles from './styles'

interface ICell {
  likePress?: () => void
  cellStyle?: StyleProp<ViewStyle>
  cellItem: any
  onPress?: () => void
  isWhiteMode?: boolean
}

export default class CompanyQuestionCell extends PureComponent<ICell> {
  render() {
    const { cellItem, cellStyle, onPress, isWhiteMode = false } = this.props
    if (!cellItem) {
      return null
    }
    return (
      <NextPressable
        style={[styles.cellView, cellStyle]}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
      >
        <View style={styles.cellTitleView}>
          <Image
            style={styles.iconImage}
            source={require('../../../../assets/requestJobs/company-question.png')}
          />
          <Text style={[styles.cellTitle, isWhiteMode && { color: '#333333' }]}>
            {cellItem.question}
          </Text>
        </View>
        <View style={styles.cellTitleView}>
          <Image
            style={styles.iconImage}
            source={require('../../../../assets/requestJobs/company-answer.png')}
          />
          <Text numberOfLines={3} style={[styles.cellAnswer, isWhiteMode && { color: '#666666' }]}>
            {cellItem.answer}
          </Text>
        </View>
        <Text style={[styles.info, isWhiteMode && { color: '#333333' }]}>{`${cellItem.answerCount}回答  ${cellItem.questionCount}关注`}</Text>
      </NextPressable>
    )
  }
}