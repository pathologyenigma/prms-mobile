import { format } from 'date-fns'
import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import { reformEducation, reformSalary } from '../../../../utils/utils'
import NextPressable from '../../../components/NextPressable'
import styles from './styles'

interface ICell {
  onPress?: () => void
  cellStyle?: StyleProp<ViewStyle>
  cellItem: any
  onDeliveryStyle?: StyleProp<ViewStyle>
  onDeliveryPress?: () => void
}

export default class CompanyJobCell extends PureComponent<ICell> {
  render() {
    const { onPress, cellItem, cellStyle, onDeliveryPress, onDeliveryStyle } = this.props
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
          <Text style={styles.cellTitle}>
            {cellItem.title || cellItem.name}
          </Text>
          <Text style={styles.cellSalary}>
            {reformSalary(cellItem.salary)}
          </Text>
        </View>
        <View style={styles.cellJobView}>
        	{
        		cellItem.loc || cellItem.location && (
        			<Text style={styles.cellExperience}>
		            {cellItem.loc || cellItem.location}
		          </Text>
        		)
        	}
          <Text style={styles.cellExperience}>
            {`${cellItem.experience}年及以上`}
          </Text>
          <Text style={styles.cellExperience}>
            {reformEducation(cellItem.education)}
          </Text>
        </View>
        <Text style={styles.publishTime}>
          {`发布时间: ${cellItem.createdAt ? (
            format(Number(cellItem.createdAt), 'yyyy-MM-dd')
          ) : cellItem.publishTime}`}
        </Text>
        {onDeliveryPress && (
          <NextPressable
            style={[styles.onDelivery, onDeliveryStyle]}
            onPress={() => {
              onDeliveryPress()
            }}
          >
            <Text style={styles.onDeliveryText}>详情</Text>
          </NextPressable>
        )
        }
        {/* <View style={styles.interviewerView}>
          <View style={styles.interviewerIcon} />
          <Text style={styles.cellInterviewer}>
            {cellItem.interviewer}
          </Text>
        </View> */}
      </NextPressable>
    )
  }
}