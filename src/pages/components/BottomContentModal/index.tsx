import React, { Component } from 'react'
import {
  View, Modal,
} from 'react-native'
import styles from './styles'
import SystemHelper from '../../../utils/system'

export interface IBottomContentModalProps {
  visible: boolean,
}

interface IBottomContentModalState {
  visible: boolean,
}

export default class BottomContentModal extends Component<IBottomContentModalProps, IBottomContentModalState> {
  constructor(props: IBottomContentModalProps) {
    super(props)
    const { visible } = this.props
    this.state = {
      visible,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps: IBottomContentModalProps) {
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
    const { children } = this.props
    return (
      <View style={
        {
          width: SystemHelper.width,
          height: SystemHelper.height,
          position: 'absolute',
          justifyContent: 'flex-end',
        }
      }>
        <View style={styles.topView}>
          {children}
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
