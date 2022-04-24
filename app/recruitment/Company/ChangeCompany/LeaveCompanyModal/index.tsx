import React, { useState } from 'react'
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'
import BottomModal from '../../../components/BottomModal'
import IconButton from '../../../components/IconButton'
import SecondaryButton from '../../../components/SecondaryButton'

interface LeaveCompanyModalProps {
  visible: boolean
  onDismiss?: () => void
  onLevePress?: () => void
}

const warnings = [
  '您无法继续管理您账号下的职位、简历',
  '与求职者的聊天将会失败，记录将清空',
  '账号下的资产将无法使用',
  '离职后请联系管理员，在电脑端为您进行工作交接',
]

export default function LeaveCompanyModal({
  visible,
  onLevePress,
  onDismiss,
}: LeaveCompanyModalProps) {
  const handleLevePress = () => {
    onDismiss?.()
    onLevePress?.()
  }

  return (
    <BottomModal
      visible={visible}
      onDismiss={onDismiss}
      onRequestClose={onDismiss}>
      <View style={styles.header}>
        <IconButton
          style={styles.closeButton}
          icon={require('./close.png')}
          onPress={onDismiss}
        />
      </View>
      <Text style={styles.title}>
        离开公司后，您在该公司下的账号将被废除请谨慎操作！
      </Text>
      <View style={styles.warnings}>
        {warnings.map(w => (
          <View style={styles.warningItem} key={w}>
            <View style={styles.warningIndicator} />
            <Text style={styles.warning}>{w}</Text>
          </View>
        ))}
      </View>
      <SecondaryButton
        onPress={handleLevePress}
        style={styles.button}
        titleStyle={styles.buttonText}
        title="确定离开公司"
      />
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 11,
    marginHorizontal: 9,
    alignItems: 'flex-end',
  },
  closeButton: {},
  title: {
    marginHorizontal: 16,
    color: '#333333',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 25,
  },
  warnings: {
    marginTop: 25,
    marginHorizontal: 16,
  },
  warningItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  warningIndicator: {
    backgroundColor: '#57DE9E',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  warning: {
    marginLeft: 8,
    color: '#888888',
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    marginTop: 12,
    marginBottom: isIphoneX() ? 46 : 20,
    marginHorizontal: 21,
    height: 55,
    borderRadius: 8,
    backgroundColor: '#ECECEC',
  },
  buttonText: {
    color: '#FC384B',
    fontSize: 15,
    fontWeight: 'bold',
  },
})
