import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import BottomModal from './BottomModal'

export interface ActionButton {
  title: string
  onPress?: () => void
}

export interface ActionSheetProps {
  visible?: boolean
  onDismiss?: () => void
  actions?: ActionButton[]
}

export default function ActionSheet({
  visible,
  onDismiss = () => {},
  actions = [],
}: ActionSheetProps) {
  const renderActionButton = (action: ActionButton, index: number) => {
    const { title, onPress } = action
    const handlePress = () => {
      onDismiss && onDismiss()
      setTimeout(() => {
        onPress?.()
      }, 410)
    }

    const shouldRenderDivider = index < actions.length - 1
    return (
      <TouchableOpacity
        key={title}
        style={[
          styles.button,
          {
            borderBottomWidth: shouldRenderDivider
              ? StyleSheet.hairlineWidth
              : 0,
          },
        ]}
        onPress={handlePress}>
        <View style={styles.action}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <BottomModal
      visible={visible}
      onRequestClose={onDismiss}
      contentStyle={{
        height: (actions.length + 1) * 60 + 5 + getBottomSpace(),
      }}>
      {actions.map(renderActionButton)}
      <View style={styles.seperator} />
      {renderActionButton(
        {
          title: '取消',
        },
        actions.length,
      )}
    </BottomModal>
  )
}

const styles = StyleSheet.create({
  button: {
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  action: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#333333',
    fontSize: 15,
    fontWeight: 'bold',
  },
  seperator: {
    height: 5,
    width: '100%',
    backgroundColor: '#F7F7F7',
  },
})
