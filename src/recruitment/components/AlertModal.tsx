import React from 'react'
import {
  Modal,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import TextButton from './TextButton'

interface AlertModalProps {
  visible: boolean
  title?: string
  msg?: string
  positiveText?: string
  titleStyle?: StyleProp<TextStyle>
  msgStyle?: StyleProp<TextStyle>
  modalContentStyle?: StyleProp<ViewStyle>
  positiveTextStyle?: StyleProp<TextStyle>
  onNegativePress?: () => void
  onPositivePress?: () => void
}

export default function AlertModal({
  visible,
  modalContentStyle,
  titleStyle,
  msgStyle,
  positiveTextStyle,
  positiveText,
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
          {!!title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {!!msg && <Text style={[styles.msg, msgStyle]}>{msg}</Text>}
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
              textStyle={[styles.positiveText, positiveTextStyle]}
              title={positiveText ?? '确定'}
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
  title: {
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
  },
  msg: {
    fontSize: 15,
    lineHeight: 21,
    color: '#666666',
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 20,
    marginHorizontal: 28,
    textAlign: 'center',
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
  },
})
