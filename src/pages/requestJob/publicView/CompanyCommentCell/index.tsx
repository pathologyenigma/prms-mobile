import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import CommentStar from '../../../components/CommentStar'
import NextTouchableOpacity from '../../../components/NextTouchableOpacity'
import styles from './styles'
import { format } from 'date-fns'

interface ICell {
  isWhiteMode?: boolean
  likePress?: () => void
  cellStyle?: StyleProp<ViewStyle>
  cellItem: any
}

export default class CompanyCommentCell extends PureComponent<ICell> {

  renderTag(tags: any) {
    if (!tags) {
      return null
    }
    return (
      <View style={styles.jobInfoTagView}>
        {tags.map((item: any, index: number) => {
          return (
            <Text key={index.toString()} style={styles.jobInfoTagItem}>
              {item}
            </Text>
          )
        })}
      </View>
    )
  }

  render() {
    const { cellItem, cellStyle, likePress, isWhiteMode = false } = this.props
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
            source={{ uri: cellItem.logo }}
          />
          <View style={styles.commentInfo}>
            <Text style={[styles.cellTitle, isWhiteMode && { color: '#333333' }]}>
              {cellItem.user_name}
            </Text>
            <Text style={[styles.cellJob, isWhiteMode && { color: '#888888' }]}>
              {`面试职位：${cellItem.job_name}`}
            </Text>
          </View>
          <CommentStar
            cellStyle={{ marginTop: 2 }}
            star={cellItem.score}
          />
        </View>
        {this.renderTag(cellItem.tags)}
        <Text style={[styles.cellContent, isWhiteMode && { color: '#666666' }]}>{cellItem.content}</Text>
        <View style={styles.cellDetail}>
          <Text style={styles.cellTime}>
            {format(Number(cellItem.createdAt), 'yyyy年MM月dd日')}
          </Text>
          <NextTouchableOpacity
            style={styles.likeView}
            onPress={() => {
              if (likePress) {
                likePress()
              }
            }}
          >
            <Image
              style={styles.dianzanIcon}
              resizeMode="contain"
              source={cellItem.isLike
                ? require('../../../../assets/requestJobs/dianzaned.png')
                : require('../../../../assets/requestJobs/dianzan.png')
              }
            />
            <Text style={styles.cellTime}>{cellItem.thumbs || 0}</Text>
          </NextTouchableOpacity>
        </View>
      </NextTouchableOpacity>
    )
  }
}