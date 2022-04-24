import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType, TextStyle, ImageStyle } from 'react-native'
import styles from './styles'

interface ICell {
  viewStyle?: StyleProp<ViewStyle>
  emptyText?: string,
  emptyTextStyle?: StyleProp<TextStyle>
  emptyImage?: StyleProp<ImageSourcePropType>
  emptyImageStyle?: StyleProp<ImageStyle>
}

export default class ListEmptyComponent extends PureComponent<ICell> {

  render() {
    const { viewStyle, emptyImage, emptyImageStyle, emptyText = '暂无记录', emptyTextStyle } = this.props
    return (
      <View style={[styles.emptyView, viewStyle]}>
        <Text style={[styles.emptyText, emptyTextStyle]}>{emptyText}</Text>
        <Image
          style={[styles.emptyIcon, emptyImageStyle]}
          source={emptyImage || require('../../../assets/requestJobs/no-response.png')}
        />
      </View>
    )
  }
}