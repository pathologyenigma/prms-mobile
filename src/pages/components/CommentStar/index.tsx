import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import styles from './styles'

interface ICell {
  cellStyle?: StyleProp<ViewStyle>
  star: number
}

export default class CommentStar extends PureComponent<ICell> {
  render() {
    const { star = 0, cellStyle } = this.props
    let showStarArray = []
    for (let i = 0; i < 5; i++) {
      if (i < star) {
        showStarArray.push(require('../../../assets/requestJobs/star.png'))
      } else {
        showStarArray.push(require('../../../assets/requestJobs/star-gray.png'))
      }
    }
    return (
      <View style={[styles.starView, cellStyle]}>
        {showStarArray.map((value: string, index: number) => {
          return (
            <Image
              style={styles.starItem}
              key={index.toString()}
              source={value as ImageSourcePropType}
            />
          )
        })}
      </View>
    )
  }
}