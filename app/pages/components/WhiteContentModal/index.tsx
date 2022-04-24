import React, { Component } from 'react'
import {
  Image, View, Modal, ViewStyle, StyleProp,
} from 'react-native'
import styles from './styles'
import SystemHelper from '../../../utils/system'

export interface IWhiteContentModalProps {
  visible: boolean,
  closeOnPress?: () => void,
  children?: JSX.Element | JSX.Element[],
  showCloseBtn?: boolean,
  contextStyle?: StyleProp<ViewStyle>
  contextChildrenStyle?: StyleProp<ViewStyle>
  modalStyle?: StyleProp<ViewStyle>
}

interface IWhiteContentModalState {
  visible: boolean,
}

export default class WhiteContentModal extends Component<IWhiteContentModalProps, IWhiteContentModalState> {
  constructor(props: IWhiteContentModalProps) {
    super(props)
    const { visible } = this.props
    this.state = {
      visible,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: IWhiteContentModalProps) {
    const { visible } = this.state
    if (!visible && nextProps.visible) {
      this.setState({ visible: true })
    }
    if (visible && !nextProps.visible) {
      this.hideWithAnimate()
    }
  }

  renderModalMask() {
    return (
      <View style={styles.mask} />
    )
  }

  renderModalContent() {
    const { contextChildrenStyle, children, contextStyle, modalStyle } = this.props
    return (
      <View style={[{
        width: SystemHelper.width,
        height: SystemHelper.height,
        position: 'absolute',
        justifyContent: 'center',
      }, modalStyle]}>
        <View style={[styles.context, contextStyle]}>
          <View style={[styles.topView, contextChildrenStyle]}>
            {children}
          </View>
        </View>
      </View>
    )
  }

  private hideWithAnimate() {
    this.setState({ visible: false })
  }

  render() {
    const { visible } = this.state
    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        statusBarTranslucent={true}
        onRequestClose={() => {
          this.hideWithAnimate()
        }}
      >
        {this.renderModalMask()}
        {this.renderModalContent()}
      </Modal>
    )
  }
}
