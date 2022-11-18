import React, { PureComponent } from 'react'
import { StyleProp, Text, ViewStyle, View, Image, ImageSourcePropType } from 'react-native'
import { greenColor } from '../../../../utils/constant'
import GradientButton from '../../../components/GradientButton'
import NextPressable from '../../../components/NextPressable'
import styles from './styles'

interface ICell {
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  target?: any
  source?: ImageSourcePropType
  cellItem: any
  index: number
}

const imageList = [
	'https://img.freepik.com/free-vector/hand-drawn-hello-spring-illustration_1188-459.jpg?t=st=1648118348~exp=1648118948~hmac=27414c7963326a2b1f6f25cda2fb2ef682f8b4550ce2bc4c191e45768c8e564b&w=1060',
	'https://img.freepik.com/free-vector/watercolor-spring-illustration_23-2149283727.jpg?t=st=1648118477~exp=1648119077~hmac=df19f1bdb4a150e8882d7485ec39f8c5271faa484355ea9fc5aaca872d27f83d&w=1060',
	'https://img.freepik.com/free-vector/flat-spring-illustration_23-2149281781.jpg?w=1060',
	'https://img.freepik.com/free-vector/watercolor-spring-illustration_23-2149283722.jpg?t=st=1648118348~exp=1648118948~hmac=33f10f97f893419876cac5bd3090cd8f0ccd843f015f423b59309e2ac405aaae&w=1060',
	'https://img.freepik.com/free-vector/hand-drawn-spring-illustration_23-2149285248.jpg?w=1060',
].sort(() => Math.random() - 0.5)

export default class CourseCell extends PureComponent<ICell> {
  private press(onPress: any, delay = 300, e: object) {
    let { target = 'self' } = this.props
    if (target === 'self') {
      target = this
    } else {
      target = global
    }
    if (target.didPress) {
      return
    }
    target.didPress = true
    onPress(e)
    setTimeout(() => {
      target.didPress = false
    }, delay)
  }

  renderDetail() {
    const { cellItem } = this.props
    return (
      <View style={styles.detailView}>
        <View style={{ flex: 1 }}>
          <Text style={styles.titleDetail}>
           { `${new Array(cellItem.tag.length * 3 + 2).fill(' ').join('')}${cellItem.name}` }
          </Text>
          <View style={[StyleSheet.absoluteFill, styles.titleTagView]}>
            <Text style={styles.titleTag}>
              {cellItem.tag}
            </Text>
          </View>
          <Text style={styles.platform}>{cellItem.platform}</Text>
        </View>
        <View style={styles.priceView}>
          <Text style={styles.priceText}>
            {Number(cellItem.price) === 0 ? '免费' : (
            	<>
            	¥{cellItem.price.substring(0, cellItem.price.indexOf('.'))}
            	<Text style={styles.priceTextRight}>
            	{ cellItem.price.substring(cellItem.price.indexOf('.'), cellItem.price.length - 1) }
            	</Text>
            	</>
            )}
          </Text>
          <GradientButton
          	colors={['#81E3AE', '#54D693']}
            containerStyle={{ height: null, borderRadius: 4 }}
            linearStyle={styles.gradientButton}
            textStyle={styles.gradientText}
            text={Number(cellItem.price) === 0 ? '立即学习' : ' 立即报名'}
          />
        </View>
      </View>
    )
  }

  renderIcon(cellItem: any, index: number) {
    if (index === 0) {
      return (
        <Image
          style={styles.rankIcon}
          source={require('../../../../assets/requestJobs/learn-first.png')}
        />
      )
    }
    if (index === 1) {
      return (
        <Image
          style={styles.rankIcon}
          source={require('../../../../assets/requestJobs/learn-second.png')}
        />
      )
    }
    if (index === 2) {
      return (
        <Image
          style={styles.rankIcon}
          source={require('../../../../assets/requestJobs/learn-third.png')}
        />
      )
    }
    return (
      <View style={[styles.rankIcon, { backgroundColor: greenColor, }]} />
    )
  }

  renderRightView(index) {
    const { cellItem: { watchedAmount } } = this.props
    return (
      <View style={styles.watchedView}>
      	<CacheImage style={styles.watchedImage} source={{ uri: imageList[index] }}  />
      	<View style={[StyleSheet.absoluteFill, styles.watchedTextContainer]}>
	        <Text style={styles.watchedText}>
	          {`${watchedAmount}人已观看`}
	        </Text>
        </View>
      </View>
    )
  }

  render() {
    const { onPress, cellItem, index } = this.props
    return (
      <NextPressable
        style={styles.cell}
        onPress={() => {
          if (onPress) {
            onPress()
          }
        }}
      >
        {this.renderIcon(cellItem, index)}
        {this.renderDetail()}
        {this.renderRightView(index)}
      </NextPressable>
    )
  }
}