import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import NextTouchableOpacity from '../NextTouchableOpacity'
import styles from './styles'

interface ICell {
  onPress?: () => void
  cellStyle?: StyleProp<ViewStyle>
  cellItem: any
}

export default class JobCell extends PureComponent<ICell> {
  render() {
    const { onPress, cellItem, cellStyle } = this.props
    if (!cellItem) {
      return null
    }
    return (
      <NextTouchableOpacity
        style={[styles.cellView, cellStyle]}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
      >
        <View style={styles.cellTitleView}>
          <Text style={styles.cellTitle}>
            {cellItem.name}
          </Text>
          <Text style={styles.cellSalary}>
            {cellItem.salary}
          </Text>
        </View>
        <View style={styles.cellCompanyView}>
          <Text style={styles.cellCompany}>
            {cellItem.company}
          </Text>
          <Text style={styles.cellCompany}>
            {cellItem.financing}
          </Text>
          <Text style={styles.cellCompany}>
            {cellItem.staffAmount}
          </Text>
        </View>
        <View style={styles.cellJobView}>
          <Text style={styles.cellExperience}>
            {cellItem.experience}
          </Text>
          <Text style={styles.cellExperience}>
            {cellItem.education}
          </Text>
          <Text style={styles.cellExperience}>
            {cellItem.location}
          </Text>
        </View>
        <View style={styles.interviewerView}>
          <View style={styles.interviewerIcon} />
          <Text style={styles.cellInterviewer}>
            {cellItem.interviewer}
          </Text>
        </View>
      </NextTouchableOpacity>
    )
  }
}