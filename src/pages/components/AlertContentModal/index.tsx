import React, { Component } from 'react'
import { StyleProp, Image, TextStyle, Text, View, ImageSourcePropType, ImageStyle } from 'react-native'
import styles from './styles'
import WhiteContentModal from '../WhiteContentModal'
import NextTouchableOpacity from '../NextTouchableOpacity'

interface IButton {
  act: () => void,
  title: string,
  buttonStyle?: any,
  buttonTextStyle?: any,
}

interface IProps {
  title: string,
  visible: boolean,
  leftBtn?: IButton,
  rightBtn?: IButton,
  imageSource?: ImageSourcePropType,
  imageStyle?: StyleProp<ImageStyle>,
  detail?: string,
  tips?: string,
  showCloseBtn?: boolean,
  closeOnPress?: () => void,
  needTriangleBg?: boolean,
  titleStyle?: StyleProp<TextStyle>,
  showSubscribeBtn?: boolean,
  showSubscribeOnPress?: () => void
}

export default class AlertContentModal extends Component<IProps> {

  renderBtn() {
    const { needTriangleBg, leftBtn, rightBtn, detail } = this.props
    return (
      <View style={[styles.btnView, !!detail && { marginTop: 10, }]}>
        {leftBtn ? (
          <NextTouchableOpacity
            style={[styles.button, leftBtn.buttonStyle, !rightBtn && { width: 200 }]}
            onPress={leftBtn.act}
          >
            <Text style={[styles.buttonText, leftBtn.buttonTextStyle]}>
              {leftBtn.title}
            </Text>
          </NextTouchableOpacity>
        ) : null}
        {rightBtn ? (
          <NextTouchableOpacity
            style={[styles.button, rightBtn.buttonStyle]}
            onPress={rightBtn.act}
          >
            <Text style={[styles.buttonText, rightBtn.buttonTextStyle]}>
              {rightBtn.title}
            </Text>
          </NextTouchableOpacity>
        ) : null}
      </View>
    )
  }

  render() {
    const {
      title = 'message',
      visible,
      imageSource,
      imageStyle,
      detail,
      tips,
      showCloseBtn = false,
      titleStyle,
      closeOnPress,
      showSubscribeBtn,
    } = this.props
    return (
      <WhiteContentModal
        visible={visible}
        showCloseBtn={showCloseBtn}
        closeOnPress={closeOnPress}
      >
        <View style={styles.contentView}>
          {imageSource ? (
            <Image
              style={[styles.image, imageStyle]}
              resizeMode="center"
              source={imageSource as ImageSourcePropType}
            />
          ) : (null)}
          <Text style={[styles.title, titleStyle]} >
            {title}
          </Text>
          {detail ? (
            <Text style={styles.detail}>
              {detail}
            </Text>
          ) : null}
          {this.renderBtn()}
          {tips ? (
            <Text style={styles.tips}>
              {tips}
            </Text>
          ) : null}
        </View>
      </WhiteContentModal >
    )
  }
}