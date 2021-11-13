import React from 'react'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native'
import TextButton from './TextButton'

interface AlertModalProps {
  visible: boolean
  title?: string
  msg?: string
  modalContentStyle?: StyleProp<ViewStyle>
  onNegativePress?: () => void
  onPositivePress?: () => void
}

export default function AlertModal({
  visible,
  modalContentStyle,
  title,
  msg,
  onNegativePress,
  onPositivePress,
}: AlertModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      presentationStyle="overFullScreen"
      animationType="fade">
      <View style={styles.modal}>
        <View style={[styles.content, modalContentStyle]}>
          <View style={styles.main}>
            {!!title && <Text style={styles.title}>{title}</Text>}
            {!!msg && <Text style={styles.msg}>{msg}</Text>}
          </View>
          <View style={styles.buttons}>
            <TextButton
              onPress={onNegativePress}
              style={styles.button}
              textStyle={styles.negativeText}
              title="取消"
            />
            <View style={styles.divider} />
            <TextButton
              onPress={onPositivePress}
              style={styles.button}
              textStyle={styles.positiveText}
              title="确定"
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000088',
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 280,
    alignItems: 'center',
    minHeight: 170,
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    color: '#333333',
    fontSize: 20,
    lineHeight: 40,
    fontWeight: '500',
    marginTop: -12,
  },
  msg: {
    fontSize: 15,
    lineHeight: 21,
    color: '#666666',
    fontWeight: '500',
  },
  buttons: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopColor: '#DDDDDD',
    borderTopWidth: 1,
  },
  divider: {
    backgroundColor: '#DDDDDD',
    width: 1,
  },
  button: {
    flex: 1,
    flexGrow: 1,
  },
  negativeText: {
    color: '#333333',
    fontSize: 16,
  },
  positiveText: {
    color: '#57DE9E',
    fontSize: 16,
    fontWeight: '500',
  },
})
