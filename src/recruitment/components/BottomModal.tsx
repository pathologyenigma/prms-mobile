import React, { PropsWithChildren } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { View, StyleSheet, Modal } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

interface BottomModalProps {
  visible?: boolean
  contentStyle?: StyleProp<ViewStyle>
}

export default function BottomModal({
  children,
  visible,
  contentStyle,
}: PropsWithChildren<BottomModalProps>) {
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      presentationStyle="overFullScreen"
      animationType="fade">
      <View style={styles.modal}>
        <View style={[styles.content, contentStyle]}>{children}</View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#00000088',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    width: '100%',
    minHeight: isIphoneX() ? 300 : 266,
    overflow: 'hidden',
  },
})
