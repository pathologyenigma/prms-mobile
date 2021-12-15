import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { reformComFinancing, reformCompanySize, reformEducation } from '../../../utils/utils'
import NextTouchableOpacity from '../NextTouchableOpacity'
import styles from './styles'

interface ICell {
  onPress?: () => void
  cellStyle?: StyleProp<ViewStyle>
  cellItem: any
  showNewTag?: boolean
  showCellTime?: boolean
  launchText?: string
}

export default class JobCellData extends PureComponent<ICell> {

  // 标签部分需要讨论是固定这些还是可以随意写
  renderLinerView(colorsType: number, text: string) {
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    // isUrgent     急聘
    let colors = ['#666666', '#666666']
    let textColor = '#666666'
    if (colorsType === 1) {
      // isUrgent     急聘
      colors = ['#ED635B', '#EB3524']
      textColor = '#EB3A2B'
    } else if (colorsType === 2) {
      // 全职
      colors = ['#72D9D6', '#69D3A3']
      textColor = '#6CD6B3'
    } else if (colorsType === 3) {
      // 热门
      colors = ['#F7CE64', '#F5B847']
      textColor = '#F6BE4E'
    } else if (colorsType === 4) {
      // 兼职
      colors = ['#4FADF5', '#2D71F2']
      textColor = '#3780F3'
    }
    return (
      <LinearGradient
        key={text.toString()}
        start={start}
        end={end}
        colors={colors}
        style={styles.linear}
      >
        <Text style={[styles.tagText, { color: textColor }]}>
          {text}
        </Text>
      </LinearGradient>
    )
  }

  renderTag() {
    // isUrgent     急聘
    // isPartimeJob    全职   /  兼职
    // isHotjob     热门
    // isStop       停止招聘
    // isStop ? 0 : 
    const { cellItem: {
      isUrgent,
      isHotjob,
      isStop,
      emergency,
      full_time_job,
    } } = this.props
    const basicView = []
    if (full_time_job === 'PartTime') {
      basicView.unshift(this.renderLinerView(4, '兼职'))
    } else if (full_time_job === 'InternShip') {
      basicView.unshift(this.renderLinerView(2, '实习'))
    }
    if (emergency) {
      basicView.unshift(this.renderLinerView(1, '急聘'))
    }
    // 热门字段没找到 -- 经沟通后 隐藏 热门 属性
    // if (isHotjob) {
    //   basicView.unshift(this.renderLinerView(3, '热门'))
    // }

    return (
      <View style={styles.tagView}>
        {basicView}
      </View>
    )
  }

  render() {
    const { onPress, cellItem, cellStyle, showNewTag, showCellTime, launchText } = this.props
    if (!cellItem) {
      return null
    }
    return (
      <NextTouchableOpacity
        key={cellItem.id.toString()}
        style={[styles.cellView, cellItem.isStop && { opacity: 0.5 }, cellStyle]}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
      >
        <View style={styles.cellTitleView}>
          <View style={styles.cellTitleTagView}>
            <Text style={styles.cellTitle}>
              {cellItem.title || cellItem.name}
            </Text>
            {this.renderTag()}
          </View>
          {cellItem.isStop ? (
            <Text style={styles.cellStop}>
              停止招聘
            </Text>
          ) : (
            <Text style={styles.cellSalary}>
              {`${cellItem.min_salary}-${cellItem.max_salary}`}
            </Text>
          )}
        </View>
        <View style={styles.cellCompanyView}>
          <Text style={styles.cellCompany}>
            {cellItem.comp_name}
          </Text>
          <Text style={styles.cellCompany}>
            {reformComFinancing(cellItem.comp_financing)}
          </Text>
          <Text style={styles.cellCompany}>
            {reformCompanySize(cellItem.comp_size)}
          </Text>
        </View>
        <View style={[styles.cellJobView, showCellTime && { borderBottomWidth: 0, paddingBottom: 0, }]}>
          <Text style={styles.cellExperience}>
            {`${cellItem.min_experience}年及以上`}
          </Text>
          {cellItem.min_education
            && cellItem.min_education !== 'Null'
            && (
              <Text style={styles.cellExperience}>
                {reformEducation(cellItem.min_education)}
              </Text>
            )
          }
          <Text style={styles.cellExperience}>
            {cellItem && cellItem.adress_coordinate && cellItem.adress_coordinate.substring(0, cellItem.adress_coordinate.length / 6)}
          </Text>
        </View>
        <View style={styles.interviewerView}>
          <View style={styles.interviewerIcon} />
          <Text style={styles.cellInterviewer}>
            {`${cellItem.hr_name}·${cellItem.hr_pos}`}
          </Text>
          {showNewTag && (
            <View style={styles.newTagView}>
              <Text style={styles.newTagText}>new</Text>
            </View>
          )}
        </View>
        {showCellTime && (
          <Text style={styles.timeViewText}>{`${cellItem.time}  ${launchText}`}</Text>
        )}
      </NextTouchableOpacity>
    )
  }
}