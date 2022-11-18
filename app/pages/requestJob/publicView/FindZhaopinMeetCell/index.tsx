import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import NextPressable from '../../../components/NextPressable'

import styles from './styles'

interface ICell {
  onPress?: () => void
  cellStyle?: StyleProp<ViewStyle>
  cellItem: any
}

export default class FindZhaopinMeetCell extends PureComponent<ICell> {
  renderStatus() {
    const { cellItem } = this.props
    let statusColor = '#ffffff'
    let statusBgColor = '#ffffff'
    if (cellItem.status === '正在招聘') {
      statusColor = '#60E68E'
      statusBgColor = 'rgba(96,230,142,0.1)'
    } else if (cellItem.status === '即将开始') {
      statusColor = '#FFD956'
      statusBgColor = 'rgba(255,217,86,0.1)'
    } else if (cellItem.status === '未开始') {
      statusColor = '#FF5666'
      statusBgColor = 'rgba(255,86,102,0.1)'
    }
    return (
      <View style={styles.statusView}>
        {cellItem.isHot && (
          <Image
            style={styles.hotIcon}
            source={require('../../../../assets/requestJobs/zhaopinhui-hot.png')}
          />
        )}
        <Text style={[styles.statusTextColor,
        {
          color: statusColor,
          backgroundColor: statusBgColor,
        }
        ]}>
          {cellItem.status}
        </Text>
      </View>
    )
  }

  renderTag() {
    const { cellItem } = this.props
    if (!cellItem || !cellItem.tags) {
      return null
    }
    const tagsArray = cellItem.tags.split(',')
    return (
      <View style={styles.tagView}>
        {tagsArray.map((item: any, index: number) => {
          return (
            <Text
              style={styles.tagItemView}
              key={index.toString()}
            >
              {item}
            </Text>
          )
        })}
      </View>
    )
  }

  render() {
    const { onPress, cellItem, cellStyle } = this.props
    if (!cellItem) {
      return null
    }
    return (
      <NextPressable
        key={cellItem.id.toString()}
        style={[styles.cellView, cellStyle]}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
      >
        <View style={styles.cellTitleView}>
          <View style={styles.cellTitleTagView}>
            <Text style={styles.cellTitle}>
              {cellItem.name}
            </Text>
            {this.renderStatus()}
          </View>
        </View>
        {this.renderTag()}
        <View style={styles.cellCompanyView}>
          <Text style={styles.cellCompany}>
            {`${cellItem.companyAmount}个企业入驻招聘`}
          </Text>
          <Text style={styles.cellCompany}>
            在招职位
            <Text style={{ color: '#79D398' }}>
              {`${cellItem.jobAmount}`}
            </Text>
            个
          </Text>
        </View>
        <View style={styles.cellTimeView}>
          <Image
            style={styles.timeIcon}
            source={require('../../../../assets/requestJobs/jobFail-shijian.png')}
          />
          <Text style={styles.cellTime}>
            {cellItem.publishTime}
          </Text>
        </View>
        <View style={styles.cellLocationView}>
          <Image
            style={styles.locationIcon}
            source={require('../../../../assets/requestJobs/jobFail-dizhi.png')}
          />
          <Text style={styles.cellTime}>
            {cellItem.location}
          </Text>
        </View>
      </NextPressable>
    )
  }
}
