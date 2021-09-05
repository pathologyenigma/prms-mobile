import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import styles from './styles'

interface ICell {
  likePress?: () => void
  cellStyle?: StyleProp<ViewStyle>
  cellItem: any
}

export default class CompanyQuestionCell extends PureComponent<ICell> {
  render() {
    const { cellItem, cellStyle } = this.props
    if (!cellItem) {
      return null
    }
    return (
      <NextTouchableOpacity
        style={[styles.cellView, cellStyle]}
        onPress={() => {
        }}
      >
        <View style={styles.cellTitleView}>
          <Image
            style={styles.iconImage}
            source={require('../../../../assets/requestJobs/company-question.png')}
          />
          <Text style={styles.cellTitle}>
            {cellItem.question}
          </Text>
        </View>
        <View style={styles.cellTitleView}>
          <Image
            style={styles.iconImage}
            source={require('../../../../assets/requestJobs/company-answer.png')}
          />
          <Text style={styles.cellAnswer}>
            {cellItem.answer}
          </Text>
        </View>
        <Text style={styles.info}>{`${cellItem.answerAmount}回答  ${cellItem.focus}关注`}</Text>
      </NextTouchableOpacity>
    )
  }
}