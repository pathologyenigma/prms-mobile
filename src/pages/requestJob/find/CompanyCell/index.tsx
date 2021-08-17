import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient'

interface ICell {
  onPress?: () => void
  cellStyle?: StyleProp<ViewStyle>
  target?: any
  source?: ImageSourcePropType
  cellItem: any
}

export default class CompanyCell extends PureComponent<ICell> {
  renderBasicInfo() {
    const { cellItem } = this.props
    return (
      <Text numberOfLines={0} style={styles.basicInfoView}>
        {cellItem.location ? (
          <View style={[styles.basicItem, { paddingLeft: 0 }]}>
            <Text style={styles.basicText}>{cellItem.location}</Text>
          </View>
        ) : null}
        {cellItem.financing ? (
          <View style={styles.basicItem}>
            <Text style={styles.basicText}>{cellItem.financing}</Text>
          </View>
        ) : null}
        {cellItem.staffAmount ? (
          <View style={[styles.basicItem, { flexDirection: 'row' }]}>
            <Text style={styles.basicText}>{cellItem.staffAmount}</Text>
          </View>
        ) : null}
        {cellItem.feature ? (
          <>
            <View style={{ width: 7, height: 1, }} />
            <View style={[styles.basicItem, { borderRightWidth: 0, paddingLeft: 0 }]}>
              <Text style={styles.basicText}>{cellItem.feature}</Text>
            </View>
          </>
        ) : null}
      </Text>
    )
  }

  renderDetail() {
    const { cellItem } = this.props
    const start = { x: 0, y: 0.5 }
    const end = { x: 1, y: 0.5 }
    return (
      <View>
        <View style={styles.titleView}>
          <Text style={styles.company}>
            {cellItem.company}
          </Text>
          {cellItem.isOfficial ? (
            <LinearGradient
              start={start}
              end={end}
              colors={['#63A6FB', '#2562FD']}
              style={styles.linear}
            >
              <Text style={styles.text}>
                官方
              </Text>
            </LinearGradient>
          ) : null}
          {cellItem.isBestEmployer ? (<Text style={styles.isBestEmployer}>最佳雇主</Text>) : null}
        </View>
        <View style={styles.companyTagView}>
          {cellItem.welfare ? (<Text style={styles.companyTag}>{cellItem.welfare}</Text>) : null}
          {cellItem.industry ? (<Text style={styles.companyTag}>{cellItem.industry}</Text>) : null}
          {cellItem.years ? (<Text style={styles.companyTag}>{cellItem.years}</Text>) : null}
          {cellItem.tag ? (<Text style={styles.companyTag}>{cellItem.tag}</Text>) : null}
        </View>
        {this.renderScore()}
        {this.renderBasicInfo()}
      </View >
    )
  }

  renderScore() {
    const { cellItem } = this.props
    let scoreView = []
    for (let i = 0; i < 5; i++) {
      if (i < Number(cellItem.score)) {
        scoreView.push((
          <Image key={i.toString()} style={styles.star} source={require('../../../../assets/requestJobs/star.png')} resizeMode="center" />
        ))
      } else {
        scoreView.push((
          <Image key={i.toString()} style={styles.star} source={require('../../../../assets/requestJobs/star-gray.png')} resizeMode="center" />
        ))
      }
    }
    return (
      <View style={styles.starView}>
        <Text style={styles.starText}>面试评分: </Text>
        {scoreView}
        <Text style={styles.onlineJobs}>{cellItem.onlineJobs}</Text>
      </View>
    )
  }

  render() {
    const { onPress, cellStyle } = this.props
    return (
      <NextTouchableOpacity
        style={[styles.cell, cellStyle]}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
      >
        <View
          style={styles.icon}
        />
        {this.renderDetail()}
      </NextTouchableOpacity>
    )
  }
}